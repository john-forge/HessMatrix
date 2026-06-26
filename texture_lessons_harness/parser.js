// texture_lessons_harness/parser.js
//
// Pure function. Parses the raw text of a "Lesson Content" cell from the
// Scope and Sequence tab into a structured representation.
//
// Cell shapes observed in the source doc (1xXm4j5bwzFRcI019pSRXc_0ikvAEDhQKiK08CoPuUUU):
//
//   1. Empty cell                  → no lessons (concept day = the lesson)
//   2. Single L1                   → one lesson
//   3. Sequential L1..Ln           → n lessons in one group
//   4. Doubled L1..L3 sets         → two groups in one cell (e.g., abstract then concrete datasets)
//   5. L1- dash notation           → same as L1: colon notation
//   6. Run-on inline               → "L1: title L2: title" with no break between
//   7. Named "Seminar:" embedded   → a non-L# identifier mixed in with L1, L2
//   8. Marker row text only        → "1st St Huberts Visit" style; no L# tokens
//
// Output schema:
//
//   {
//     lessons: [ { id: "L1" | "Seminar", title: "..." }, ... ],
//     groups:  [ [ {...}, {...} ], [ {...} ] ],   // grouping by L1 restarts
//     has_multiple_groups: bool,
//     marker_text: string | null                  // raw text if no L# tokens
//   }
//
// xUnit Test Patterns (Meszaros, 2007) discipline. The function is pure so
// the harness can do Four-Phase Test (setup → exercise → verify → no teardown)
// and Recorded Test (regenerate expected.json with --record).

(function (root) {
  'use strict';

  // Identifier regex: L<digits> or Seminar, followed by : or -, optional spaces.
  // NO word boundary on the left — the source doc has inline run-ons like
  // "conclusionL2: ..." where the title of L1 butts directly against L2's
  // label without whitespace. The colon-or-dash requirement guards us
  // against false positives from random letters.
  var RX_ID = /(L\d+|Seminar)\s*[:\-]\s*/g;

  function normalizeText(raw) {
    if (raw == null) return '';
    var s = String(raw);
    // Google Doc HTML-entity-encoded newlines that survive markdown export
    s = s.replace(/  &#10;/g, '\n').replace(/&#10;/g, '\n');
    // Tab-and-multi-space runs collapse to single space; newlines preserved
    s = s.replace(/[ \t]+/g, ' ');
    return s.trim();
  }

  function parseLessonContent(rawText) {
    var text = normalizeText(rawText);
    if (!text) {
      return {
        lessons: [],
        groups: [[]],
        has_multiple_groups: false,
        marker_text: null
      };
    }

    // Find every L#/Seminar token position
    RX_ID.lastIndex = 0;
    var matches = [];
    var m;
    while ((m = RX_ID.exec(text)) !== null) {
      matches.push({ id: m[1], start: m.index, end: m.index + m[0].length });
    }

    // No L# tokens → it's a marker row or note. Return marker_text.
    if (matches.length === 0) {
      return {
        lessons: [],
        groups: [[]],
        has_multiple_groups: false,
        marker_text: text
      };
    }

    // Slice the text between matches into lesson titles.
    // The title for matches[i] runs from matches[i].end to matches[i+1].start
    // (or to end-of-string for the last match).
    var entries = matches.map(function (mm, i) {
      var titleEnd = (i + 1 < matches.length) ? matches[i + 1].start : text.length;
      var title = text.slice(mm.end, titleEnd).trim();
      // Strip trailing punctuation noise that often dangles from the cell export
      title = title.replace(/\s+$/, '').replace(/[\s\n]+/g, ' ');
      return { id: mm.id, title: title };
    });

    // Group detection: when L1 appears AFTER any prior entry, that's a new group.
    // Seminar never starts a new group.
    var groups = [[]];
    entries.forEach(function (e) {
      var n = e.id === 'Seminar' ? null : parseInt(e.id.slice(1), 10);
      var lastGroup = groups[groups.length - 1];
      if (lastGroup.length > 0 && n === 1) {
        groups.push([e]);
      } else {
        lastGroup.push(e);
      }
    });

    return {
      lessons: entries,
      groups: groups,
      has_multiple_groups: groups.length > 1,
      marker_text: null
    };
  }

  var api = {
    parseLessonContent: parseLessonContent,
    normalizeText: normalizeText
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TextureLessonsParser = api;
})(typeof window !== 'undefined' ? window : this);
