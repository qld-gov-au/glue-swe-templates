/*globals qg*/

(function ($, swe) {
  /**
   * Gets parameter value
   * @param {string} name - parameter name
   * @param {string} url - url where searching needs to be performed
   * @returns {*} - returns the parameter value
   */
  swe.getParameterByName = (name, url) => {
    if (name == null) return false;
    if (!url) url = window.location.href;
    name = name.replace(/[\\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results || !results[2]) return false;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  (function () {
    $('.qg-index-item').each(function () {
      if ($(this).find('img').length <= 0) {
        $(this).addClass('content-only');
      }
    });
  })();
}(jQuery, qg.swe));