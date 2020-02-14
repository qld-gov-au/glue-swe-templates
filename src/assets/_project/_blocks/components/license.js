/**
 * if there is not a #document-licence present
 * this script will add one based on the DCTERMS.license metadata
 */
/*globals qg*/
(function ($, qg) {
  'use strict';
  const licenceOptions = {
    url: '//creativecommons.org/licenses/',
    imgSrc: qg.cdn + qg.swe.paths.images + '/licences/',
    types: {
      'by': {
        'name': 'Attribution',
        'imgName': 'by-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY 3.0 AU)',
            'urlPath': 'by/3.0/au/',
          },
          '4.0': {
            'title': '4.0 International (CC BY 4.0)',
            'urlPath': 'by/4.0/',
          },
        },
      },
      'by-sa': {
        'name': 'Attribution-ShareAlike',
        'imgName': 'by-sa-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY-SA 3.0 AU)',
            'urlPath': 'by-sa/3.0/au',
          },
          '4.0': {
            'title': '4.0 International (CC BY-SA 4.0)',
            'urlPath': 'by-sa/4.0/',
          },
        },
      },
      'by-nd': {
        'name': 'Attribution-NoDerivatives',
        'imgName': 'by-nd-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY-ND 3.0 AU))',
            'urlPath': 'by-nd/3.0/au/',
          },
          '4.0': {
            'title': '4.0 International (CC BY-ND 4.0)',
            'urlPath': 'by-nd/4.0/',
          },
        },
      },
      'by-nc': {
        'name': 'Attribution-NonCommercial',
        'imgName': 'by-nc-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY-NC 3.0 AU)',
            'urlPath': 'by-nc/3.0/au/',
          },
          '4.0': {
            'title': '4.0 International (CC BY-NC 4.0)',
            'urlPath': 'by-nc/4.0/',
          },
        },
      },
      'by-nc-sa': {
        'name': 'Attribution-NonCommercial-ShareAlike',
        'imgName': 'by-nc-sa-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY-NC-SA 3.0 AU)',
            'urlPath': 'by-nc-sa/3.0/au/',
          },
          '4.0': {
            'title': '4.0 International (CC BY-NC-SA 4.0)',
            'urlPath': 'by-nc-sa/4.0/',
          },
        },
      },
      'by-nc-nd': {
        'name': 'Attribution-NonCommercial-NoDerivatives',
        'imgName': 'by-nc-nd-80x15.png',
        'versions': {
          '3.0': {
            'title': '3.0 Australia (CC BY-NC-ND 3.0 AU)',
            'urlPath': 'by-nc-nd/3.0/au/',
          },
          '4.0': {
            'title': '4.0 International (CC BY-NC-ND 4.0)',
            'urlPath': 'by-nc-nd/4.0/',
          },
        },
      },
    },
  };

  var getLicenseVal = function (url) {
    var urlArr = /\/licenses\/([a-zA-Z0-9-/.]+)/g.exec(url)[1].split('/').filter(function (e) {
      return e;
    });

    var abbreviation = urlArr[0];
    var version = urlArr[1];

    return {
      name: licenceOptions.types[abbreviation].name,
      url: licenceOptions.url,
      imgPath: licenceOptions.imgSrc + licenceOptions.types[abbreviation].imgName,
      version: licenceOptions.types[abbreviation].versions[version],
    };
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
          '</p>',
        );
      }
    });
  }
}(jQuery, qg));
