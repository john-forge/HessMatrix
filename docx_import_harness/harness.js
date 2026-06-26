// docx_import_harness — test harness for parser.js, applying patterns from
// xUnit Test Patterns (Meszaros, 2007, ISBN 978-0131495050).
//
//   Test Fixture (Ch. 18)       — fixtures/<name>.docx + fixtures/<name>.expected.json
//   Four-Phase Test (Ch. 19)    — setup (load fixture) → exercise (parse) →
//                                  verify (deep-equal) → teardown (none)
//   Self-Checking Test (Ch. 5)  — each test prints PASS or FAIL with a diff
//   Recorded Test (Ch. 23)      — expected JSON is captured once, asserted
//                                  against thereafter; --record mode rewrites
//                                  it deliberately
//   Test Coverage (Ch. 4)       — coverage report at end: every code family
//                                  the parser claims to handle must appear in
//                                  at least one fixture's output
//
// Usage:
//   node harness.js              run all tests, print PASS/FAIL verdicts
//   node harness.js --record     record fresh expected JSON for every fixture
//   node harness.js --only NAME  run only the fixture matching NAME

var fs = require('fs');
var path = require('path');
var mammoth = require('mammoth');
var parser = require('./parser.js');

var FIXTURES_DIR = path.join(__dirname, 'fixtures');
var argv = process.argv.slice(2);
var MODE_RECORD = argv.indexOf('--record') >= 0;
var ONLY_IDX = argv.indexOf('--only');
var ONLY = ONLY_IDX >= 0 ? argv[ONLY_IDX + 1] : null;

// ───── tiny assert library (Meszaros Ch. 21 — Assertion Method) ──────────

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
    if (expected.length !== actual.length) {
      diffs.push(pathStr + ': length ' + expected.length + ' vs ' + actual.length);
    }
    var max = Math.max(expected.length, actual.length);
    for (var i = 0; i < max && diffs.length < 10; i++) {
      if (!deepEqual(expected[i], actual[i])) {
        diffs.push.apply(diffs, shallowDiff(expected[i], actual[i], pathStr + '[' + i + ']'));
      }
    }
    return diffs;
  }
  if (expected && typeof expected === 'object') {
    var keys = Object.keys(expected).concat(Object.keys(actual || {}));
    var seen = {};
    keys.forEach(function (k) {
      if (seen[k]) return;
      seen[k] = true;
      if (!deepEqual(expected[k], actual && actual[k])) {
        diffs.push.apply(diffs, shallowDiff(expected[k], actual && actual[k], pathStr + '.' + k));
      }
    });
    return diffs;
  }
  if (expected !== actual) {
    diffs.push(pathStr + ': ' + JSON.stringify(expected) + ' vs ' + JSON.stringify(actual));
  }
  return diffs;
}

// ───── single test (Four-Phase) ──────────────────────────────────────────

async function runOneFixture(fixtureBaseName, fixtureExt) {
  // fixtureExt is 'docx' (full pipeline through mammoth) or 'html' (direct
  // input for synthetic test cases that bypass mammoth). Both run the same
  // parser so coverage is meaningful in either case.
  fixtureExt = fixtureExt || 'docx';
  var fixturePath = path.join(FIXTURES_DIR, fixtureBaseName + '.' + fixtureExt);
  var expectedPath = path.join(FIXTURES_DIR, fixtureBaseName + '.expected.json');

  // Phase 1 — Setup: load fixture + expected JSON
  var html;
  if (fixtureExt === 'docx') {
    var docxBuf = fs.readFileSync(fixturePath);
    var conv = await mammoth.convertToHtml({ buffer: docxBuf });
    html = conv.value;
  } else {
    html = fs.readFileSync(fixturePath, 'utf8');
  }

  // Phase 2 — Exercise: run the parser. Use a fixed timestamp so the recording
  // is reproducible (the imported_at field would otherwise change every run).
  var inventory = parser.parseHtmlToInventory(html, {
    source: fixtureBaseName + '.' + fixtureExt,
    now: 'FIXED-FOR-TEST'
  });

  // Record mode: write the fresh output as the new expected file.
  if (MODE_RECORD) {
    fs.writeFileSync(expectedPath, JSON.stringify(inventory, null, 2) + '\n');
    return { fixture: fixtureBaseName, verdict: 'RECORDED', diffs: [] };
  }

  // Phase 3 — Verify
  if (!fs.existsSync(expectedPath)) {
    return {
      fixture: fixtureBaseName,
      verdict: 'NO-EXPECTED',
      diffs: ['no expected.json exists; run with --record to create it']
    };
  }
  var expected = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));
  var diffs = shallowDiff(expected, inventory);
  var pass = diffs.length === 0;

  // Phase 4 — Teardown: nothing to clean up; parser is a pure function.

  return {
    fixture: fixtureBaseName,
    verdict: pass ? 'PASS' : 'FAIL',
    diffs: diffs,
    summary: {
      segments_with_codes: inventory.segment_count_with_codes,
      unique_codes: inventory.all_codes.length
    }
  };
}

