/* ========================================================================
* Set element to parent width
* [TODO: Write about what this is for, to make it easier for future
* developers to know what to put into it, and what not to.]
* ======================================================================== */

'use strict';

// FIX ME: Reports linting error as it's defined as a module, but never used
//If this is not in use then we can can delete?
var parentWidth = (function ($) {
  var $target = $('*[data-parent-width=true], *[data-parent-width=1]');
  $target.outerWidth($target.parent().width());
})(jQuery);

module.exports = parentWidth;
