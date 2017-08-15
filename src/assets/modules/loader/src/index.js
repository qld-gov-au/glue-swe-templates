/* plugins to have a better cross compatible loading script in a more robust way from IE7+ onwards, if the support for IE7 and IE8 is discontinued at some point then promise based custom script can be used with some polyfills to support IE9+.*/
import loadJS from './lib/script.js';
import { loadCSS } from './lib/loadCSS.js';

/*modules dynamic loading process v1-

* Create a object with the identifier, js and css(if any) to load files dynamically
* Currently it supports loading max of 4 js files async in sequence and 1 css file per module

* */

const buildPath = '/assets/v3/modules/';

const mapTo = {
  slider: {
    identifier: 'qg-slider',
    css: `${buildPath}slider/styles/slider.css`,
    js: [`${buildPath}slider/slider.bundle.js`],
  },
  feeds: {
    identifier: 'qg-social-feed',
    js: [`${buildPath}social-feed/social-feed.bundle.js`],
  },
  quickExit: {
    identifier: '#qg-quick-exit',
    css: `${buildPath}misc/includes/quick-exit/quick-exit.css`,
    js: [`${buildPath}misc/includes/quick-exit/quick-exit.js`],
  },
  pagination: {
    identifier: '.pagination',
    css: `${buildPath}pagination/styles/pagination.css`,
    js: [`${buildPath}pagination/pagination.bundle.js`],
  },
  data: {
    identifier: '#data-url',
    css: '',
    js: ['/assets/v3/lib/ext/jquery.jsonp.js',`${buildPath}data/data.bundle.js`],
  },
};

var modulesLoader = (function ($) {
  function dynamicLoading () {
    $.each(mapTo, function (key, value) {
      function handleJs () {
          //TODO - Any number of files in sequence
        loadJS(value.js[0], function () {
          if (value.js[1]) {
            loadJS(value.js[1], function () {
              if (value.js[2]) {
                loadJS(value.js[2], function () {
                  if (value.js[3]) { loadJS(value.js[3]); }
                });
              }
            });
          }
        });
      }
      if ($(value.identifier).length > 0 || $("[data-role='" + value.identifier + "']").length > 0) {
        if (value.css) {
          let stylesheet = loadCSS(value.css);
          onloadCSS(stylesheet, function () { handleJs(); });
        } else {
          handleJs();
        }
      }
    });
  }

  function onloadCSS (ss, callback) {
    var called;
    function newcb () {
      if (!called && callback) {
        called = true;
        callback.call(ss);
      }
    }
    if (ss.addEventListener) {
      ss.addEventListener('load', newcb);
    }
    if (ss.attachEvent) {
      ss.attachEvent('onload', newcb);
    }
    if ('isApplicationInstalled' in navigator && 'onloadcssdefined' in ss) {
      ss.onloadcssdefined(newcb);
    }
  }
  return {
    dynamicLoading: dynamicLoading,
  };
})(jQuery);

modulesLoader.dynamicLoading();

