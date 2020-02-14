/*
* Any form with form attribute data-recaptcha="true", will run and validate with Google invisible recaptcha
* The site key, will be replaced
*   - Local - by test key in build process (gulp/gulp-config.js, gulp/common-tasks/js.js)
*   - Dev, Test, Staging, Beta - in bamboo deployment plan - https://servicesmadesimpler.govnet.qld.gov.au/bitbucket/projects/CDN/repos/static-qld_cloudformation/browse/deployment_swev3.yml
* */

/*globals grecaptcha, qg*/
import keys from '../../data/qg-google-keys';

(function ($, swe) {
  let checkEnv = window.location.hostname.search(/\bdev\b|\btest\b|\blocalhost\b|\bgithub\b|\buat\b/);
  let $feedbackForm = $('#qg-page-feedback-form');

  if ($feedbackForm.length > 0) {
    let setUrlEnableCaptcha = () => {
      // if environment is not PROD then use test submission handler link
      if (checkEnv !== -1) {
        $feedbackForm.attr('action', 'https://test.smartservice.qld.gov.au/services/submissions/email/feedback/feedback');
      }
      // if data-recaptcha attribute is not present then insert it
      if ($feedbackForm.attr('data-recaptcha') === undefined) {
        $feedbackForm.attr('data-recaptcha', 'true');
      }
    };
    setUrlEnableCaptcha();
  }

  let googleRecaptchaApiKey = checkEnv !== -1
    ? keys.defGoogleRecaptcha.uat
    : keys.defGoogleRecaptcha.prod;//This is a v2 key
  let footerFeedbackGoogleRecaptchaApiKey = checkEnv !== -1
    ? keys.defFeedbackGoogleRecaptcha.uat
    : keys.defFeedbackGoogleRecaptcha.prod;//This is a v3 key
  //v3 Captcha, can have multiples
  let v3Captcha = (form, greptcha, key, action) => {
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
  };

  //v2 Captcha, usually is singular
  let v2Captcha = (form, subBtn, key) => {
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
  };

  let loadedRecaptcha = false;
  let onloadRecaptcha = () => {
    grecaptcha.ready(function () {
    // eslint-disable-line
    //v2 Forms
      if (!loadedRecaptcha) {
        $('form[data-recaptcha="true"]')
          .find('input[type="submit"], button[type="submit"]')
          .on('click', e => {
            e.preventDefault();
            let subBtn = e.target;
            let form = $(subBtn).parents('form');
            var greptcha = form.find('input[name="g-recaptcha-response"]');
            let manualSitekey = form.attr('data-sitekey');
            let manualAction = form.attr('data-action');
            if (form.attr('id') === 'qg-page-feedback-form') { //Footer feedback
              v3Captcha(form, greptcha, footerFeedbackGoogleRecaptchaApiKey, 'feedback');
            } else if (manualSitekey !== undefined && manualAction !== undefined) { //v3 manual form
              v3Captcha(form, greptcha, manualSitekey, manualAction);
            } else if (manualAction !== undefined) { //v3 manual with feedback key but differnt action
              v3Captcha(form, greptcha, footerFeedbackGoogleRecaptchaApiKey, manualAction);
            } else if (manualSitekey !== undefined && manualAction === undefined) { //v2 manual (no action in v2)
              v2Captcha(form, subBtn, manualSitekey);
            } else { //default v2 with default key
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
  let loadFooter = false;
  let requireDefaultKey = false;
  if ($('form[data-recaptcha="true"]').length > 0) {
    //enable recaptcha on form submits, load latest v3 version of recaptcha
    let v2Loaded = false;
    $('form[data-recaptcha="true"]').each(function () {
      let manualSitekey = $(this).attr('data-sitekey');
      let manualAction = $(this).attr('data-action');
      if ($(this).attr('id') === 'qg-page-feedback-form') { //Footer feedback
        //Only load if the feedback button is clicked
        loadFooter = true;
      } else if (manualSitekey !== undefined && manualAction !== undefined) { //v3 manual form
        swe.ajaxCall(
          'https://www.google.com/recaptcha/api.js?render=' + manualSitekey,
          'script',
          onloadRecaptcha,
          'Recaptcha unavailable',
        );
      } else if (manualSitekey === undefined && manualAction !== undefined) {
        requireDefaultKey = true;
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
    //As v3 key is used in footer and could also be used on the page with a differnt action, we need to ensure we only load it once
    if (requireDefaultKey) {
      //load right away
      swe.ajaxCall(
        'https://www.google.com/recaptcha/api.js?render=' + footerFeedbackGoogleRecaptchaApiKey,
        'script',
        onloadRecaptcha,
        'Recaptcha unavailable',
      );
    } else {
      if (loadFooter) {
        //Only load if the feedback button is clicked
        $('#page-feedback-useful').one('click', function () {
          swe.ajaxCall(
            'https://www.google.com/recaptcha/api.js?render=' + footerFeedbackGoogleRecaptchaApiKey,
            'script',
            onloadRecaptcha,
            'Recaptcha unavailable',
          );
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
})(jQuery, qg.swe);
