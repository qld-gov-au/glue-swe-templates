/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var _qgEnv = __webpack_require__(1);var _qgEnv2 = _interopRequireDefault(_qgEnv);
	
	
	__webpack_require__(2);
	
	
	__webpack_require__(8);
	__webpack_require__(9);
	
	
	__webpack_require__(10);
	
	
	__webpack_require__(29);
	var _sectionNav = __webpack_require__(30);var _sectionNav2 = _interopRequireDefault(_sectionNav);
	var _stepNav = __webpack_require__(31);var _stepNav2 = _interopRequireDefault(_stepNav);
	var _shareLinks = __webpack_require__(33);var _shareLinks2 = _interopRequireDefault(_shareLinks);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	var _feedbackForm = __webpack_require__(37);var _feedbackForm2 = _interopRequireDefault(_feedbackForm);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Layout imports
	// utils import
	(function () {
	  'use strict';
	  var franchiseTitle = _qgEnv2.default && _qgEnv2.default.swe && _qgEnv2.default.swe.franchiseTitle;
	  _sectionNav2.default.highlightNavItem();
	  _stepNav2.default.init();
	  _feedbackForm2.default.init(franchiseTitle);
	  _shareLinks2.default.init();
	})(); // components import
	// legacy module imports
	// env initialization

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict'; // All the environment related SWE3 code
	
	window.qg = window.qg || {};
	window.qg.swe = window.qg.swe || {};
	window.qg.cdn = window.qg.swe.isProduction === false ? 'https://beta-static.qgov.net.au' : 'https://static.qgov.net.au';
	window.qg.swe.assets = '/assets/v3.1/latest/';
	
	window.qg.swe.paths = {
	  images: window.qg.swe.assets + 'images' };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(7);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict'; /*globals qg*/
	
	(function ($, swe) {
	  /**
	                     * Gets parameter value
	                     * @param {string} name - parameter name
	                     * @param {string} url - url where searching needs to be performed
	                     * @returns {*} - returns the parameter value
	                     */
	  // TODO - feature addition to sanitize data
	  swe.getParameterByName = function (name, url) {
	    if (name == null) return false;
	    if (!url) url = window.location.href;
	    name = name.replace(/[\\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	    var results = regex.exec(url);
	    if (!results || !results[2]) return false;
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	  };
	  // Maps view full screen customization code
	  $('.map-modal').butterfly({
	    contentDefaultWidth: '90%',
	    contentDefaultHeight: '90%',
	    reuseFragment: true });
	
	})(jQuery, qg.swe);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict"; /*globals qg*/
	/*
	                             * Utility to handle ajax calls
	                             * Usage: swe.ajaxCall('https://www.google.com/recaptcha/api.js', 'script', onloadRecaptcha, 'Recaptcha unavailable');
	                             * */
	(function ($, swe) {
	  swe.ajaxCall = function (url, dataType, callback, errorMsg) {
	    $.ajax({
	      url: url,
	      dataType: dataType,
	      crossDomain: true,
	      success: callback,
	      error: function error() {
	        console.log(errorMsg);
	      } });
	
	  };
	})(jQuery, qg.swe);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	
	var _qgGoogleKeys = __webpack_require__(6);var _qgGoogleKeys2 = _interopRequireDefault(_qgGoogleKeys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	(function (qg, $) {
	  'use strict';
	  var googleApiKey = void 0;
	  var firstFolderPath = location.pathname.split('/')[1];
	  var $mapImg = $('.qg-static-map');
	
	  // check if the hostname contains a specific word and assign the key accordingly
	  if (window.location.hostname.search(/\bgithub\b/) !== -1) {
	    console.log('docs key in use');
	    googleApiKey = _qgGoogleKeys2.default.defGoogle.docs;
	  } else if (window.location.hostname.search(/\bdev\b|\btest\b|\blocalhost\b/) !== -1) {
	    console.log('test key in use');
	    googleApiKey = _qgGoogleKeys2.default.defGoogle.test;
	  } else {
	    googleApiKey = _qgGoogleKeys2.default.defGoogle.prod;
	  }
	
	  // check if first folder path exist and match to see if this is a valid franchise name or not
	  if (firstFolderPath) {
	    _qgGoogleKeys2.default.franchises.forEach(function (e) {
	      if (firstFolderPath === e.name) {
	        googleApiKey = e.apiKey;
	      }
	    });
	  }
	  function generateStaticMapImg(ele) {
	    var lat = ele.attr('data-lat') || -27.4673;
	    var lon = ele.attr('data-long') || 153.0233;
	    var zoom = ele.attr('data-zoom') || 17;
	    var height = ele.attr('data-height') || 189;
	    return 'https://maps.googleapis.com/maps/api/staticmap?size=373x' + height + '&maptype=roadmap&markers=' + lat + '%2C' + lon + '&key=' + googleApiKey + '&sensor=false&zoom=' + zoom;
	  }
	
	  if ($mapImg.length > 0) {
	    var htmlInsert = $('<div>');
	    $mapImg.each(function () {
	      var $this = $(this);
	      $this.find('img').attr('src', generateStaticMapImg($this.find('img')));
	      htmlInsert.append($this);
	    });
	    $('aside').prepend(htmlInsert);
	    $('a.qg-static-map').wrap("<div class='qg-aside st-map-static'>");
	    $('.st-map-static').eq(0).prepend("<h2><i class='fa fa-compass' aria-hidden='true'></i>Maps</h2>");
	  }
	  function lazyScript(url) {
	    $('head').append('<script type="text/javascript" src="' + url + '"></script>');
	  }
	  //load Google APi
	  qg.loadGoogle = function (callback) {
	    var next = function next() {
	      if (typeof callback === 'function') {
	        callback();
	      } else {
	        lazyScript(callback);
	      }
	    };
	    if ($('#googleapi').length <= 0) {
	      var s = document.createElement('script');
	      var u = 'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey + '&region=AU&libraries=places';
	      s.type = 'text/javascript';
	      s.id = 'googleapi';
	      s.src = u;
	      document.getElementsByTagName('head')[0].appendChild(s);
	      s.onreadystatechange = function () {//trigger for IE
	        if (this.readyState === 'complete') {
	          next();
	        }
	      };
	      s.onload = function () {
	        next();
	      };
	    } else {//if script is already created but either loading or loaded
	      if (document.readyState === 'loading') {
	        document.onreadystatechange = function () {
	          if (this.readyState === 'complete') {
	            next();
	          }
	        };
	      } else {
	        next();
	      }
	    }
	  };
	})(qg, jQuery); /**
	                 * When using functionality related to google libraries, this fuction comes handy to check if libraries already exists and then execute custom function
	                 */ /* globals qg */

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = {"defGoogle":{"test":"AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE","docs":"AIzaSyBE95_qL90MT9loY1roLnHJ3uaBYbleYeM","prod":"AIzaSyANZv-2WcXRzkBqtgEcLTZq7zVy-9eNWgw"},"defGoogleRecaptcha":{"uat":"6LeNGSwUAAAAAD6o-P5UTM0FNpKjYB71Kh70F-Ud","prod":"6LcoIywUAAAAAN-1rq22G-bP3yxl1bBq_5nHJ6s9"},"defFeedbackGoogleRecaptcha":{"uat":"6Lf3uLEUAAAAAKbnWYc0iXtctL8TeFC26l43Qyt2","prod":"6LcTNMIUAAAAAHiGXUnaO1xlELzXgpWujzEJbFjS"},"franchises":[{"name":"about","apiKey":"AIzaSyBi-T3vrvcYwouFPqPI5IgLoQxl2hz6Ogs"},{"name":"atsi","apiKey":"AIzaSyB2mTTDd1CcLEYrLHJJHlzX60vQ68snyko"},{"name":"community","apiKey":"AIzaSyCJwNeGu0XT1lvhg-2cm7S27BQo9k7Jd9E"},{"name":"disability","apiKey":"AIzaSyC-KQFfBhoGle7kJJhY1Pf_GvR_qC5jzN4"},{"name":"education","apiKey":"AIzaSyDeeYKKOyQCYkpVWXRLLxyNjfy2dhyWVls"},{"name":"emergency","apiKey":"AIzaSyD1xT_2Dh2EZ7Iy6SLodeH8CJzbXlp6vgE"},{"name":"environment","apiKey":"AIzaSyAZJjfwIKDPlQs-S3id-CGp8U_S4U7idFI"},{"name":"families","apiKey":"AIzaSyBucRn0YhJhQ-ELSS-MM7JvYb19-I1bqqI"},{"name":"health","apiKey":"AIzaSyD_Xzvr6nBm5PlpANw2UZ2df3-U5eeOlvY"},{"name":"housing","apiKey":"AIzaSyCgMKJlbP1SRIf3xCMFDbBImNkF_BCubvk"},{"name":"jobs","apiKey":"AIzaSyBXmI1DZvPFVQ_h-E1TNsPNdlNuqDd7MVo"},{"name":"law","apiKey":"AIzaSyBeij584IMIZqpftyhMCt_lZ_hBK_h8hMc"},{"name":"recreation","apiKey":"AIzaSyDJmfdqYI3eyV8-ivwPWVIIHxBzqo5_v2I"},{"name":"seniors","apiKey":"AIzaSyA3PDnd30Twv3Zr3JKqiAUYNO1983ZDBe0"},{"name":"transport","apiKey":"AIzaSyARzyCPigCt9cW1F6ua0_U3NVLdRbxwLyg"},{"name":"youth","apiKey":"AIzaSyCe7FYHy28So2Uio_OEQje0o0Pr23s7gt0"}]}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/* ========================================================================
	* Set element to parent width
	* [TODO: Write about what this is for, to make it easier for future
	* developers to know what to put into it, and what not to.]
	* ======================================================================== */
	
	'use strict';
	
	// FIXME: Reports linting error as it's defined as a module, but never used
	//If this is not in use then we can can delete?
	var parentWidth = function ($) {
	  var $target = $('*[data-parent-width=true], *[data-parent-width=1]');
	  $target.outerWidth($target.parent().width());
	}(jQuery);
	
	module.exports = parentWidth;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}; /*! Form validation - v1.1.1 - 2014-04-09
	                                                                                                                                                                                                                                                                                        * https://github.com/bboyle/form-validation
	                                                                                                                                                                                                                                                                                        * Copyright (c) 2014 Ben Boyle; Licensed MIT */
	(function ($) {
	  'use strict';
	
	
	  var SUBMIT_TOLERANCE = 10000,
	  DEFAULT_STATUS_HTML = '<div class="alert alert-warning" role="alert"><div class="inner"><h2><i class="fa fa-exclamation-triangle"></i>Please check your answers</h2><ol></ol></div></div>',
	  // fields that validate
	  candidateForValidation = 'input, select, textarea',
	
	
	  // invalidFilter
	  invalidFilter = function invalidFilter() {
	    return !(this.disabled || this.validity.valid);
	  },
	
	
	  // follow plugin conventions for storing plugin data
	  // http://docs.jquery.com/Plugins/Authoring#Data
	  pluginDataKey = 'formValidation',
	  pluginData = function pluginData(key, value) {
	    var dataHash = this.data(pluginDataKey) || this.data(pluginDataKey, {}).data(pluginDataKey);
	
	    if (typeof key !== 'undefined') {
	      if (typeof value !== 'undefined') {
	        dataHash[key] = value;
	        return value;
	      } else if (typeof dataHash[key] !== 'undefined') {
	        return dataHash[key];
	      }
	      return null;
	    }
	
	    return dataHash;
	  },
	
	
	  // helper for .label, .hint and .alert
	  getLabelComponent = function getLabelComponent(component, options) {
	    return this.map(function (index, domElement) {
	      var $element = $(domElement),
	      labelElement = null,
	      foundElement = null;
	
	      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.level === 'group') {
	        foundElement = $element.formValidation('group').find(component)[0];
	      } else if ($element.is(':radio, :checkbox')) {
	        foundElement = $element.closest('fieldset').find(component)[0];
	      } else {
	        labelElement = $element.closest('form').find('label[for="' + domElement.id + '"]');
	        foundElement = labelElement.children(component)[0];
	        if (!foundElement) {
	          if (component === '.hint') {
	            labelElement.append('<small class="hint"></small>');
	            foundElement = labelElement.children(component)[0];
	          }
	        }
	      }
	      return foundElement;
	    });
	  },
	
	
	  changeValidityCheck = function changeValidityCheck() {
	    var $this = $(this),
	    alertElement = $this.formValidation('alert'),
	    alertLevel,
	    invalidContainers;
	
	    // is this control valid?
	    if (this.validity.valid) {
	      // is it part of a group that contain other invalid controls?
	      if ($this.formValidation('question').find('.alert').filter(alertElement).length > 0) {
	        alertElement.remove();
	      } else {
	        // update message from first invalid field in group
	        invalidContainers = $this.formValidation('group').find(candidateForValidation).filter(invalidFilter);
	        if (invalidContainers.length > 0) {
	          alertElement.text(invalidContainers.formValidation('getValidationMessage'));
	        } else {
	          // all fields valid
	          alertElement.remove();
	        }
	      }
	
	      // remove invalid class from ancestors that do not contain invalid fields
	      $this.parentsUntil('form', '.invalid').filter(function () {
	        return $(this).find(candidateForValidation).filter(invalidFilter).length === 0;
	      })
	      // remove .invalid class
	      .removeClass('invalid')
	      // remove old alerts (change handler should have already done this)
	      .find('.alert').
	      remove();
	    } else {
	      // does alert exist?
	      if (alertElement.length === 0) {
	        alertElement = $('<em class="alert"/>');
	      }
	      // show message
	      alertElement.text($this.formValidation('getValidationMessage'));
	      // append to form
	      if ($this.formValidation('group').hasClass('atomic')) {
	        alertLevel = { 'level': 'group' };
	      }
	
	      $this.formValidation('label', alertLevel).parent().find('.label, abbr[title="(required)"]').eq(-1).
	      after(alertElement);
	
	      // NOTE we don't flag the question as .invalid now
	      // .invalid only happens on submit, to soften inline validation errors
	    }
	  },
	
	
	  // checks for invalid elements
	  // returns number of invalid elements
	  submitValidityCheck = function submitValidityCheck() {
	    // form object
	    var form = $(this).closest('form'),
	
	    // invalid fields
	    invalid = form.find(candidateForValidation).filter(function invalidFields() {
	      // skip disabled
	      if (this.disabled) {
	        return false;
	      }
	
	      // only check radio button groups once (skip individual radio button)
	      if (this.type === 'radio') {
	        if (!invalidFields.cache) {
	          invalidFields.cache = {};
	        } else if (invalidFields.cache[this.name] === true) {
	          return false;
	        }
	        invalidFields.cache[this.name] = true;
	      }
	
	      return this.validity && !this.validity.valid;
	    }),
	
	    // alert container
	    alert = pluginData.call(form, 'summaryElement') || pluginData.call(form, 'summaryElement', $(DEFAULT_STATUS_HTML)),
	
	    // messages within alert
	    messages = alert.find('ol'),
	
	    // track groups
	    lastGroupSeen = true;
	
	    if (invalid.length > 0) {
	      // remove old messages
	      messages.find('li').remove();
	
	      // add new messages
	      invalid.each(function () {
	        // get field
	        var $this = $(this),
	        // get group (if exists)
	        group = $this.formValidation('group'),
	        // get label or group label
	        label = $this.formValidation('label', {
	          level: group.length > 0 ? 'group' : null }),
	
	        labelId,
	        item;
	
	        // get the label id
	        if (label.length > 0) {
	          labelId = label[0].id || label.generateId('label-' + this.id)[0].id;
	        } else {
	          labelId = this.name;
	        }
	
	        // get alert item
	        item = pluginData.call($this, 'summaryElement') || pluginData.call($this, 'summaryElement', $('<li><a href="#' + labelId + '"></a></li>'));
	
	        if (group.length === 0 || group[0] !== lastGroupSeen) {
	          // update last group seen
	          lastGroupSeen = group[0];
	
	          // create error message with link to label
	          item.
	          find('a').
	          text(label.text().replace(/\?$/, '') + ': ' + $this.formValidation('getValidationMessage')).
	          end().
	          appendTo(messages);
	        } else {
	          // remove from DOM
	          item.remove();
	        }
	      });
	    }
	
	    return invalid.length;
	  },
	
	
	  submitValidationHandler = function submitValidationHandler(event) {
	    // validate form
	    var count = submitValidityCheck.call(this),
	    form = $(this);
	
	    // remove invalid class from questions that do not contain invalid fields
	    form.find('.invalid').filter(function () {
	      return $(this).find(candidateForValidation).filter(invalidFilter).length === 0;
	    })
	    // remove .invalid class
	    .removeClass('invalid')
	    // remove old alerts (change handler should have already done this)
	    .find('.alert').
	    remove();
	
	
	
	    // anything invalid?
	    if (count > 0) {
	      // cancel submit
	      event.stopImmediatePropagation();
	      event.preventDefault();
	
	      // show the error summary
	      (function (form) {
	        var summary = pluginData.call(form, 'summaryElement');
	        // hide any previous status blocks
	        form.prev('.alert').not(summary).remove();
	        // show the new summary
	        form.before(summary.fadeIn());
	        // focus/scroll summary element
	        if (window.innerWidth < 992) {
	          $(window).scrollTop(summary.offset().top - $('.qg-site-header').height());
	        } else {
	          $(window).scrollTop(summary.offset().top);
	        }
	      })(form);
	
	      // find all the invalid fields
	      form.find(candidateForValidation).filter(invalidFilter).each(function () {
	        // update inline alerts
	        changeValidityCheck.call(this);
	      })
	      // set .invalid on ancestor LI elements
	      .parentsUntil('form', '.questions > li')
	      // but not sections
	      .not('.section, .compact').
	      addClass('invalid');
	
	
	      // trigger x-invalid
	      form.trigger('x-invalid');
	
	      // cancel submit
	      return false;
	    }
	  },
	
	
	  // bind this AFTER the validation handler
	  // only invoked if validation did not prevent submit
	  // This will softlock submit if form submit passes this function with in SUBMIT_TOLERANCE timerange
	  submitDoneHandler = function submitDoneHandler(event) {
	    // use event.timeStamp when available and $.now() otherwise
	    var timeStamp = event.timeStamp || $.now(),
	    form = $(this),
	    summaryElement = pluginData.call(form, 'summaryElement'),
	    lastSubmitTimeStamp;
	
	
	    // remove summary element from DOM on successful submit
	    if (summaryElement) {
	      summaryElement.remove();
	    }
	
	    // is this submit event too soon after the last one?
	    lastSubmitTimeStamp = pluginData.call(form, 'lastSubmitTimeStamp');
	    if (lastSubmitTimeStamp && timeStamp - lastSubmitTimeStamp < SUBMIT_TOLERANCE) {
	      // cancel the submit event
	      event.stopImmediatePropagation();
	      event.preventDefault();
	      return false;
	    } else {
	      // store the timestamp
	      pluginData.call(form, 'lastSubmitTimeStamp', timeStamp);
	    }
	  },
	
	
	  // plugin methods
	  methods = {
	    // $( x ).formValidation( 'alert' ) -- get
	    // get alert text
	    alert: function alert() {
	      return this.map(function (index, domElement) {
	        var $element = $(domElement),
	        group;
	
	        if ($element.is(':radio, :checkbox') === true) {
	          return $element.closest('fieldset').find('legend > .alert')[0];
	        } else {
	          // atomic groups
	          group = $element.formValidation('group').filter('.atomic');
	          if (group.length > 0) {
	            return group.find('legend > .alert')[0];
	          } else {
	            return $('label[for="' + domElement.id + '"] > .alert')[0];
	          }
	        }
	      });
	    },
	
	
	    // $( x ).formValidation( 'label' )
	    // $( x ).formValidation( 'label', { level : group })
	    // return .label associated with element or containing group
	    label: function label(options) {
	      return getLabelComponent.call(this, '.label', options);
	    },
	
	
	    // $( x ).formValidation( 'hint' )
	    // $( x ).formValidation( 'hint', { level : group })
	    // return .hint associated with element or containing group
	    hint: function hint(options) {
	      return getLabelComponent.call(this, '.hint', options);
	    },
	
	
	    // $( x ).formValidation( 'question' )
	    // return question element for item
	    question: function question(options) {
	      // looking for group?
	      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.level === 'group') {
	        // return the group
	        return this.formValidation('group');
	      }
	
	      // not looking for group
	      return this.map(function (index, domElement) {
	        return $(domElement).parentsUntil('form', '.questions > li')[0];
	      });
	    },
	
	
	    // $( x ).formValidation( 'group' )
	    // return group element for item
	    group: function group() {
	      return this.map(function (index, domElement) {
	        return $(domElement).parentsUntil('form', '.group').filter(function () {
	          // ignore groups that do not contain fieldsets
	          return $(this).children('fieldset').length > 0;
	        })[0];
	      });
	    },
	
	
	    // $( x ).formValidation( 'validate' )
	    // binds validation handler functions
	    // sets @novalidate on form to disable built-in validation
	    // TODO allow this to be called multiple times without binding additional handlers!
	    validate: function validate() {
	      return this.each(function () {
	        $(this).closest('form')
	        // turn off native validation
	        .attr('novalidate', true)
	        // unbind and rebind handlers
	        .off('submit', submitDoneHandler).
	        off('submit', submitValidationHandler)
	        // validate this form
	        .on('submit', submitValidationHandler)
	        // if validation did not cancel submit…
	        .on('submit', submitDoneHandler)
	        // bind inline validation handlers to form elements
	        .find(candidateForValidation).
	        off('change', changeValidityCheck).
	        on('change', changeValidityCheck);
	
	      });
	    },
	
	    // jQuery("div.alert.alert-warning").remove(); //as this function only add's to it. submitDoneHandler did the removal on success.
	    // $( x ).formValidation( 'validate', event )
	    // validates the form it is attached too
	    // return false if invalid
	    // var fakeEvent = jQuery.Event( "click" );
	    // $("form#myForm").formValidation("validateNow", fakeEvent);
	    // The fakeEvent captures the .stopImmediatePropagation() .preventDefault()
	    // and to allow you to check with:
	    //isDefaultPrevented, isImmediatePropagationStopped
	    validateNow: function validateNow(event) {
	      return submitValidationHandler.call(this, event);
	    },
	
	
	    // $( x ).formValidation( 'getValidationMessage' )
	    // return String validation message, e.g. "Must be completed"
	    getValidationMessage: function getValidationMessage() {
	
	      var validityState = this[0].validity;
	
	      if (typeof validityState === 'undefined' || validityState.valid === true) {
	        return '';
	      } else if (validityState.valueMissing) {
	        return 'Must be completed';
	      } else if (validityState.customError) {
	        return this[0].validationMessage;
	      } else if (validityState.typeMismatch) {
	        return 'Must be an email address';
	      } else if (validityState.patternMismatch) {
	        return 'Must use the format shown';
	      } else {
	        return 'Must be a valid answer';
	      }
	    } };
	
	
	
	  $.fn.formValidation = function (method) {
	    // Method calling logic
	    // http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
	    if (methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error('Method ' + method + ' does not exist on jQuery.formValidation');
	    }
	
	  };
	
	
	  // legacy API
	  $.fn.forcesForms = $.fn.formValidation;
	})(jQuery);
	/*! Generate ID - v1.0.3 - 2014-09-18
	             * https://github.com/bboyle/Generate-ID
	             * Copyright (c) 2014 Ben Boyle; Licensed MIT */
	(function ($) {
	  'use strict';
	
	
	  /**
	                 * Assigns a unique value to `@id` unless hasAttribute( 'id' ) is true
	                 *
	                 * @param preferredId string to use for id value
	                 *
	                 * @return jquery object (chaining supported)
	                 */
	  $.fn.generateId = function (preferredId) {
	
	    var i = 1;
	
	    if (!preferredId) {
	      preferredId = 'id';
	    } else {
	      preferredId = $.trim(preferredId.toLowerCase().replace(/[^a-z0-9_]+/g, ' ')).replace(/\s+/g, '-');
	    }
	
	    return this.each(function () {
	
	      var id;
	
	      if (!this.getAttribute('id')) {
	
	        id = preferredId;
	        while (document.getElementById(id)) {
	          id = preferredId + String(i);
	          i++;
	        }
	        this.setAttribute('id', id);
	      }
	    });
	
	  };
	
	
	})(jQuery);
	/*! HTML5 constraintValidationAPI - v1.0.7 - 2015-02-19
	             * https://github.com/bboyle/html5-constraint-validation-API
	             * Copyright (c) 2015 Ben Boyle; Licensed MIT */
	/*exported initConstraintValidationAPI*/
	if (jQuery !== 'undefined') {
	  (function ($) {
	    'use strict';
	
	
	    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
	    // 1*( atext / "." ) "@" ldh-str 1*( "." ldh-str )
	    var REXP_EMAIL = /^[A-Za-z0-9!#$%&'*+\-\/=\?\^_`\{\|\}~\.]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*$/,
	
	    // fields that validate
	    candidateForValidation = 'input, select, textarea',
	
	    // for feature detection
	    input = $('<input>').get(0),
	
	    // polyfill test
	    polyfill = _typeof(input.validity) !== 'object',
	
	    // radio button bug (google earth internal browser)
	    radioButtonBug = !polyfill && $('<input type="radio" required checked>').get(0).validity.valueMissing === true,
	    validateBuggyRadioButtons,
	
	    // invalid fields filter
	    isInvalid = function isInvalid() {
	      return !(this.disabled || this.validity.valid);
	    },
	
	    // get all radio buttons
	    getRadioButtonsInGroup = function getRadioButtonsInGroup(radio) {
	      return $(radio.form.elements[radio.name]).filter('[name="' + radio.name + '"]');
	    },
	
	
	    // manage validity state object
	    validityState = function validityState(typeMismatch, valueMissing, customError, message, patternMismatch) {
	
	      if (typeof message === 'string') {
	        customError = !!message;
	      }
	      return {
	        customError: customError,
	        typeMismatch: !!typeMismatch,
	        patternMismatch: !!patternMismatch,
	        valueMissing: !!valueMissing,
	        valid: !valueMissing && !customError && !typeMismatch && !patternMismatch };
	
	    },
	
	
	    validateField = function validateField(message) {
	      var $this = $(this),
	      required = !!$this.attr('required'),
	      radio = this.type === 'radio' && getRadioButtonsInGroup(this),
	      valueMissing,
	      invalidEmail = this.getAttribute('type') === 'email' && !!this.value && !REXP_EMAIL.test(this.value),
	      patternMismatch,
	      pattern,
	      newValidityState;
	
	
	      // radio buttons are required if any single radio button is flagged as required
	      if (radio && !required) {
	        required = radio.filter('[required]').length > 0;
	      }
	      // if required, check for missing value
	      if (required) {
	
	        if (/^select$/i.test(this.nodeName)) {
	          valueMissing = this.selectedIndex === 0 && this.options[0].value === '';
	
	        } else if (radio) {
	          valueMissing = radio.filter(':checked').length === 0;
	
	        } else if (this.type === 'checkbox') {
	          valueMissing = !this.checked;
	
	        } else {
	          valueMissing = !this.value;
	        }
	
	      }
	
	      if (!!this.getAttribute('pattern')) {
	        if (this.value.length > 0) {
	          // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#compiled-pattern-regular-expression
	          pattern = new RegExp('^(?:' + this.getAttribute('pattern') + ')$');
	
	          patternMismatch = !pattern.test(this.value);
	
	        } else {
	          patternMismatch = false;
	        }
	      }
	
	      // set .validityState
	      newValidityState = validityState(invalidEmail, valueMissing, this.validity.customError || false, message, patternMismatch);
	      if (radio) {
	        getRadioButtonsInGroup(this).each(function () {this.validity = newValidityState;});
	      } else {
	        this.validity = newValidityState;
	      }
	
	      // set .validationMessage
	      if (this.validity.valid) {
	        this.validationMessage = '';
	
	      } else if (this.validity.customError) {
	        if (typeof message === 'string') {
	          this.validationMessage = message;
	        }
	
	      } else if (this.validity.valueMissing) {
	        this.validationMessage = 'Please answer this question';
	
	      } else if (this.validity.typeMismatch) {
	        this.validationMessage = 'Please type an email address';
	
	      } else if (this.validity.patternMismatch) {
	        this.validationMessage = 'Please use the format shown';
	
	      } else {
	        this.validationMessage = 'Please answer the question correctly';
	      }
	
	      return this.disabled || this.validity.valid;
	    },
	
	
	    changeHandler = function changeHandler(event) {
	      var target = event.target;
	
	      validateField.call(target);
	
	      if (target.type === 'radio') {
	        getRadioButtonsInGroup(target).each(function () {
	          this.validity = target.validity;
	          this.validationMessage = target.validationMessage;
	        });
	      }
	    },
	
	
	    submitHandler = function submitHandler(event) {
	
	      var form = $(this),
	      novalidate = !!form.attr('novalidate'),
	      invalid = false;
	
	
	      // polyfill validation?
	      if (polyfill) {
	        // check fields
	        form.find(candidateForValidation).each(function () {
	
	          invalid = !validateField.call(this);
	
	
	          // unless @novalidate
	          if (!novalidate) {
	            // if invalid
	            if (invalid) {
	              // use triggerHandler because invalid does not bubble
	              $(this).triggerHandler('invalid');
	            }
	          }
	        });
	      }
	
	      // NOTE all the code below runs in all browsers to polyfill implementation bugs
	
	      // required radio button check
	      if (radioButtonBug) {
	        validateBuggyRadioButtons(this);
	      }
	
	      // Opera 11 on OSX fires submit event even when fields are invalid
	      // correct implementations will not invoke this submit handler until all fields are valid
	
	      // unless @novalidate
	      // if there are invalid fields
	      if (!novalidate && form.find(candidateForValidation).filter(isInvalid).length > 0) {
	        // abort submit
	        event.stopImmediatePropagation();
	        event.preventDefault();
	        return false;
	      }
	    },
	
	
	    initConstraintValidationAPI = function initConstraintValidationAPI() {
	      var candidates = $(candidateForValidation);
	
	      // INPUT validityState
	      if (polyfill) {
	        // set us up the API
	        candidates.filter(function () {
	          return _typeof(this.validity) !== 'object';
	        }).each(function () {
	
	          this.validity = validityState(false, false, false, '', false);
	          this.validationMessage = '';
	
	        });
	
	        // check validity on change
	        candidates.
	        off('change.constraintValidationAPI').
	        on('change.constraintValidationAPI', changeHandler);
	
	      }
	
	      // INPUT validitationMessage
	      if (typeof input.validationMessage !== 'string') {
	        // set us up the API
	        candidates.filter(function () {
	          return typeof this.validationMessage !== 'string';
	        }).each(function () {
	          this.validationMessage = '';
	        });
	      }
	
	      // INPUT checkValidity
	      if (typeof input.checkValidity !== 'function') {
	        // set us up the API
	        candidates.filter(function () {
	          return typeof this.checkValidity !== 'function';
	        }).each(function () {
	          var domElement = this;
	
	          this.checkValidity = function () {
	            var valid = validateField.call(domElement);
	
	            // if invalid, and unless novalidate
	            if (!valid && !this.form.getAttribute('novalidate')) {
	              // use triggerHandler because invalid does not bubble
	              $(domElement).triggerHandler('invalid');
	            }
	
	            return valid;
	          };
	        });
	      }
	
	      // INPUT setCustomValidity
	      if (typeof input.setCustomValidity !== 'function') {
	        // set us up the API
	        candidates.filter(function () {
	          return typeof this.setCustomValidity !== 'function';
	        }).each(function () {
	          var that = this;
	
	          this.setCustomValidity = function (message) {
	            validateField.call(that, message);
	          };
	        });
	      }
	
	      // check for required radio button bug (google earth internal browser)
	      if (radioButtonBug) {
	        validateBuggyRadioButtons = function validateBuggyRadioButtons(form) {
	          var seen = {};
	          var radio,
	          valueMissing;
	
	          // check every required radio button
	          $('input', form).filter(':radio').filter('[required],[aria-required="true"]').each(function () {
	            if (typeof seen[this.name] === 'undefined') {
	              seen[this.name] = true;
	
	              radio = getRadioButtonsInGroup(this);
	              valueMissing = radio.filter(':checked').length === 0;
	
	              if (valueMissing) {
	                // make sure @required is set to use validation API
	                radio.attr('required', 'required');
	              } else {
	                // using @aria-required=true so we can track this control
	                // removing @required here to bypass validation bug
	                radio.attr('aria-required', true).removeAttr('required');
	              }
	            }
	          });
	        };
	
	        // initial validity
	        $('form').each(validateBuggyRadioButtons);
	
	        // watch changes
	        if (!polyfill) {
	          candidates.filter(':radio').
	          off('change.constraintValidationAPI').
	          on('change.constraintValidationAPI', function () {
	            validateBuggyRadioButtons(this.form);
	          });
	
	        }
	      }
	
	      // check validity on submit
	      // this should be bound before all other submit handlers bound to the same form
	      // otherwise they will execute before this handler can cancel submit (oninvalid)
	      $('form').
	      off('submit.constraintValidationAPI').
	      on('submit.constraintValidationAPI', submitHandler);
	
	    };
	
	
	
	    // run immediately and ondocumentready
	    initConstraintValidationAPI();
	    $(initConstraintValidationAPI);
	
	
	    // expose init function
	    window.initConstraintValidationAPI = initConstraintValidationAPI;
	
	
	  })(jQuery);
	}
	/*
	   * jQuery Simply Countable plugin
	   * Provides a character counter for any text input or textarea
	   *
	   * @version  0.4.2
	   * @homepage http://github.com/aaronrussell/jquery-simply-countable/
	   * @author   Aaron Russell (http://www.aaronrussell.co.uk)
	   *
	   * Copyright (c) 2009-2010 Aaron Russell (aaron@gc4.co.uk)
	   * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	   * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	   */
	
	(function ($) {
	
	  $.fn.simplyCountable = function (options) {
	
	    options = $.extend({
	      counter: '#counter',
	      countType: 'characters',
	      maxCount: 140,
	      strictMax: false,
	      countDirection: 'down',
	      safeClass: 'safe',
	      overClass: 'over',
	      thousandSeparator: ',',
	      onOverCount: function onOverCount() {},
	      onSafeCount: function onSafeCount() {},
	      onMaxCount: function onMaxCount() {} },
	    options);
	
	    var navKeys = [33, 34, 35, 36, 37, 38, 39, 40];
	
	    return $(this).each(function () {
	
	      var countable = $(this),
	      counter = $(options.counter);
	      if (!counter.length) {return false;}
	
	      var countCheck = function countCheck() {
	
	        var count;
	        var revCount;
	
	        var reverseCount = function reverseCount(ct) {
	          return ct - ct * 2 + options.maxCount;
	        };
	
	        var countInt = function countInt() {
	          return options.countDirection === 'up' ? revCount : count;
	        };
	
	        var numberFormat = function numberFormat(ct) {
	          var prefix = '';
	          if (options.thousandSeparator) {
	            ct = ct.toString();
	            // Handle large negative numbers
	            if (ct.match(/^-/)) {
	              ct = ct.substr(1);
	              prefix = '-';
	            }
	            for (var i = ct.length - 3; i > 0; i -= 3) {
	              ct = ct.substr(0, i) + options.thousandSeparator + ct.substr(i);
	            }
	          }
	          return prefix + ct;
	        };
	
	        var changeCountableValue = function changeCountableValue(val) {
	          countable.val(val).trigger('change');
	        };
	
	        /* Calculates count for either words or characters */
	        if (options.countType === 'words') {
	          count = options.maxCount - $.trim(countable.val()).split(/\s+/).length;
	          if (countable.val() === '') {count += 1;}
	        } else {
	          count = options.maxCount - countable.val().length;
	        }
	        revCount = reverseCount(count);
	
	        /* If strictMax set restrict further characters */
	        if (options.strictMax && count <= 0) {
	          var content = countable.val();
	          if (count < 0) {
	            options.onMaxCount(countInt(), countable, counter);
	          }
	          if (options.countType === 'words') {
	            var allowedText = content.match(new RegExp('\\s?(\\S+\\s+){' + options.maxCount + '}'));
	            if (allowedText) {
	              changeCountableValue(allowedText[0]);
	            }
	          } else {changeCountableValue(content.substring(0, options.maxCount));}
	          count = 0, revCount = options.maxCount;
	        }
	
	        counter.text(numberFormat(countInt()));
	
	        /* Set CSS class rules and API callbacks */
	        if (!counter.hasClass(options.safeClass) && !counter.hasClass(options.overClass)) {
	          if (count < 0) {
	            counter.addClass(options.overClass);
	          } else {
	            counter.addClass(options.safeClass);
	          }
	        } else if (count < 0 && counter.hasClass(options.safeClass)) {
	          counter.removeClass(options.safeClass).addClass(options.overClass);
	          options.onOverCount(countInt(), countable, counter);
	        } else if (count >= 0 && counter.hasClass(options.overClass)) {
	          counter.removeClass(options.overClass).addClass(options.safeClass);
	          options.onSafeCount(countInt(), countable, counter);
	        }
	
	      };
	
	      countCheck();
	
	      countable.on('keyup blur paste', function (e) {
	        switch (e.type) {
	          case 'keyup':
	            // Skip navigational key presses
	            if ($.inArray(e.which, navKeys) < 0) {countCheck();}
	            break;
	          case 'paste':
	            // Wait a few miliseconds if a paste event
	            setTimeout(countCheck, e.type === 'paste' ? 5 : 0);
	            break;
	          default:
	            countCheck();
	            break;}
	
	      });
	
	    });
	
	  };
	
	})(jQuery); /*! relevance - v2.1.0 - 2015-03-04
	            * https://github.com/bboyle/relevance
	            * Copyright (c) 2015 Ben Boyle; Licensed MIT */
	if (jQuery !== 'undefined') {
	  (function ($) {
	    'use strict';
	
	    var relevantEvent = 'relevant',
	    irrelevantEvent = 'irrelevant',
	    elementsToDisable = 'button, input, select, textarea',
	    polyfillHidden = function () {
	      var hidden = $('<div hidden></div>');
	      var hiddenSupported = hidden.appendTo('body').is(':hidden');
	      hidden.remove();
	      return !hiddenSupported;
	    }(),
	
	    formElementsByName = function formElementsByName(form, name) {
	      // filter out the @id matching of HTMLFormElement.elements[]
	      return $(form.elements[name]).filter('[name="' + name + '"]');
	    },
	
	    filterRelevant = function filterRelevant() {
	      return $(this).closest('[hidden]').length === 0;
	    },
	
	    filterIrrelevant = function filterIrrelevant() {
	      return $(this).closest('[hidden]').length > 0;
	    },
	
	    valueMap = function valueMap(element) {
	      return element.value;
	    },
	
	    valueInArray = function valueInArray(possibleValues, actualValues) {
	      var i;
	      if ((typeof possibleValues === 'undefined' ? 'undefined' : _typeof(possibleValues)) !== 'object') {
	        possibleValues = [possibleValues];
	      }
	
	      for (i = 0; i < actualValues.length; i++) {
	        if ($.inArray(actualValues[i], possibleValues) !== -1) {
	          return true;
	        }
	      }
	
	      return false;
	    },
	
	    // when changing a control that alters relevance of other elements…
	    recalculateRelevance = function recalculateRelevance() {
	      // assume dependency map exists
	      var map = $(this.form).data('relevance').dependencyMap[this.name],
	      values = $.map(formElementsByName(this.form, this.name).filter('select,:checked').filter(':visible'), valueMap);
	
	
	      $.each(map, function (index, config) {
	        config.items.relevance('relevant', valueInArray(config.values, values) !== config.negate);
	      });
	    },
	
	    // when an element changes relevance, check descendent controls that alter relevance in turn…
	    recalculateDependents = function recalculateDependents(isRelevant) {
	      var form,
	      dependencyMap,
	      targets;
	
	      // any change to relevant toggles?
	      form = this.closest('form');
	      if (form.length) {
	        dependencyMap = form.data('relevance');
	        if ((typeof dependencyMap === 'undefined' ? 'undefined' : _typeof(dependencyMap)) === 'object') {
	          dependencyMap = dependencyMap.dependencyMap;
	          if ((typeof dependencyMap === 'undefined' ? 'undefined' : _typeof(dependencyMap)) === 'object') {
	            // get descendent-or-self select, radio and checkbox
	            targets = this.add(this.find('select,input')).filter('select,:radio,:checkbox');
	            // get unique @name for select, radio and checkbox
	            targets = $.unique($.map(targets, function (elementOfArray) {
	              return elementOfArray.name;
	            }));
	            $.each(targets, function (index, name) {
	              var map = dependencyMap[name],
	              values;
	
	              if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) === 'object') {
	                $.each(map, function (index, config) {
	                  if (isRelevant === false) {
	                    config.items.relevance('relevant', false);
	
	                  } else {
	                    values = $.map(formElementsByName(form[0], name).filter('select,:checked').filter(':visible'), valueMap);
	                    config.items.relevance('relevant', valueInArray(config.values, values) !== config.negate);
	                  }
	                });
	              }
	            });
	          }
	        }
	      }
	    },
	
	
	    methods = {
	
	      // $( x ).relevance( 'relevant', true )
	      // if the element is hidden, fire a 'relevant' event
	      // $( x ).relevance( 'relevant', false )
	      // if the element is visible, fire an "irrelevant" event
	      relevant: function relevant(makeRelevant) {
	        var targets;
	        if (makeRelevant) {
	          targets = this.filter(filterIrrelevant).trigger(relevantEvent);
	        } else {
	          targets = this.filter(filterRelevant).trigger(irrelevantEvent);
	        }
	        if (targets.length) {
	          recalculateDependents.call(targets, makeRelevant);
	        }
	        return this;
	      },
	
	      // $( x ).relevance( 'show' )
	      // shows the element (does not check if element is already visible)
	      // triggers 'relevant-done' after showing is complete
	      show: function show() {
	        // enable elements before they are shown
	        this.add(this.find(elementsToDisable))
	        // but not any controls that will remain irrelevant
	        .not(this.find('[hidden]').find(elementsToDisable)).
	        each(function () {
	          this.removeAttribute('disabled');
	        });
	
	        // stop animation, remove @hidden and @aria-hidden, start showing
	        if (polyfillHidden) {
	          this.stop(true, true).slideDown();
	        }
	        return this.removeAttr('hidden').removeAttr('aria-hidden');
	      },
	
	      // $( x ).relevance( 'hide' )
	      // hides the element (does not check if element is already hidden)
	      hide: function hide() {
	        this.attr({
	          hidden: 'hidden',
	          'aria-hidden': 'true' });
	
	
	        if (polyfillHidden) {
	          this.stop(true, true).hide(0, function () {
	            var $this = $(this);
	            // disable elements (including self if appropriate)
	            $this.filter(elementsToDisable).add($this.find(elementsToDisable)).each(function () {
	              this.setAttribute('disabled', 'disabled');
	            });
	          });
	        } else {
	          this.filter(elementsToDisable).add(this.find(elementsToDisable)).each(function () {
	            this.setAttribute('disabled', 'disabled');
	          });
	        }
	
	        return this;
	      },
	
	      // $( x ).relevance( 'relevantWhen', { name: radio/checkbox/select, value: requiredValue, negate: false | true })
	      // sets up dependent relevance
	      // example: $( '#red' ).relevance( 'relevantWhen', { name: 'rgb', value: 'red' })
	      // example: $( '#red' ).relevance( 'relevantWhen', { id: 'rgb-red', value: 'red' })
	      // #red will be shown/hidden when '@name=rgb' value changes.
	      relevantWhen: function relevantWhen(config) {
	        var form,
	        data,
	        name,
	        values;
	
	        values = config.values || [config.value];
	
	        if (config.name) {
	          name = config.name;
	        } else if (config.id) {
	          name = document.getElementById(config.id).name;
	        } else if (config.container) {
	          name = $(config.container).find('select,:radio,:checkbox').attr('name');
	        }
	        config.negate = config.negate === true;
	
	        // find the form that has this control
	        form = this.closest('form');
	        // get dependency map (create it if needed)
	        data = form.data('relevance');
	        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	          data = {};
	          form.data('relevance', data);
	        }
	        if (_typeof(data.dependencyMap) !== 'object') {
	          data.dependencyMap = {};
	        }
	        if (_typeof(data.dependencyMap[name]) !== 'object') {
	          data.dependencyMap[name] = [];
	          // setup event handlers for name
	          formElementsByName(form[0], name).
	          filter(':radio,:checkbox').
	          on('click', recalculateRelevance).
	          end().
	          filter('select').
	          on('change', recalculateRelevance);
	
	        }
	        // add or update relevance rule
	        data.dependencyMap[name].push({
	          items: this,
	          values: values,
	          negate: config.negate });
	
	
	        // initial relevance
	        this.relevance('relevant', valueInArray(values, $.map(formElementsByName(form[0], name).filter('select,:checked').filter(':visible'), valueMap)) !== config.negate);
	
	        return this;
	      },
	
	      // $( x ).relevance( 'instructions', options )
	      // sets up relevance handling based on text instructions
	      // options ::= { instructions: '.relevance', questions: '.questions > li' }
	      instructions: function instructions(options) {
	        options = $.extend({
	          instructionSelector: '.relevance',
	          questionSelector: '.questions > li' },
	        options);
	
	        this.find(options.instructionSelector).each(function () {
	          var $this = $(this),
	          value = $this.text(),
	          question = $this.closest(options.questionSelector),
	          toggle = question.prevAll(options.questionSelector),
	          i,
	          answers,
	          nestedToggles,
	          match = false,
	          negate = false;
	
	          // pattern: (If different to <PREVIOUS QUESTION>)
	          if (/If different to/.test(value)) {
	            // assume previous 'li' is the toggle
	            match = true;
	            toggle = toggle.eq(0);
	            value = toggle.find(':checkbox').val();
	            negate = true;
	          } else {
	            value = value.replace(/^.*chose\s+\S([^'"’]+)\S\s+above.*$/, '$1');
	            // which of the previous questions is the toggle?
	            i = 0;
	            while (i < toggle.length) {
	              // does this item have the answer we need?
	              answers = $.map(toggle.eq(i).find('option,:radio,:checkbox'), valueMap);
	              if (valueInArray(value, answers)) {
	                nestedToggles = toggle.eq(i).find(options.questionSelector);
	                if (nestedToggles.length) {
	                  toggle = $(nestedToggles.get().reverse());
	                  i = 0;
	                } else {
	                  match = true;
	                  toggle = toggle.eq(i); // toggle.length becomes 1, loop will exit
	                  i = 1; // exit loop
	                }
	              } else {
	                i++;
	              }
	            }
	          }
	          if (match) {
	            toggle = toggle.add(toggle.find('select,input')).filter('select,:radio,:checkbox');
	            question.relevance('relevantWhen', { name: toggle.attr('name'), value: value, negate: negate });
	          }
	        });
	        return this;
	      } };
	
	    // fallback (default) event handling
	    $(document).on('relevant irrelevant', function (event) {
	      var target = $(event.target);
	      if (event.type === 'relevant') {
	        target.relevance('show');
	      } else {
	        target.relevance('hide');
	      }
	    });
	
	    $.fn.relevance = function (method) {
	      // Method calling logic
	      // http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
	      if (methods[method]) {
	        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	      } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
	        // return methods.init.apply( this, arguments );
	        return this;
	      } else {
	        $.error('Method ' + method + ' does not exist on jQuery.relevance');
	      }
	    };
	  })(jQuery);
	}
	(function ($) {
	  'use strict';
	
	  // window.console.log( 'file-size-validation.js' );
	
	  var displayFileSize;
	
	
	  // bail out if no file API support
	  if (_typeof($('<input type="file">')[0].files) !== 'object') {
	    // duplicate fsize instruction before submit button
	    $('.max-fsize').each(function () {
	      var fsize = $(this),
	      form;
	      form = fsize.closest('.preamble').nextAll('form').eq(0);
	      form.find('.actions').before('<p>' + fsize.parent().html() + '</p>');
	    });
	    return;
	  }
	
	
	  // display file size
	  displayFileSize = function displayFileSize(input) {
	    input.nextAll('.fsize').remove();
	    if (input[0].files.length > 0) {
	      var filesize = input[0].files[0].size / 1024;
	
	      if (filesize >= 1024) {
	        filesize = filesize / 1024;
	        input.after('<span class="fsize">File size: ' + Math.round(filesize * 10) / 10 + 'MB' + '</span>');
	      } else {
	        input.after('<span class="fsize">File size: ' + Math.round(filesize * 10) / 10 + 'KB' + '</span>');
	      }
	    }
	  };
	
	
	  // forms with max file size
	  $('.max-fsize').each(function () {
	    var fsize = $(this),
	    form,
	    maxFileSize;
	
	    // read fsize, assume MB
	    maxFileSize = parseInt(fsize.text().replace(/\D+/g, ''), 10) * 1024 * 1024;
	    // window.console.log( 'found max fsize', maxFileSize );
	
	    // get form (closest form after the preamble)
	    form = fsize.closest('.preamble').nextAll('form').eq(0);
	
	    form.find(':file').on('change', function () {
	      var input = $(this);
	
	      displayFileSize(input);
	
	      // recalculate file sizes
	      var total = 0,
	      valid;
	      $(':file', this.form).each(function (index, element) {
	        var size = element.files.length ? element.files[0].size : 0;
	        total += size; // total = total + size;
	      });
	
	      // is everything valid or invalid?
	      valid = total <= maxFileSize;
	
	      // window.console.info( 'file size validation:', total, '<', maxFileSize, total < maxFileSize );
	
	      $(':file', this.form)
	      // update validity for :file inputs with values
	      .filter(function () {
	        return !!this.value;
	      }).
	      each(function (index, element) {
	        element.setCustomValidity(valid ? '' : 'Attachments are too large');
	      })
	      // blank :file inputs should not have a custom error
	      .filter(function () {
	        return !this.value;
	      }).
	      each(function (index, element) {
	        element.setCustomValidity('');
	      });
	
	    });
	
	  });
	
	})(jQuery);
	(function ($) {
	  'use strict';
	
	  var xorConstraintSubmitHandler = function xorConstraintSubmitHandler(event) {
	    // has one of the required fields been answered?
	    var xorFields = event.data[0],
	    validationMessage = event.data[1],
	    xorConstraintMet = xorFields.filter(function () {
	      return this.value.length > 1;
	    }).length > 0;
	
	
	    xorFields.each(function () {
	      this.setCustomValidity(
	      xorConstraintMet ? '' : validationMessage);
	
	    });
	  },
	
	  xorConstraintChangeHandler = function xorConstraintChangeHandler(event, validationUiRefreshOnly) {
	    if (validationUiRefreshOnly === true) {
	      // pass through to other change handlers
	      return;
	    }
	
	    var xorFields = event.data[0];
	
	    // constraint validity check
	    xorConstraintSubmitHandler(event);
	
	    // trigger validation UI  on other fields?
	    if (event.type === 'change') {
	      xorFields.not(event.target).triggerHandler('change', true);
	    }
	  };
	
	
	
	  // plugin
	  $.fn.initXorConstraint = function (validationMessage) {
	    // custom validation for XOR options
	    this.closest('form').on('submit', [this, validationMessage], xorConstraintSubmitHandler);
	    this.on('change', [this, validationMessage], xorConstraintChangeHandler);
	  };
	})(jQuery);
	
	(function ($) {
	  'use strict';
	
	
	  /* detect required field markers for IE6 */
	  $('abbr[title*="required"]').addClass('required');
	
	
	  // show/hide entire 'question' when fields become irrelevant
	  $('.questions > li').not('.section').
	  on('relevant', function (event) {
	    $(this).relevance('show');
	    event.stopImmediatePropagation();
	  }).
	  on('irrelevant', function (event) {
	    $(this).relevance('hide');
	    event.stopImmediatePropagation();
	  });
	
	
	
	  // click the table cell to click on a matrix option
	  $('.matrix').delegate('td', 'click', function (evt) {
	    $(evt.target).
	    find('input').
	    trigger('click').
	    trigger('change');
	
	  });
	
	})(jQuery);
	
	
	/**
	             * This file initialises forms
	             */
	(function ($) {/* start closure */
	  'use strict';
	  var initValidation = function initValidation() {
	    window.initConstraintValidationAPI();
	    $('form').formValidation('validate');
	  };
	  // now: hookup form validation
	  initValidation();
	  // document ready: hookup form validation
	  $(initValidation);
	  // instruction based relevance
	  if ($('.relevance', 'form').length > 0) {
	    $('#qg-primary-content form').relevance('instructions');
	  }
	})(jQuery); /* end closure */
	(function ($) {
	  'use strict';
	
	
	  // extend jquery to 'toggle required'
	  $.fn.toggleRequired = function (required) {
	    return this.each(function () {
	      var controls = $(this.form.elements[this.name]),
	      question = $(this).closest('.questions > li');
	
	      if (required) {
	        if (question.find('abbr[title="(required)"]').length === 0) {
	          question.find('.label').after(
	          // create ABBR shiv for IE6
	          $(document.createElement('abbr')).
	          attr('title', '(required)').
	          text('*').
	          addClass('required'));
	
	        }
	        controls.attr('required', 'required');
	      } else {
	        controls.removeAttr('required');
	        question.find('abbr[title="(required)"]').remove();
	      }
	    });
	  };
	})(jQuery);
	/*globals qg*/
	// globals
	var qg = { oldIE: false };
	qg.date = function () {
	  'use strict';
	
	
	  var datePackage = {},
	
	  // Public holiday dates for 2010-2014 (viewed 2012-09-28)
	  // http://www.justice.qld.gov.au/fair-and-safe-work/industrial-relations/public-holidays/dates
	  qldHolidays = {
	    // 2010
	    '2010-01-01': 'New Year’s Day',
	    '2010-01-26': 'Australia Day',
	    '2010-04-02': 'Good Friday',
	    '2010-04-03': 'Easter Saturday',
	    '2010-04-05': 'Easter Monday',
	    '2010-04-26': 'Anzac Day',
	    '2010-05-03': 'Labour Day',
	    '2010-06-14': 'Queen’s Birthday',
	    '2010-12-25': 'Christmas Day',
	    '2010-12-27': 'Boxing Day',
	    '2010-12-28': 'Christmas Day holiday',
	
	    // 2011
	    '2011-01-01': 'New Year’s Day',
	    '2011-01-03': 'New Year’s Day holiday',
	    '2011-02-26': 'Australia Day',
	    '2011-04-22': 'Good Friday',
	    '2011-04-23': 'Easter Saturday',
	    '2011-04-25': 'Anzac Day',
	    '2011-04-26': 'Easter Monday',
	    '2011-05-02': 'Labour Day',
	    '2011-06-13': 'Queen’s Birthday',
	    '2011-12-25': 'Christmas Day',
	    '2011-12-26': 'Boxing Day',
	    '2011-12-27': 'Christmas Day holiday',
	
	    // 2012
	    '2012-01-01': 'New Year’s Day',
	    '2012-01-02': 'New Year’s Day holiday',
	    '2012-02-26': 'Australia Day',
	    '2012-04-06': 'Good Friday',
	    '2012-04-07': 'Easter Saturday',
	    '2012-04-09': 'Easter Monday',
	    '2012-04-25': 'Anzac Day',
	    '2012-05-07': 'Labour Day',
	    '2012-06-11': 'Queen’s Diamond Jubilee',
	    '2012-10-01': 'Queen’s Birthday',
	    '2012-12-25': 'Christmas Day',
	    '2012-12-26': 'Boxing Day',
	
	    // 2013
	    '2013-01-01': 'New Year’s Day',
	    '2013-01-28': 'Australia Day holiday',
	    '2013-03-29': 'Good Friday',
	    '2013-03-30': 'Easter Saturday',
	    '2013-04-01': 'Easter Monday',
	    '2013-04-25': 'Anzac Day',
	    '2013-06-10': 'Queen’s Birthday',
	    '2013-10-07': 'Labour Day',
	    '2013-12-25': 'Christmas Day',
	    '2013-12-26': 'Boxing Day',
	
	    // 2014
	    '2014-01-01': 'New Year’s Day',
	    '2014-01-27': 'Australia Day holiday',
	    '2014-04-18': 'Good Friday',
	    '2014-04-19': 'Easter Saturday',
	    '2014-04-21': 'Easter Monday',
	    '2014-04-25': 'Anzac Day',
	    '2014-06-09': 'Queen’s Birthday',
	    '2014-10-06': 'Labour Day',
	    '2014-12-25': 'Christmas Day',
	    '2014-12-26': 'Boxing Day',
	
	    // 2015
	    '2015-01-01': 'New Year’s Day',
	    '2015-01-26': 'Australia Day holiday',
	    '2015-04-03': 'Good Friday',
	    '2015-04-04': 'Easter Saturday',
	    '2015-04-06': 'Easter Monday',
	    '2015-04-25': 'Anzac Day',
	    '2015-06-08': 'Queen’s Birthday',
	    '2015-10-05': 'Labour Day',
	    '2015-12-25': 'Christmas Day',
	    '2015-12-26': 'Boxing Day',
	    '2015-12-28': 'Boxing Day holiday',
	
	    // 2016
	    '2016-01-01': 'New Year’s Day',
	    '2016-01-26': 'Australia Day holiday',
	    '2016-03-25': 'Good Friday',
	    '2016-03-26': 'Easter Saturday',
	    '2016-03-28': 'Easter Monday',
	    '2016-04-25': 'Anzac Day',
	    '2016-06-13': 'Queen’s Birthday',
	    '2016-10-03': 'Labour Day',
	    '2016-12-25': 'Christmas Day',
	    '2016-12-27': 'Christmas Day holiday',
	    '2016-12-26': 'Boxing Day',
	
	    // 2017
	    '2017-01-01': 'New Year’s Day',
	    '2017-01-02': 'New Year’s Day holiday',
	    '2017-01-26': 'Australia Day holiday',
	    '2017-04-14': 'Good Friday',
	    '2017-04-15': 'Easter Saturday',
	    '2017-04-17': 'Easter Monday',
	    '2017-04-25': 'Anzac Day',
	    '2017-06-12': 'Queen’s Birthday',
	    '2017-10-02': 'Labour Day',
	    '2017-12-25': 'Christmas Day',
	    '2017-12-26': 'Boxing Day',
	
	    // 2018
	    '2018-01-01': 'New Year’s Day',
	    '2018-01-26': 'Australia Day holiday',
	    '2018-03-30': 'Good Friday',
	    '2018-03-31': 'Easter Saturday',
	    '2018-04-02': 'Easter Monday',
	    '2018-04-25': 'Anzac Day',
	    '2018-05-07': 'Labour Day',
	    '2018-10-01': 'Queen’s Birthday',
	    '2018-12-25': 'Christmas Day',
	    '2018-12-26': 'Boxing Day' };
	
	
	
	
	  // is a public holiday
	  datePackage.isPublicHoliday = function (date) {
	    var d = date.getDate(),
	    m = date.getMonth() + 1,
	    y = String(date.getFullYear()),
	    dateString = y + (m < 10 ? '-0' : '-') + m + (d < 10 ? '-0' : '-') + d;
	
	
	    // return true, date is a public holiday
	    // TODO, if not a state-wide public holiday and given a latlong, check if it is a show holiday
	    // return false, date is not a public holiday
	    // TODO
	    // return undefined, it is not known if the date is a public holiday (beyond 2 years in the future?)
	
	    return !!qldHolidays[dateString];
	  };
	  return datePackage;
	}();
	(function ($) {
	  'use strict';
	
	
	  // find any textareas with a word count
	  $('.hint').filter(function () {
	    return (/Maximum:\s+\d+\s+words/.test($(this).text()));
	  }).each(function () {
	    var hint = $(this),
	    max = parseInt(hint.text().replace(/Maximum:\s+(\d+)\s+words/, '$1'), 10),
	    textField = hint.closest('label').nextAll('textarea'),
	    counter;
	
	    // add counter
	    counter = $('<span/>').generateId('word-count');
	    //eg. Maximum: 50 words (50 remaining)
	    hint.append(' (', counter, ' remaining)');
	
	    textField.simplyCountable({
	      counter: '#' + counter[0].id,
	      countType: 'words',
	      countDirection: 'down',
	      maxCount: max,
	      onOverCount: function onOverCount() {
	        textField[0].setCustomValidity('Too many words');
	      },
	      onSafeCount: function onSafeCount() {
	        textField[0].setCustomValidity('');
	      } });
	
	  });
	})(jQuery);
	
	//# sourceMappingURL=qg-forms.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict'; /*
	               # Autocomplete for Funnelback site search
	               # Requires generate-id : node_modules/generate-id/dist/generate-id.min.js';
	               */
	
	// onready
	$(function () {
	  'use strict';
	
	  // until find.search supports https, we cannot use suggest feature on https domains
	  // if (/^https/.test(window.location.protocol)) {
	  //     return;
	  // }
	
	  var MAX_SUGGESTIONS = 7;
	
	  // TODO refactor this so functions are not created for every search form found on the page
	
	  // setup for each form
	  // TODO hardcoded to find.search.qld.gov.au
	  if ($('#qg-search-form.qg-web-autocomplete').length <= 0) {
	    $('#qg-search-form').addClass('qg-web-autocomplete');
	  }
	  $('.qg-web-autocomplete').each(function () {
	    var form = this;
	    var searchField = $(form.elements.query).filter('[name="query"]');
	    // var lastSearch = searchField.val();
	    var userTyped = '';
	
	    // ARIA
	    searchField.
	    attr('role', 'combobox').
	    attr('autocomplete', 'off')
	    // both? or list? http://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#aria-autocomplete
	    .attr('aria-autocomplete', 'both');
	
	    // make the search box wider on focus
	    // keep it wide while interacting with the search form (box, button, autosuggest list)
	
	    // create the suggestion box
	    var suggestions = $('<ul role="listbox" class="listbox" aria-busy="true"/>').generateId('suggestbox');
	
	    function closeSuggestions() {
	      suggestions.empty();
	      suggestions.attr('aria-busy', 'true');
	    }
	
	    function prefillInput(value) {
	      searchField[0].value = value;
	      // console.log( 'prefilling', value, userTyped );
	      // http://stackoverflow.com/questions/12047648/setselectionrange-with-on-click-in-chrome-does-not-select-on-second-click
	      setTimeout(function () {
	        searchField[0].setSelectionRange(userTyped.length, searchField[0].value.length);
	      }, 0);
	    }
	
	    function moveFocus(n) {
	      var a = suggestions.find('a');
	      var focus = a.filter('.focus');
	      if (focus.length > 0) {
	        n = (a.index(focus) + n) % a.length;
	        focus.removeClass('focus');
	      } else {
	        n = n > -1 ? 0 : -1;
	      }
	      a = a.eq(n);
	      a.addClass('focus');
	      prefillInput(a.text());
	    }
	
	    // TODO how can we run this on both search forms (content and header) but show suggestions in the appropriate place?
	
	    suggestions.on('click', 'a', function (event) {
	      // should this submit? no. see ARIA instructions
	      event.preventDefault();
	
	      searchField.val($(this).text()).get(0).focus();
	      closeSuggestions();
	    });
	
	    var KEYS = {
	      alt: 18,
	      backspace: 8,
	      delete: 46,
	      down: 40,
	      enter: 13,
	      escape: 27,
	      left: 37,
	      right: 39,
	      tab: 9,
	      up: 38 };
	
	
	    // clicking outside the field closes suggestions
	    $(document).on('click', function (event) {
	      if (searchField.is(event.target)) {
	        event.stopImmediatePropagation();
	      } else {
	        closeSuggestions();
	      }
	    });
	
	    // handle loss of focus due to TAB
	    // need to run this onblur, but NOT when focus remains in the suggestions box
	    // can we check focus in a parent element!? maybe a custom element
	    // <combobox><input><ul></combobox> ??
	    searchField.on('keydown', function (event) {
	      switch (event.which) {
	        case KEYS.up:
	        case KEYS.down:
	          moveFocus(event.which === KEYS.down ? 1 : -1);
	          break;
	        case KEYS.tab:
	          closeSuggestions();}
	
	    });
	    searchField.on('keyup', function (event) {
	      switch (event.which) {
	        case KEYS.escape:
	        case KEYS.enter:
	          closeSuggestions();}
	
	
	      // delete
	      // console.log( event.which );
	    });
	
	    searchField.on('input', function () {
	      searchField.after(suggestions);
	      searchField.attr('aria-owns', suggestions.attr('id'));
	
	      userTyped = this.value;
	      if (userTyped.length < 3) {
	        closeSuggestions();
	        return;
	      }
	
	      // console.log( 'fetch suggestions for ', userTyped );
	
	      $.ajax({
	        // cache! (the URL will be change with the search text)
	        cache: true,
	        dataType: 'jsonp',
	        url: 'https://find.search.qld.gov.au/s/suggest.json?',
	        data: {
	          // TODO read these from search form
	          collection: $(form.elements.collection).filter('[name="collection"]').val() || 'qld-gov',
	          profile: $(form.elements.profile).filter('[name="profile"]').val() || 'qld_preview',
	          show: MAX_SUGGESTIONS,
	          partial_query: userTyped } }).
	
	
	      done(function (data) {
	        if (data.length < 1) {
	          closeSuggestions();
	          return;
	        }
	        // TODO if the user has typed more, filter the matches in this array
	        // should we retreive more than 4 so there is a bit of slack here?
	        // what if ajax repsonses arrive out of sequence? track last match?
	        // console.log( 'suggestions for ', userTyped, data, 'user has typed', searchField.val() );
	        var match = new RegExp(userTyped.replace(/([.+*?\[^\]$(){}=!<>|:-\\,])/g, '\\$1'), 'g');
	        var safeInput = userTyped.replace(/</g, '&lt;');
	        suggestions.html($.map(data, function (value) {
	          var htmlValue = value.replace(/</g, '&lt;').replace(match, '<mark>' + safeInput + '</mark>');
	          // use form.action + default params
	          return '<li><a href="https://find.search.qld.gov.au/s/search.html?collection=qld-gov&profile=qld&query=' + encodeURIComponent(value) + '">' + htmlValue + '</a></li>';
	        }).join('\n'));
	
	        // issue #3: issues with typing over selected suggestion
	        // https://github.com/qld-gov-au/jquery.autocomplete/issues/3
	        // check length is increasing (if not, user is deleting input)
	        // if ( searchField[0].value.length > lastSearch.length ) {
	        // 	// set the value to the best answer and select the untyped portion of the text
	        // 	prefillInput( data[0] );
	        // }
	        searchField.val();
	        suggestions.attr('aria-busy', 'false');
	      });
	
	      // show suggestions box
	      // click on suggestion = fill in form and submit
	      // hover over selection = update 'placeholder' style text
	    });
	  });
	}); // onready

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	
	var _accessibility = __webpack_require__(28);var _accessibility2 = _interopRequireDefault(_accessibility);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	_accessibility2.default.init();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict'; /*global jQuery*/
	(function ($) {
	  'use strict';
	
	  var qgSocialMedia = {
	    config: {
	      $twitterEl: $('.qg-twitter-updates'),
	      $facebookEl: $('.qg-facebook-updates') },
	
	    init: function init() {
	      var twitterSdkScript = 'platform.twitter.com/widgets.js';
	      var facebookSdkScript = 'connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8';
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
	    loadScript: function loadScript(tag, id, sdkUrl) {
	      var createEl;
	      var fjs = document.getElementsByTagName(tag)[0];
	      var p = /^http:/.test(document.location) ? 'http' : 'https';
	      if (!document.getElementById(id)) {
	        createEl = document.createElement(tag);
	        createEl.id = id;
	        createEl.src = p + '://' + sdkUrl;
	        fjs.parentNode.insertBefore(createEl, fjs);
	      }
	    } };
	
	  qgSocialMedia.init();
	})(jQuery);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

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
	  var defaultSettings = {
	    toggle: 'false',
	    hideOthers: 'true' };
	
	  var settingsAttr = {
	    toggle: 'data-toggle',
	    hideOthers: 'data-hide-others' };
	
	  // For parent / group
	  var parentAttr = 'data-qg-pr-parent'; // Optional
	  // For trigger
	  var trgrAttr = 'data-qg-pr';
	  var trgrTargetAttr = 'data-target';
	  var trgrParentAttr = 'data-parent'; // Optional
	  var trgrActiveDataName = 'qgProgressiveRevealActive';
	
	  function saveAttr(target, $parent, setting) {
	    var aVal = settingsAttr[setting];
	
	    if (!$(target).attr(aVal)) {
	      if ($parent.attr(aVal)) {
	        $(target).attr(aVal, $parent.attr(aVal));
	      } else {
	        $(target).attr(aVal, defaultSettings[setting]);
	      }
	    }
	  }
	
	  function handleNonActiveElements(trgr, $parent) {
	    if ($(trgr).attr(settingsAttr.hideOthers) !== 'false') {
	      $parent.find('*[' + trgrAttr + ']').each(function () {
	        if ($(this).data(trgrActiveDataName) !== true && $($(this).attr(trgrTargetAttr)).is(':visible')) {
	          $($(this).attr(trgrTargetAttr)).slideUp();
	        }
	      });
	    }
	  }
	
	  // Set up targets
	  $('*[' + trgrAttr + ']').each(function () {
	    // Find parent
	    var $parent = $('body');
	    if (!$(this).attr(trgrParentAttr) && $($(this).attr(trgrTargetAttr)).closest('*[' + parentAttr + ']')) {
	      $(this).attr(trgrParentAttr, '*[' + parentAttr + ']');
	    }
	    $parent = $(this).closest($(this).attr(trgrParentAttr));
	    // Save settings
	    saveAttr(this, $parent, 'toggle');
	    saveAttr(this, $parent, 'hideOthers');
	  });
	
	  // Trigger action
	  $('*[' + trgrAttr + ']').on('click', function () {
	    // Set target (should reduce file size)
	    var $tgt = $($(this).attr(trgrTargetAttr));
	
	    $(this).data(trgrActiveDataName, true);
	    $(this).toggleClass('toggle-active');
	
	    // Handle other active elements
	    if ($(this).attr(trgrParentAttr)) {
	      var $parent = $(this).closest($(this).attr(trgrParentAttr));
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
	})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';$(function () {
	    'use strict';
	
	    // Polyfill for position: sticky;
	    var Stickyfill = __webpack_require__(14);
	    var stickyfill = Stickyfill();
	    stickyfill.add($('.sticky')[0]);
	
	    // Mobile menu & Search events to prevent both of them opening at the same time
	    $('.qg-show-menu, .qg-show-search').on('click', function () {
	        if ($(this).attr('aria-expanded') === 'false') {
	            $('body').addClass('header-active');
	        } else {
	            $('body').removeClass('header-active');
	        }
	        if ($(this).hasClass('qg-show-menu')) {
	            $('.qg-search-form').collapse('hide');
	        } else {
	            setTimeout(function () {
	                $('.qg-search-form .input-group input[type=text]').focus();
	            }, 300);
	            $('.qg-navigation').collapse('hide');
	        }
	    });
	
	    function reorderTabbing() {
	        if (window.innerWidth > 991) {
	            $('.qg-portal-links button, .qg-portal-links a').attr('tabindex', '2');
	        } else {
	            $('.qg-portal-links button, .qg-portal-links a').attr('tabindex', '0');
	        }
	    }
	
	    reorderTabbing();
	
	    window.addEventListener('resize', function () {
	        reorderTabbing();
	    });
	});

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*!
	 * Stickyfill -- `position: sticky` polyfill
	 * v. 1.1.1 | https://github.com/wilddeer/stickyfill
	 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
	 *
	 * MIT License
	 */
	
	module.exports = (function(doc, win) {
	    if (!doc) {
	        doc = document;
	    }
	
	    if (!win) {
	        win = window;
	    }
	
	    var watchArray = [],
	        scroll,
	        initialized = false,
	        html = doc.documentElement,
	        noop = function() {},
	        checkTimer,
	
	        //visibility API strings
	        hiddenPropertyName = 'hidden',
	        visibilityChangeEventName = 'visibilitychange';
	
	    //fallback to prefixed names in old webkit browsers
	    if (doc.webkitHidden !== undefined) {
	        hiddenPropertyName = 'webkitHidden';
	        visibilityChangeEventName = 'webkitvisibilitychange';
	    }
	
	    //test getComputedStyle
	    if (!win.getComputedStyle) {
	        seppuku();
	    }
	
	    //test for native support
	    var prefixes = ['', '-webkit-', '-moz-', '-ms-'],
	        block = document.createElement('div');
	
	    for (var i = prefixes.length - 1; i >= 0; i--) {
	        try {
	            block.style.position = prefixes[i] + 'sticky';
	        }
	        catch(e) {}
	        if (block.style.position != '') {
	            seppuku();
	        }
	    }
	
	    updateScrollPos();
	
	    //commit seppuku!
	    function seppuku() {
	        init = add = rebuild = pause = stop = kill = noop;
	    }
	
	    function mergeObjects(targetObj, sourceObject) {
	        for (var key in sourceObject) {
	            if (sourceObject.hasOwnProperty(key)) {
	                targetObj[key] = sourceObject[key];
	            }
	        }
	    }
	
	    function parseNumeric(val) {
	        return parseFloat(val) || 0;
	    }
	
	    function updateScrollPos() {
	        scroll = {
	            top: win.pageYOffset,
	            left: win.pageXOffset
	        };
	    }
	
	    function onScroll() {
	        if (win.pageXOffset != scroll.left) {
	            updateScrollPos();
	            rebuild();
	            return;
	        }
	
	        if (win.pageYOffset != scroll.top) {
	            updateScrollPos();
	            recalcAllPos();
	        }
	    }
	
	    //fixes flickering
	    function onWheel(event) {
	        setTimeout(function() {
	            if (win.pageYOffset != scroll.top) {
	                scroll.top = win.pageYOffset;
	                recalcAllPos();
	            }
	        }, 0);
	    }
	
	    function recalcAllPos() {
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            recalcElementPos(watchArray[i]);
	        }
	    }
	
	    function recalcElementPos(el) {
	        if (!el.inited) return;
	
	        var currentMode = (scroll.top <= el.limit.start? 0: scroll.top >= el.limit.end? 2: 1);
	
	        if (el.mode != currentMode) {
	            switchElementMode(el, currentMode);
	        }
	    }
	
	    //checks whether stickies start or stop positions have changed
	    function fastCheck() {
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            if (!watchArray[i].inited) continue;
	
	            var deltaTop = Math.abs(getDocOffsetTop(watchArray[i].clone) - watchArray[i].docOffsetTop),
	                deltaHeight = Math.abs(watchArray[i].parent.node.offsetHeight - watchArray[i].parent.height);
	
	            if (deltaTop >= 2 || deltaHeight >= 2) return false;
	        }
	        return true;
	    }
	
	    function initElement(el) {
	        if (isNaN(parseFloat(el.computed.top)) || el.isCell) return;
	
	        el.inited = true;
	
	        if (!el.clone) clone(el);
	        if (el.parent.computed.position != 'absolute' &&
	            el.parent.computed.position != 'relative') el.parent.node.style.position = 'relative';
	
	        recalcElementPos(el);
	
	        el.parent.height = el.parent.node.offsetHeight;
	        el.docOffsetTop = getDocOffsetTop(el.clone);
	    }
	
	    function deinitElement(el) {
	        var deinitParent = true;
	
	        el.clone && killClone(el);
	        mergeObjects(el.node.style, el.css);
	
	        //check whether element's parent is used by other stickies
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            if (watchArray[i].node !== el.node && watchArray[i].parent.node === el.parent.node) {
	                deinitParent = false;
	                break;
	            }
	        };
	
	        if (deinitParent) el.parent.node.style.position = el.parent.css.position;
	        el.mode = -1;
	    }
	
	    function initAll() {
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            initElement(watchArray[i]);
	        }
	    }
	
	    function deinitAll() {
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            deinitElement(watchArray[i]);
	        }
	    }
	
	    function switchElementMode(el, mode) {
	        var nodeStyle = el.node.style;
	
	        switch (mode) {
	            case 0:
	                nodeStyle.position = 'absolute';
	                nodeStyle.left = el.offset.left + 'px';
	                nodeStyle.right = el.offset.right + 'px';
	                nodeStyle.top = el.offset.top + 'px';
	                nodeStyle.bottom = 'auto';
	                nodeStyle.width = 'auto';
	                nodeStyle.marginLeft = 0;
	                nodeStyle.marginRight = 0;
	                nodeStyle.marginTop = 0;
	                break;
	
	            case 1:
	                nodeStyle.position = 'fixed';
	                nodeStyle.left = el.box.left + 'px';
	                nodeStyle.right = el.box.right + 'px';
	                nodeStyle.top = el.css.top;
	                nodeStyle.bottom = 'auto';
	                nodeStyle.width = 'auto';
	                nodeStyle.marginLeft = 0;
	                nodeStyle.marginRight = 0;
	                nodeStyle.marginTop = 0;
	                break;
	
	            case 2:
	                nodeStyle.position = 'absolute';
	                nodeStyle.left = el.offset.left + 'px';
	                nodeStyle.right = el.offset.right + 'px';
	                nodeStyle.top = 'auto';
	                nodeStyle.bottom = 0;
	                nodeStyle.width = 'auto';
	                nodeStyle.marginLeft = 0;
	                nodeStyle.marginRight = 0;
	                break;
	        }
	
	        el.mode = mode;
	    }
	
	    function clone(el) {
	        el.clone = document.createElement('div');
	
	        var refElement = el.node.nextSibling || el.node,
	            cloneStyle = el.clone.style;
	
	        cloneStyle.height = el.height + 'px';
	        cloneStyle.width = el.width + 'px';
	        cloneStyle.marginTop = el.computed.marginTop;
	        cloneStyle.marginBottom = el.computed.marginBottom;
	        cloneStyle.marginLeft = el.computed.marginLeft;
	        cloneStyle.marginRight = el.computed.marginRight;
	        cloneStyle.padding = cloneStyle.border = cloneStyle.borderSpacing = 0;
	        cloneStyle.fontSize = '1em';
	        cloneStyle.position = 'static';
	        cloneStyle.cssFloat = el.computed.cssFloat;
	
	        el.node.parentNode.insertBefore(el.clone, refElement);
	    }
	
	    function killClone(el) {
	        el.clone.parentNode.removeChild(el.clone);
	        el.clone = undefined;
	    }
	
	    function getElementParams(node) {
	        var computedStyle = getComputedStyle(node),
	            parentNode = node.parentNode,
	            parentComputedStyle = getComputedStyle(parentNode),
	            cachedPosition = node.style.position;
	
	        node.style.position = 'relative';
	
	        var computed = {
	                top: computedStyle.top,
	                marginTop: computedStyle.marginTop,
	                marginBottom: computedStyle.marginBottom,
	                marginLeft: computedStyle.marginLeft,
	                marginRight: computedStyle.marginRight,
	                cssFloat: computedStyle.cssFloat
	            },
	            numeric = {
	                top: parseNumeric(computedStyle.top),
	                marginBottom: parseNumeric(computedStyle.marginBottom),
	                paddingLeft: parseNumeric(computedStyle.paddingLeft),
	                paddingRight: parseNumeric(computedStyle.paddingRight),
	                borderLeftWidth: parseNumeric(computedStyle.borderLeftWidth),
	                borderRightWidth: parseNumeric(computedStyle.borderRightWidth)
	            };
	
	        node.style.position = cachedPosition;
	
	        var css = {
	                position: node.style.position,
	                top: node.style.top,
	                bottom: node.style.bottom,
	                left: node.style.left,
	                right: node.style.right,
	                width: node.style.width,
	                marginTop: node.style.marginTop,
	                marginLeft: node.style.marginLeft,
	                marginRight: node.style.marginRight
	            },
	            nodeOffset = getElementOffset(node),
	            parentOffset = getElementOffset(parentNode),
	
	            parent = {
	                node: parentNode,
	                css: {
	                    position: parentNode.style.position
	                },
	                computed: {
	                    position: parentComputedStyle.position
	                },
	                numeric: {
	                    borderLeftWidth: parseNumeric(parentComputedStyle.borderLeftWidth),
	                    borderRightWidth: parseNumeric(parentComputedStyle.borderRightWidth),
	                    borderTopWidth: parseNumeric(parentComputedStyle.borderTopWidth),
	                    borderBottomWidth: parseNumeric(parentComputedStyle.borderBottomWidth)
	                }
	            },
	
	            el = {
	                node: node,
	                box: {
	                    left: nodeOffset.win.left,
	                    right: html.clientWidth - nodeOffset.win.right
	                },
	                offset: {
	                    top: nodeOffset.win.top - parentOffset.win.top - parent.numeric.borderTopWidth,
	                    left: nodeOffset.win.left - parentOffset.win.left - parent.numeric.borderLeftWidth,
	                    right: -nodeOffset.win.right + parentOffset.win.right - parent.numeric.borderRightWidth
	                },
	                css: css,
	                isCell: computedStyle.display == 'table-cell',
	                computed: computed,
	                numeric: numeric,
	                width: nodeOffset.win.right - nodeOffset.win.left,
	                height: nodeOffset.win.bottom - nodeOffset.win.top,
	                mode: -1,
	                inited: false,
	                parent: parent,
	                limit: {
	                    start: nodeOffset.doc.top - numeric.top,
	                    end: parentOffset.doc.top + parentNode.offsetHeight - parent.numeric.borderBottomWidth -
	                        node.offsetHeight - numeric.top - numeric.marginBottom
	                }
	            };
	
	        return el;
	    }
	
	    function getDocOffsetTop(node) {
	        var docOffsetTop = 0;
	
	        while (node) {
	            docOffsetTop += node.offsetTop;
	            node = node.offsetParent;
	        }
	
	        return docOffsetTop;
	    }
	
	    function getElementOffset(node) {
	        var box = node.getBoundingClientRect();
	
	            return {
	                doc: {
	                    top: box.top + win.pageYOffset,
	                    left: box.left + win.pageXOffset
	                },
	                win: box
	            };
	    }
	
	    function startFastCheckTimer() {
	        checkTimer = setInterval(function() {
	            !fastCheck() && rebuild();
	        }, 500);
	    }
	
	    function stopFastCheckTimer() {
	        clearInterval(checkTimer);
	    }
	
	    function handlePageVisibilityChange() {
	        if (!initialized) return;
	
	        if (document[hiddenPropertyName]) {
	            stopFastCheckTimer();
	        }
	        else {
	            startFastCheckTimer();
	        }
	    }
	
	    function init() {
	        if (initialized) return;
	
	        updateScrollPos();
	        initAll();
	
	        win.addEventListener('scroll', onScroll);
	        win.addEventListener('wheel', onWheel);
	
	        //watch for width changes
	        win.addEventListener('resize', rebuild);
	        win.addEventListener('orientationchange', rebuild);
	
	        //watch for page visibility
	        doc.addEventListener(visibilityChangeEventName, handlePageVisibilityChange);
	
	        startFastCheckTimer();
	
	        initialized = true;
	    }
	
	    function rebuild() {
	        if (!initialized) return;
	
	        deinitAll();
	
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            watchArray[i] = getElementParams(watchArray[i].node);
	        }
	
	        initAll();
	    }
	
	    function pause() {
	        win.removeEventListener('scroll', onScroll);
	        win.removeEventListener('wheel', onWheel);
	        win.removeEventListener('resize', rebuild);
	        win.removeEventListener('orientationchange', rebuild);
	        doc.removeEventListener(visibilityChangeEventName, handlePageVisibilityChange);
	
	        stopFastCheckTimer();
	
	        initialized = false;
	    }
	
	    function stop() {
	        pause();
	        deinitAll();
	    }
	
	    function kill() {
	        stop();
	
	        //empty the array without loosing the references,
	        //the most performant method according to http://jsperf.com/empty-javascript-array
	        while (watchArray.length) {
	            watchArray.pop();
	        }
	    }
	
	    function add(node) {
	        //check if Stickyfill is already applied to the node
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            if (watchArray[i].node === node) return;
	        };
	
	        var el = getElementParams(node);
	
	        watchArray.push(el);
	
	        if (!initialized) {
	            init();
	        }
	        else {
	            initElement(el);
	        }
	    }
	
	    function remove(node) {
	        for (var i = watchArray.length - 1; i >= 0; i--) {
	            if (watchArray[i].node === node) {
	                deinitElement(watchArray[i]);
	                watchArray.splice(i, 1);
	            }
	        };
	    }
	
	    //expose Stickyfill
	    return {
	        stickies: watchArray,
	        add: add,
	        remove: remove,
	        init: init,
	        rebuild: rebuild,
	        pause: pause,
	        stop: stop,
	        kill: kill
	    };
	})


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';$(function () {
	  'use strict';
	
	  //
	  // Namespace
	  //
	
	  var qgLocation = {
	    'fn': {},
	    'vars': {
	      'cookie_name': 'qg-location',
	      'event_coordinates_set': 'qgLocationCoordsSet',
	      'event_locality_set': 'qgLocationLocalitySet',
	      'event_location_found': 'qgLocationFound',
	      'event_location_cleared': 'qgLocationCleared',
	      'error_message': '' } };
	
	
	
	  //
	  // Helpers
	  //
	
	  // Check if we're on a local environment
	  function isDevelopment() {
	    var location = window['location']['hostname'];
	
	    if (location === 'localhost') {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  // Create a cookie
	  function setCookie(cookieName, cookieValue, daysActive) {
	    var cookieEntry = cookieName + '=' + encodeURIComponent(cookieValue) + ';';
	
	    // Timed cookie
	    var rightNow = new Date();
	    rightNow.setTime(rightNow.getTime() + daysActive * 24 * 60 * 60 * 1000);
	
	    var expiryTime = 'expires=' + rightNow.toUTCString();
	    document.cookie = cookieEntry + expiryTime + '; path=/;';
	  }
	
	  // Get a cookie by name
	  function getCookie(cookieName) {
	    var target = cookieName + '=';
	    var cookieJar = decodeURIComponent(document.cookie).split(';');
	
	    var filteredJar = cookieJar.filter(function (cookie, index) {
	      var current = cookie.trim();
	      var matchIndex = current.indexOf(target);
	
	      if (matchIndex === 0) {
	        return true;
	      }
	    });
	
	    if (filteredJar.length > 0) {
	      var chosenCookie = filteredJar[0].trim();
	      return chosenCookie.substring(target.length, chosenCookie.length);
	    } else {
	      return '';
	    }
	  }
	
	  // Delete a cookie by name
	  function deleteCookie(cookieName) {
	    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	  }
	
	  // Hide the dropdown as the native dropdown() function doesn't work
	  function closeDropdown() {
	    $('.header-location').removeClass('show');
	    $('.header-location .dropdown-toggle').attr('aria-expanded', 'false');
	    $('.header-location .qg-location-setter').removeClass('show');
	  }
	
	  // Handle custom events
	  function customEventHandler(event, eventName) {
	    switch (eventName) {
	      case qgLocation['vars']['event_coordinates_set']:
	        qgLocation.fn.getLocality();
	        break;
	      case qgLocation['vars']['event_locality_set']:
	        qgLocation.fn.getCoordinates();
	        break;
	      case qgLocation['vars']['event_location_found']:
	        qgLocation.fn.setLocationName();
	        qgLocation.fn.initServiceCentre();
	        break;
	      case qgLocation['vars']['event_location_cleared']:
	        qgLocation.fn.resetLocationContainers();
	        break;}
	
	  }
	
	  // Event debouncer
	  function debouncer(func, wait, immediate) {
	    var timeout;
	
	    return function executedFunction() {
	      var context = this;
	      var args = arguments;
	
	      var later = function later() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	
	      var callNow = immediate && !timeout;
	
	      clearTimeout(timeout);
	
	      timeout = setTimeout(later, wait);
	
	      if (callNow) func.apply(context, args);
	    };
	  }
	
	  //
	  // Events
	  //
	
	  // Keep location dropdown open the elements inside of the dropdown are clicked
	  $('.header-location .dropdown-menu').click(function (e) {
	    var eventTarget = event['target'];
	    var targetElement = eventTarget['tagName'].toLowerCase();
	
	    // Close suburb list if clicking outside
	    if (event['keyCode'] !== 40 && event['keyCode'] !== 38) {
	      qgLocation.fn.closeSuburbsIfOutside(e);
	    }
	
	    if (targetElement !== 'button') {
	      e.stopPropagation();
	    }
	  });
	
	  // Prompt the browser to access inbuilt geolocation functionality
	  qgLocation.fn.getDeviceLocation = function (event) {
	    event.stopPropagation();
	
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(qgLocation.fn.processPositionData, qgLocation.fn.failure);
	    }
	  };
	
	  // Clear position data from browser
	  qgLocation.fn.deletePositionData = function (event) {
	    event.stopPropagation();
	
	    var cookieName = qgLocation['vars']['cookie_name'];
	    deleteCookie(cookieName);
	
	    // Notify the rest of the page
	    $('body').trigger('custom', qgLocation['vars']['event_location_cleared']);
	  };
	
	  // Close the popup
	  qgLocation.fn.closeLocationPopup = function (event) {
	    event.stopPropagation();
	
	    // Manually close the dropdown
	    closeDropdown();
	
	    // Add class to give immediate effect instead of transition
	    $('.header-location .dropdown-menu').addClass('closed');
	
	    // Remove this class after dropdown has closed
	    setTimeout(function () {
	      $('.header-location .dropdown-menu').removeClass('closed');
	    }, 300);
	  };
	
	  // Manually search for location
	  qgLocation.fn.initManualSearch = function (event) {
	    var inputField = event['target'];
	    var keyCode = event['keyCode'];
	    var inputValue = inputField['value'];
	    var numChars = inputValue.length;
	
	    $('.qg-location-setter-form input[type=text]').removeClass('error');
	
	    if (keyCode === 40) {
	      if ($('.qg-location-setter-autocomplete button').length) {
	        $('.qg-location-setter-autocomplete button')[0].focus();
	        $('.qg-location-setter-form input[type=text]').attr('data-navindex', '0');
	      }
	    } else if (numChars >= 3) {
	      if (isDevelopment()) {
	        // Demonstrate functionality locally
	        var exampleData = qgLocation.fn.revealExampleLocations();
	        qgLocation.fn.displaySuburbSuggestions(exampleData);
	      } else {
	        // Query the ArcGIS API with location
	        var targetURL = inputField.getAttribute('data-suburbs');
	
	        $.ajax({
	          cache: true,
	          dataType: 'json',
	          url: targetURL,
	          data: {
	            suburb: inputValue },
	
	          success: qgLocation.fn.displaySuburbSuggestions });
	
	      }
	    } else {
	      $('.qg-location-setter-autocomplete').addClass('hide');
	    }
	  };
	
	  qgLocation.fn.keyboardNavigation = function (event) {
	    var navIndex = parseInt($('.qg-location-setter-form input[type=text]').attr('data-navindex'));
	    if (event['keyCode'] === 40) {
	      navIndex++;
	      $('.qg-location-setter-autocomplete button')[navIndex].focus();
	    } else if (event['keyCode'] === 38) {
	      if (navIndex > 0) {
	        navIndex--;
	        $('.qg-location-setter-autocomplete button')[navIndex].focus();
	      } else {
	        $('.qg-location-setter-form input[type=text]').focus();
	      }
	    }
	    $('.qg-location-setter-form input[type=text]').attr('data-navindex', navIndex);
	  };
	
	  // Get suburb from suggestion click
	  qgLocation.fn.getManualSuburbName = function (event) {
	    event.stopPropagation();
	
	    var suburbButton = event['target'];
	    var suburbName = suburbButton.getAttribute('data-location');
	    var suburbFullArea = $(suburbButton).text();
	
	    // Update the input field
	    var inputField = $('.qg-location-setter-form input[type=text]');
	    inputField.attr('data-choice', suburbName);
	    inputField.attr('data-choice-full', suburbFullArea);
	    inputField.val(suburbFullArea);
	
	    // Hide the suggestions
	    $('.qg-location-setter-autocomplete').addClass('hide');
	  };
	
	  // Save manually selected suburb
	  qgLocation.fn.setManualSuburb = function (event) {
	    event.stopPropagation();
	    var inputField = $('.qg-location-setter-form input[type=text]');
	    var inputError = $('.qg-location-setter-error');
	
	    if (inputField.val().length > 2) {
	      inputError.addClass('hide');
	
	      // Get manual suburb selection
	      var savedSuburb = inputField.attr('data-choice');
	      var savedSuburbFull = inputField.attr('data-choice-full');
	
	      if (savedSuburb === '') {
	        inputField.addClass('error');
	        inputError.removeClass('hide');
	      } else {
	        // Manually close the dropdown
	        closeDropdown();
	
	        qgLocation.fn.saveLocality(savedSuburb, savedSuburbFull);
	      }
	    } else {
	      inputField.addClass('error');
	      inputError.removeClass('hide');
	    }
	  };
	
	  // Prevent form from performing a submission
	  qgLocation.fn.locationSubmitHandler = function (event) {
	    event.preventDefault();
	  };
	
	  // Close popup if clicking outside
	  qgLocation.fn.closePopupIfOutside = function (e) {
	    if (!$(e.target).closest('#qg-location-dropdown').length && !$(e.target).is('#qg-location-dropdown') && !$(e.target).is('.dropdown-toggle') && $('.header-location .qg-location-setter').hasClass('show')) {
	      // Manually close the dropdown
	      closeDropdown();
	
	      // Add class to give immediate effect instead of transition
	      $('.header-location .dropdown-menu').addClass('closed');
	
	      // Remove this class after dropdown has closed
	      setTimeout(function () {
	        $('.header-location .dropdown-menu').removeClass('closed');
	      }, 300);
	    }
	  };
	
	  // Close suburb list if clicking outside
	  qgLocation.fn.closeSuburbsIfOutside = function (event) {
	    if (!$(event['target']).closest('.qg-location-setter-form').length && event['view'] !== undefined) {
	      $('.qg-location-setter-autocomplete').addClass('hide');
	    }
	  };
	
	  //
	  // Local data
	  //
	
	  // Get local example of Google Maps API
	  qgLocation.fn.getExampleLocation = function () {
	    var exampleResponse = { 'results': [{ 'address_components': [{ 'long_name': 'Browning St near Boundary Rd, stop 5', 'short_name': 'Browning St near Boundary Rd, stop 5', 'types': ['establishment', 'point_of_interest', 'transit_station'] }, { 'long_name': 'South Brisbane', 'short_name': 'South Brisbane', 'types': ['locality', 'political'] }, { 'long_name': 'Brisbane City', 'short_name': 'Brisbane', 'types': ['administrative_area_level_2', 'political'] }, { 'long_name': 'Queensland', 'short_name': 'QLD', 'types': ['administrative_area_level_1', 'political'] }, { 'long_name': 'Australia', 'short_name': 'AU', 'types': ['country', 'political'] }, { 'long_name': '4101', 'short_name': '4101', 'types': ['postal_code'] }], 'formatted_address': 'Browning St near Boundary Rd, stop 5, South Brisbane QLD 4101, Australia', 'geometry': { 'location': { 'lat': -27.477727, 'lng': 153.01314 }, 'location_type': 'GEOMETRIC_CENTER', 'viewport': { 'northeast': { 'lat': -27.4763780197085, 'lng': 153.0144889802915 }, 'southwest': { 'lat': -27.4790759802915, 'lng': 153.0117910197085 } } }, 'place_id': 'ChIJufdIyqBQkWsRlnW4qQxzN94', 'types': ['establishment', 'point_of_interest', 'transit_station'] }], 'status': 'OK' };
	
	    return exampleResponse;
	  };
	
	  // Get local example of suburb lists
	  qgLocation.fn.revealExampleLocations = function () {
	    var exampleSuburbs = [{ 'name': 'coolabine, sunshine coast regional', 'name_friendly': 'Coolabine, Sunshine Coast Regional', 'name_formatted': '<b>Coola</b>bine, Sunshine Coast Regional', 'suburb': 'Coolabine' }, { 'name': 'coolabunia, south burnett regional', 'name_friendly': 'Coolabunia, South Burnett Regional', 'name_formatted': '<b>Coola</b>bunia, South Burnett Regional', 'suburb': 'Coolabunia' }, { 'name': 'cooladdi, murweh shire', 'name_friendly': 'Cooladdi, Murweh Shire', 'name_formatted': '<b>Coola</b>ddi, Murweh Shire', 'suburb': 'Cooladdi' }, { 'name': 'coolana, somerset regional', 'name_friendly': 'Coolana, Somerset Regional', 'name_formatted': '<b>Coola</b>na, Somerset Regional', 'suburb': 'Coolana' }, { 'name': 'coolangatta, gold coast city', 'name_friendly': 'Coolangatta, Gold Coast City', 'name_formatted': '<b>Coola</b>ngatta, Gold Coast City', 'suburb': 'Coolangatta' }];
	
	    return exampleSuburbs;
	  };
	
	  // Get local example of service centres
	  qgLocation.fn.getExampleServiceCentres = function () {
	    var exampleCentres = { 'question': { 'rawInputParameters': { 'origin': ['-27.477413799999997;153.01329099999998'] } }, 'response': { 'resultPacket': { 'results': [{ 'rank': 1, 'title': 'Justices of the Peace Branch', 'kmFromOrigin': 0.2, 'metaData': { 'area': 'Brisbane City', 'hours': 'Monday to Friday, 10am-2pm|Mon,Mon,Tues,Tues,Wednes,Wednes,Thurs,Thurs,Fri,Fri,', 'agency': 'DJAG', 'address2': 'Level 6, 154 Melbourne Street', 'address1': 'See reception', 'viewpageassetid': '21806', 'postcode': '4101', 'type': 'Service', 's': 'Volunteer Justice of the Peace or Commissioner for Declarations', 't': 'Justices of the Peace Branch', 'phone': '1300 301 147', 'datasource': 'JP', 'suburb': 'SOUTH BRISBANE', 'location': '-27.4761712;153.0149019', 'id': '92' } }, { 'rank': 2, 'title': 'Family Court Brisbane', 'kmFromOrigin': 1.2, 'metaData': { 'area': 'Brisbane City', 'hours': 'Monday, Thursday and Friday 9am-2pm Note this service is for Family Court matters only. Hours of service may vary daily.|Mon,Mon,Thurs,Thurs,Fri,Fri,', 'agency': 'DJAG', 'address2': '(Entrance via Tank Street)', 'address1': 'Corner North Quay and Tank Streets', 'viewpageassetid': '21806', 'postcode': '4000', 'type': 'Service', 's': 'Hours of service vary daily, please phone before attending. Volunteer Justice of the Peace or Commissioner for Declarations', 't': 'Family Court Brisbane', 'datasource': 'JP', 'suburb': 'BRISBANE', 'location': '-27.468426;153.019921', 'id': '62' } }] } } };
	
	    return exampleCentres;
	  };
	
	  //
	  // Functions
	  //
	
	  // Initialiser
	  qgLocation.fn.init = function () {
	    // Set up events
	    qgLocation.fn.setUpListeners();
	
	    // Check for saved data
	    var storedData = qgLocation.fn.getStoredLocation();
	
	    if (storedData) {
	      var dataEvent = '';
	
	      // Check for coordinates
	      if (typeof storedData['latitude'] !== 'undefined') {
	        if (storedData['locality'] !== 'unknown') {
	          // All location data found, update the page
	          dataEvent = qgLocation['vars']['event_locality_set'];
	        } else {
	          // Coordinates exist, find locality
	          dataEvent = qgLocation['vars']['event_coordinates_set'];
	        }
	      }
	
	      // Notify the rest of the page
	      $('body').trigger('custom', dataEvent);
	    }
	  };
	
	  // Set up input field listeners
	  qgLocation.fn.setUpListeners = function () {
	    var suburbInputField = $('.qg-location-setter-form input[type=text]');
	    suburbInputField.on('keyup', debouncer(qgLocation.fn.initManualSearch, 200));
	  };
	
	  // Check for saved location
	  qgLocation.fn.getStoredLocation = function () {
	    var cookieName = qgLocation['vars']['cookie_name'];
	    var storedData = getCookie(cookieName);
	
	    if (storedData !== '') {
	      var locationData = JSON.parse(storedData);
	      return locationData;
	    } else {
	      return null;
	    }
	  };
	
	  // Find coordinates based on address
	  qgLocation.fn.getCoordinates = function () {
	    var storedData = qgLocation.fn.getStoredLocation();
	
	    if (typeof storedData['latitude'] === 'undefined') {
	      var address = storedData['address'];
	
	      if (address) {
	        if (isDevelopment()) {
	          // Demonstrate functionality locally
	          var exampleData = qgLocation.fn.getExampleLocation();
	          qgLocation.fn.processCoordinates(exampleData);
	        } else {
	          // Query the Google Maps API with location
	          var targetURL = $('.qg-location-default').attr('data-geolocation');
	          var locationAddress = storedData['address'];
	
	          $.ajax({
	            cache: true,
	            dataType: 'json',
	            url: targetURL,
	            data: {
	              address: locationAddress },
	
	            success: qgLocation.fn.processCoordinates });
	
	        }
	      }
	    } else {
	      // Notify the rest of the page
	      $('body').trigger('custom', qgLocation['vars']['event_location_found']);
	    }
	  };
	
	  // The user has allowed geolocation
	  qgLocation.fn.processPositionData = function (response) {
	    var positionData = response['coords'];
	
	    qgLocation.fn.setPositionData(positionData);
	    closeDropdown();
	  };
	
	  // The user has blocked geolocation
	  qgLocation.fn.failure = function (response) {
	    var responseMessage = response['message'];
	
	    qgLocation['vars']['error_message'] = responseMessage;
	  };
	
	  // Save the position data to the browser
	  qgLocation.fn.setPositionData = function (positionData) {
	    var location = {
	      'latitude': positionData['latitude'],
	      'longitude': positionData['longitude'],
	      'locality': 'unknown' };
	
	
	    // Save to cookie
	    qgLocation.fn.saveLocationCookie(location);
	
	    // Notify the rest of the page
	    $('body').trigger('custom', qgLocation['vars']['event_coordinates_set']);
	  };
	
	  // Save data to the location cookie
	  qgLocation.fn.saveLocationCookie = function (cookieData) {
	    var cookieName = qgLocation['vars']['cookie_name'];
	    var cookieValue = JSON.stringify(cookieData);
	    var daysActive = 7;
	
	    setCookie(cookieName, cookieValue, daysActive);
	  };
	
	  // Get the locality from Google Maps API
	  qgLocation.fn.getLocality = function () {
	    var storedData = qgLocation.fn.getStoredLocation();
	
	    if (isDevelopment()) {
	      // Demonstrate functionality locally
	      var exampleData = qgLocation.fn.getExampleLocation();
	      qgLocation.fn.processLocality(exampleData);
	    } else {
	      // Query the Google Maps API with location
	      var targetURL = $('.qg-location-default').attr('data-geolocation');
	      var locationOrigin = storedData['latitude'] + ',' + storedData['longitude'];
	
	      $.ajax({
	        cache: true,
	        dataType: 'json',
	        url: targetURL,
	        data: {
	          address: locationOrigin },
	
	        success: qgLocation.fn.processLocality });
	
	    }
	  };
	
	  // Process the Google Maps API data for a suburb
	  qgLocation.fn.processLocality = function (jsonResponse) {
	    var allAddresses = jsonResponse['results'];
	    var targetType = 'locality';
	    var locality = 'unknown';
	
	    // Check over all address matches
	    for (var index = 0; index < allAddresses.length; index++) {
	      var address = allAddresses[index];
	      var addressComponents = address['address_components'];
	
	      // Break out of the loop if a locality is found
	      if (locality !== 'unknown') {
	        break;
	      }
	
	      // Check over all address components
	      for (var componentIndex = 0; componentIndex < addressComponents.length; componentIndex++) {
	        var component = addressComponents[componentIndex];
	        var componentTypes = component['types'];
	
	        // Find the locality component
	        if (componentTypes.indexOf(targetType) !== -1) {
	          locality = component['short_name'];
	          break;
	        }
	      }
	    }
	
	    // Proceed if an address is found
	    if (locality !== 'unknown') {
	      qgLocation.fn.saveLocality(locality);
	    }
	  };
	
	  // Process the Google Maps API data for coordinates
	  qgLocation.fn.processCoordinates = function (jsonResponse) {
	    var allAddresses = jsonResponse['results'];
	    var coordinates = null;
	
	    // Check over all address matches
	    for (var index = 0; index < allAddresses.length; index++) {
	      var address = allAddresses[index];
	      var geometry = address['geometry'];
	
	      if (typeof geometry !== 'undefined') {
	        coordinates = geometry['location'];
	
	        if (typeof coordinates !== 'undefined') {
	          break;
	        }
	      }
	    }
	
	    // Proceed if coordinates are found
	    if (coordinates !== null) {
	      qgLocation.fn.saveCoordinates(coordinates);
	    }
	  };
	
	  // Save the target locality
	  qgLocation.fn.saveLocality = function (locality, address) {
	    var storedData = qgLocation.fn.getStoredLocation();
	
	    // Handle no cookie present
	    if (storedData === null) {
	      storedData = {
	        'locality': 'unknown' };
	
	    }
	
	    // Handle optional address value
	    if (address) {
	      storedData['address'] = address;
	    }
	
	    storedData['locality'] = locality;
	
	    // Save to cookie
	    qgLocation.fn.saveLocationCookie(storedData);
	
	    // Notify the rest of the page
	    $('body').trigger('custom', qgLocation['vars']['event_locality_set']);
	  };
	
	  // Save the suburb coordinates
	  qgLocation.fn.saveCoordinates = function (coordinates) {
	    var storedData = qgLocation.fn.getStoredLocation();
	
	    // Handle no cookie present
	    if (storedData === null) {
	      storedData = {};
	    }
	
	    storedData['latitude'] = coordinates['lat'];
	    storedData['longitude'] = coordinates['lng'];
	
	    // Save to cookie
	    qgLocation.fn.saveLocationCookie(storedData);
	
	    // Notify the rest of the page
	    $('body').trigger('custom', qgLocation['vars']['event_location_found']);
	  };
	
	  // Populate the suburb suggestion list
	  qgLocation.fn.displaySuburbSuggestions = function (allSuburbs) {
	    var targetContainer = $('.qg-location-setter.show .qg-location-setter-form');
	    var suggestionHTML = '';
	
	    if (targetContainer) {
	      var suggestionList = targetContainer.find('.qg-location-setter-autocomplete');
	
	      // Check for returned data
	      if (allSuburbs.length > 0) {
	        suggestionHTML = '<ul>';
	
	        allSuburbs.forEach(function (suburbData) {
	          var suburbName = suburbData['suburb'];
	          var suburbHTML = suburbData['name_formatted'];
	
	          suggestionHTML += '<li><button class="qg-location-manual" tabindex="-1" data-location="' + suburbName + '">' + suburbHTML + '</button></li>';
	        });
	
	        suggestionHTML += '</ul>';
	
	        suggestionList.removeClass('hide');
	      }
	
	      suggestionList.html(suggestionHTML);
	    }
	  };
	
	  // Visually set the location data
	  qgLocation.fn.setLocationName = function () {
	    var storedData = qgLocation.fn.getStoredLocation();
	    var locality = storedData['locality'];
	
	    // Update header
	    $('.header-location .dropdown-toggle').attr('aria-label', 'Your location is ' + locality);
	    $('.header-location .location-name').text(locality);
	
	    // Update all location containers
	    setTimeout(function () {
	      $('.qg-location-default').addClass('hide');
	      $('.qg-location-set').removeClass('hide');
	    }, 300);
	  };
	
	  // Initialise functions for finding the nearest service centre
	  qgLocation.fn.initServiceCentre = function () {
	    var serviceCentreModule = $('.qg-service-centre__wrapper');
	
	    if (serviceCentreModule.length > 0) {
	      var storedData = qgLocation.fn.getStoredLocation();
	      var centreTypes = serviceCentreModule.attr('data-types').split('; ');
	      var noneIndex = centreTypes.indexOf('None');
	
	      // Remove "None" from centre types
	      if (noneIndex !== -1) {
	        centreTypes.splice(noneIndex, 1);
	      }
	
	      if (isDevelopment()) {
	        // Demonstrate functionality locally
	        var exampleData = qgLocation.fn.getExampleServiceCentres();
	        qgLocation.fn.findServiceCentre(exampleData);
	      } else {
	        // Query Funnelback with location and service centre types
	        var locationOrigin = storedData['latitude'] + ',' + storedData['longitude'];
	        var targetURL = serviceCentreModule.attr('data-centres');
	        var queryMetadata = centreTypes.join('+');
	
	        $.ajax({
	          cache: true,
	          dataType: 'json',
	          url: targetURL,
	          data: '&origin=' + locationOrigin + '&meta_datasource_orsand=' + queryMetadata,
	          success: qgLocation.fn.findServiceCentre });
	
	      }
	    }
	  };
	
	  // Process the service centre response
	  qgLocation.fn.findServiceCentre = function (jsonResponse) {
	    var results = jsonResponse['response']['resultPacket']['results'];
	    var centreData = null;
	    var centreContainer = $('.qg-service-centre__results');
	    var centreHTML = '';
	
	    if (results.length > 0) {
	      centreData = results[0];
	    }
	
	    if (centreData) {
	      var centreName = centreData['metaData']['t'];
	      var centreDistance = centreData['kmFromOrigin'];
	      var centreAddress1 = centreData['metaData']['address1'];
	      var centreAddress2 = centreData['metaData']['address2'];
	
	      // Build URL
	      var centreType = centreData['metaData']['datasource'].toLowerCase();
	      var centreURL = centreContainer.attr('data-' + centreType);
	      centreURL += centreName;
	
	      // Build HTML
	      centreHTML += '<a href="' + centreURL + '" class="qg-service-centre__link" data-analytics-link-group="qg-nearest-service-centre-details">' + centreName + '</a>';
	      centreHTML += '<ul class="qg-service-centre-list">';
	      centreHTML += '<li class="qg-service-centre-list-item">';
	      centreHTML += '<a href="' + centreURL + '" data-analytics-link-group="qg-nearest-service-centre-services">Services available</a>';
	      centreHTML += '</li>';
	      centreHTML += '<li class="qg-service-centre-list-item">' + centreDistance + ' km away</li>';
	      centreHTML += '<li class="qg-service-centre-list-item">';
	      if (centreAddress1 !== undefined) {
	        centreHTML += '<span class="qg-service-centre__address">' + centreAddress1 + '</span>';
	      }
	      if (centreAddress2 !== undefined) {
	        centreHTML += '<span class="qg-service-centre__address">' + centreAddress2 + '</span>';
	      }
	      centreHTML += '</li>';
	      centreHTML += '</ul>';
	    } else {
	      centreHTML += '<p>Browse all service centre locations to find the nearest one to you.</p>';
	    }
	
	    centreContainer.html(centreHTML);
	  };
	
	  // Restore location containers to default state after location cleared
	  qgLocation.fn.resetLocationContainers = function () {
	    var defaultLocation = 'unknown';
	    var inputField = $('.qg-location-setter-form input[type=text]');
	
	    // Update header
	    closeDropdown();
	    $('.header-location .dropdown-toggle').attr('arisa-label', 'Your location is ' + defaultLocation);
	    $('.header-location .location-name').text(defaultLocation);
	
	    // Update suburb section
	    $('.qg-location-setter-error').addClass('hide');
	    $('.qg-location-setter-form input[type=text]').removeClass('error');
	    inputField.attr('data-choice', '');
	    inputField.attr('data-choice-full', '');
	    inputField.val('');
	
	    // Update all location containers
	    setTimeout(function () {
	      $('.qg-location-default').removeClass('hide');
	      $('.qg-location-set').addClass('hide');
	    }, 300);
	  };
	
	  // Close service centre collapsible
	  qgLocation.fn.closeServiceCentre = function () {
	    $('#qg-service-centre-location-setter').collapse('hide');
	  };
	
	  $('.qg-location-setter .set-location').on('focus', function () {
	    $('.qg-location-setter-autocomplete').addClass('hide');
	  });
	
	  //
	  // Ready
	  //
	
	  $(document).ready(function () {
	    var locationID = '.header-location';
	
	    if ($(locationID).length > 0) {
	      qgLocation.fn.init();
	    }
	  });
	
	  // Binds
	  $('body').on('custom', customEventHandler);
	  $('body').on('click', '.qg-location-setter .detect-location', qgLocation.fn.getDeviceLocation);
	  $('body').on('click', '.qg-location-setter .clear-location', qgLocation.fn.deletePositionData);
	  $('body').on('click', '.qg-location-setter .qg-location-manual', qgLocation.fn.getManualSuburbName);
	  $('body').on('click', '.qg-location-setter .set-location', qgLocation.fn.setManualSuburb);
	  $('body').on('click', '.qg-location-setter .qg-location-setter-close', qgLocation.fn.closeLocationPopup);
	  $('body').on('submit', '.qg-location-setter .qg-location-setter-form', qgLocation.fn.locationSubmitHandler);
	  $('body').on('click', qgLocation.fn.closePopupIfOutside);
	  $('body').on('click', qgLocation.fn.closeSuburbsIfOutside);
	  $('body').on('click', '.qg-location-setter-close', qgLocation.fn.closeServiceCentre);
	  $('body').on('keydown', '.qg-location-setter-autocomplete button', qgLocation.fn.keyboardNavigation);
	});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict'; /**
	               * if there is not a #document-licence present
	               * this script will add one based on the DCTERMS.license metadata
	               */
	/*globals qg*/
	(function ($, qg) {
	  'use strict';
	  var licenceOptions = {
	    url: '//creativecommons.org/licenses/',
	    imgSrc: qg.cdn + qg.swe.paths.images + '/licences/',
	    types: {
	      'by': {
	        'name': 'Attribution',
	        'imgName': 'by-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY 3.0 AU)',
	            'urlPath': 'by/3.0/au/' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY 4.0)',
	            'urlPath': 'by/4.0/' } } },
	
	
	
	      'by-sa': {
	        'name': 'Attribution-ShareAlike',
	        'imgName': 'by-sa-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY-SA 3.0 AU)',
	            'urlPath': 'by-sa/3.0/au' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY-SA 4.0)',
	            'urlPath': 'by-sa/4.0/' } } },
	
	
	
	      'by-nd': {
	        'name': 'Attribution-NoDerivatives',
	        'imgName': 'by-nd-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY-ND 3.0 AU))',
	            'urlPath': 'by-nd/3.0/au/' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY-ND 4.0)',
	            'urlPath': 'by-nd/4.0/' } } },
	
	
	
	      'by-nc': {
	        'name': 'Attribution-NonCommercial',
	        'imgName': 'by-nc-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY-NC 3.0 AU)',
	            'urlPath': 'by-nc/3.0/au/' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY-NC 4.0)',
	            'urlPath': 'by-nc/4.0/' } } },
	
	
	
	      'by-nc-sa': {
	        'name': 'Attribution-NonCommercial-ShareAlike',
	        'imgName': 'by-nc-sa-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY-NC-SA 3.0 AU)',
	            'urlPath': 'by-nc-sa/3.0/au/' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY-NC-SA 4.0)',
	            'urlPath': 'by-nc-sa/4.0/' } } },
	
	
	
	      'by-nc-nd': {
	        'name': 'Attribution-NonCommercial-NoDerivatives',
	        'imgName': 'by-nc-nd-80x15.png',
	        'versions': {
	          '3.0': {
	            'title': '3.0 Australia (CC BY-NC-ND 3.0 AU)',
	            'urlPath': 'by-nc-nd/3.0/au/' },
	
	          '4.0': {
	            'title': '4.0 International (CC BY-NC-ND 4.0)',
	            'urlPath': 'by-nc-nd/4.0/' } } } } };
	
	
	
	
	
	
	  var getLicenseVal = function getLicenseVal(url) {
	    var urlArr = /\/licenses\/([a-zA-Z0-9-/.]+)/g.exec(url)[1].split('/').filter(function (e) {
	      return e;
	    });
	
	    var abbreviation = urlArr[0];
	    var version = urlArr[1];
	
	    return {
	      name: licenceOptions.types[abbreviation].name,
	      url: licenceOptions.url,
	      imgPath: licenceOptions.imgSrc + licenceOptions.types[abbreviation].imgName,
	      version: licenceOptions.types[abbreviation].versions[version] };
	
	  };
	
	  // add licence if not present
	  if (!document.getElementById('document-licence')) {
	    // get licence URL from metadata
	    $('meta').filter('[name="DCTERMS.license"]').filter(function () {
	      return new RegExp('https?://creativecommons.org/licenses/[a-zA-Z0-9\\-\\/\\.]+').test(this.content);
	    }).eq(0).each(function () {
	      var url = this.content;
	      var licence = getLicenseVal(url);
	      // if we have licence details…
	      if (licence) {
	        $('.qg-content-footer').append(
	        '<p id="document-licence">' +
	        '<a rel="license" href="' + licence.url + licence.version.urlPath + '" title="Text available under Creative Commons ' + licence.name + ' ' + licence.version.title + ' licence">' +
	        '<img src="' + licence.imgPath + '" alt="Creative Commons ' + licence.name + ' ' + licence.version.title + '" />' +
	        '</a>' +
	        '</p>');
	
	      }
	    });
	  }
	})(jQuery, qg);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/*aside carousel play and pause feature*/
	'use strict';
	
	(function ($) {
	  var carousels = [];
	  var eqHeight = function eqHeight(carousels) {
	    carousels.forEach(function (e) {
	      var items = $('#' + e + '').find('.carousel-item');
	      var heights = [];
	      var tallest = void 0;
	      if (items.length) {
	        var normalizeHeights = function normalizeHeights() {
	          items.each(function () {
	            heights.push($(this).height());
	          });
	          tallest = Math.max.apply(null, heights);
	          items.each(function () {
	            $(this).css('min-height', tallest + 'px');
	          });
	        };
	        normalizeHeights();
	        $(window).on('resize orientationchange', function () {
	          tallest = 0;
	          heights.length = 0;
	          items.each(function () {
	            $(this).css('min-height', '0');
	          });
	          normalizeHeights();
	        });
	      }
	    });
	  };
	  $('.qg-featured .carousel.slide').each(function (i, e) {
	    var carousel = $(e).attr('id');
	    carousels.push(carousel);
	    $(this).attr('data-state', 'cycle');
	    $('#' + carousel + '').find('.toggleCarousel').click(function (e) {
	      e.preventDefault();
	      var $parentCarousel = $(this).parents('div.carousel.slide');
	      $parentCarousel.attr('data-state') === 'cycle' ? $parentCarousel.attr('data-state', 'pause') : $parentCarousel.attr('data-state', 'cycle');
	      $parentCarousel.carousel($parentCarousel.attr('data-state'));
	      $(this).find('i').toggleClass('fa-sync fa-pause');
	    });
	  });
	  window.onload = function () {
	    eqHeight(carousels);
	  };
	})(jQuery);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	  'use strict';
	  var quickExit = {
	    el: '#qg-quick-exit',
	    init: function init() {
	      $(this.el).empty().append(this.template);
	      this.methods();
	    },
	    template: '<header><strong>Quick exit</strong></header><ul><li><a target="_top" data-accesskey="Esc" href="http://www.abc.net.au/tv/epg/#/" title="ABC"><img src="https://www.qld.gov.au/_resources/images/icons/abc-bw.png" alt="ABC"></a></li></ul><footer><strong>press \'Esc\'</strong></footer>',
	    methods: function methods() {
	      var quickExitLinks = $(this.el).find('a');
	      var escLink = $(this.el).find('a[data-accesskey="Esc"]').attr('href');
	      // action on esc key press
	
	      if ($(this.el).length > 0) {
	        $(document).keydown(function (e) {
	          if (e.keyCode === 27) {
	            window.location.replace(escLink);
	            return false;
	          }
	        });
	
	        // clicking on the quick exit block
	        $(document).on('click', this.el, function () {
	          window.location.replace(escLink);
	        });
	
	        //clicking on the links inside the quick exit block
	        quickExitLinks.click(function (e) {
	          e.stopPropagation();
	          e.preventDefault();
	          window.location.replace($(this).attr('href'));
	        });
	      }
	    } };
	
	  quickExit.init();
	})(jQuery);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	  'use strict';
	  // tables scrollable based on width
	  function tablesscrollable() {
	    var $contentTable = $('#qg-primary-content table');
	    if ($contentTable.width() > $('#qg-primary-content').width()) {
	      $contentTable.wrap(
	      '<div class="scrollable"><div class="inner"></div></div>');
	
	    }
	  }
	  tablesscrollable();
	})(jQuery);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict'; /**
	               * This will handle functionalities like
	               * - Expand all / Collapse all link
	               * - Ability to direct link to each section and expand the linked section
	               * - Handles aria-expanded values
	               */
	
	(function ($) {
	  var accordion = '.qg-accordion';
	  if ($(accordion).length > 0) {
	    var tabindex = 1;
	    var accordionControls = 'input[name=control]';
	    var linkedpanel = window.location.hash && $('input[aria-controls=' + window.location.hash.substring(1) + ']');
	
	    //Handle events of accordion inputs
	    $(accordion).find('article input').on('change', function () {
	      var checkedStatus = $(this).prop('checked');
	      var controlledPanedId = $('#' + $(this).attr('aria-controls'));
	      $(this).
	      attr('aria-expanded', checkedStatus) //sets aria
	      .parents(accordion).find(accordionControls).prop('checked', false); //clears expand/collapse selection
	      controlledPanedId.attr('aria-hidden', !checkedStatus);
	    });
	
	    //expand all click
	    // label selector is to provide backward compatibility in case projects are using old markup
	    $('.qg-acc-controls .expand, label[for=\'expand\']').click(function (e) {
	      e.preventDefault();
	      $(this).focus();
	      $(this).parents('.qg-accordion').find('input:checkbox').prop('checked', true);
	    });
	
	    // collapse all click
	    // label selector is to provide backward compatibility in case projects are using old markup
	    $('.qg-acc-controls .collapse, label[for=\'collapse\']').click(function (e) {
	      e.preventDefault();
	      $(this).parents('.qg-accordion').find('input:checkbox').prop('checked', false);
	    });
	
	    // open on page load
	    var hashTrigger = function hashTrigger() {
	      linkedpanel = window.location.hash && $('input[aria-controls=' + window.location.hash.substring(1) + ']');
	      if (linkedpanel.length > 0) {
	        linkedpanel.parents(accordion).find('~ article input').prop('checked', false); //clears expand/collapse selection
	        linkedpanel.prop('checked', true);
	        $('html, body').animate({
	          'scrollTop': linkedpanel.offset().top },
	        500);
	      }
	    };
	    hashTrigger();
	    window.onhashchange = hashTrigger;
	
	    // inserting tab index dynamically
	    // label selector is to provide backward compatibility in case projects are using old markup
	    $('.qg-accordion .acc-heading, .qg-acc-controls .expand, .qg-acc-controls .collapse, label[for="expand"], label[for="collapse"]').each(function () {
	      if (this.type !== 'hidden') {
	        var $input = $(this);
	        $input.attr('tabindex', tabindex);
	        tabindex++;
	      }
	    });
	    $('input[name=tabs]').click(function () {
	      $(this).parent('article').find('.acc-heading').focus();
	    });
	
	    // highlight title on hover
	    $('.qg-accordion article').hover(function () {
	      $(accordion).find('.title').removeClass('ht');
	      $(this).find('.title').addClass('ht');
	    }, function () {
	      $(accordion).find('.title').removeClass('ht');
	    });
	  }
	})(jQuery);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	
	
	
	
	
	
	var _qgGoogleKeys = __webpack_require__(6);var _qgGoogleKeys2 = _interopRequireDefault(_qgGoogleKeys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	
	(function ($, swe) {
	  var checkEnv = window.location.hostname.search(/\bdev\b|\btest\b|\blocalhost\b|\bgithub\b|\buat\b/);
	  var $feedbackForm = $('#qg-page-feedback-form');
	
	  if ($feedbackForm.length > 0) {
	    var setUrlEnableCaptcha = function setUrlEnableCaptcha() {
	      // if environment is not PROD then use test submission handler link
	      checkEnv !== -1 ? $feedbackForm.attr('action', 'https://test.smartservice.qld.gov.au/services/submissions/email/feedback/feedback') : '';
	      // if data-recaptcha attribute is not present then insert it
	      if ($feedbackForm.attr('data-recaptcha') === undefined) {
	        $feedbackForm.attr('data-recaptcha', 'true');
	      }
	    };
	    setUrlEnableCaptcha();
	  }
	
	  var googleRecaptchaApiKey = checkEnv !== -1 ?
	  _qgGoogleKeys2.default.defGoogleRecaptcha.uat :
	  _qgGoogleKeys2.default.defGoogleRecaptcha.prod; //This is a v2 key
	  var footerFeedbackGoogleRecaptchaApiKey = checkEnv !== -1 ?
	  _qgGoogleKeys2.default.defFeedbackGoogleRecaptcha.uat :
	  _qgGoogleKeys2.default.defFeedbackGoogleRecaptcha.prod; //This is a v3 key
	  //v3 Captcha, can have multiples
	  var v3Captcha = function v3Captcha(form, greptcha, key, action) {
	    //console.log('v3 key: ' + key);
	    try {
	      grecaptcha.execute(key, { action: action }).
	      then(function (token) {
	        if (greptcha.length > 0) {
	          if (
	          greptcha.attr('value') !== '' ||
	          greptcha.attr('value').length !== 0 ||
	          greptcha.attr('value') !== undefined) {
	            greptcha.val(token);
	            form.submit();
	            return true;
	          }
	        }
	        return false;
	      });
	    } catch (e) {
	      return false;
	    }
	  };
	
	  //v2 Captcha, usually is singular
	  var v2Captcha = function v2Captcha(form, subBtn, key) {
	    try {
	      //console.log('v2 key: ' + key);
	      grecaptcha.render(subBtn, {
	        sitekey: key,
	        callback: function callback() {
	          var response = grecaptcha.getResponse();
	          if (
	          response === '' ||
	          response === undefined ||
	          response.length === 0)
	          {
	            console.log('Invalid recaptcha');
	            return false;
	          } else {
	            form.submit();
	          }
	        } });
	
	    } catch (e) {
	      grecaptcha.reset();
	      return false;
	    }
	    grecaptcha.execute();
	  };
	
	  var loadedRecaptcha = false;
	  var onloadRecaptcha = function onloadRecaptcha() {
	    grecaptcha.ready(function () {
	      // eslint-disable-line
	      //v2 Forms
	      if (!loadedRecaptcha) {
	        $('form[data-recaptcha="true"]').
	        find('input[type="submit"], button[type="submit"]').
	        on('click', function (e) {
	          e.preventDefault();
	          var subBtn = e.target;
	          var form = $(subBtn).parents('form');
	          var greptcha = form.find('input[name="g-recaptcha-response"]');
	          var manualSitekey = form.attr('data-sitekey');
	          var manualAction = form.attr('data-action');
	          if (form.attr('id') === 'qg-page-feedback-form') {//Footer feedback
	            v3Captcha(form, greptcha, footerFeedbackGoogleRecaptchaApiKey, 'feedback');
	          } else if (manualSitekey !== undefined && manualAction !== undefined) {//v3 manual form
	            v3Captcha(form, greptcha, manualSitekey, manualAction);
	          } else if (manualAction !== undefined) {//v3 manual with feedback key but differnt action
	            v3Captcha(form, greptcha, footerFeedbackGoogleRecaptchaApiKey, manualAction);
	          } else if (manualSitekey !== undefined && manualAction === undefined) {//v2 manual (no action in v2)
	            v2Captcha(form, subBtn, manualSitekey);
	          } else {//default v2 with default key
	            v2Captcha(form, subBtn, googleRecaptchaApiKey);
	          }
	        });
	        loadedRecaptcha = true;
	      }
	    });
	  };
	  //https://github.com/google/recaptcha/issues/279
	  //https://github.com/google/recaptcha/issues/281
	  //https://www.hackviking.com/development/multiple-recaptcha-on-the-same-page/
	  //Setup recaptcha if on the page
	  var loadFooter = false;
	  var requireDefaultKey = false;
	  if ($('form[data-recaptcha="true"]').length > 0) {
	    //enable recaptcha on form submits, load latest v3 version of recaptcha
	    var v2Loaded = false;
	    $('form[data-recaptcha="true"]').each(function () {
	      var manualSitekey = $(this).attr('data-sitekey');
	      var manualAction = $(this).attr('data-action');
	      if ($(this).attr('id') === 'qg-page-feedback-form') {//Footer feedback
	        //Only load if the feedback button is clicked
	        loadFooter = true;
	      } else if (manualSitekey !== undefined && manualAction !== undefined) {//v3 manual form
	        swe.ajaxCall(
	        'https://www.google.com/recaptcha/api.js?render=' + manualSitekey,
	        'script',
	        onloadRecaptcha,
	        'Recaptcha unavailable');
	
	      } else if (manualSitekey === undefined && manualAction !== undefined) {
	        requireDefaultKey = true;
	      } else {
	        if (!v2Loaded) {
	          swe.ajaxCall(
	          'https://www.google.com/recaptcha/api.js',
	          'script',
	          onloadRecaptcha,
	          'Recaptcha unavailable');
	
	          v2Loaded = true;
	        }
	      }
	    });
	    //As v3 key is used in footer and could also be used on the page with a differnt action, we need to ensure we only load it once
	    if (requireDefaultKey) {
	      //load right away
	      swe.ajaxCall(
	      'https://www.google.com/recaptcha/api.js?render=' + footerFeedbackGoogleRecaptchaApiKey,
	      'script',
	      onloadRecaptcha,
	      'Recaptcha unavailable');
	
	    } else {
	      if (loadFooter) {
	        //Only load if the feedback button is clicked
	        $('#page-feedback-useful').one('click', function () {
	          swe.ajaxCall(
	          'https://www.google.com/recaptcha/api.js?render=' + footerFeedbackGoogleRecaptchaApiKey,
	          'script',
	          onloadRecaptcha,
	          'Recaptcha unavailable');
	
	        });
	      }
	    }
	
	    //If all forms have captchaPrivacyTerms, we can hide reCAPTCHA Badge
	    if ($('p[class="captchaPrivacyTerms"]').length === $('form[data-recaptcha="true"]').length) {
	      var hidegrecaptchaBadge = '.grecaptcha-badge { visibility: hidden; }';
	      var styleSheet = document.createElement('style');
	      styleSheet.type = 'text/css';
	      styleSheet.innerText = hidegrecaptchaBadge;
	      document.head.appendChild(styleSheet);
	    }
	  }
	})(jQuery, qg.swe); /*
	                    * Any form with form attribute data-recaptcha="true", will run and validate with Google invisible recaptcha
	                    * The site key, will be replaced
	                    *   - Local - by test key in build process (gulp/gulp-config.js, gulp/common-tasks/js.js)
	                    *   - Dev, Test, Staging, Beta - in bamboo deployment plan - https://servicesmadesimpler.govnet.qld.gov.au/bitbucket/projects/CDN/repos/static-qld_cloudformation/browse/deployment_swev3.yml
	                    * */ /*globals grecaptcha, qg*/

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict'; /*global qg, jQuery, google*/
	var qgInitAutocompleteAddress = void 0;
	
	(function (qg, $) {
	  'use strict';
	  var inputLocationId = 'qg-location-autocomplete';
	  var addressSelection = false;
	
	  var el = {
	    $searchWidget: $('#qg-search-widget'),
	    $autoComplete: $('.qg-location-autocomplete'),
	    $latitude: $('#latitude'),
	    $longitude: $('#longitude'),
	    $form: $('#qg-search-widget-form') };
	
	
	  // getting and setting input fields value using query parameter
	  var setsValue = function setsValue() {
	    el.$form.find(':input:not(:checkbox):not(:radio), select, textarea').each(function () {
	      var name = $(this).attr('name');
	      var getParameterVal = qg.swe.getParameterByName($(this).attr('name'));
	      getParameterVal !== false ? $('[name="' + name + '"]').val(getParameterVal) : '';
	    }).end().find('input[type=checkbox], input[type=radio]').each(function () {
	      var name = $(this).attr('name');
	      var getParameterVal = qg.swe.getParameterByName(name);
	      getParameterVal !== false ? $('[value="' + getParameterVal + '"]').prop('checked', true) : '';
	    });
	  };
	  setsValue();
	
	  // removing hidden fields value on reset
	  el.$searchWidget.find('button[type="reset"]').click(function (evt) {
	    evt.preventDefault();
	    el.$form.find(':input:not(:checkbox):not(:radio), select, textarea').each(function () {
	      $(this).val('');
	    }).end().find('input[type=checkbox], input[type=radio]').each(function () {
	      $(this).prop('checked', false);
	    });
	  });
	
	  // on autoComplete blur removing hidden fields values
	  el.$autoComplete.blur(function () {
	    if ($(this).val().length === 0) {
	      el.$searchWidget.find(el.$latitude).val('').
	      end().
	      find(el.$longitude).val('');
	    }
	  });
	  if ($('.' + inputLocationId).length > 0) {
	    var getLocationEle = $('.qg-app-geocoding');
	    qgInitAutocompleteAddress = function qgInitAutocompleteAddress() {
	      var qldBounds = new google.maps.LatLngBounds(
	      new google.maps.LatLng(-29, 138.0578426),
	      new google.maps.LatLng(-9.9339, 153.63831));
	      var inputLocationEle = document.getElementsByClassName(inputLocationId);
	      var addressFormId = 'qg-address-autocomplete';
	      $.each(inputLocationEle, function () {
	        var dataStrictBounds = $(this).data('strictbounds') || true;
	        var options = {
	          bounds: qldBounds,
	          strictBounds: dataStrictBounds,
	          types: ['geocode'] };
	
	        var autocomplete = new google.maps.places.Autocomplete(this, options);
	        //if address form exists fill the selection
	        var form = $(this).siblings('.' + addressFormId);
	        if (form.length > 0) {
	          var formFields = {
	            street_number: { dataType: 'street', name: 'short_name' },
	            route: { dataType: 'street', name: 'long_name' },
	            locality: { dataType: 'city', name: 'long_name' },
	            administrative_area_level_1: { dataType: 'state', name: 'short_name' },
	            country: { dataType: 'country', name: 'long_name' },
	            postal_code: { dataType: 'zip', name: 'short_name' } };
	
	          var _fillInAddress = function _fillInAddress() {
	            var loc = autocomplete.getPlace();
	            if ($('.error-handler').length > 0) {$('.error-handler').html('');}
	            //clear form
	            $.each(formFields, function (i, v) {
	              form.find('input[data-type="' + v.dataType + '"]').val('');
	            });
	            for (var i = 0; i < loc.address_components.length; i++) {
	              var type = loc.address_components[i].types[0];
	              if (formFields[type] !== undefined && formFields[type].dataType !== undefined) {
	                var inputEle = form.find('input[data-type="' + formFields[type].dataType + '"]');
	                if (inputEle.length > 0) {
	                  var val = inputEle.val() + ' ' + loc.address_components[i][formFields[type].name];
	                  inputEle.val(val);
	                  inputEle.change();
	                }
	              }
	            }
	          };
	          autocomplete.addListener('place_changed', _fillInAddress);
	        } else {
	          var fillInAddress = function fillInAddress() {
	            var place = autocomplete.getPlace();
	            if ($('.error-handler').length > 0 && $('.error-handler').val()) {$('.error-handler').html('');}
	            $('.qg-result-title h2').append('near \'<strong><em>' + place.formatted_address + '\'</em></strong>');
	            if (place.geometry) {
	              el.$searchWidget.find(el.$latitude).val(place.geometry.location.lat()).
	              end().
	              find(el.$longitude).val(place.geometry.location.lng());
	            }
	          };
	          autocomplete.addListener('place_changed', fillInAddress);
	        }
	        el.$form.find('.qg-location-autocomplete').keydown(function (e) {
	          if (addressSelection === false && $(this).val().length > 1) {
	            if (e.keyCode === 13 || e.keyCode === 9) {
	              e.preventDefault();
	            }
	          }
	        });
	        el.$form.find('.qg-location-autocomplete').keyup(function (e) {
	          if ($(this).val().length > 1) {
	            var reqReady = true;
	            var formContainer = $('.qg-fl');
	            var errorMessage = $('<p class="text-danger font-italic pt-2 pl-2">No result found</p>');
	            var errorHandler = $('<div class="error-handler"></div>');
	            if (!$('.error-handler').length > 0) {errorHandler.insertAfter(formContainer);}
	            var itemFull = $('.pac-container .pac-item:first').text();
	            var itemQuery = $('.pac-container .pac-item:first .pac-item-query').text();
	            var firstResult = itemQuery + ' ' + itemFull.substring(itemQuery.length);
	            if (e.keyCode === 13 || e.keyCode === 9) {
	              e.preventDefault();
	              if (firstResult.length > 1 && reqReady === true) {
	                $('.qg-location-autocomplete').val(firstResult);
	                var geocoder = new google.maps.Geocoder();
	                geocoder.geocode({ 'address': firstResult }, function (results, status) {
	                  if (status === 'OK') {
	                    reqReady = false;
	                    if (results) {
	                      $('.qg-location-autocomplete').val(results[0].formatted_address);
	                      var latitude = results[0].geometry.location.lat();
	                      var longitude = results[0].geometry.location.lng();
	                      $('.error-handler').html('');
	                      addressSelection = true;
	                      el.$searchWidget.find(el.$latitude).val(latitude).
	                      end().
	                      find(el.$longitude).val(longitude);
	                      setTimeout(function () {
	                        reqReady = true;
	                      }, 1000);
	                    } else {
	                      reqReady = true;
	                      $('.error-handler').html(errorMessage);
	                    }
	                  } else {
	                    reqReady = true;
	                    if (status === 'ZERO_RESULTS' || status === 'OVER_QUERY_LIMIT' || status === undefined) {
	                      $('.error-handler').html(errorMessage);
	                    }
	                  }
	                });
	              }
	            }
	          } else {
	            addressSelection = false;
	          }
	        });
	      });
	
	      //Get current location
	      if (getLocationEle.length > 0) {
	        $.each(getLocationEle, function (i, ele) {
	          $(ele).on('click', function (event) {var _this = this;
	            event.preventDefault();
	            if (navigator.geolocation) {
	              var showLocation = function showLocation(position) {
	                var latitude = position.coords.latitude;
	                var longitude = position.coords.longitude;
	                var latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
	                var geocoder = new google.maps.Geocoder();
	                var locationInput = $(_this).siblings('.' + inputLocationId);
	                el.$searchWidget.find(el.$latitude).val(latitude).
	                end().
	                find(el.$longitude).val(longitude);
	                if (locationInput.length > 0) {
	                  geocoder.geocode({ 'location': latlng }, function (results, status) {
	                    if (status === 'OK') {
	                      if ($('.error-handler').length > 0) {$('.error-handler').html('');}
	                      if (results[1]) {
	                        locationInput.val(results[1].formatted_address);
	                        locationInput.trigger('place_changed');
	                      } else {
	                        window.alert('No results found');
	                      }
	                    } else {
	                      window.alert('Geocoder failed due to: ' + status);
	                    }
	                  });
	                }
	              };
	              var errorHandler = function errorHandler(err) {
	                if (err.code === 1) {
	                  alert('Error: Access is denied!');
	                } else if (err.code === 2) {
	                  alert('Error: Position is unavailable!');
	                }
	              };
	              var options = { timeout: 60000 };
	              navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
	            } else {
	              // Browser doesn't support Geolocation
	              window.alert('Your browser does not support Geolocation');
	            }
	          });
	        });
	      }
	    };
	    qg.loadGoogle(qgInitAutocompleteAddress);
	  }
	})(qg, jQuery);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	  'use strict';
	  // qg radio buttons
	  $('.rc-theme li').click(function (event) {
	    $(this).find('input[type=radio]').prop('checked', true);
	    $(this).parent('.choices').find('.active').removeClass('active');
	    $(this).parent('ul').find('input[type=checkbox]').prop('checked', false);
	    $(this).addClass('active').find('input[type=checkbox]').prop('checked', true);
	  });
	})(jQuery);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	  'use strict';
	  var linkType = '.PDF$|.DOC$|.DOCX$|.XLS$|.XLSX$|.RTF$';
	  var contentType = 'PDF|DOC|DOCX|XLS|XLSX|RTF';
	  $(document).ready(function () {
	    $('a', '#qg-primary-content, #qg-secondary-content').each(function () {
	      var $this = $(this);
	      var linkRegex = new RegExp(linkType, 'i');
	      // check to see if a link with a selected linkType exist
	      // Example - cue-template-change-log.pdf|rtf...
	      if (linkRegex.test($this.attr('href'))) {
	        var contentRegex = new RegExp(contentType);
	        var currContent = $this.text();
	        if (/\.\d*?/.test(currContent)) {
	          // check to see if decimals exist, if yes then round then off
	          // Example (PDF 106.66) -> (PDF 106)
	          var extractSize = new RegExp('\\((?:' + contentType.toUpperCase() + '),?\\s+[0-9\\.]+\\s*[KM]B\\)', 'i');
	          currContent.match(extractSize) ? $(this).find('.meta').empty().append(currContent.match(extractSize)[0].toUpperCase().replace(/(\.\d*)/gi, '')) : '';
	        } else if (!contentRegex.test(currContent)) {
	          // check to see there is no doc type present in the content section
	          // If yes then insert <span class="meta">PDF</span>
	          var linkText = $this.attr('href').replace(/^.*\.(.+)$/, '$1').toUpperCase();
	          $this.append(' <span class="meta">(' + linkText + ')</span>');
	        }
	      }
	    });
	  });
	})(jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';if ($("script[src*='jquery.fancybox']").length === 0) {
	  if ($('.qg-image-gallery').length > 0 || $('.qg-lightbox').length > 0 || $('.image-gallery').length > 0 || $('.cut-in').length > 0) {
	    $('head').append($("<link rel='stylesheet' href='https://static.qgov.net.au/assets/v3.1/latest/lib/ext/fancybox/jquery.fancybox.min.css' type='text/css' media='screen' />"));
	    $.getScript('https://static.qgov.net.au/assets/v3.1/latest/lib/ext/fancybox/jquery.fancybox.min.js', function () {
	      // image gallery
	      $('.qg-image-gallery, .image-gallery').each(function (index) {
	        $(this).find('a').each(function () {
	          if (!$(this).is('[data-fancybox]')) {
	            $(this).attr('data-fancybox', 'gallery-' + index);
	          }
	          if (!$(this).is('[data-caption]')) {
	            $(this).attr('data-caption', $(this).attr('title'));
	          }
	        });
	      });
	      // cut in images caption
	      var cutInLink = $('.cut-in .caption a');
	      $(cutInLink).attr('data-fancybox', 'images');
	
	      $('[data-fancybox^="gallery"]').fancybox({
	        buttons: ['thumbs', 'close'],
	        mobile: {
	          preventCaptionOverlap: false,
	          idleTime: false,
	          clickSlide: function clickSlide(current, event) {
	            return current.type === 'image' ? 'close' : 'close';
	          } },
	
	        baseTpl: '\n        <div class="fancybox-container" role="dialog" tabindex="-1">\n          <div class="fancybox-bg"></div>\n          <div class="fancybox-inner">\n                <div class="fancybox-infobar"><button data-fancybox-prev="" class="fancybox-button fancybox-button--arrow_left p-0" title="Previous"><span class="font-awesome fa-2x fa-caret-left"></span></button><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span><button data-fancybox-next="" class="fancybox-button fancybox-button--arrow_right p-0" title="Next"><span class="font-awesome fa-2x fa-caret-right"></span></button></div>\n                <div class="fancybox-toolbar">{{buttons}}</div>\n                <div class="fancybox-navigation">{{arrows}}</div>\n                <div class="fancybox-stage"></div>\n                <div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>\n          </div>\n        </div>\n      ',
	
	
	
	
	
	
	
	
	
	
	
	        btnTpl: {
	          arrowLeft: '\n          <button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left p-0" title="{{PREV}}">\n            <span class="font-awesome fa-2x fa-caret-left"></span>\n          </button>\n        ',
	
	
	
	
	          arrowRight: '\n           <button data-fancybox-next class="fancybox-button fancybox-button--arrow_right p-0" title="{{NEXT}}">\n            <span class="font-awesome fa-2x fa-caret-right"></span>\n          </button>\n        ' },
	
	
	
	
	
	        caption: function caption(instance, item) {
	          var caption = $(this).data('caption') || '';
	
	          if (item.type === 'image') {
	            caption = '<div class="fancybox-border">' + (caption.length ? caption : '') + '</div>';
	          }
	          return caption;
	        } });
	
	    });
	  }
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	    'use strict';
	    var fields = [
	    { property: 'meta[property="og:title"]' },
	    { property: 'meta[property="og:description"]' },
	    { property: 'meta[property="og:url"]' },
	    { property: 'meta[property="og:type"]' },
	    { property: 'meta[property="og:image"]' },
	    { property: 'meta[name="twitter:card"]' },
	    { property: 'meta[name="twitter:title"]' },
	    { property: 'meta[name="twitter:description"]' },
	    { property: 'meta[name="twitter:image"]' }];
	
	    var openGraph = {
	        init: function init() {
	            var graphImg = '/assets/v3.1/latest/images/coat-of-arms/coa-thumbnail.png';
	            var descriptionMeta = $('meta[name="DCTERMS.description"]').attr('content', '');
	            $.each(fields, function (key, val) {
	                var itemObj = $(val.property);
	                if (itemObj.length > 0) {
	                    //check if template not already populated by Matrix or authorer
	                    if (itemObj.attr('content') === '' || itemObj.attr('content') === undefined) {
	                        if (itemObj.attr('property') === 'og:title' || itemObj.attr('name') === 'twitter:title') {
	                            itemObj.attr('content', document.title);
	                        }
	                        if (itemObj.attr('property') === 'og:description' || itemObj.attr('name') === 'twitter:description') {
	                            if (descriptionMeta.length > 0) {
	                                itemObj.attr('content', descriptionMeta);
	                            }
	                        }
	                        if (itemObj.attr('property') === 'og:image' || itemObj.attr('name') === 'twitter:image') {
	                            itemObj.attr('content', graphImg);
	                        }
	                        if (itemObj.attr('property') === 'og:url') {
	                            itemObj.attr('content', window.location.href);
	                        }
	                        if (itemObj.attr('property') === 'og:type') {
	                            itemObj.attr('content', 'article');
	                        }
	                        if (itemObj.attr('name') === 'twitter:card') {
	                            itemObj.attr('content', 'summary');
	                        }
	                    }
	                } else {
	                    var head = $('head');
	                    head.append(itemObj);
	                }
	            });
	        } };
	
	    openGraph.init();
	})(jQuery);

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';$(function () {
	  'use strict';
	
	  //
	  // Namespace
	  //
	
	  var qgSiteSearch = {
	    'fn': {},
	    'vars': {} };
	
	
	  //
	  // Helpers
	  //
	
	  // Check if we're on a local environment
	  function isDevelopment() {
	    var location = window['location']['hostname'];
	
	    if (location === 'localhost') {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  // Event debouncer
	  function debouncer(func, wait, immediate) {
	    var timeout;
	
	    return function executedFunction() {
	      var context = this;
	      var args = arguments;
	
	      var later = function later() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	
	      var callNow = immediate && !timeout;
	
	      clearTimeout(timeout);
	
	      timeout = setTimeout(later, wait);
	
	      if (callNow) func.apply(context, args);
	    };
	  }
	
	  // Wrap part of the string in bold tags
	  function getBoldText(subString, stringToChange) {
	    var targetIndex = stringToChange.indexOf(subString.toLowerCase());
	    var targetString = stringToChange.substr(targetIndex, subString.length);
	
	    // Wrap the text in bold tags
	    var formattedString = '<b>';
	    formattedString += targetString;
	    formattedString += '</b>';
	
	    return stringToChange.replace(targetString, formattedString);
	  }
	
	  //
	  // Events
	  //
	
	  // Handle multiple events
	  qgSiteSearch.fn.inputEventHandler = function (event) {
	    var eventType = event['type'];
	    var targetInput = $(event['target']);
	    var keyCode = event['keyCode'];
	    var inputValue = targetInput.val();
	
	    switch (eventType) {
	      case 'focus':
	        qgSiteSearch.fn.onFocus(inputValue);
	        break;
	      case 'blur':
	        qgSiteSearch.fn.onBlur(inputValue);
	        break;
	      case 'keydown':
	        qgSiteSearch.fn.onKeydown(inputValue, keyCode);
	        break;}
	
	  };
	
	  // Handle clicking into the input field
	  qgSiteSearch.fn.onFocus = function (inputValue) {
	    var initialConcierge = $('.qg-search-concierge-initial');
	
	    if (inputValue === '') {
	      // Transition reveal initial state
	      initialConcierge.addClass('show');
	    } else {
	      // Look for suggested results
	      qgSiteSearch.fn.checkForSuggestions(inputValue);
	    }
	  };
	
	  // Handle clicking out of the input field
	  qgSiteSearch.fn.onBlur = function (inputValue) {
	    var clearButton = $('.qg-search-close-concierge');
	
	    // Remove the clear button
	    clearButton.addClass('hide');
	
	    // Close the concierge panels
	    qgSiteSearch.fn.closeConciergePanels();
	  };
	
	  // Handle input value changes
	  qgSiteSearch.fn.onKeydown = function (inputValue, keyCode) {
	    var initialConcierge = $('.qg-search-concierge-initial');
	    var helpfulConcierge = $('.qg-search-concierge-help');
	    var clearButton = $('.qg-search-close-concierge');
	
	    if (keyCode === 40) {
	      $('.qg-search-form').attr('data-navindex', '0');
	      setTimeout($('.qg-search-concierge.show').find('a, button')[0].focus(), 300);
	    } else if (inputValue !== '') {
	      // Reveal the clear button
	      clearButton.removeClass('hide');
	
	      // Look for suggested results
	      qgSiteSearch.fn.checkForSuggestions(inputValue);
	    } else {
	      // Remove the clear button
	      clearButton.addClass('hide');
	
	      // Remove suggestions and transition reveal initial state
	      initialConcierge.addClass('show');
	      helpfulConcierge.removeClass('show');
	    }
	  };
	
	  qgSiteSearch.fn.keyboardNavigation = function (event) {
	    var keyCode = event['keyCode'];
	    var focusableList = $('.qg-search-concierge.show').find('a, button');
	    var currentIndex = $('.qg-search-form').attr('data-navindex');
	
	    if (keyCode === 40 && focusableList.length > currentIndex - 1) {
	      currentIndex++;
	      focusableList[currentIndex].focus();
	      $('.qg-search-form').attr('data-navindex', currentIndex);
	    } else if (keyCode === 38) {
	      if (currentIndex > 0) {
	        currentIndex--;
	        focusableList[currentIndex].focus();
	        $('.qg-search-form').attr('data-navindex', currentIndex);
	      } else {
	        $('.qg-search-form input[type=text].form-control').focus();
	      }
	    }
	  };
	
	  // Handle clearing the input field via button
	  qgSiteSearch.fn.clearInputField = function (event) {
	    var clearButton = $('.qg-search-close-concierge');
	    var searchInput = $('#qg-search-query');
	    searchInput.val('');
	
	    // Remove the button
	    clearButton.addClass('hide');
	
	    // Close the concierge panels
	    qgSiteSearch.fn.closeConciergePanels();
	  };
	
	  // Handle selecting a suggestion
	  qgSiteSearch.fn.searchSuggestionClick = function (event) {
	    var targetElement = $(event['currentTarget']);
	    var suggestionValue = targetElement.text();
	    var searchInput = $('#qg-search-query');
	
	    // Add suggestion to input value
	    searchInput.val(suggestionValue);
	  };
	
	  // Handle background click to close concierge
	  qgSiteSearch.fn.handleBodyClick = function (event) {
	    var targetSelector = '#qg-global-search-form';
	
	    if ($(event['target']).closest(targetSelector).length === 0) {
	      // Close the concierge panels
	      qgSiteSearch.fn.closeConciergePanels();
	    }
	  };
	
	  qgSiteSearch.fn.handleFocus = function (event) {
	    qgSiteSearch.fn.closeConciergePanels();
	  };
	
	  // Handle search form submission
	  qgSiteSearch.fn.searchSubmitHandler = function (event) {
	    // Close the concierge panels
	    qgSiteSearch.fn.closeConciergePanels();
	  };
	
	  //
	  // Local data
	  //
	
	  // Get example suggestions from Funnelback
	  qgSiteSearch.fn.getExampleSuggestions = function (inputValue) {
	    var exampleResponse = [{ 'key': 'cancelled', 'disp': 'cancelled', 'disp_t': 'T', 'wt': '77.44', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancellation', 'disp': 'cancellation', 'disp_t': 'T', 'wt': '72.139', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancel', 'disp': 'cancel', 'disp_t': 'T', 'wt': '69.493', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancelling', 'disp': 'cancelling', 'disp_t': 'T', 'wt': '43.151', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancellations', 'disp': 'cancellations', 'disp_t': 'T', 'wt': '32.28', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancellation of membership', 'disp': 'cancellation of membership', 'disp_t': 'T', 'wt': '2.2', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancellation form', 'disp': 'fill out this cancellation form', 'disp_t': 'T', 'wt': '2', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancel a booking', 'disp': 'cancel a booking', 'disp_t': 'T', 'wt': '1.1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancel a disability parking permit', 'disp': 'cancel a disability parking permit', 'disp_t': 'T', 'wt': '1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }, { 'key': 'cancelling your registration', 'disp': 'cancelling your registration', 'disp_t': 'T', 'wt': '1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S' }];
	
	    var filteredResponse = exampleResponse.filter(function (suggestion) {
	      return suggestion['disp'].indexOf(inputValue.toLowerCase()) !== -1;
	    });
	
	    return filteredResponse;
	  };
	
	  // Get example service results from Funnelback
	  qgSiteSearch.fn.getExampleServices = function () {
	    var exampleResponse = { 'response': { 'resultPacket': { 'query': 'grants', 'results': [{ 'rank': 1, 'title': 'Grants and funding | Environment, land and water | Queensland Government', 'collection': 'qgov-web', 'metaData': { 'license': 'https://creativecommons.org/licenses/by/4.0/', 'r': 'all', 'c': 'Grants and funding are available to support environmental programs in Queensland. This includes koala and marine life conservation, and nature refuges.', 'C': 'Grants and funding are available to support environmental programs in Queensland. This includes koala and marine life conservation, and nature refuges.', 's': 'Grant; funding; nature assist; koala; Everyones environment; Indigenous sea rangers; research; NatureAssist; Indigenous Sea Country Management Grants Program; Koala Rescue and Rehabilitation Grants Program; Koala Research Grant Program; koala', 'd': '2019-07-31', 't': 'Grants and funding | Environment, land and water | Queensland Government;Grants and funding | Environment and pollution management', 'e': 'Text', 'f': 'guidelines', 'j': 'https://www.qld.gov.au/environment/pollution/funding' }, 'liveUrl': 'https://www.qld.gov.au/environment/pollution/funding', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding&auth=qzUXw9sTwPwOdKvslCPbog&profile=qld_preview&rank=1&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/environment/pollution/funding' }, { 'rank': 2, 'title': 'Funding and grants | Recreation, sport and arts | Queensland Government', 'collection': 'qgov-web', 'metaData': { 'c': 'Find what funding and grants are available for young athletes and for clubs to upgrade sport and recreation facilities or equipment.', 'C': 'Find what funding and grants are available for young athletes and for clubs to upgrade sport and recreation facilities or equipment.', 'sprequired': 'yes', 'd': '2019-07-19', 'e': 'Collection', 'f': 'index', 'stype': 'apply-for-it', 'j': 'https://www.qld.gov.au/recreation/sports/funding', 'sid': 'P001085', 'sfinder': 'yes', 'license': 'https://creativecommons.org/licenses/by/4.0/', 'scategory': 'recreation-sports-and-arts', 'r': 'all', 's': 'Funding and grants; funding for young athletes; grants for young athletes; athlete scholarships; funding for kids and young people; funding for clubs and organisations; grants for clubs and organisations; funding to upgrade sport and recreation', 't': 'Funding and grants | Recreation, sport and arts | Queensland Government;Funding and grants | Sport', 'skioskonly': 'no' }, 'liveUrl': 'https://www.qld.gov.au/recreation/sports/funding', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Frecreation%2Fsports%2Ffunding&index_url=https%3A%2F%2Fwww.qld.gov.au%2Frecreation%2Fsports%2Ffunding&auth=cM3gwHE6wlGI5UzFw2iszA&profile=qld_preview&rank=2&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/recreation/sports/funding' }, { 'rank': 3, 'title': 'Everyones Environment grants program | Environment, land and water | Queensland Government', 'collection': 'qgov-web', 'metaData': { 'c': 'This program provides funding for Queensland community groups with projects aimed at delivering practical actions for local environmental improvements.', 'C': 'This program provides funding for Queensland community groups with projects aimed at delivering practical actions for local environmental improvements.', 'sprequired': 'no', 'd': '2015-03-23', 'e': 'Text', 'f': 'guidelines', 'stype': 'find-it', 'j': 'https://www.qld.gov.au/environment/pollution/funding/everyones', 'sid': 'P000369', 'sfinder': 'yes', 'license': 'https://creativecommons.org/licenses/by/4.0/', 'scategory': 'environment-land-and-water', 'r': 'all', 's': 'Grants; everyone; environment; heritage; Queensland; funding', 't': 'Everyones Environment grants program | Environment, land and water | Queensland Government;Everyones Environment grants program | Grants and funding', 'skioskonly': 'no' }, 'liveUrl': 'https://www.qld.gov.au/environment/pollution/funding/everyones', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding%2Feveryones&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding%2Feveryones&auth=QaZNQYwacyhU7xtVcs%2FPbg&profile=qld_preview&rank=3&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/environment/pollution/funding/everyones' }], 'error': null }, 'curator': { 'exhibits': [{ 'titleHtml': 'Queensland Government Grants Finder', 'displayUrl': 'https://www.grants.services.qld.gov.au/#/', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.grants.services.qld.gov.au%2F%23%2F&index_url=https%3A%2F%2Fwww.grants.services.qld.gov.au%2F%23%2F&auth=wEzza0HDD%2BGN4WIzBUq0%2Fg&profile=qld_preview&type=FP', 'descriptionHtml': 'The Queensland Government Grants Finder is a comprehensive list of our grants and funding programs.', 'additionalProperties': { 'icon': 'fa-car fa-motorcycle fa-address-card', 'buttonText': 'Find out more', 'service': 'yes' }, 'category': '' }, { 'titleHtml': 'North Queensland flood assistance', 'displayUrl': 'https://www.qld.gov.au/community/disasters-emergencies/queensland-disasters/fnq-monsoonal-trough', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fcommunity%2Fdisasters-emergencies%2Fqueensland-disasters%2Ffnq-monsoonal-trough&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fcommunity%2Fdisasters-emergencies%2Fqueensland-disasters%2Ffnq-monsoonal-trough&auth=qbavFamsPcqvWK5M3INRmA&profile=qld_preview&type=FP', 'descriptionHtml': 'Personal hardship financial assistance has been activated for some communities at this time.', 'additionalProperties': {}, 'category': '' }, { 'titleHtml': 'Change of address', 'displayUrl': 'https://www.change-of-address.services.qld.gov.au/', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.change-of-address.services.qld.gov.au%2F&index_url=https%3A%2F%2Fwww.change-of-address.services.qld.gov.au%2F&auth=RrjhEMq01%2B%2BZwQhpwXAjPg&profile=qld_preview&type=FP', 'descriptionHtml': 'Use this online form to change your home and/or postal address online, rather than contacting multiple Queensland Government departments/services.', 'additionalProperties': { 'icon': 'fa-car fa-motorcycle fa-address-card', 'service': 'yes' }, 'category': '' }] } } };
	    return exampleResponse;
	  };
	
	  //
	  // Functions
	  //
	
	  // Close the conceirge menus
	  qgSiteSearch.fn.closeConciergePanels = function () {
	    var initialConcierge = $('.qg-search-concierge-initial');
	    var helpfulConcierge = $('.qg-search-concierge-help');
	
	    // Immediately close both concierge panels
	    initialConcierge.addClass('hide').removeClass('show');
	    helpfulConcierge.addClass('hide').removeClass('show');
	
	    setTimeout(function () {
	      initialConcierge.removeClass('hide');
	      helpfulConcierge.removeClass('hide');
	    }, 300);
	  };
	
	  // Check Funnelback for suggested results
	  qgSiteSearch.fn.checkForSuggestions = function (inputValue) {
	    var initialConcierge = $('.qg-search-concierge-initial');
	    var helpfulConcierge = $('.qg-search-concierge-help');
	    var numChars = inputValue.length;
	
	    // Remove initial state
	    initialConcierge.removeClass('show');
	
	    // Query Funnelback when three characters are entered
	    if (numChars >= 3) {
	      // Get suggestions
	      qgSiteSearch.fn.getSuggestions(inputValue);
	
	      // Get services
	      qgSiteSearch.fn.getServices(inputValue);
	
	      // Transition reveal suggestions
	      helpfulConcierge.addClass('show');
	    }
	  };
	
	  //
	  // Suggestion Keywords
	  //
	
	  // Get suggestion keywords
	  qgSiteSearch.fn.getSuggestions = function (inputValue) {
	    var searchForm = $('#qg-global-search-form');
	    var suggestURL = searchForm.attr('data-suggestions');
	
	    if (isDevelopment()) {
	      // Demonstrate functionality locally
	      var exampleSuggestions = qgSiteSearch.fn.getExampleSuggestions(inputValue);
	      qgSiteSearch.fn.formatSuggestions(exampleSuggestions);
	    } else {
	      // Query Funnelback
	      $.ajax({
	        cache: true,
	        dataType: 'json',
	        url: suggestURL,
	        data: {
	          partial_query: inputValue },
	
	        success: qgSiteSearch.fn.formatSuggestions });
	
	    }
	  };
	
	  // Format suggestion keywords
	  qgSiteSearch.fn.formatSuggestions = function (suggestions) {
	    var inputField = $('#qg-search-query');
	    var inputValue = inputField.val();
	    var suggestionsContainer = $('.qg-search-concierge-help .qg-search-concierge-group.suggestions');
	    var suggestionsHeading = '<h4>Suggestions</h4>';
	    var suggestionsHTML = '';
	    var maxSuggestions = 3;
	
	    if (suggestions.length > 0) {
	      // Reduce count to maximum limit
	      suggestions = suggestions.slice(0, maxSuggestions);
	
	      // Start the HTML for suggestions listing
	      suggestionsHTML += '<div class="qg-search-concierge-content">';
	
	      // Add the heading
	      suggestionsHTML += suggestionsHeading;
	      suggestionsHTML += '<ul class="list-group">';
	
	      suggestions.forEach(function (item) {
	        suggestionsHTML += '<li class="list-group-item">';
	        suggestionsHTML += '<button tabindex="-1" data-analytics-link-group="qg-global-search-suggestion">';
	        suggestionsHTML += getBoldText(inputValue, item['disp']);
	        suggestionsHTML += '</button>';
	        suggestionsHTML += '</li>';
	      });
	
	      suggestionsHTML += '</ul>';
	      suggestionsHTML += '</div>';
	    }
	
	    // Update the concierge container
	    suggestionsContainer.html(suggestionsHTML);
	  };
	
	  //
	  // Related Services
	  //
	
	  // Get suggested services
	  qgSiteSearch.fn.getServices = function (inputValue) {
	    var searchForm = $('#qg-global-search-form');
	    var resultsURL = searchForm.attr('data-results');
	
	    if (isDevelopment()) {
	      // Demonstrate functionality locally
	      var exampleServices = qgSiteSearch.fn.getExampleServices();
	      qgSiteSearch.fn.processServices(exampleServices);
	    } else {
	      // Query Funnelback
	      $.ajax({
	        cache: true,
	        dataType: 'json',
	        url: resultsURL,
	        data: {
	          query: inputValue },
	
	        success: qgSiteSearch.fn.processServices });
	
	    }
	  };
	
	  // Process suggested services and filter out bad results
	  qgSiteSearch.fn.processServices = function (services) {
	    var allResults = services['response']['resultPacket']['results'];
	    var serviceResults = [];
	    var featuredService = null;
	    var curatorIndex = services['response']['curator'];
	
	    // Look for curated results
	    if (typeof curatorIndex !== 'undefined') {
	      var allCuratedResults = curatorIndex['exhibits'];
	
	      if (typeof allCuratedResults !== 'undefined') {
	        if (allCuratedResults.length > 0) {
	          // The first result is always featured
	          featuredService = allCuratedResults[0];
	
	          // Process any additional exhibits
	          for (var index = 1; index < allCuratedResults.length; index++) {
	            var result = allCuratedResults[index];
	            var additionalProperties = result['additionalProperties'];
	
	            if (additionalProperties['service'] === 'yes') {
	              serviceResults.push(result);
	            }
	          }
	        }
	      }
	    }
	
	    // Look for services in standard results
	    if (allResults.length > 0) {
	      var filteredResults = allResults.filter(function (result) {
	        return result['metaData']['sfinder'] === 'yes';
	      });
	
	      serviceResults = serviceResults.concat(filteredResults);
	
	      if (serviceResults.length > 3) {
	        serviceResults = serviceResults.slice(0, 3);
	      }
	    }
	
	    // Format the featured suggested service
	    qgSiteSearch.fn.formatFeaturedService(featuredService);
	
	    // Format the related services
	    qgSiteSearch.fn.formatServices(serviceResults);
	  };
	
	  // Format featured service
	  qgSiteSearch.fn.formatFeaturedService = function (featuredService) {
	    var featuredServiceContainer = $('.qg-search-concierge-help .qg-search-concierge-group.highlight');
	    var serviceHTML = '';
	
	    if (featuredService) {
	      var title = featuredService['titleHtml'];
	      var linkURL = featuredService['displayUrl'];
	      var description = featuredService['descriptionHtml'];
	      var additionalProperties = featuredService['additionalProperties'];
	
	      serviceHTML = '<div class="qg-search-concierge-content">';
	      serviceHTML += '<div class="d-flex justify-content-between align-content-center flex-wrap">';
	      serviceHTML += '<h4>' + title + '</h4>';
	
	      // Check for icons
	      if (typeof additionalProperties['icon'] !== 'undefined') {
	        var allIcons = additionalProperties['icon'].split(' ');
	
	        var iconHTML = allIcons.map(function (icon) {
	          return '<span class="fa ' + icon + '"></span>';
	        });
	
	        serviceHTML += '<div>' + iconHTML.join('') + '</div>';
	      }
	
	      serviceHTML += '</div>';
	      serviceHTML += '<p>' + description + '</p>';
	      if (linkURL) {
	        if (additionalProperties['buttonText']) {
	          serviceHTML += '<a href="' + linkURL + '"  tabindex="-1" data-analytics-link-group="qg-global-search-feature" class="btn btn-global-primary-white">' + additionalProperties['buttonText'] + '</a>';
	        } else {
	          serviceHTML += '<a href="' + linkURL + '"  tabindex="-1" data-analytics-link-group="qg-global-search-feature" class="btn btn-global-primary-white">Continue</a>';
	        }
	      }
	      serviceHTML += '</div>';
	    }
	
	    featuredServiceContainer.html(serviceHTML);
	  };
	
	  // Format suggested services
	  qgSiteSearch.fn.formatServices = function (serviceResults) {
	    var servicesContainer = $('.qg-search-concierge-help .qg-search-concierge-group.helper');
	    var servicesHeading = '<h4>Related services</h4>';
	    var serviceHTML = '';
	
	    if (serviceResults.length > 0) {
	      serviceHTML = '<div class="qg-search-concierge-content">';
	      serviceHTML += servicesHeading;
	      serviceHTML += '<ul class="list-group">';
	
	      serviceResults.forEach(function (service) {
	        var serviceName = service['title'];
	        var serviceLink = service['liveUrl'];
	
	        if (typeof serviceName !== 'undefined') {
	          serviceName = serviceName.split('|')[0].trim();
	        } else {
	          serviceName = service['titleHtml'];
	        }
	
	        if (typeof serviceLink === 'undefined') {
	          serviceLink = service['displayUrl'];
	        }
	
	        serviceHTML += '<li class="list-group-item">';
	        serviceHTML += '<a href="' + serviceLink + '" tabindex="-1" data-analytics-link-group="qg-global-search-related-service">' + serviceName + '</a>';
	        serviceHTML += '</li>';
	      });
	
	      serviceHTML += '</ul>';
	      serviceHTML += '</div>';
	    }
	
	    servicesContainer.html(serviceHTML);
	  };
	
	  //
	  // Ready
	  //
	
	  $(document).ready(function () {
	    var searchInput = $('#qg-search-query');
	
	    // Set up events
	    searchInput.on('focus keydown', debouncer(qgSiteSearch.fn.inputEventHandler, 200));
	  });
	
	  // Binds
	  $('body').on('focusin', '.qg-navigation .nav-link', qgSiteSearch.fn.handleFocus);
	  $('body').on('click', qgSiteSearch.fn.handleBodyClick);
	  $('body').on('click', '.qg-search-close-concierge', qgSiteSearch.fn.clearInputField);
	  $('body').on('click', '.qg-search-concierge-group.suggestions button', qgSiteSearch.fn.searchSuggestionClick);
	  $('body').on('submit', '#qg-global-search-form', qgSiteSearch.fn.searchSubmitHandler);
	  $('body').on('keydown', '.qg-search-concierge-group a, .qg-search-concierge-group button', qgSiteSearch.fn.keyboardNavigation);
	});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/* ========================================================================
	* Accessibility helpers
	* ======================================================================== */
	
	'use strict';
	
	function opensInNewWindow() {
	  var $target = $('a[target=_blank]');
	
	  if (!$target.hasClass('qg-accessibility-off') && // Legacy
	  $target.attr('data-access-extlink') !== false && // Legacy
	  $target.attr('data-access-new-window') !== false &&
	  $target.attr('href') !== undefined) {
	    if ($.contains('.qg-blank-notice', $target) === false) {
	      $target.append(' <span class="qg-blank-notice sr-only">(Opens in new window)</span> ');
	    }
	    if ($target.attr('title') === undefined) {
	      $target.attr('title', 'Opens in new window');
	    }
	  }
	}
	
	function addCorrectIncorrect() {
	  var ext = ':not(:has(.qg-blank-notice))';
	  var $correct = $('.qg-correct' + ext + ', table.qg-correct-incorrect td:nth-child(odd)' + ext);
	  var $incorrect = $('.qg-incorrect' + ext + ', table.qg-correct-incorrect td:nth-child(even)' + ext);
	
	  $correct.prepend('<span class="qg-blank-notice sr-only">Correct.</span> ');
	  $incorrect.prepend('<span class="qg-blank-notice sr-only">Incorrect.</span> ');
	}
	
	function init() {
	  if ($('body').attr('data-qg-accessibility') !== false) {
	    opensInNewWindow();
	    addCorrectIncorrect();
	  }
	}
	
	module.exports = { init: init };

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';(function ($) {
	  //Copyrights update to current year
	  if ($('#qg-copyright-daterange').length > 0) {
	    $('#qg-copyright-daterange').html('1995&ndash;' + new Date().getFullYear());
	  }
	})(jQuery);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';
	
	var activeSideNav = function () {
	  // const currentFilename = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
	
	  function refineText(text) {
	    return text.toLowerCase().replace(/ /g, '');
	  }
	
	  function getCurrentTitle() {
	    var currentPageTitle = '';
	    if ($('#guide-title').length > 0) {
	      currentPageTitle = $('#guide-title').text();
	    } else if ($('meta[name="DCTERMS.alternative"]').length > 0 && refineText($('meta[name="DCTERMS.alternative"]').eq(0).attr('content')) !== '') {
	      currentPageTitle = $('meta[name="DCTERMS.alternative"]').eq(0).attr('content');
	    } else {
	      var titleClone = $('h1', '#qg-primary-content').eq(0).clone();
	      titleClone.find('.page-number').remove();
	      currentPageTitle = titleClone.text();
	    }
	    return refineText(currentPageTitle);
	  }
	
	  function highlightNavItem() {
	    var currentPageTitle = getCurrentTitle();
	    $('#qg-section-nav ul>li').each(function () {
	      if (refineText($(this).text()) === $.trim(currentPageTitle)) {
	        /*$(this).find('a').addClass('active');*/
	      }
	    });
	  }
	
	  return {
	    highlightNavItem: highlightNavItem };
	
	}();
	
	module.exports = activeSideNav;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _breakpoints = __webpack_require__(32);var _breakpoints2 = _interopRequireDefault(_breakpoints);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	var stepNav = {
	  config: {
	    $guideSubNav: $('#qg-section-nav .guide-sub-nav'),
	    $qgSectionNav: $('#qg-section-nav'),
	    $qgSectionNavListItems: $('#qg-section-nav .guide-sub-nav li'),
	    $stepNav: $('#step-nav'),
	    $heading: $('#qg-primary-content h1') },
	
	  init: function init() {var _this = this;
	    if (this.config.$guideSubNav.length > 0) {
	      this.createStepNav();
	      $(window).resize(function () {return _this.createStepNav();});
	    }
	  },
	  getActiveNav: function getActiveNav() {
	    var activeNav = 0;
	    this.config.$qgSectionNavListItems.each(function (index) {
	      if ($(this).find('a').hasClass('active')) {
	        activeNav = index;
	      }
	    });
	    return activeNav + 1;
	  },
	  countListItems: function countListItems() {
	    return this.config.$qgSectionNavListItems.length;
	  },
	  view: function view(getActiveNav, countListItems) {
	    return '<section id="step-nav">\n               <ul>\n                 <li>\n                    <a class="dropdown">Step ' +
	
	
	    getActiveNav + ' of ' + countListItems + '</a>\n                 </li>\n               </ul>\n            </section>';
	
	
	
	  },
	  createStepNav: function createStepNav() {
	    var block = void 0;
	    if ($(window).width() < _breakpoints2.default.bsMd) {
	      if ($('#step-nav .guide-sub-nav').length === 0) {
	        this.config.$heading.after(this.view(this.getActiveNav(), this.countListItems()));
	        var $getSubNav = this.config.$guideSubNav.clone();
	        $('#step-nav li').append($getSubNav);
	      }
	      $('#step-nav').hover(function () {
	        block = setTimeout(function () {
	          $('#step-nav .guide-sub-nav').stop(true, true).fadeIn({ duration: '100', queue: false }).css('display', 'none').slideDown('fast');
	        }, 200);
	      }, function () {
	        clearTimeout(block);
	        $('#step-nav .guide-sub-nav').stop(true, true).fadeOut({ duration: '100', queue: false }).slideUp('fast');
	      });
	    } else {
	      $(document).find($('#step-nav')).remove();
	    }
	  } };exports.default =
	
	
	stepNav;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var breakpoints = function () {
	  return {
	    bsXs: 480,
	    bsSm: 768,
	    bsMd: 992,
	    bsLg: 1200 };
	
	}();exports.default =
	
	breakpoints;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict'; /**
	               * Function for rendering social media links on CUE compliant sites
	               *
	               * Requires:
	               * - JQuery
	               **/
	
	/**
	                    * #####################################
	                    * Model
	                    **/
	
	var socialLinksList = {
	  primary: [
	  { title: 'Facebook', showTitle: false, icon: renderIcon('fa', 'facebook-square'), ga: 'data-analytics-link-group="qg-sharing-facebook"' },
	  { title: 'Twitter', showTitle: false, icon: renderIcon('fa', 'twitter-square'), ga: 'data-analytics-link-group="qg-sharing-twitter"' },
	  { title: 'LinkedIn', showTitle: false, icon: renderIcon('fa', 'linkedin-square'), ga: 'data-analytics-link-group="qg-sharing-linkedin"' }]
	
	  /* secondary: [
	                                                                                                                                                // {title: 'Delicious',    showTitle: true, icon: renderIcon('fa', 'delicious')},
	                                                                                                                                                { title: "Digg", showTitle: true, icon: renderIcon("fa", "digg") },
	                                                                                                                                                // {title: 'Evernote',     showTitle: true, icon: renderIcon('svg', 'evernote', '/assets/v3/images/evernote-logo-white.svg')},
	                                                                                                                                                // {title: 'Reddit',       showTitle: true, icon: renderIcon('fa', 'reddit')},
	                                                                                                                                                // {title: 'StumbleUpon',  showTitle: true, icon: renderIcon('fa', 'stumbleupon')},
	                                                                                                                                                // {title: 'Tumblr',       showTitle: true, icon: renderIcon('fa', 'tumblr')},
	                                                                                                                                                { title: "Google+", showTitle: true, icon: renderIcon("fa", "google-plus") }
	                                                                                                                                              ]*/ };
	
	
	/**
	                                                                                                                                                      * #####################################
	                                                                                                                                                      * Views
	                                                                                                                                                      **/
	
	function renderSocialURL(who, from, title, domain, description) {
	  switch (who) {
	    case 'facebook':
	      return 'http://www.facebook.com/share.php?u=' + from + '&title=' + title;
	    case 'twitter':
	      return 'http://twitter.com/share?url=' + from;
	    case 'linkedin':
	      return 'http://www.linkedin.com/shareArticle?mini=true&url=' + from + '&title=' + title + '&source=' + domain;
	    case 'others':
	      return 'https://www.qld.gov.au/share?&title=' + title + '&url=' + from;
	    /*  case "delicious":
	                                                                                  return `http://del.icio.us/post?url=${from}&title=${title}]&notes=${description}`;
	                                                                                case "digg":
	                                                                                  return `http://www.digg.com/submit?phase=2&url=${from}&title=${title}`;
	                                                                                case "evernote":
	                                                                                  return `http://www.evernote.com/clip.action?url=${from}&title=${title}`;
	                                                                                case "reddit":
	                                                                                  return `http://www.reddit.com/submit?url=${from}&title=${title}`;
	                                                                                case "stumbleupon":
	                                                                                  return `http://www.stumbleupon.com/submit?url=${from}&title=${title}`;
	                                                                                case "tumblr":
	                                                                                  return `https://www.tumblr.com/widgets/share/tool?posttype=link&content=${from}&title=${title}&caption=${description}`;
	                                                                                case "google+":
	                                                                                  return `https://plus.google.com/share?url=${from}`;*/}
	
	  return false;
	}
	
	function renderIcon(type, name) {var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  switch (type) {
	    case 'fa':
	      return '<span class="fa fa-' + name + ' fa-2x qg-share-icon" aria-hidden="true"></span>';
	    case 'svg':
	      return '<img src="' + src + '" aria-hidden="true" class="qg-share-icon" alt="name" />';}
	
	  // Default, return nothing
	  return '';
	}
	
	function renderHidden() {
	  return 'qg-visually-hidden';
	}
	
	function renderLink(url, title, icon, ga) {var hidden = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	  return '<li class="qg-share-list-item">\n            <a class="qg-share-link qg-accessibility-off" href="' +
	  url + '" title="' + title + '" ' + ga + ' >' + icon + '<span class="title ' + hidden + '"">' + title + '</span></a>\n          </li>';
	
	}
	
	function renderShareButtons() {
	  return '<span class="navbar-brand qg-share__title">Share this page:</span>\n  <ul class="navbar navbar-right qg-share-list">\n    ' +
	
	  getLinks('primary') + '\n   </ul>';
	
	}
	
	/**
	   * #####################################
	   * Controller
	   **/
	
	function getLinks(type) {
	  // Get link list
	  var socialLinks = socialLinksList;
	  // Get page data
	  var from = window.location.href;
	  var domain = window.location.hostname;
	  // const title = $(document).find('title').text();
	  var description = $('meta[name="DCTERMS.description"]').attr('content');
	
	  // Iterate
	  var str = '';
	  for (var prop in socialLinks[type]) {
	    var entry = socialLinks[type][prop];
	    var titleKey = entry.title.toLowerCase();
	    var url = renderSocialURL(titleKey, from, entry.title, domain, description);
	    var hidden = '';
	    if (entry.showTitle !== true) {
	      hidden = renderHidden();
	    }
	    str = str + renderLink(url, entry.title, entry.icon, entry.ga, hidden);
	  }
	  return str;
	}
	
	function init() {
	  var $target = $('#qg-share');
	  $target.html(renderShareButtons());
	}
	
	module.exports = { init: init };

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';(function () {
	    $('.qg-global-breadcrumb .qg-breadcrumb-list').each(function () {
	        var breadcrumbLength = $(this).find('.qg-breadcrumb-list-item').length;
	        if (breadcrumbLength > 4) {
	            for (var i = 0; i < breadcrumbLength; i++) {
	                if (i > 1 && i < breadcrumbLength - 2) {
	                    $(this).find('.qg-breadcrumb-list-item').eq(i).addClass('shortened');
	                    $(this).find('.qg-breadcrumb-list-item').eq(i).find('.qg-breadcrumb-list-item__link').attr('tabindex', '-1');
	                    $(this).find('.qg-breadcrumb-list-item').eq(i).find('.qg-breadcrumb-list-item__link').attr('data-analytics-link-group', 'qg-breadcrumb-revealed-link');
	                } else {
	                    $(this).find('.qg-breadcrumb-list-item').eq(i).find('.qg-breadcrumb-list-item__link').attr('data-analytics-link-group', 'qg-breadcrumb-link');
	                }
	            }
	            $(this).find('.qg-breadcrumb-list-item').eq(1).after("<li class='qg-breadcrumb-list-item shorten'><button class='qg-breadcrumb-toggle' aria-label='Expand the breadcrumbs' data-analytics-link-group='qg-breadcrumb-ellipsis'>[...]</button></li>");
	        }
	
	        $('.qg-breadcrumb-toggle').on('click', function () {
	            $('.qg-breadcrumb-list-item').removeClass('shortened');
	            $('.qg-breadcrumb-list-item__link').attr('tabindex', '0');
	            $('.qg-breadcrumb-list').addClass('expanded');
	        });
	    });
	})();

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';(function () {
	  $('.qg-index-item').each(function () {
	    if ($(this).find('img').length <= 0) {
	      $(this).addClass('content-only');
	    }
	  });
	})();

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict'; /**
	               * Figures
	               *
	               * Show/hide credits for figures
	               *
	               * @requires jQuery
	               */
	
	$(function () {
	    'use strict';
	
	    var figureElement = '.qg-cut-in, .qg-cut-in-alt';
	    $('#qg-content .figure-credits-toggle').on('click', function () {
	        $(this).closest(figureElement).find('.figure-credits').toggle(500).focus().end();
	    });
	});

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	'use strict'; /**
	              * AJAX feedback form submission
	              **/
	
	$('.no-js').removeClass('no-js');
	
	$('#qg-page-feedback-form').submit(function (event) {
	  event.preventDefault();
	  var postUrl = $(this).attr('action');
	  var requestMethod = $(this).attr('method');
	  var formData = new FormData(this);
	  $.ajax({
	    url: postUrl,
	    type: requestMethod,
	    data: formData,
	    contentType: false,
	    cache: false,
	    processData: false }).
	  done(function (response) {
	    $('.qg-footer-feedback .thankyou').removeClass('d-none');
	    $('#qg-page-feedback-form, .qg-feedback-toggle').addClass('d-none');
	    var thankyou = $.parseHTML(response);
	    $('.qg-footer-feedback .thankyou').append(thankyou);
	  });
	});
	
	$('.qg-footer-feedback__close').click(function () {
	  $('.qg-feedback-toggle').removeClass('d-none');
	});
	
	$('.qg-feedback-toggle').click(function () {
	  if ($('#qg-page-feedback-form').hasClass('d-none')) {
	    $(this).addClass('d-none');
	  }
	});
	
	/**
	    * Adds page and user details to hidden inputs on the feedback form
	    **/
	
	function sanitize(str) {
	  if (!str) {
	    return false;
	  }
	  return str.replace(/</g, '&lt;') // strip <
	  .replace(/>/g, '&gt;') // strip >
	  .replace(/\+/g, '&#43;') // strip +
	  .replace(/\\/g, '&#92;') // strip \
	  .replace(/\(/g, '&#40;') // strip (
	  .replace(/\)/g, '&#41;') // strip )
	  .replace(/{/g, '&#123;') // strip (
	  .replace(/}/g, '&#124;'); // strip )
	}
	// the script try to predict browser name from the User-Agent
	var browserName = function () {
	  var ua = navigator.userAgent;
	  var tem = void 0;
	  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	  if (/trident/i.test(M[1])) {
	    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	    return 'IE ' + (tem[1] || '');
	  }
	  if (M[1] === 'Chrome') {
	    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
	    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	  }
	  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
	  return M.join(' ');
	}();
	
	function addHiddenInput(key, val) {
	  var newHiddenInput = $('<input type="hidden"/>');
	  newHiddenInput.attr('name', key);
	  newHiddenInput.attr('value', sanitize(val));
	  $('#feedback-hidden-inputs').append(newHiddenInput);
	}
	function init(franchiseTitle) {
	  addHiddenInput('franchise', location.pathname.split('/')[1]);
	  addHiddenInput('page-title', $(document).find('title').text());
	  addHiddenInput('page-url', window.location.href);
	  addHiddenInput('page-referer', document.referrer);
	  addHiddenInput('rspUsrAgent', navigator.userAgent);
	  addHiddenInput('browserName', browserName);
	  addHiddenInput('OS', navigator.platform);
	  addHiddenInput('g-recaptcha-response', '');
	}
	
	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=qg-main.js.map