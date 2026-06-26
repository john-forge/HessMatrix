// texture_lessons_harness/harness.js
//
// xUnit Test Patterns (Meszaros, 2007) discipline.
//
//   Test Fixture (Ch. 18)       — fixtures/<name>.json + fixtures/<name>.expected.json
//   Four-Phase Test (Ch. 19)    — load fixture → parseLessonContent → deep-equal → no teardown
//   Self-Checking Test (Ch. 5)  — PASS/FAIL with shallow-diff trace
//   Recorded Test (Ch. 23)      — --record mode rewrites expected JSON
//   Test Coverage (Ch. 4)       — every cell-shape variant has ≥ 1 fixture
//
// Usage:
//   node harness.js              run all tests
//   node harness.js --record     record fresh expected JSON for every fixture
//   node harness.js --only NAME  filter to fixtures matching NAME

var fs = require('fs');
var path = require('path');
var parser = require('./parser.js');

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
    for (var i = 0; i < max && diffs.length < 12; i++) {
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
    if (es && es.length > 100) es = es.slice(0, 97) + '...';
    if (as && as.length > 100) as = as.slice(0, 97) + '...';
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
  var actual = parser.parseLessonContent(rec.input.raw_cell_text);

  if (MODE_RECORD) {
    fs.writeFileSync(expectedPath, JSON.stringify(actual, null, 2) + '\n');
    return { name: name, verdict: 'RECORDED', diffs: [], actual: actual };
  }

  // Phase 3 — Verify
  if (!fs.existsSync(expectedPath)) {
    return { name: name, verdict: 'NO-EXPECTED', diffs: ['run --record to create expected.json'] };
  }
  var expected = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
  var diffs = shallowDiff(expected, actual);
  return {
    name: name,
    verdict: diffs.length === 0 ? 'PASS' : 'FAIL',
    diffs: diffs,
    lesson_count: actual.lessons.length,
    group_count: actual.groups.length
  };
}

// Coverage map: every cell-shape variant must hit at least one fixture name.
var COVERAGE_SHAPES = [
  'empty_cell',
  'single_l1',
  'multi_l_sequential',
  'doubled_l_set',
  'dash_notation',
  'run_on_inline',
  'seminar_named',
  'visit_marker'
];

console.log('═'.repeat(60));
console.log('texture_lessons_harness — xUnit Test Patterns (Meszaros, 2007)');
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
    (r.lesson_count != null ? '  (' + r.lesson_count + ' lessons, ' + r.group_count + ' group)' : ''));
  if (r.diffs && r.diffs.length) {
    r.diffs.slice(0, 10).forEach(function (d) { console.log('       ' + d); });
    if (r.diffs.length > 10) console.log('       ... +' + (r.diffs.length - 10) + ' more diffs');
  }
});

console.log('─'.repeat(60));
var passes = results.filter(function (r) { return r.verdict === 'PASS' || r.verdict === 'RECORDED'; }).length;
var fails = results.filter(function (r) { return r.verdict === 'FAIL' || r.verdict === 'NO-EXPECTED'; }).length;
console.log('SUMMARY: ' + passes + ' pass / ' + fails + ' fail of ' + results.length);

if (!MODE_RECORD) {
  console.log('─'.repeat(60));
  console.log('COVERAGE (every cell-shape variant must hit ≥ 1 fixture):');
  COVERAGE_SHAPES.forEach(function (shape) {
    var hit = fixtures.indexOf(shape) >= 0;
    var status = hit ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
    console.log('  ' + status + '  ' + shape);
  });
}
console.log('═'.repeat(60));
process.exit(fails > 0 ? 1 : 0);
