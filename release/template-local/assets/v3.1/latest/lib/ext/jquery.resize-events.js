/*! SWE 3.1.8 2020042T1658 */
!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){/**
 * Resize Events
 * @version 2.1
 * Changelog:
 *   * 0.5 Added API bind() function to make it easier to add listeners.
 *   * 0.6 Added support for window height changes
 *   * 0.7 Clean up outstanding bugs (duplicate event firing) and refactor.
 *   * 2.0 This version breaks the previous API, and ditches text-resize detection in favour of pure speeeed (optimised for modern browsers that zoom).
 *   * 2.1 Add support to register watchers that can detect size changes on individual elements (and then throw x-width-change and x-height-change events). Throttle helpers also added.
 *
 * There is no consistency between browser implementations of the window resize event
 * (some trigger as the window is resized, some only trigger as the user drops the resize handle).
 * This extension polls to detect these changes, and reports them immediately as custom events
 * ('x-window-resize', 'x-window-width-resize', or 'x-window-height-resize') that other code can listen for and react to accordingly.
 * Resize Events also send an 'x-initial-size' event on load.
 *
 * The custom events triggered are sent with emPixels, textHeight and windowWidth variables.
 * emPixels is a unit that estimates much space you have to work with but is resolution, text size
 * and zoom level independant. Use this value to base layout decisions on, and the layout will
 * always fit.
 *
 * @author Andrew Ramsden <http://irama.org/>
 *
 * @see http://irama.org/web/dhtml/resize-events/
 * @license GNU GENERAL PUBLIC LICENSE (GPL) <http://www.gnu.org/licenses/gpl.html>
 * @requires jQuery (tested with 1.6.2) <http://jquery.com/>
 */
var n={eventElement:document,initialised:!1,timeoutID:null,currentWindowWidth:null,currentWindowHeight:null,heartbeatThrottleCount:0,watchedElements:[],throttleStates:{},conf:{windowResizeEvent:"x-window-resize",windowWidthResizeEvent:"x-window-width-resize",windowHeightResizeEvent:"x-window-height-resize",elementWidthResizeEvent:"x-width-change",elementHeightResizeEvent:"x-height-change",initialResizeEvent:"x-initial-sizes",watcherClass:"resize-events-watcher",framesPerHeartbeat:6}};!function(e,t){"use strict";window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)}}(),n.bind=function(t,i){e(function(){!0!==n.initialised&&n.initialise()}),e(n.eventElement).bind(t,i)},n.initialise=function(){if(!0!==n.initialised){var t=e(window).width(),i=e(window).height();n.currentWindowWidth=t,n.currentWindowHeight=i,e(n.eventElement).trigger(n.conf.initialResizeEvent,[t,i]),n.initialised=!0,e(window).resize(n.handleWindowResize)}},e.fn.registerWatcher=function(t,i){var r=-1!==t.indexOf("width"),o=-1!==t.indexOf("height");void 0===i&&(e(this).wrapInner('<div class="'+n.conf.watcherClass+'"></div>'),i="."+n.conf.watcherClass),e(this).each(function(){e(this).data("resizeEvents",{watchWidth:r,previousWidth:null,watchHeight:o,previousHeight:null,innerElementSelector:i})}),n.watchedElements[n.watchedElements.length]=e(this),1===n.watchedElements.length&&n.heartbeat()},n.heartbeat=function(){if(n.heartbeatThrottleCount++%n.conf.framesPerHeartbeat!=0)return void window.requestAnimFrame(n.heartbeat);var t,i=null,r=null,o=function(){var t=e(this),o=t.data("resizeEvents"),a=t.find(o.innerElementSelector).eq(0);o.watchWidth&&(i=a.width())!==o.previousWidth&&(t.trigger(n.conf.elementWidthResizeEvent,[i]),o.previousWidth=i),o.watchHeight&&(r=a.height())!==o.previousHeight&&(t.trigger(n.conf.elementHeightResizeEvent,[r]),o.previousHeight=r),t.data("resizeEvents",o)};for(t=0;t<n.watchedElements.length;t++)n.watchedElements[t].each(o);window.requestAnimFrame(n.heartbeat)},n.handleWindowResize=function(){t.oldIE&&t.oldIEversion<7&&n.throttle(n.handleWindowResize,200)||n.broadcastWindowResize()},n.broadcastWindowResize=function(){n.timeoutID=null;var t=e(window).width(),i=e(window).height(),r=!1;n.currentWindowWidth!==t&&(e(n.eventElement).trigger(n.conf.windowWidthResizeEvent,[t,i]),e(n.eventElement).trigger(n.conf.windowResizeEvent,[t,i]),n.currentWindowWidth=t,r=!0),n.currentWindowHeight!==i&&(e(n.eventElement).trigger(n.conf.windowHeightResizeEvent,[t,i]),r||e(n.eventElement).trigger(n.conf.windowResizeEvent,[t,i]),n.currentWindowHeight=i)},n.throttle=function(e,t){var i=e.toString().match(/ResizeEvents\.throttle\s*\(\s*([^,\s]+)/)[1];return!0===n.throttleStates[i]?(n.throttleStates[i]=null,!1):(null!==n.throttleStates[i]&&window.clearTimeout(n.throttleStates[i]),n.throttleStates[i]=window.setTimeout(function(){n.releaseThrottle(i,e)},t),!0)},n.releaseThrottle=function(e,t){n.throttleStates[e]=!0,t.apply()}}(jQuery,qg)}]);