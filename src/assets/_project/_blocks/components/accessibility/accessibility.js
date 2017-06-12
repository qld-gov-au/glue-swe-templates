/* ========================================================================
* Accessibility helpers
* ======================================================================== */

'use strict';

function opensInNewWindow () {
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

function addFileType () {
  let doctypes = 'PDF|DOC|DOCX|XLS|XLSX|RTF';
  $('a', '#content, #asides').filter(() => {
    var regex = new RegExp('\\.(' + doctypes + ')$', 'i').test(this.href);
    return regex ? $(this).addClass('download').find('.meta').length === 0 : !1;
  }).each(() => {
    let regex = null;
    let d = null;
    let e = $(this);
    let f = e.text();
    new RegExp('\\((?:' + doctypes + '),?\\s+[0-9\\.]+\\s*[KM]B\\)$', 'i').test(f) ? (d = $('<span class="meta">' + f.replace(new RegExp('^.*\\((' + doctypes + '),?\\s+([0-9\\.]+)\\s*([KM]B)\\)$'), '($1, $2$3)') + '</span>'),
    regex = e.contents().eq(-1),
    regex[0].data = regex[0].data.replace(new RegExp('\\s+\\((?:' + doctypes + '),?\\s+[0-9\\.]+\\s*[KM]B\\)$'), ''),
    e.wrapInner('<span class="title"/>'),
    e.append(' '),
    e.append(d)) : (f = e.attr('href').replace(/^.*\.(.+)$/, '$1').toUpperCase(),
    e.wrapInner('<span class="title"/>').append(' <span class="meta">(' + f + ')</span>'));
  });
}

function addCorrectIncorrect () {
  let ext = ':not(:has(.qg-blank-notice))';
  let $correct = $(`.qg-correct${ext}, table.qg-correct-incorrect td:nth-child(odd)${ext}`);
  let $incorrect = $(`.qg-incorrect${ext}, table.qg-correct-incorrect td:nth-child(even)${ext}`);

  $correct.prepend('<span class="qg-blank-notice sr-only">Correct.</span> ');
  $incorrect.prepend('<span class="qg-blank-notice sr-only">Incorrect.</span> ');
}

function init () {
  if ($('body').attr('data-qg-accessibility') !== false) {
    opensInNewWindow();
    addFileType();
    addCorrectIncorrect();
  }
}

module.exports = { init: init };

