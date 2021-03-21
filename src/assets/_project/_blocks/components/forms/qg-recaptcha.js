/*globals grecaptcha, qg*/
import keys from '../../data/qg-google-keys';

(function ($, swe) {
  'use strict';
  /**
   * Google recaptcha for SWE global footer feedback which uses AJAX to communicate with the submission handler.
   **/
  var qgGlobalFooterRecaptcha = {
    config: {
      $feedbackForm: $('#qg-page-feedback-form'),
      $recaptchaOnPage: $('form[data-recaptcha="true"]'),
    },
    googleRecaptchaApiKey: function() {
      return this.isProd() ? keys.defGoogleRecaptcha.prod : keys.defGoogleRecaptcha.uat;
    },
    footerFeedbackGoogleRecaptchaApiKey: function() {
      return this.isProd() ? keys.defFeedbackGoogleRecaptcha.prod : keys.defFeedbackGoogleRecaptcha.uat;
    },
    isProd: function() {
      return window.location.hostname.search(/dev|test|localhost|github|\buat\b/) === -1;
    },
    init: function() {
      let $feedbackForm = this.config.$feedbackForm;
      let selfObj = this;

      if ($feedbackForm.length > 0) {
        /**
         * check if env is not the prod env then change submission handler url to test.smartservice.qld.gov.au
         **/
        if (!this.isProd()) {
          var testUrl = $feedbackForm.attr('action').replace('www.smartservice.qld.gov.au', 'test.smartservice.qld.gov.au');
          $feedbackForm.attr('action', testUrl);
        }
        /**
         * if data-recaptcha attribute is not present then insert it
         **/
        if ($feedbackForm.attr('data-recaptcha') === undefined) {
          $feedbackForm.attr('data-recaptcha', 'true');
        }
        this.footerFeedbackRecaptcha();
        let loadedRecaptcha = false;
        let onloadRecaptcha = () => {
          this.hideCaptchaBanner();
          grecaptcha.ready(function () {
            //v2 Forms
            if (!loadedRecaptcha) {
              $('[data-recaptcha="true"]:not(#qg-page-feedback-form)')
                .find('input[type="submit"], button[type="submit"]')
                .on('click', e => {
                  // eslint-disable-next-line no-debugger
                  debugger;
                  e.preventDefault();
                  let subBtn = e.target;
                  let form = $(subBtn).parents('form');
                  var greptcha = form.find('input[name="g-recaptcha-response"]');
                  let manualSitekey = form.attr('data-sitekey');
                  let manualAction = form.attr('data-action');
                  if (manualSitekey !== undefined && manualAction !== undefined) { //v3 manual form
                    selfObj.v3Captcha(form, greptcha, manualSitekey, manualAction);
                  } else if (manualAction !== undefined) { //v3 manual with feedback key but differnt action
                    selfObj.v3Captcha(form, greptcha, selfObj.footerFeedbackGoogleRecaptchaApiKey, manualAction);
                  } else if (manualSitekey !== undefined) { //v2 manual (no action in v2)
                    selfObj.v2Captcha(form, subBtn, manualSitekey);
                  } else { //default v2 with default key
                    selfObj.v2Captcha(form, subBtn, selfObj.googleRecaptchaApiKey);
                  }
                });
              loadedRecaptcha = true;
            }
          });
        };
        if ($('form[data-recaptcha="true"]').length > 0) {
          //enable recaptcha on form submits, load latest v3 version of recaptcha
          let v2Loaded = false;
          $('form[data-recaptcha="true"]').each(function () {
            let manualSitekey = $(this).attr('data-sitekey');
            let manualAction = $(this).attr('data-action');
            if (manualSitekey !== undefined && manualAction !== undefined) { //v3 manual form
              swe.ajaxCall(
                'https://www.google.com/recaptcha/api.js?render=' + manualSitekey,
                'script',
                onloadRecaptcha,
                'Recaptcha unavailable',
              );
            } else {
              if (!v2Loaded) {
                swe.ajaxCall(
                  'https://www.google.com/recaptcha/api.js',
                  'script',
                  onloadRecaptcha,
                  'Recaptcha unavailable',
                );
                v2Loaded = true;
              }
            }
          });
        }
      }
    },
    /**
     * From SWE4 onwards footer feedback is AJAX based
     * @return {undefined}
     **/
    footerFeedbackRecaptcha: function() {
      var selfObj = this;
      this.hideCaptchaBanner();
      /**
       * call recaptcha api to load script with the key on .qg-feedback-toggle click
       **/
      $('.qg-feedback-toggle').one('click', function(){
        swe.ajaxCall(
          'https://www.google.com/recaptcha/api.js?render=' + selfObj.footerFeedbackGoogleRecaptchaApiKey(),
          'script',
          onReady,
          'Recaptcha unavailable',
        );
      });
      /**
       * onReady function is executed after calling recaptcha api in the above code
       * This function creates a submit event
       * Call submission handler api
       * Get and display success message
       * @return {undefined}
       **/
      let onReady = function (){
        grecaptcha.ready(function () {
          $('#qg-page-feedback-form').submit(function (event) {
            var self = $(this);
            event.preventDefault();
            if ($('#qg-page-feedback-form li.invalid').length <= 0) {
              var greptcha = selfObj.config.$feedbackForm.find('input[name="g-recaptcha-response"]');
              var postUrl = self.attr('action');
              var requestMethod = self.attr('method');
              var $successMsgContainer = $('.thankyou');
              grecaptcha.execute(selfObj.footerFeedbackGoogleRecaptchaApiKey(), {action: 'feedback'})
                .then(function (token) {
                  if (greptcha.length > 0) {
                    greptcha.val(token);
                    var formData = self.serialize();
                    $.ajax({
                      url: postUrl,
                      type: requestMethod,
                      data: formData,
                      contentType: 'application/x-www-form-urlencoded',
                      cache: false,
                      processData: false,
                    }).done(function (response) {
                      $successMsgContainer.removeClass('d-none');
                      $('#qg-page-feedback-form, .qg-feedback-toggle').addClass('d-none');
                      $successMsgContainer.append($.parseHTML(JSON.parse(response).message));
                    }).fail(function () {
                      $successMsgContainer.append('<p>Request failed, please try again</p>');
                    });
                    return true;
                  }
                });
            }
          });
        });
      };
    },
    /**
     * If all forms have captchaPrivacyTerms, we can hide reCAPTCHA Badge
     * @return {undefined}
     **/
    hideCaptchaBanner: function (){
      if ($('p[class="captchaPrivacyTerms"]').length === $('form[data-recaptcha="true"]').length) {
        var hidegrecaptchaBadge = '.grecaptcha-badge { visibility: hidden; }';
        var styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = hidegrecaptchaBadge;
        document.head.appendChild(styleSheet);
      }
    },
    v2Captcha: function (form, subBtn, key){
      try {
        //console.log('v2 key: ' + key);
        grecaptcha.render(subBtn, {
          sitekey: key,
          callback: () => {
            var response = grecaptcha.getResponse();
            if (
              response === '' ||
              response === undefined ||
              response.length === 0
            ) {
              console.log('Invalid recaptcha');
              return false;
            } else {
              form.submit();
            }
          },
        });
      } catch (e) {
        grecaptcha.reset();
        return false;
      }
      grecaptcha.execute();
    },
    v3Captcha: function (form, greptcha, key, action){
      //console.log('v3 key: ' + key);
      try {
        grecaptcha.execute(key, {action: action})
          .then(function (token) {
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
    },
  };
  qgGlobalFooterRecaptcha.init();
})(jQuery, qg.swe);