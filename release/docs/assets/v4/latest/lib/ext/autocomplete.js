// onready
$(function () {
  'use strict';

  var MAX_SUGGESTIONS = 7;

  // TODO refactor this so functions are not created for every search form found on the page

  // setup for each form
  // TODO hardcoded to find.search.qld.gov.au
  $('form').filter('[action*="//find.search.qld.gov.au/"]').not('.qg-funnelback-search').each(function () {
    var form = this;
    var searchField = $(form.elements.query).filter('[name="query"]');
    var lastSearch = searchField.val();
    var userTyped = '';

    // ARIA
    searchField
      .attr('role', 'combobox')
      .attr('autocomplete', 'off')
    // both? or list? http://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#aria-autocomplete
      .attr('aria-autocomplete', 'both');

    // make the search box wider on focus
    // keep it wide while interacting with the search form (box, button, autosuggest list)

    // create the suggestion box
    var suggestions = $('<ul role="listbox" class="listbox" aria-busy="true"/>').generateId('suggestbox');
    searchField.after(suggestions);
    searchField.attr('aria-owns', suggestions.attr('id'));

    function closeSuggestions () {
      suggestions.empty();
    }

    function prefillInput (value) {
      searchField[0].value = value;
      // console.log( 'prefilling', value, userTyped );
      // http://stackoverflow.com/questions/12047648/setselectionrange-with-on-click-in-chrome-does-not-select-on-second-click
      setTimeout(function () {
        searchField[0].setSelectionRange(userTyped.length, searchField[0].value.length);
      }, 0);
    }

    function moveFocus (n) {
      var a = suggestions.find('a');
      var focus = a.filter('.focus');
      if (focus.length > 0) {
        n = (a.index(focus) + n) % a.length;
        focus.removeClass('focus');
      } else {
        n = n > -1 ? 0 : -1;
      }
      a = a.eq(n);
      a.addClass('focus');
      prefillInput(a.text());
    }

    // TODO how can we run this on both search forms (content and header) but show suggestions in the appropriate place?

    suggestions.on('click', 'a', function (event) {
      // should this submit? no. see ARIA instructions
      event.preventDefault();

      searchField.val($(this).text()).get(0).focus();
      closeSuggestions();
    });

    var KEYS = {
      alt: 18,
      backspace: 8,
      'delete': 46,
      down: 40,
      enter: 13,
      escape: 27,
      left: 37,
      right: 39,
      tab: 9,
      up: 38,
    };

    // clicking outside the field closes suggestions
    $(document).on('click', function (event) {
      if (searchField.is(event.target)) {
        event.stopImmediatePropagation();
      } else {
        closeSuggestions();
      }
    });

    // handle loss of focus due to TAB
    // need to run this onblur, but NOT when focus remains in the suggestions box
    // can we check focus in a parent element!? maybe a custom element
    // <combobox><input><ul></combobox> ??
    searchField.on('keydown', function (event) {
      switch (event.which) {
      case KEYS.up:
      case KEYS.down:
        moveFocus(event.which === KEYS.down ? 1 : -1);
        break;
      case KEYS.tab:
        closeSuggestions();
      }
    });
    searchField.on('keyup', function (event) {
      switch (event.which) {
      case KEYS.escape:
      case KEYS.enter:
        closeSuggestions();
      }

      // delete
      // console.log( event.which );
    });

    searchField.on('input', function () {
      userTyped = this.value;
      if (userTyped.length < 3) {
        closeSuggestions();
        return;
      }

      // console.log( 'fetch suggestions for ', userTyped );

      $.ajax({
        // cache! (the URL will be change with the search text)
        cache: true,
        dataType: 'jsonp',
        url: 'https://find.search.qld.gov.au/s/suggest.json?',
        data: {
          // TODO read these from search form
          collection: $(form.elements.collection).filter('[name="collection"]').val() || 'qld-gov',
          profile: $(form.elements.profile).filter('[name="profile"]').val() || 'qld_preview',
          show: MAX_SUGGESTIONS,
          partial_query: userTyped,
        },
      })
        .done(function (data) {
          if (data.length < 1) {
            closeSuggestions();
            return;
          }
          // TODO if the user has typed more, filter the matches in this array
          // should we retreive more than 4 so there is a bit of slack here?
          // what if ajax repsonses arrive out of sequence? track last match?
          // console.log( 'suggestions for ', userTyped, data, 'user has typed', searchField.val() );
          var match = new RegExp(userTyped.replace(/([.+*?\[^\]$(){}=!<>|:-\\,])/g, '\\$1'), 'g');
          var safeInput = userTyped.replace(/</g, '&lt;');
          suggestions.html($.map(data, function (value) {
            var htmlValue = value.replace(/</g, '&lt;').replace(match, '<mark>' + safeInput + '</mark>');
            // use form.action + default params
            return '<li><a href="https://find.search.qld.gov.au/s/search.html?collection=qld-gov&profile=qld&query=' + encodeURIComponent(value) + '">' + htmlValue + '</a></li>';
          }).join('\n'));

          // issue #3: issues with typing over selected suggestion
          // https://github.com/qld-gov-au/jquery.autocomplete/issues/3
          // check length is increasing (if not, user is deleting input)
          // if ( searchField[0].value.length > lastSearch.length ) {
          // 	// set the value to the best answer and select the untyped portion of the text
          // 	prefillInput( data[0] );
          // }
          lastSearch = searchField.val();
          suggestions.attr('aria-busy', 'false');
        });

      // show suggestions box
      // click on suggestion = fill in form and submit
      // hover over selection = update 'placeholder' style text
    });
  });
}); // onready
