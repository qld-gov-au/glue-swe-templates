/*! SWE 3.1.8 2020042T1658 */
!function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){/**
 * Resize Events
 * @version 0.7
 * Changelog:
 *   * 0.5 Added API bind() function to make it easier to add listeners.
 *   * 0.6 Added support for window height changes
 *   * 0.7 Clean up outstanding bugs (duplicate event firing) and refactor.
 * 
 * There is no standard event for when a user resizes the text in their browser.
 * There is also no consistency between browser implementations of the window resize event
 * (some trigger as the window is resized, some only trigger as the user drops the resize handle).
 * This extension polls to detect these changes, and reports them immediately as custom events
 * ('x-text-resize' and 'x-window-resize') that other code can listen for and react to accordingly.
 * Resize Events also send an 'x-initial-size' event on load.
 * 
 * The custom events triggered are sent with emPixels, textHeight and windowWidth variables.
 * emPixels is a unit that estimates much space you have to work with but is resolution, text size
 * and zoom level independant. Use this value to base layout decisions on, and the layout will
 * always fit.
 * 
 * This extension is based on the 'text resize' events work of Lawrence Carvalho <http://www.alistapart.com/articles/fontresizing/>.
 * 
 * @author Lawrence Carvalho <carvalho@uk.yahoo-inc.com>
 * @author Andrew Ramsden <http://irama.org/>
 * 
 * @see http://irama.org/web/dhtml/resize-events/
 * @license GNU GENERAL PUBLIC LICENSE (GPL) <http://www.gnu.org/licenses/gpl.html>
 * @requires jQuery (tested with 1.4.2) <http://jquery.com/>
 */
var i={baseTextHeight:null,currentTextHeight:null,baseWindowWidth:null,baseWindowHeight:null,currentWindowWidth:null,currentWindowHeight:null,initialised:!1,intervalReference:null,textSizeTestElement:null,eventElement:jQuery(document),conf:{textResizeEvent:"x-text-resize",windowResizeEvent:"x-window-resize",windowWidthResizeEvent:"x-window-width-resize",windowHeightResizeEvent:"x-window-height-resize",initialResizeEvent:"x-initial-sizes",pollFrequency:500,textSizeTestElId:"text-resize"}};!function(e){i.bind=function(t,n){e(function(){!0!==i.initialised&&i.initialise()}),i.eventElement.bind(t,n)},i.initialise=function(){!0!==i.initialised&&(i.textSizeTestElement=e('<span id="'+i.conf.textSizeTestElId+'" style="position: absolute; left: -9999px; font-size: 100%; font-family: Courier New, mono; margin: 0; padding: 0;">&nbsp;</span>').get(0),e("body").append(i.textSizeTestElement),windowWidthNow=e(window).width(),windowHeightNow=e(window).height(),textHeightNow=getTextHeight(),i.baseTextHeight=textHeightNow,i.currentTextHeight=textHeightNow,i.baseWindowWidth=windowWidthNow,i.currentWindowWidth=windowWidthNow,i.baseWindowHeight=windowHeightNow,i.currentWindowHeight=windowHeightNow,null==i.intervalReference&&(ResizeEventsPoll(),i.intervalReference=window.setInterval("ResizeEventsPoll()",i.conf.pollFrequency)),i.eventElement.trigger(i.conf.initialResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),i.initialised=!0)},ResizeEventsPoll=function(){windowWidthNow=e(window).width(),windowHeightNow=e(window).height(),textHeightNow=getTextHeight(),emPixelNow=windowWidthNow/textHeightNow,widthChanged=!1,i.currentWindowWidth!=windowWidthNow&&(i.eventElement.trigger(i.conf.windowWidthResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),i.eventElement.trigger(i.conf.windowResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),i.currentWindowWidth=windowWidthNow,widthChanged=!0),i.currentWindowHeight!=windowHeightNow&&(i.eventElement.trigger(i.conf.windowHeightResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),widthChanged||i.eventElement.trigger(i.conf.windowResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),i.currentWindowHeight=windowHeightNow),i.currentTextHeight!=textHeightNow&&(i.eventElement.trigger(i.conf.textResizeEvent,[emPixelNow,textHeightNow,windowWidthNow,windowHeightNow]),i.currentTextHeight=textHeightNow)},getTextHeight=function(){return i.textSizeTestElement.offsetHeight+""}}(jQuery)}]);