// ───── coverage check (Meszaros Ch. 4) ──────────────────────────────────
// The parser claims four code families. Coverage requires at least one
// fixture to exercise each family.

function coverageReport(results) {
  var families = {
    ngss_pe: { regex: /^(?:HS|MS|[3-8](?:-[3-8])?)-[A-Z]{2,4}\d+-\d+$/, fixtures: [] },
    ela_2023: { regex: /^[A-Z]{1,2}\.[A-Z]{2,3}\.\d{1,2}\.\d{1,2}(?:\.[a-z])?$/, fixtures: [] },
    math: { regex: /^\d{1,2}\.[A-Z]{1,4}\.[A-Z]\.\d{1,2}(?:\.[a-z])?$/, fixtures: [] },
    civics_csdt_clks_chpe: { regex: /^\d\.\d\.\d{1,2}\.[A-Za-z]+\.\d{1,2}$/, fixtures: [] }
  };
  results.forEach(function (r) {
    if (!r.summary || !r.summary.all_codes) return;
    r.summary.all_codes.forEach(function (code) {
      Object.keys(families).forEach(function (fam) {
        if (families[fam].regex.test(code)) families[fam].fixtures.push(r.fixture);
      });
    });
  });
  return families;
}

// ───── runner ────────────────────────────────────────────────────────────

(async () => {
  console.log('═'.repeat(60));
  console.log('docx import harness — xUnit Test Patterns (Meszaros, 2007)');
  console.log('mode: ' + (MODE_RECORD ? 'RECORD (overwrites expected.json)' : 'VERIFY'));
  if (ONLY) console.log('filter: --only ' + ONLY);
  console.log('═'.repeat(60));

  var allFixtures = fs.readdirSync(FIXTURES_DIR)
    .map(function (f) {
      var m = f.match(/^(.+)\.(docx|html)$/);
      return m ? { name: m[1], ext: m[2] } : null;
    })
    .filter(function (x) { return x !== null; })
    .filter(function (x) { return !ONLY || x.name.indexOf(ONLY) >= 0; });

  var results = [];
  for (var i = 0; i < allFixtures.length; i++) {
    var name = allFixtures[i].name;
    var ext = allFixtures[i].ext;
    try {
      var r = await runOneFixture(name, ext);
      results.push(r);
      // Re-load expected for the coverage report's all_codes lookup
      var expPath = path.join(FIXTURES_DIR, name + '.expected.json');
      if (fs.existsSync(expPath)) {
        try {
          r.summary = r.summary || {};
          r.summary.all_codes = JSON.parse(fs.readFileSync(expPath, 'utf8')).all_codes || [];
        } catch (e) { /* ignore */ }
      }
      var color = { PASS: '\x1b[32m', FAIL: '\x1b[31m', RECORDED: '\x1b[36m', 'NO-EXPECTED': '\x1b[33m' }[r.verdict] || '';
      var reset = '\x1b[0m';
      console.log(color + '  ' + r.verdict.padEnd(12) + reset + name +
        (r.summary ? '  (' + r.summary.segments_with_codes + ' segments, ' + r.summary.unique_codes + ' codes)' : ''));
      if (r.diffs && r.diffs.length) {
        r.diffs.slice(0, 8).forEach(function (d) { console.log('       ' + d); });
        if (r.diffs.length > 8) console.log('       ... +' + (r.diffs.length - 8) + ' more diffs');
      }
    } catch (e) {
      results.push({ fixture: name, verdict: 'ERROR', diffs: [e.message] });
      console.log('\x1b[31m  ERROR       \x1b[0m' + name + ': ' + e.message);
    }
  }

  console.log('─'.repeat(60));
  var passes = results.filter(function (r) { return r.verdict === 'PASS' || r.verdict === 'RECORDED'; }).length;
  var fails = results.filter(function (r) { return r.verdict === 'FAIL' || r.verdict === 'ERROR' || r.verdict === 'NO-EXPECTED'; }).length;
  console.log('SUMMARY: ' + passes + ' pass / ' + fails + ' fail of ' + results.length);

  if (!MODE_RECORD) {
    var cov = coverageReport(results);
    console.log('─'.repeat(60));
    console.log('COVERAGE (every code family must hit ≥ 1 fixture):');
    Object.keys(cov).forEach(function (fam) {
      var uniqueFixtures = Array.from(new Set(cov[fam].fixtures));
      var status = uniqueFixtures.length > 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
      console.log('  ' + status + '  ' + fam.padEnd(24) + uniqueFixtures.join(', ') || '(none)');
    });
  }
  console.log('═'.repeat(60));
  process.exit(fails > 0 ? 1 : 0);
})();
