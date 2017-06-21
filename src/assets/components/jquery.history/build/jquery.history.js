/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// WORK REQUIRERD replace this: http://tkyk.github.io/jquery-history-plugin/

/*
 * jQuery history plugin
 *
 * The MIT License
 *
 * Copyright (c) 2006-2009 Taku Sano (Mikage Sawatari)
 * Copyright (c) 2010 Takayuki Miwa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*global qg*/
(function ($, qg) {
	var locationWrapper = {
		put: function (hash, win) {
			(win || window).location.hash = this.encoder(hash);
		},
		get: function (win) {
			var hash = ((win || window).location.hash).replace(/^#/, '');
			try {
				return decodeURIComponent(hash);
			} catch (error) {
				return hash;
			}
		},
		encoder: encodeURIComponent
	};

	var iframeWrapper = {
		id: '__jQuery_history',
		init: function () {
			var html = '<iframe id="' + this.id + '" style="display:none" src="javascript:false;" />';
			$('body').prepend(html);
			return this;
		},
		_document: function () {
			return $('#' + this.id)[0].contentWindow.document;
		},
		put: function (hash) {
			var doc = this._document();
			doc.open();
			doc.close();
			locationWrapper.put(hash, doc);
		},
		get: function () {
			return locationWrapper.get(this._document());
		}
	};

	function initObjects (options) {
		options = $.extend({
			unescape: false
		}, options || {});

		locationWrapper.encoder = encoder(options.unescape);

		function encoder (unescape_) {
			if (unescape_ === true) {
				return function (hash) { return hash; };
			}
			if (typeof unescape_ === 'string' &&
			   (unescape_ = partialDecoder(unescape_.split(''))) ||
				typeof unescape_ === 'function') {
				return function (hash) { return unescape_(encodeURIComponent(hash)); };
			}
			return encodeURIComponent;
		}

		function partialDecoder (chars) {
			var re = new RegExp($.map(chars, encodeURIComponent).join('|'), 'ig');
			return function (enc) { return enc.replace(re, decodeURIComponent); };
		}
	}

	var implementations = {};

	implementations.base = {
		callback: undefined,
		type: undefined,

		check: function () {},
		load: function (hash) {},
		init: function (callback, options) {
			initObjects(options);
			self.callback = callback;
			self._options = options;
			self._init();
		},

		_init: function () {},
		_options: {}
	};

	implementations.timer = {
		_appState: undefined,
		_init: function () {
			var current_hash = locationWrapper.get();
			self._appState = current_hash;
			self.callback(current_hash);
			setInterval(self.check, 100);
		},
		check: function () {
			var current_hash = locationWrapper.get();
			if (current_hash !== self._appState) {
				self._appState = current_hash;
				self.callback(current_hash);
			}
		},
		load: function (hash) {
			if (hash !== self._appState) {
				locationWrapper.put(hash);
				self._appState = hash;
				self.callback(hash);
			}
		}
	};

	implementations.iframeTimer = {
		_appState: undefined,
		_init: function () {
			var current_hash = locationWrapper.get();
			self._appState = current_hash;
			iframeWrapper.init().put(current_hash);
			self.callback(current_hash);
			setInterval(self.check, 100);
		},
		check: function () {
			var iframe_hash = iframeWrapper.get(),
				location_hash = locationWrapper.get();

			if (location_hash !== iframe_hash) {
				if (location_hash === self._appState) {    // user used Back or Forward button
					self._appState = iframe_hash;
					locationWrapper.put(iframe_hash);
					self.callback(iframe_hash);
				} else {                          // user loaded new bookmark
					self._appState = location_hash;
					iframeWrapper.put(location_hash);
					self.callback(location_hash);
				}
			}
		},
		load: function (hash) {
			if (hash !== self._appState) {
				locationWrapper.put(hash);
				iframeWrapper.put(hash);
				self._appState = hash;
				self.callback(hash);
			}
		}
	};

	implementations.hashchangeEvent = {
		_init: function () {
			self.callback(locationWrapper.get());
			$(window).bind('hashchange', self.check);
		},
		check: function () {
			self.callback(locationWrapper.get());
		},
		load: function (hash) {
			locationWrapper.put(hash);
		}
	};

	var self = $.extend({}, implementations.base);

	if (qg.oldIE && qg.oldIEversion < 8) {
		self.type = 'iframeTimer';
	} else if ('onhashchange' in window) {
		self.type = 'hashchangeEvent';
	} else {
		self.type = 'timer';
	}

	$.extend(self, implementations[self.type]);

	$.history = self;
})(jQuery, qg);


/***/ })
/******/ ]);