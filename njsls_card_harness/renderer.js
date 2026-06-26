// njsls_card_renderer — turns a window.NJSLS_STANDARDS[code] record into a
// structured {header, sections, footer} the popover renders.
//
// Pure function. No DOM API. Runs in Node (for the harness) and in the
// browser (when inlined into forge_app.html). Tested under xUnit Test Patterns
// discipline (Meszaros, 2007) — see harness.js.
//
// Output schema (every renderer call returns this shape):
//
//   {
//     header: { code, grade, subject, subjectLabel, classification },
//                                 // classification: anchor / cluster / disciplinary_concept / discipline
//     sections: [
//       { label: 'Statement', kind: 'prose', text: '...' },
//       { label: 'Sub-bullets', kind: 'bullets', items: ['...', ...] },
//       { label: 'Domain', kind: 'prose', text: '...' },
//       { label: 'NGSS dimensions', kind: 'ngss', sep: [...], dci: [...], ccc: [...] },
//       ...
//     ],
//     footer: { source }
//   }
//
// The DOM layer renders the sections in order. Each kind has a fixed HTML
// template, so adding fields here cannot break unrelated subject families.

(function (root) {
  'use strict';

  var SUBJECT_LABELS = {
    ela: 'English Language Arts',
    math: 'Mathematics',
    science: 'Science',
    social_studies: 'Social Studies',
    csdt: 'Computer Science & Design Thinking',
    clks: 'Career & Life Literacies',
    chpe: 'Health & Physical Education'
  };

  function subjLabel(s) { return SUBJECT_LABELS[s] || s || ''; }

  // ───── Header builder ────────────────────────────────────────────────
  // Classification = the most specific tag the record carries. Each family
  // names it differently. We pick the first non-empty in priority order so
  // the header chip is always populated when the data supports it.
  function buildHeader(rec) {
    var classification = rec.anchor || rec.cluster || rec.disciplinary_concept || rec.standard || rec.discipline || '';
    return {
      code: rec.code || '',
      grade: rec.grade ? 'Grade ' + rec.grade : '',
      subject: rec.subject || '',
      subjectLabel: subjLabel(rec.subject),
      classification: classification
    };
  }

  // ───── Section builders ──────────────────────────────────────────────

  function sectionStatement(rec) {
    var text = rec.statement || '';
    if (!text) return null;
    return { label: 'Statement', kind: 'prose', text: text };
  }

  function sectionSubs(rec) {
    var subs = rec.subs;
    if (!subs || !subs.length) return null;
    return { label: 'Sub-bullets', kind: 'bullets', items: subs.slice() };
  }

  function sectionDomain(rec) {
    // ELA 'domain' (e.g., "Reading Domain"), Math 'domain' (e.g., "6.RP - Ratios..."),
    // Science 'topic' (e.g., "MS-LS4 - Biological Evolution") or 'discipline'
    // (e.g., "Life Sciences"). Pick the most informative non-empty.
    var domain = rec.domain || rec.topic || rec.discipline || '';
    if (!domain) return null;
    var labelText = rec.subject === 'science' && rec.topic ? 'Topic' : 'Domain';
    return { label: labelText, kind: 'prose', text: domain };
  }

  function sectionClassification(rec) {
    // ELA anchor, Math cluster, CSDT/CLKS/CHPE disciplinary_concept,
    // Social Studies standard/sub_concept. Only render if it would add
    // information beyond what's already in the header classification.
    var bits = [];
    if (rec.anchor && rec.anchor !== rec.domain) bits.push({ label: 'Anchor', value: rec.anchor });
    if (rec.cluster && rec.cluster !== rec.domain) bits.push({ label: 'Cluster', value: rec.cluster });
    if (rec.disciplinary_concept) bits.push({ label: 'Disciplinary concept', value: rec.disciplinary_concept });
    if (rec.standard) bits.push({ label: 'Standard', value: rec.standard });
    if (rec.sub_concept) bits.push({ label: 'Sub-concept', value: rec.sub_concept });
    if (rec.discipline && rec.subject !== 'science') bits.push({ label: 'Discipline', value: rec.discipline });
    if (!bits.length) return null;
    return { label: 'Classification', kind: 'fields', items: bits };
  }

  function sectionCoreIdea(rec) {
    if (!rec.core_idea) return null;
    return { label: 'Core idea', kind: 'prose', text: rec.core_idea };
  }

  function sectionEra(rec) {
    // Social Studies grades 6-8 carry an 'era' and 'era_summary'. Surface them
    // together so the historical context is visible at a glance.
    if (!rec.era && !rec.era_summary) return null;
    return {
      label: 'Era',
      kind: 'era',
      era: rec.era || '',
      summary: rec.era_summary || ''
    };
  }

  function sectionClarification(rec) {
    if (!rec.clarification) return null;
    return { label: 'Clarification', kind: 'prose', text: rec.clarification };
  }

  function sectionAssessmentBoundary(rec) {
    if (!rec.assessment_boundary) return null;
    return { label: 'Assessment boundary', kind: 'prose', text: rec.assessment_boundary };
  }

  // ───── NGSS three-dimensional sections (schema 1.1) ─────────────────
  // For science PEs only. Quotes verbatim from .sep_practices / .dci_codes /
  // .ccc_concepts arrays (compact lists) and from .seps / .dcis / .cccs
  // arrays (detailed entries with bullets).

  function sectionNgssDimensions(rec) {
    if (rec.subject !== 'science') return null;
    var hasFlat = (rec.sep_practices && rec.sep_practices.length) ||
                  (rec.dci_codes && rec.dci_codes.length) ||
                  (rec.ccc_concepts && rec.ccc_concepts.length);
    if (!hasFlat) return null;
    return {
      label: 'NGSS three-dimensional tagging',
      kind: 'ngss_dims',
      sep_practices: (rec.sep_practices || []).slice(),
      dci_codes: (rec.dci_codes || []).slice(),
      ccc_concepts: (rec.ccc_concepts || []).slice()
    };
  }

  function sectionNgssDetail(rec) {
    if (rec.subject !== 'science') return null;
    var hasDetail = (rec.seps && rec.seps.length) ||
                    (rec.dcis && rec.dcis.length) ||
                    (rec.cccs && rec.cccs.length);
    if (!hasDetail) return null;
    return {
      label: 'NGSS detail',
      kind: 'ngss_detail',
      seps: (rec.seps || []).map(function (s) {
        return { practice: s.practice || '', bullets: (s.bullets || []).slice() };
      }),
      dcis: (rec.dcis || []).map(function (d) {
        return { code: d.code || '', name: d.name || '', bullets: (d.bullets || []).slice() };
      }),
      cccs: (rec.cccs || []).map(function (c) {
        return { concept: c.concept || '', bullets: (c.bullets || []).slice() };
      })
    };
  }

  // ───── Top-level: record → structured card ──────────────────────────
  // Builders run in the order they should render. Null sections drop out.

  function renderStandardCard(rec) {
    if (!rec) return null;
    var allBuilders = [
      sectionStatement,
      sectionSubs,
      sectionDomain,
      sectionClassification,
      sectionCoreIdea,
      sectionEra,
      sectionClarification,
      sectionAssessmentBoundary,
      sectionNgssDimensions,
      sectionNgssDetail
    ];
    var sections = allBuilders
      .map(function (fn) { return fn(rec); })
      .filter(function (s) { return s !== null; });
    return {
      header: buildHeader(rec),
      sections: sections,
      footer: {
        source: '2023/2020 New Jersey Student Learning Standards · NJ Department of Education'
      }
    };
  }

  // ───── Public API ────────────────────────────────────────────────────
  var api = {
    renderStandardCard: renderStandardCard,
    subjLabel: subjLabel
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NjslsCardRenderer = api;
})(typeof window !== 'undefined' ? window : this);
