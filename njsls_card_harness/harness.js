// njsls_card_harness — verifies the pure-function card renderer against eight
// recorded fixtures, one per subject family. Same discipline as the docx
// import harness: xUnit Test Patterns (Meszaros, 2007).
//
//   Test Fixture (Ch. 18)       — fixtures/<family>.json + fixtures/<family>.expected.json
//   Four-Phase Test (Ch. 19)    — load fixture → renderStandardCard → deep-equal → no teardown
//   Self-Checking Test (Ch. 5)  — PASS/FAIL with field-level diff
//   Recorded Test (Ch. 23)      — --record mode rewrites expected JSON
//   Test Coverage (Ch. 4)       — every subject family must hit ≥ 1 fixture
//
// Usage:
//   node harness.js              run all tests
//   node harness.js --record     record fresh expected JSON for every fixture
//   node harness.js --only NAME  filter to fixtures matching NAME

var fs = require('fs');
var path = require('path');
var renderer = require('./renderer.js');

var FIXTURES_DIR = path.join(__dirname, 'fixtures');
var argv = process.argv.slice(2);
var MODE_RECORD = argv.indexOf('--record') >= 0;
var ONLY_IDX = argv.indexOf('--only');
var ONLY = ONLY_IDX >= 0 ? argv[ONLY_IDX + 1] : null;

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === 'object') {
    var ak = Object.keys(a).sort();
    var bk = Object.keys(b).sort();
    if (ak.length !== bk.length) return false;
    for (var j = 0; j < ak.length; j++) {
      if (ak[j] !== bk[j]) return false;
      if (!deepEqual(a[ak[j]], b[ak[j]])) return false;
    }
    return true;
  }
  return false;
}

function shallowDiff(expected, actual, pathStr) {
  pathStr = pathStr || '';
  var diffs = [];
  if (typeof expected !== typeof actual) {
    diffs.push(pathStr + ': type ' + typeof expected + ' vs ' + typeof actual);
    return diffs;
  }
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) { diffs.push(pathStr + ': expected array'); return diffs; }
    if (expected.length !== actual.length) diffs.push(pathStr + ': length ' + expected.length + ' vs ' + actual.length);
    var max = Math.max(expected.length, actual.length);
    for (var i = 0; i < max && diffs.length < 10; i++) {
      if (!deepEqual(expected[i], actual[i])) diffs.push.apply(diffs, shallowDiff(expected[i], actual[i], pathStr + '[' + i + ']'));
    }
    return diffs;
  }
  if (expected && typeof expected === 'object') {
    var keys = Object.keys(expected).concat(Object.keys(actual || {}));
    var seen = {};
    keys.forEach(function (k) {
      if (seen[k]) return;
      seen[k] = true;
      if (!deepEqual(expected[k], actual && actual[k])) diffs.push.apply(diffs, shallowDiff(expected[k], actual && actual[k], pathStr + '.' + k));
    });
    return diffs;
  }
  if (expected !== actual) {
    var es = JSON.stringify(expected);
    var as = JSON.stringify(actual);
    if (es && es.length > 80) es = es.slice(0, 77) + '...';
    if (as && as.length > 80) as = as.slice(0, 77) + '...';
    diffs.push(pathStr + ': ' + es + ' vs ' + as);
  }
  return diffs;
}

function runOne(name) {
  var fixturePath = path.join(FIXTURES_DIR, name + '.json');
  var expectedPath = path.join(FIXTURES_DIR, name + '.expected.json');

  // Phase 1 — Setup
  var rec = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  // Phase 2 — Exercise
  var card = renderer.renderStandardCard(rec);

  // Record mode
  if (MODE_RECORD) {
    fs.writeFileSync(expectedPath, JSON.stringify(card, null, 2) + '\n');
    return { name: name, verdict: 'RECORDED', diffs: [], card: card };
  }

  // Phase 3 — Verify
  if (!fs.existsSync(expectedPath)) {
    return { name: name, verdict: 'NO-EXPECTED', diffs: ['run --record to create expected.json'] };
  }
  var expected = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
  var diffs = shallowDiff(expected, card);
  return {
    name: name,
    verdict: diffs.length === 0 ? 'PASS' : 'FAIL',
    diffs: diffs,
    subject: rec.subject,
    sectionCount: card.sections.length
  };
}

function familyCoverage(results) {
  var families = ['ela', 'math', 'science', 'social_studies', 'csdt', 'clks', 'chpe'];
  var hit = {};
  families.forEach(function (f) { hit[f] = []; });
  results.forEach(function (r) {
    if (r.subject && hit[r.subject]) hit[r.subject].push(r.name);
  });
  return { families: families, hit: hit };
}

// ───── Runner ───────────────────────────────────────────────────────────

console.log('═'.repeat(60));
console.log('NJSLS card harness — xUnit Test Patterns (Meszaros, 2007)');
console.log('mode: ' + (MODE_RECORD ? 'RECORD (overwrites expected.json)' : 'VERIFY'));
if (ONLY) console.log('filter: --only ' + ONLY);
console.log('═'.repeat(60));

var fixtures = fs.readdirSync(FIXTURES_DIR)
  .filter(function (f) { return /\.json$/.test(f) && !/\.expected\.json$/.test(f); })
  .map(function (f) { return f.replace(/\.json$/, ''); })
  .filter(function (f) { return !ONLY || f.indexOf(ONLY) >= 0; });

var results = fixtures.map(runOne);

results.forEach(function (r) {
  var color = { PASS: '\x1b[32m', FAIL: '\x1b[31m', RECORDED: '\x1b[36m', 'NO-EXPECTED': '\x1b[33m' }[r.verdict] || '';
  var reset = '\x1b[0m';
  console.log(color + '  ' + r.verdict.padEnd(12) + reset + r.name +
    (r.subject ? '  [' + r.subject + ']' : '') +
    (r.sectionCount != null ? '  (' + r.sectionCount + ' sections)' : ''));
  if (r.diffs && r.diffs.length) {
    r.diffs.slice(0, 8).forEach(function (d) { console.log('       ' + d); });
    if (r.diffs.length > 8) console.log('       ... +' + (r.diffs.length - 8) + ' more diffs');
  }
});

console.log('─'.repeat(60));
var passes = results.filter(function (r) { return r.verdict === 'PASS' || r.verdict === 'RECORDED'; }).length;
var fails = results.filter(function (r) { return r.verdict === 'FAIL' || r.verdict === 'NO-EXPECTED'; }).length;
console.log('SUMMARY: ' + passes + ' pass / ' + fails + ' fail of ' + results.length);

// Coverage (verify mode only; record mode shouldn't claim coverage)
if (!MODE_RECORD) {
  var cov = familyCoverage(results);
  console.log('─'.repeat(60));
  console.log('COVERAGE (every subject family must hit ≥ 1 fixture):');
  cov.families.forEach(function (fam) {
    var status = cov.hit[fam].length > 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
    console.log('  ' + status + '  ' + fam.padEnd(18) + (cov.hit[fam].join(', ') || '(none)'));
  });
}
console.log('═'.repeat(60));
process.exit(fails > 0 ? 1 : 0);
