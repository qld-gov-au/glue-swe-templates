/*global */
(function ($) {
  'use strict';

  var qgSocialMedia = {
    config: {
      $twitterEl: $('.qg-twitter-updates'),
      $facebookEl: $('.qg-facebook-updates'),
    },
    init: function () {
      let twitterSdkScript = 'platform.twitter.com/widgets.js';
      let facebookSdkScript = 'connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8';
      if (this.config.$twitterEl.length > 0 && $('script[src*="' + twitterSdkScript + '"]').length <= 0) {
        this.loadScript('script', 'twitter-wjs', twitterSdkScript);
      }
      if (this.config.$facebookEl.length > 0 && $('script[src*="' + facebookSdkScript + '"]').length <= 0) {
        var fbUrl = this.config.$facebookEl.attr('data-href');
        var fbhtml = '<div class="fb-page" data-href="' + fbUrl + '" data-tabs="timeline" data-small-header="true" data-width="10000"  data-adapt-container-width="true" data-show-facepile="false"></div>';
        this.config.$facebookEl.append(fbhtml);
        this.loadScript('script', 'facebook-wjs', facebookSdkScript);
      }
    },
    loadScript: function (tag, id, sdkUrl) {
      var createEl;
      var fjs = document.getElementsByTagName(tag)[0];
      var p = /^http:/.test(document.location) ? 'http' : 'https';
      if (!document.getElementById(id)) {
        createEl = document.createElement(tag);
        createEl.id = id;
        createEl.src = `${p}://${sdkUrl}`;
        fjs.parentNode.insertBefore(createEl, fjs);
      }
    },
  };
  qgSocialMedia.init();
}(jQuery));

