// texture_lessons_harness/docx_to_inventory.js
//
// Pure function. Takes HTML extracted from a Word doc (via mammoth) and
// returns an inventory JSON in the shape forge_app.html's scopeInventoryToScope
// expects.
//
// HEADER-AGNOSTIC. Does NOT require the column to be named "Lesson Content".
// Instead, for each <table> it scans every column and picks the one with the
// highest density of L#/Seminar tokens — that column is the lesson column,
// regardless of the header text. Other columns are used as context by
// left-to-right position relative to the lesson column.
//
// Detection priorities:
//   1. Tables containing L# patterns in cells.
//   2. If no tables OR no tables with L# patterns, fall back to a sequential
//      paragraph scan grouping L# blocks under their preceding heading.
//
// Pure function, harness-tested. xUnit Test Patterns (Meszaros, 2007).

(function (root) {
  'use strict';

  var parser;
  if (typeof require !== 'undefined') parser = require('./parser.js');
  else parser = root.TextureLessonsParser;

  var RX_ID = /(L\d+|Seminar)\s*[:\-]/;

  // ─── HTML parsing helpers (works in browser AND node via simple regex) ───
  // We avoid pulling in jsdom or cheerio so this module ships as-is in the
  // browser. Mammoth's HTML output is well-formed and predictable.

  function unhtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x([0-9a-f]+);/gi, function (_, h) { return String.fromCharCode(parseInt(h, 16)); })
      .replace(/&#(\d+);/g, function (_, d) { return String.fromCharCode(parseInt(d, 10)); });
  }

  function extractTables(html) {
    var tables = [];
    var rxTable = /<table[\s\S]*?<\/table>/gi;
    var m;
    while ((m = rxTable.exec(html)) !== null) {
      tables.push(m[0]);
    }
    return tables;
  }

  function extractRows(tableHtml) {
    var rows = [];
    var rxRow = /<tr[\s\S]*?<\/tr>/gi;
    var m;
    while ((m = rxRow.exec(tableHtml)) !== null) {
      rows.push(m[0]);
    }
    return rows;
  }

  function extractCells(rowHtml) {
    var cells = [];
    var rxCell = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi;
    var m;
    while ((m = rxCell.exec(rowHtml)) !== null) {
      cells.push(m[2]);
    }
    return cells;
  }

  function cellHasLesson(cellHtml) {
    return RX_ID.test(unhtml(cellHtml));
  }

  function isHeaderRow(rowHtml) {
    return /<th[\s>]/i.test(rowHtml);
  }

  // ─── Pick the lesson column for a single table ─────────────────
  // Score each column index by the count of cells containing L# patterns.
  // The column with the highest count is the lesson column. Tie-break by
  // longest average cell length.
  function pickLessonColumn(rows) {
    var bodyRows = rows.filter(function (r) { return !isHeaderRow(r); });
    if (bodyRows.length === 0) return -1;

    var colCount = 0;
    bodyRows.forEach(function (r) {
      var c = extractCells(r);
      if (c.length > colCount) colCount = c.length;
    });

    var counts = new Array(colCount).fill(0);
    var lengths = new Array(colCount).fill(0);
    bodyRows.forEach(function (r) {
      var cells = extractCells(r);
      cells.forEach(function (cell, i) {
        if (cellHasLesson(cell)) counts[i]++;
        lengths[i] += unhtml(cell).length;
      });
    });

    var maxCount = Math.max.apply(null, counts);
    if (maxCount === 0) return -1;
    // Find column index with maxCount, tie-break by length
    var bestIdx = -1;
    var bestLen = -1;
    counts.forEach(function (c, i) {
      if (c === maxCount && lengths[i] > bestLen) {
        bestIdx = i;
        bestLen = lengths[i];
      }
    });
    return bestIdx;
  }

  // ─── Heuristic column-role mapping ─────────────────────────────
  // Given the lesson column index and total column count, infer which
  // adjacent columns hold concept progression, topic, evidence, standards.
  // Default heuristic for the 8-column Big Dogs table:
  //   col[N-1] = standards (rightmost)
  //   col[N-2] = evidence
  //   col[lessonCol] = lesson content
  //   col[lessonCol-1] = topic
  //   col[lessonCol-2] = concept progression
  //   col[lessonCol-3] = act (numeric)
  // For tables of other widths, this degrades gracefully to whatever
  // columns exist.
  function inferColumnRoles(lessonCol, colCount) {
    return {
      orig:       Math.max(0, lessonCol - 5),
      num:        Math.max(0, lessonCol - 4),
      act:        Math.max(0, lessonCol - 3),
      cp:         Math.max(0, lessonCol - 2),
      topic:      Math.max(0, lessonCol - 1),
      lesson:     lessonCol,
      evidence:   Math.min(colCount - 1, lessonCol + 1),
      standards:  Math.min(colCount - 1, lessonCol + 2)
    };
  }

  // ─── Standard-code extraction ─────────────────────────────────
  function extractStandardCodes(raw) {
    if (!raw) return [];
    var t = raw.replace(/NONE\s*\(intro\)/gi, '')
               .replace(/\(.+?\)/g, '')
               .replace(/\*same day/gi, '')
               .replace(/\[([^\]]+)\]/g, '$1');
    var rough = t.split(/[,\s;]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    var out = [];
    rough.forEach(function (code) {
      // Patch doubled-code cases like "3-LS3-1MS-LS4-4"
      var matches = code.match(/(?:[A-Z\d.]+(?:-[A-Z\d.]+)*)/g) || [code];
      // Split tokens like "3-LS3-1MS-LS4-4" into ["3-LS3-1","MS-LS4-4"]
      matches.forEach(function (mm) {
        // Use regex to detect transition from digit-block to letter-block
        var sub = mm.match(/(?:[A-Z]+-LS[3-4]-\d+)|(?:\d-LS\d-\d+)|(?:\d\.[A-Z]+(?:\.[A-Z])?\.\d+)|(?:[A-Z]+\.[A-Z]+\.\d+\.\d+)|(?:[A-Z]+\.\d+\.\d+)|(?:\d\.[A-Z]+\.\d+)/g);
        if (sub && sub.length > 1) {
          sub.forEach(function (s) { out.push(s); });
        } else {
          out.push(mm);
        }
      });
    });
    // Filter to plausible NJSLS/NGSS codes
    return out.filter(function (s) {
      return /^[A-Z\d.\-]+$/.test(s) && /[A-Z]/.test(s) && /\d/.test(s) && s.length >= 3;
    });
  }

  // ─── Build inventory from a single table ──────────────────────
  function inventoryFromTable(tableHtml) {
    var rows = extractRows(tableHtml);
    if (rows.length === 0) return null;

    var lessonCol = pickLessonColumn(rows);
    if (lessonCol < 0) return null;

    var bodyRows = rows.filter(function (r) { return !isHeaderRow(r); });
    var colCount = 0;
    bodyRows.forEach(function (r) {
      var c = extractCells(r);
      if (c.length > colCount) colCount = c.length;
    });

    var roles = inferColumnRoles(lessonCol, colCount);

    var conceptDays = [];
    var lessons = [];
    var lessonOrd = 0;
    var conceptDayOrd = 0;

    bodyRows.forEach(function (rowHtml, rowIdx) {
      var cells = extractCells(rowHtml).map(unhtml).map(function (c) {
        return c.replace(/\s+/g, ' ').trim();
      });

      if (cells.every(function (c) { return !c; })) return; // empty row

      var actCell = cells[roles.act] || '';
      var cpCell = cells[roles.cp] || '';
      var topicCell = cells[roles.topic] || '';
      var lessonCell = cells[roles.lesson] || '';
      var evidenceCell = cells[roles.evidence] || '';
      var standardsCell = cells[roles.standards] || '';

      var act = parseInt(actCell.replace(/[^\d]/g, ''), 10) || null;

      // Parse the lesson cell via the harness parser
      var parsed = parser.parseLessonContent(lessonCell);

      // If the row has neither lessons NOR a meaningful concept progression,
      // skip it (likely a continuation or markup-only row).
      if (parsed.lessons.length === 0 && !cpCell && !lessonCell) return;

      conceptDayOrd++;
      var standardCodes = extractStandardCodes(standardsCell);

      conceptDays.push({
        ord: conceptDayOrd,
        act: act,
        concept_progression: cpCell,
        topic: topicCell,
        evidence_drives_at: evidenceCell,
        standards: standardCodes,
        standards_raw: standardsCell,
        parsed_lesson_groups: parsed.groups.length,
        child_lesson_count: Math.max(1, parsed.lessons.length)
      });

      if (parsed.lessons.length === 0) {
        lessonOrd++;
        lessons.push({
          lesson_ord: lessonOrd,
          concept_day_ord: conceptDayOrd,
          act: act,
          sub: null,
          title: cpCell || lessonCell || ('Lesson ' + lessonOrd),
          doc_text: '(no L# subdivision in this cell; concept day = the lesson)',
          standards_inherited: standardCodes.slice()
        });
      } else {
        parsed.lessons.forEach(function (L) {
          lessonOrd++;
          lessons.push({
            lesson_ord: lessonOrd,
            concept_day_ord: conceptDayOrd,
            act: act,
            sub: L.id,
            title: L.title,
            doc_text: L.id + ': ' + L.title,
            standards_inherited: standardCodes.slice()
          });
        });
      }
    });

    return { conceptDays: conceptDays, lessons: lessons, lessonColumnIndex: lessonCol };
  }

  // ─── Sequential paragraph fallback ─────────────────────────────
  // When no tables (or no tables with L# patterns) are found, walk the
  // HTML's headings and paragraphs in order. Group consecutive L# entries
  // under the preceding heading.
  function inventoryFromParagraphs(html) {
    var parts = html.split(/(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)/i);
    var currentHeading = '';
    var conceptDays = [];
    var lessons = [];
    var lessonOrd = 0;
    var conceptDayOrd = 0;

    parts.forEach(function (chunk) {
      if (/^<h[1-6]/.test(chunk)) {
        currentHeading = unhtml(chunk).trim();
        return;
      }
      var text = unhtml(chunk);
      if (!RX_ID.test(text)) return;
      var parsed = parser.parseLessonContent(text);
      if (parsed.lessons.length === 0) return;
      conceptDayOrd++;
      conceptDays.push({
        ord: conceptDayOrd,
        act: null,
        concept_progression: currentHeading,
        topic: '',
        evidence_drives_at: '',
        standards: [],
        standards_raw: '',
        parsed_lesson_groups: parsed.groups.length,
        child_lesson_count: parsed.lessons.length
      });
      parsed.lessons.forEach(function (L) {
        lessonOrd++;
        lessons.push({
          lesson_ord: lessonOrd,
          concept_day_ord: conceptDayOrd,
          act: null,
          sub: L.id,
          title: L.title,
          doc_text: L.id + ': ' + L.title,
          standards_inherited: []
        });
      });
    });

    return { conceptDays: conceptDays, lessons: lessons, lessonColumnIndex: null };
  }

  // ─── Top-level: pick the best source in the HTML ──────────────
  function htmlToInventory(html, opts) {
    opts = opts || {};
    var tables = extractTables(html);

    // Score each table by lesson-cell count
    var best = null;
    tables.forEach(function (t) {
      var rows = extractRows(t);
      var col = pickLessonColumn(rows);
      if (col < 0) return;
      var bodyRows = rows.filter(function (r) { return !isHeaderRow(r); });
      var lessonCells = 0;
      bodyRows.forEach(function (r) {
        var cells = extractCells(r);
        if (cells[col] && cellHasLesson(cells[col])) lessonCells++;
      });
      if (!best || lessonCells > best.score) {
        best = { table: t, score: lessonCells, lessonCol: col };
      }
    });

    var result;
    if (best && best.score > 0) {
      result = inventoryFromTable(best.table);
      result.detection_mode = 'table';
      result.tables_scanned = tables.length;
      result.lesson_column_index = best.lessonCol;
      result.lesson_cells_in_winning_table = best.score;
    } else {
      result = inventoryFromParagraphs(html);
      result.detection_mode = 'paragraphs';
      result.tables_scanned = tables.length;
    }

    var allCodes = {};
    result.conceptDays.forEach(function (cd) {
      cd.standards.forEach(function (c) { allCodes[c] = true; });
    });
    var allCodesSorted = Object.keys(allCodes).sort();

    return {
      audit_input_meta: {
        source: opts.source || '(uploaded docx)',
        source_extracted_at: new Date().toISOString().slice(0, 10),
        converter: 'texture_lessons_harness/docx_to_inventory.js',
        converter_version: 'v1 (header-agnostic; lesson column picked by L# density)',
        detection_mode: result.detection_mode,
        tables_scanned: result.tables_scanned,
        lesson_column_index: result.lesson_column_index != null ? result.lesson_column_index : null,
        lesson_cells_in_winning_table: result.lesson_cells_in_winning_table || null
      },
      challenge: opts.challenge || {
        title: '',
        partner: '',
        cohort: '',
        cohort_doc_text: '',
        authentic_impact: ''
      },
      acts: opts.acts || [],
      concept_days_total: result.conceptDays.length,
      concept_days: result.conceptDays,
      lessons_total: result.lessons.length,
      lessons: result.lessons,
      all_njsls_codes_tagged_unique_sorted: allCodesSorted,
      all_njsls_codes_tagged_unique_sorted_count: allCodesSorted.length
    };
  }

  var api = {
    htmlToInventory: htmlToInventory,
    extractTables: extractTables,
    extractRows: extractRows,
    extractCells: extractCells,
    pickLessonColumn: pickLessonColumn,
    cellHasLesson: cellHasLesson,
    inferColumnRoles: inferColumnRoles,
    extractStandardCodes: extractStandardCodes,
    unhtml: unhtml
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DocxToInventory = api;
})(typeof window !== 'undefined' ? window : this);
