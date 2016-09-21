import '../../../node_modules/bootstrap/dist/js/bootstrap.js';
import './components/global/bootstrap-accessibility.js';

import './components/autocomplete.js';
import './components/forms.js';
// import mobileNav from './components/nav/mobile-nav.js'
import activeSideNav from './components/nav/current-secondary-nav';
import utils from './components/global/utils.js';
import feedbackForm from './components/feedback-form';
import shareLinks from './components/share-links';

(function () {
  'use strict';
  // mobileNav.interactions()
  activeSideNav.highlightNavItem();
  var franchiseTitle = qg && qg.swe && qg.swe.franchiseTitle;
  feedbackForm.init(franchiseTitle);
  shareLinks.init();
// utils.showHide()
}());
