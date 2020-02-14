/**
 * Figures
 *
 * Show/hide credits for figures
 *
 * @requires jQuery
 */

$(() => {
  'use strict';

  var figureElement = '.qg-cut-in, .qg-cut-in-alt';
  $('#qg-content .figure-credits-toggle').on('click', function () {
    $(this).closest(figureElement).find('.figure-credits').toggle(500).focus().end();
  });
});
