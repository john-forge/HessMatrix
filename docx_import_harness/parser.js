// docx_import_parser — extracts NJSLS codes + their surrounding context from
// HTML produced by mammoth.convertToHtml on a .docx file.
//
// Pure functions, no DOM API, no Node API. Runs in Node (for the test harness)
// and in the browser (when bundled into forge_app.html). The only external
// expectation is that the input is the HTML string mammoth produces.
//
// Output shape is intentionally permissive — the workbench's Outline Heatmap
// panel walks any JSON looking for code-shaped strings, so as long as the
// emitted JSON contains the codes (and ideally their context), the heat map
// can chew through it.
//
// Source discipline: xUnit Test Patterns (Meszaros, 2007). Four-Phase Test
// pattern means this file is the Exercise phase; fixtures and expected JSON
// are the Setup; harness.js is the Verify; nothing to Teardown.

(function (root) {
  'use strict';

  // ───── NJSLS code patterns ──────────────────────────────────────────────
  // We recognize four families, ORed. Captured group is the whole code.
  //
  //   1. NGSS PE codes: MS-LS4-5, HS-PS1-2, 5-PS1-1, 3-5-ETS1-2
  //      Form: (optional grade prefix)-DDC-CN-N
  //   2. 2023 NJSLS ELA: W.AW.6.1, RI.AA.7.7, SL.PE.6.1, L.RF.5.3 (+ .b suffix)
  //      Form: STR.STR.G.N(.letter)
  //   3. NJSLS Math: 6.RP.A.2, 7.SP.C.5, 5.NBT.B.7 (+ .a suffix)
  //      Form: G.DOM.CLUSTER.N(.letter)
  //   4. NJSLS Social Studies / CSDT / CLKS / CHPE: 6.1.5.CivicsPI.1,
  //      8.2.5.ED.1, 9.4.5.CI.1, 2.1.5.PGD.1
  //      Form: D.D.G.STR.N (numeric-numeric-numeric-letters-numeric)
  //
  // We over-match on purpose, then filter against the live NJSLS database
  // when the audit runs. The parser does not filter; it surfaces.

  var CODE_PATTERNS = [
    // NGSS — must come before generic to avoid over-greedy match
    /\b(?:HS|MS|[3-8](?:-[3-8])?)-[A-Z]{2,4}\d+-\d+\b/g,
    // ELA 2023 (W.AW.6.1, RI.AA.6.7, SL.PE.6.1, L.RF.5.3, etc.)
    /\b[A-Z]{1,2}\.[A-Z]{2,3}\.\d{1,2}\.\d{1,2}(?:\.[a-z])?\b/g,
    // Math (6.RP.A.2, 5.NBT.B.7, 7.SP.C.5, 5.M.A.1)
    /\b\d{1,2}\.[A-Z]{1,4}\.[A-Z]\.\d{1,2}(?:\.[a-z])?\b/g,
    // Social Studies / CSDT / CLKS / CHPE — numeric-numeric-numeric-letters-numeric
    /\b\d\.\d\.\d{1,2}\.[A-Za-z]+\.\d{1,2}\b/g
  ];

  // ───── Range expansion ──────────────────────────────────────────────────
  // Forge docs use multiple range notations:
  //   6.RP.A.1–3            (en-dash between final digits)
  //   5.NF.B.4-6            (hyphen)
  //   6.EE.B.6–7            (en-dash)
  //   MS-ETS1-1 through 3   (English word)
  //   6.SP.A.1–2 and 6.SP.B.4–5  (combined)
  //
  // We expand each into the individual codes it implies. The expander only
  // touches the trailing digit; structural parts of the code stay fixed.

  function expandRange(code) {
    // "PREFIX.LAST" or "PREFIX-LAST" where LAST is "A-B" or "A–B" or "A through B"
    var EN_DASH = /[–—]/;
    var rangeRe = /(.+?[\.\-])(\d+)(?:\s*(?:through|to)\s*|[\-–—])(\d+)$/i;
    var m = code.match(rangeRe);
    if (!m) return [code];
    var prefix = m[1];
    var lo = parseInt(m[2], 10);
    var hi = parseInt(m[3], 10);
    if (isNaN(lo) || isNaN(hi) || hi <= lo || (hi - lo) > 20) return [code];
    var out = [];
    for (var i = lo; i <= hi; i++) out.push(prefix + i);
    return out;
  }

  // Pre-process text to surface range notation as parseable. We also strip
  // Google-Doc markdown link wrappers like "[6.SP](http://6.sp).B.4" which
  // get rendered into HTML by mammoth as messy mixed-case noise.
  function normalizeText(text) {
    if (!text) return '';
    var s = String(text);
    // Strip [code](url) markdown link wrappers — keep the visible code text
    s = s.replace(/\[([^\]]+)\]\(http[^)]*\)/g, '$1');
    // Normalize en-dashes and em-dashes between digits to a single hyphen for
    // range matching (won't break standalone codes since their internal dashes
    // are between letters and digits, not digit-digit).
    s = s.replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2');
    // "through" → "-"
    s = s.replace(/(\d+)\s+through\s+(\d+)/gi, '$1-$2');
    return s;
  }

  // ───── Extraction ──────────────────────────────────────────────────────

  function extractCodesFromText(text) {
    var norm = normalizeText(text);
    var hits = [];
    CODE_PATTERNS.forEach(function (re) {
      var m;
      // Reset since /g state persists across calls
      re.lastIndex = 0;
      while ((m = re.exec(norm)) !== null) hits.push(m[0]);
    });
    // De-duplicate while preserving order
    var seen = {};
    var unique = [];
    hits.forEach(function (c) { if (!seen[c]) { seen[c] = true; unique.push(c); } });
    // Also catch range tails: a code followed by "-N" or "-N-N" should
    // expand. Look for "CODE-DIGIT" where CODE ends in a digit and the
    // trailing chunk is purely numeric (range tail).
    var expanded = [];
    unique.forEach(function (c) {
      // Look up to 8 chars past c in the normalized text for "-N"
      var idx = norm.indexOf(c);
      if (idx < 0) { expanded.push(c); return; }
      var tail = norm.slice(idx + c.length, idx + c.length + 8);
      var rangeTail = tail.match(/^-(\d+)/);
      if (rangeTail) {
        var hi = parseInt(rangeTail[1], 10);
        var lastDigit = c.match(/(\d+)$/);
        if (lastDigit) {
          var lo = parseInt(lastDigit[1], 10);
          if (!isNaN(hi) && hi > lo && (hi - lo) <= 20) {
            var prefix = c.slice(0, c.length - lastDigit[1].length);
            for (var i = lo; i <= hi; i++) expanded.push(prefix + i);
            return;
          }
        }
      }
      expanded.push(c);
    });
    // Re-dedupe after expansion, preserve order
    seen = {};
    var final = [];
    expanded.forEach(function (c) { if (!seen[c]) { seen[c] = true; final.push(c); } });
    return final;
  }

  // ───── Context segmentation ────────────────────────────────────────────
  // We split the HTML into segments — table rows, paragraphs, list items —
  // and for each segment that contains at least one code, we capture:
  //   ord:            running index
  //   source_kind:    'table_row' | 'paragraph' | 'list_item'
  //   context:        plain text of the segment (capped at 400 chars)
  //   standards:      array of codes found in this segment
  //
  // Segments without codes are dropped from the lesson list but counted in
  // segment_count_total for reference.

  function segmentHtml(html) {
    if (!html) return [];
    var segments = [];
    // Tables → split into <tr>...</tr>; each row is a segment
    // Paragraphs → <p>...</p>
    // List items → <li>...</li>
    var rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    var pRe = /<p[^>]*>([\s\S]*?)<\/p>/g;
    var liRe = /<li[^>]*>([\s\S]*?)<\/li>/g;

    // Mark and remove tables first so their inner <p> tags don't get
    // double-counted as standalone paragraphs.
    var withoutTables = html.replace(/<table[^>]*>[\s\S]*?<\/table>/g, function (table) {
      var m;
      rowRe.lastIndex = 0;
      while ((m = rowRe.exec(table)) !== null) {
        var inner = m[1];
        var text = stripTags(inner);
        if (text) segments.push({ kind: 'table_row', html: inner, text: text });
      }
      return ''; // remove from the remaining stream
    });

    var withoutLists = withoutTables.replace(/<(ul|ol)[^>]*>[\s\S]*?<\/\1>/g, function (list) {
      var m;
      liRe.lastIndex = 0;
      while ((m = liRe.exec(list)) !== null) {
        var inner = m[1];
        var text = stripTags(inner);
        if (text) segments.push({ kind: 'list_item', html: inner, text: text });
      }
      return '';
    });

    var m;
    pRe.lastIndex = 0;
    while ((m = pRe.exec(withoutLists)) !== null) {
      var inner = m[1];
      var text = stripTags(inner);
      if (text) segments.push({ kind: 'paragraph', html: inner, text: text });
    }
    return segments;
  }

  function stripTags(html) {
    if (!html) return '';
    return String(html)
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ───── Top-level: html → JSON ─────────────────────────────────────────

  function parseHtmlToInventory(html, opts) {
    opts = opts || {};
    var segments = segmentHtml(html);
    var lessons = [];
    var allCodes = {};
    var rangesSeen = {};

    segments.forEach(function (seg, i) {
      var codes = extractCodesFromText(seg.text);
      if (!codes.length) return;
      codes.forEach(function (c) { allCodes[c] = true; });
      // Capture range source notation for the diagnostic field
      var rawRangeMatches = (seg.text.match(/[A-Z0-9\.\-]+\s*(?:[–—]|through|-)\s*\d+/gi) || []);
      rawRangeMatches.forEach(function (r) { rangesSeen[r] = true; });
      lessons.push({
        ord: lessons.length + 1,
        source_kind: seg.kind,
        context: seg.text.length > 400 ? seg.text.slice(0, 397) + '...' : seg.text,
        standards: codes
      });
    });

    return {
      source: opts.source || null,
      imported_at: opts.now || new Date().toISOString(),
      njsls_parser_version: '1.0.0',
      segment_count_total: segments.length,
      segment_count_with_codes: lessons.length,
      all_codes: Object.keys(allCodes).sort(),
      lessons: lessons,
      diagnostics: {
        range_notations_seen: Object.keys(rangesSeen).sort()
      }
    };
  }

  // ───── Public API ──────────────────────────────────────────────────────
  var api = {
    extractCodesFromText: extractCodesFromText,
    expandRange: expandRange,
    normalizeText: normalizeText,
    segmentHtml: segmentHtml,
    stripTags: stripTags,
    parseHtmlToInventory: parseHtmlToInventory
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.DocxImportParser = api;
  }
})(typeof window !== 'undefined' ? window : this);
