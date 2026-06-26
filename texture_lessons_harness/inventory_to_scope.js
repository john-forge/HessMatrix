// texture_lessons_harness/inventory_to_scope.js
//
// Pure function. Converts a lesson inventory (e.g., bigdogs_lesson_inventory.json)
// into the workbench's scope shape so the existing linter, calendar, and refine
// UIs all work unchanged.
//
// Detection rule: an inventory has `concept_days[]` and `lessons[]` arrays at
// the top level and does NOT have `pins[]`. A scope has `pins[]` and does not
// have `concept_days[]` or `lessons[]`. The detector errs on the side of
// treating ambiguous input as a scope (the existing path).
//
// Conversion rule (verbatim, additive — scope schema extended, not replaced):
//
//   inventory.acts[i]        → scope.pins[i]                      (one pin per act)
//   inventory.concept_days[] → scope.pins[i].subUnits[j]          (filtered by act)
//   inventory.lessons[]      → scope.pins[i].subUnits[j].sessions (filtered by concept_day_ord)
//
// Round-trip preservation: the original inventory is attached to scope.inventory
// (additive field) so the inventory shape survives a paste/render cycle and can
// be re-exported.
//
// xUnit discipline (Meszaros, 2007): pure function, deterministic, harness-tested.

(function (root) {
  'use strict';

  function looksLikeInventory(obj) {
    if (!obj || typeof obj !== 'object') return false;
    if (Array.isArray(obj.pins)) return false;        // already a scope
    if (!Array.isArray(obj.concept_days)) return false;
    if (!Array.isArray(obj.lessons)) return false;
    return true;
  }

  function slugify(s) {
    return String(s || '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'challenge';
  }

  // Map an inventory cohort string ("Juniors G5/G6", "Cohort 5/6") to the
  // workbench's cohort vocabulary. Default to "juniors" for 5/6, "seniors"
  // for 7/8, "shared" otherwise. The grades array is set from in_scope_band
  // or inferred from the cohort string.
  function cohortFromInventory(inv) {
    var raw = (inv.challenge && (inv.challenge.cohort_doc_text || inv.challenge.cohort)) || '';
    var lower = String(raw).toLowerCase();
    if (lower.indexOf('5/6') >= 0 || lower.indexOf('juniors') >= 0) {
      return { cohort: 'juniors', grades: ['G5', 'G6'], track: '5-6' };
    }
    if (lower.indexOf('7/8') >= 0 || lower.indexOf('seniors') >= 0) {
      return { cohort: 'seniors', grades: ['G7', 'G8'], track: '7-8' };
    }
    return { cohort: 'shared', grades: ['G5', 'G6', 'G7', 'G8'], track: 'ALL' };
  }

  function inventoryToScope(inv) {
    if (!looksLikeInventory(inv)) {
      throw new Error('inventoryToScope: input does not look like an inventory');
    }

    var ch = inv.challenge || {};
    var challengeId = slugify(ch.title) + '-' + slugify(ch.partner || 'partner');
    var cInfo = cohortFromInventory(inv);

    // Index concept_days and lessons for lookup
    var conceptDaysByAct = {};
    (inv.concept_days || []).forEach(function (cd) {
      var a = cd.act;
      if (!conceptDaysByAct[a]) conceptDaysByAct[a] = [];
      conceptDaysByAct[a].push(cd);
    });

    var lessonsByConceptDay = {};
    (inv.lessons || []).forEach(function (L) {
      var ord = L.concept_day_ord;
      if (!lessonsByConceptDay[ord]) lessonsByConceptDay[ord] = [];
      lessonsByConceptDay[ord].push(L);
    });

    // Build pins (one per act, in inventory.acts order)
    var pins = (inv.acts || []).map(function (act) {
      var actDays = (conceptDaysByAct[act.act] || []).sort(function (a, b) {
        return a.ord - b.ord;
      });

      var subUnits = actDays.map(function (cd) {
        var conceptLessons = (lessonsByConceptDay[cd.ord] || []).sort(function (a, b) {
          return a.lesson_ord - b.lesson_ord;
        });

        var sessions = conceptLessons.map(function (L) {
          var sid = 'L' + L.lesson_ord;
          return {
            id: sid,
            title: L.title || '',
            lessonObjective: cd.evidence_drives_at || '',
            description: (cd.concept_progression ? cd.concept_progression + '. ' : '') +
                         (cd.topic ? 'Topic: ' + cd.topic + '. ' : '') +
                         (L.sub ? 'Lesson position: ' + L.sub + '.' : ''),
            standards: (L.standards_inherited || []).slice(),
            standardsRole: 'apply',           // safe default; linter expects this field
            cohort: cInfo.cohort,
            grades: cInfo.grades.slice(),
            track: cInfo.track,
            week: null,                       // calendar staging will assign
            dayOfWeek: null,
            durationMinutes: null,
            // Round-trip preservation: carry the inventory pointers so the
            // converter is reversible and the lesson list panel can re-render.
            inventoryRef: {
              lesson_ord: L.lesson_ord,
              concept_day_ord: L.concept_day_ord,
              act: L.act,
              sub: L.sub || null,
              doc_text: L.doc_text || null,
              doc_pacing_note: L.doc_pacing_note || null
            }
          };
        });

        return {
          id: 'CD' + cd.ord,
          name: cd.concept_progression || ('Concept Day ' + cd.ord),
          topic: cd.topic || '',
          evidenceDrivesAt: cd.evidence_drives_at || '',
          standardsAtConceptLevel: (cd.standards || []).slice(),
          standardsRaw: cd.standards_raw || '',
          conceptDayOrd: cd.ord,
          childLessonCount: cd.child_lesson_count || sessions.length,
          sessions: sessions
        };
      });

      return {
        id: 'A' + act.act,
        name: 'Act ' + act.act + '. ' + (act.title || ''),
        coreQuestion: act.core_question || '',
        evidenceProduced: act.evidence_produced || '',
        actOrd: act.act,
        subUnits: subUnits
      };
    });

    return {
      challenge: {
        challengeId: challengeId,
        title: ch.title || '',
        partner: ch.partner || '',
        cohort: cInfo.cohort,
        cohortDocText: ch.cohort_doc_text || '',
        authenticImpact: ch.authentic_impact || '',
        inScopeBand: ch.in_scope_band || null
      },
      pins: pins,
      // Additive extensions (preserve the inventory shape for round-tripping)
      inventory: {
        sourceDocument: (inv.audit_input_meta && inv.audit_input_meta.source_document) || null,
        sourceExtractedAt: (inv.audit_input_meta && inv.audit_input_meta.source_extracted_at) || null,
        conceptDaysTotal: inv.concept_days_total || (inv.concept_days || []).length,
        lessonsTotal: inv.lessons_total || (inv.lessons || []).length,
        allCodesTagged: (inv.all_njsls_codes_tagged_unique_sorted || []).slice(),
        ghostsAndDrift: (inv.ghosts_and_notation_drift_known || []).slice(),
        untaggedRows: (inv.untagged_act6_rows_from_upper_table || []).slice()
      }
    };
  }

  var api = {
    looksLikeInventory: looksLikeInventory,
    inventoryToScope: inventoryToScope,
    cohortFromInventory: cohortFromInventory
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.InventoryToScope = api;
})(typeof window !== 'undefined' ? window : this);
