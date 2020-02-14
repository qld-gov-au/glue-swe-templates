/*globals qg*/
/*
* Utility to handle ajax calls
* Usage: swe.ajaxCall('https://www.google.com/recaptcha/api.js', 'script', onloadRecaptcha, 'Recaptcha unavailable');
* */
(function ($, swe) {
  swe.ajaxCall = (url, dataType, callback, errorMsg) => {
    $.ajax({
      url: url,
      dataType: dataType,
      crossDomain: true,
      success: callback,
      error: () => {
        console.log(errorMsg);
      },
    });
  };
}(jQuery, qg.swe));
