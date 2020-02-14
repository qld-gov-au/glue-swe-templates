/**
 * Function for rendering social media links on CUE compliant sites
 *
 * Requires:
 * - JQuery
 **/

/**
 * #####################################
 * Model
 **/

const socialLinksList = {
  primary: [
    { title: 'Facebook', showTitle: false, icon: renderIcon('fa', 'facebook') },
    { title: 'Twitter', showTitle: false, icon: renderIcon('fa', 'twitter') },
    { title: 'LinkedIn', showTitle: false, icon: renderIcon('fa', 'linkedin') },
    { title: 'Others', showTitle: false, icon: renderIcon('fa', 'share-alt') },
  ],
  /* secondary: [
    // {title: 'Delicious',    showTitle: true, icon: renderIcon('fa', 'delicious')},
    { title: "Digg", showTitle: true, icon: renderIcon("fa", "digg") },
    // {title: 'Evernote',     showTitle: true, icon: renderIcon('svg', 'evernote', '/assets/v3/images/evernote-logo-white.svg')},
    // {title: 'Reddit',       showTitle: true, icon: renderIcon('fa', 'reddit')},
    // {title: 'StumbleUpon',  showTitle: true, icon: renderIcon('fa', 'stumbleupon')},
    // {title: 'Tumblr',       showTitle: true, icon: renderIcon('fa', 'tumblr')},
    { title: "Google+", showTitle: true, icon: renderIcon("fa", "google-plus") }
  ]*/
};

/**
 * #####################################
 * Views
 **/

function renderSocialURL (who, from, title, domain, description) {
  switch (who) {
  case 'facebook':
    return `http://www.facebook.com/share.php?u=${from}&title=${title}`;
  case 'twitter':
    return `https://twitter.com/share?url=${encodeURI(from)}`;
  case 'linkedin':
    return `http://www.linkedin.com/shareArticle?mini=true&url=${from}&title=${title}&source=${domain}`;
  case 'others':
    return `https://www.qld.gov.au/share?&title=${title}&url=${from}`;
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
      return `https://plus.google.com/share?url=${from}`;*/
  }
  return false;
}

function renderIcon (type, name, src = false) {
  switch (type) {
  case 'fa':
    return `<span class="fa fa-${name} fa-2x qg-share-icon" aria-hidden="true"></span>`;
  case 'svg':
    return `<img src="${src}" aria-hidden="true" class="qg-share-icon" alt="name" />`;
  }
  // Default, return nothing
  return '';
}

function renderHidden () {
  return 'qg-visually-hidden';
}

function renderLink (url, title, icon, hidden = '') {
  return `<li>
            <a class="qg-share-link qg-accessibility-off" href="${url}" title="${title}">${icon}<span class="title ${hidden}"">${title}</span></a>
          </li>`;
}

function renderShareButtons () {
  return `<h2>Share:</h2>
  <ul class="navbar navbar-right">
    ${getLinks('primary')}
   </ul>`;
}

/**
 * #####################################
 * Controller
 **/

function getLinks (type) {
  // Get link list
  const socialLinks = socialLinksList;
  // Get page data
  const from = window.location.href;
  const domain = window.location.hostname;
  // const title = $(document).find('title').text();
  const description = $('meta[name="DCTERMS.description"]').attr('content');

  // Iterate
  let str = '';
  for (let prop in socialLinks[type]) {
    let entry = socialLinks[type][prop];
    let titleKey = entry.title.toLowerCase();
    let url = renderSocialURL(titleKey, from, entry.title, domain, description);
    let hidden = '';
    if (entry.showTitle !== true) {
      hidden = renderHidden();
    }
    str = str + renderLink(url, entry.title, entry.icon, hidden);
  }
  return str;
}

function init () {
  const $target = $('#qg-share');
  $target.html(renderShareButtons());
}

module.exports = { init: init };
