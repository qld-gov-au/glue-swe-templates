// env initialization
import qg from './utils/qg-env';

// utils import
import './utils/qg-util';

// legacy module imports
import './legacy/forms/forms';
import './legacy/site-search-autocomplete.js';

// components import
import './components/qg-components';

// Layout imports
import './layout/footer/footer-legals';
import activeSideNav      from './layout/section-nav/section-nav';
import stepNav      from './layout/section-nav/step-nav';
import shareLinks         from './layout/content/share-links';
import './layout/breadcrumbs/breadcrumbs';
import './layout/content/content';
import './layout/content/content-types/figure-credits-toggle';
import feedbackForm       from './layout/footer/feedback-form';

(function () {
  'use strict';
  let franchiseTitle = qg && qg.swe && qg.swe.franchiseTitle;
  activeSideNav.highlightNavItem();
  stepNav.init();
  feedbackForm.init(franchiseTitle);
  shareLinks.init();
}());

