(function ($) {
  'use strict';
  let linkType = '.PDF$|.DOC$|.DOCX$|.XLS$|.XLSX$|.RTF$';
  let contentType = 'PDF|DOC|DOCX|XLS|XLSX|RTF';
  $(document).ready(function () {
    $('a', '#qg-primary-content, #qg-secondary-content').each(function () {
      let $this = $(this);
      let linkRegex = new RegExp(linkType, 'i');
      // check to see if a link with a selected linkType exist
      // Example - cue-template-change-log.pdf|rtf...
      if (linkRegex.test($this.attr('href'))) {
        let contentRegex = new RegExp(contentType);
        let currContent = $this.text();
        if (/\.\d*?/.test(currContent)) {
          // check to see if decimals exist, if yes then round then off
          // Example (PDF 106.66) -> (PDF 106)
          let extractSize = new RegExp('\\((?:' + contentType.toUpperCase() + '),?\\s+[0-9\\.]+\\s*[KM]B\\)', 'i');
          if (currContent.match(extractSize)) {
            $(this).find('.meta').empty().append(currContent.match(extractSize)[0].toUpperCase().replace(/(\.\d*)/gi, ''))
          }
        } else if (!contentRegex.test(currContent)) {
          // check to see there is no doc type present in the content section
          // If yes then insert <span class="meta">PDF</span>
          let linkText = $this.attr('href').replace(/^.*\.(.+)$/, '$1').toUpperCase();
          $this.append(' <span class="meta">(' + linkText + ')</span>');
        }
      }
    });
  });
}(jQuery));

