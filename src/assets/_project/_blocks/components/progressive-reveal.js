/**
 ************************
 ** Progressive Reveal **
 ************************
 *
 * Version: 1.2
 * Developed by: Nimrod Evans for DSITIA > OSSIO
 *
 * A progressive reveal function to show the next form element once a previous element has been selected.
 * Designed for forms, though technically it will work on any element.
 *
 * Requires:
 * - JQuery
 *
 * How to use:
 * ===========
 * Attach the following classes / attributes to your objects:
 * data-qg-pr - Set on the trgr element for revealing the next section to activate progressive reveal
 * data-target - On the trgr, the target for the reveal action (eg. ".option2")
 *
 * Optional:
 * data-parent - On the trgr, sets the group this trgr belongs to for toggling other elements on/off
 * data-qg-pr-parent - On the parent group object, defines the parent / group element instead of using 'data-parent' on each trgr
 *
 * Version Control:
 * ================
 * 1.2    - 10/1 -Re-factored, modularised, closure, changed class requirements to data targets (as they do not add styling),
 *          added QG prefix, removed button custom functionality.
 * 1.1    - 29/4 - Added 'NOT' functionality, hack fix 'stutter' on init
 * 1.0.1  - 28/4 - Fixed minor bugs for robustness
 * 1.0    - First full version
**/

'use strict';

(function () {
  const defaultSettings = {
    toggle: 'false',
    hideOthers: 'true',
  };
  const settingsAttr = {
    toggle: 'data-toggle',
    hideOthers: 'data-hide-others',
  };
  // For parent / group
  const parentAttr = 'data-qg-pr-parent'; // Optional
  // For trigger
  const trgrAttr = 'data-qg-pr';
  const trgrTargetAttr = 'data-target';
  const trgrParentAttr = 'data-parent'; // Optional
  const trgrActiveDataName = 'qgProgressiveRevealActive';

  function saveAttr (target, $parent, setting) {
    const aVal = settingsAttr[setting];

    if (!$(target).attr(aVal)) {
      if ($parent.attr(aVal)) {
        $(target).attr(aVal, $parent.attr(aVal));
      } else {
        $(target).attr(aVal, defaultSettings[setting]);
      }
    }
  }

  function handleNonActiveElements (trgr, $parent) {
    if ($(trgr).attr(settingsAttr.hideOthers) !== 'false') {
      $parent.find(`*[${trgrAttr}]`).each(function () {
        if ($(this).data(trgrActiveDataName) !== true && $($(this).attr(trgrTargetAttr)).is(':visible')) {
          $($(this).attr(trgrTargetAttr)).slideUp();
        }
      });
    }
  }

  // Set up targets
  $(`*[${trgrAttr}]`).each(function () {
    // Find parent
    let $parent = $('body');
    if (!$(this).attr(trgrParentAttr) && $($(this).attr(trgrTargetAttr)).closest(`*[${parentAttr}]`)) {
      $(this).attr(trgrParentAttr, `*[${parentAttr}]`);
    }
    $parent = $(this).closest($(this).attr(trgrParentAttr));
    // Save settings
    saveAttr(this, $parent, 'toggle');
    saveAttr(this, $parent, 'hideOthers');
  });

  // Trigger action
  $(`*[${trgrAttr}]`).on('click', function () {
    // Set target (should reduce file size)
    const $tgt = $($(this).attr(trgrTargetAttr));

    $(this).data(trgrActiveDataName, true);
    $(this).toggleClass('toggle-active');

    // Handle other active elements
    if ($(this).attr(trgrParentAttr)) {
      const $parent = $(this).closest($(this).attr(trgrParentAttr));
      if ($parent.length) {
        handleNonActiveElements(this, $parent);
      }
    }
    // Handle this element action
    if ($(this).attr(settingsAttr.toggle) === 'true') {
      $tgt.slideToggle();
    } else if (!$tgt.is(':visible')) {
      $tgt.slideDown();
    }

    $(this).removeData(trgrActiveDataName);
  });
}());
