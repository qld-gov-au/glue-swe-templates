$(function () {
  'use strict';

  //
  // Namespace
  //

  var qgSiteSearch = {
    'fn': {},
    'vars': {},
  };

  //
  // Helpers
  //

  // Event debouncer
  function debouncer (func, wait, immediate) {
    var timeout;

    return function executedFunction () {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  // Wrap part of the string in bold tags
  function getBoldText (subString, stringToChange) {
    var targetIndex = stringToChange.indexOf(subString.toLowerCase());
    var targetString = stringToChange.substr(targetIndex, subString.length);

    // Wrap the text in bold tags
    var formattedString = '<b>';
    formattedString += targetString;
    formattedString += '</b>';

    return stringToChange.replace(targetString, formattedString);
  }

  //
  // Events
  //

  // Handle multiple events
  qgSiteSearch.fn.inputEventHandler = function (event) {
    var eventType = event['type'];
    var targetInput = $(event['target']);
    var keyCode = event['keyCode'];
    var inputValue = targetInput.val();

    switch (eventType) {
    case 'focus':
      qgSiteSearch.fn.onFocus(inputValue, targetInput);
      break;
    case 'blur':
      qgSiteSearch.fn.onBlur(inputValue, targetInput);
      break;
    case 'keydown':
      qgSiteSearch.fn.onKeydown(inputValue, keyCode, targetInput);
      break;
    }
  };

  // Handle clicking into the input field
  qgSiteSearch.fn.onFocus = function (inputValue, targetInput) {
    var initialConcierge = targetInput.parent().find($('.qg-search-concierge-initial'));
    if (inputValue === '') {
      // Transition reveal initial state
      initialConcierge.addClass('show');
    } else {
      qgSiteSearch.fn.checkForSuggestions(inputValue, targetInput);
    }
  };

  // Handle clicking out of the input field
  qgSiteSearch.fn.onBlur = function (inputValue, targetInput) {
    var clearButton = targetInput.parent().find($('.qg-search-close-concierge'));
    // Remove the clear button
    clearButton.addClass('hide');

    // Close the concierge panels
    qgSiteSearch.fn.closeConciergePanels(targetInput);
  };

  // Handle input value changes
  qgSiteSearch.fn.onKeydown = function (inputValue, keyCode, targetInput) {
    var initialConcierge = targetInput.parent().find($('.qg-search-concierge-initial'));
    var helpfulConcierge = targetInput.parent().find($('.qg-search-concierge-help'));
    var clearButton = targetInput.parent().find($('.qg-search-close-concierge'));
    if (keyCode === 40) {
      targetInput.parents($('.qg-site-search__form')).attr('data-navindex', '0');
      setTimeout($('.qg-search-concierge.show').find('a, button')[0].focus(), 300);
    } else if (inputValue !== '') {
      // Reveal the clear button
      clearButton.removeClass('hide');

      // Look for suggested results
      qgSiteSearch.fn.checkForSuggestions(inputValue, targetInput);
    } else {
      // Remove the clear button
      clearButton.addClass('hide');

      // Remove suggestions and transition reveal initial state
      initialConcierge.addClass('show');
      helpfulConcierge.removeClass('show');
    }
  };

  qgSiteSearch.fn.keyboardNavigation = function (event) {
    var self = $(this);
    var keyCode = event['keyCode'];
    var focusableList = self.parents('.qg-site-search__form').find($('.qg-search-concierge.show')).find('a, button');
    var currentIndex = self.parents('.qg-site-search__form').attr('data-navindex');

    if (keyCode === 40 && focusableList.length > currentIndex - 1) {
      currentIndex++;
      focusableList[currentIndex].focus();
      self.parents('.qg-site-search__form').attr('data-navindex', currentIndex);
    } else if (keyCode === 38) {
      if (currentIndex > 0) {
        currentIndex--;
        focusableList[currentIndex].focus();
        self.parents('.qg-site-search__form').attr('data-navindex', currentIndex);
      } else {
        self.parents('.qg-site-search__form').find($('input[type=text].form-control')).focus();
      }
    }
  };

  // Handle clearing the input field via button
  qgSiteSearch.fn.clearInputField = function (event) {
    let inputTarget = event.target;
    var clearButton = $(this).parent().find($('.qg-search-close-concierge'));
    var searchInput = $(this).parent().find($('.qg-search-site__input'));
    searchInput.val('');

    // Remove the button
    clearButton.addClass('hide');

    // Close the concierge panels
    qgSiteSearch.fn.closeConciergePanels(inputTarget);
  };

  // Handle selecting a suggestion
  qgSiteSearch.fn.searchSuggestionClick = function (event) {
    var targetElement = $(event['currentTarget']);
    var suggestionValue = targetElement.text();
    var searchInput = $('.qg-search-site__input');

    // Add suggestion to input value
    searchInput.val(suggestionValue);
  };

  // Handle background click to close concierge
  qgSiteSearch.fn.handleBodyClick = function (event, targetInput) {
    let self = event.target;
    var targetSelector = '#qg-global-search-form';

    if ($(event['target']).closest(targetSelector).length === 0) {
      // Close the concierge panels
      qgSiteSearch.fn.closeConciergePanels(self);
    }
  };

  qgSiteSearch.fn.handleFocus = function (event) {
    qgSiteSearch.fn.closeConciergePanels(event.target);
  };

  // Handle search form submission
  qgSiteSearch.fn.searchSubmitHandler = function (event) {
    // Close the concierge panels
    qgSiteSearch.fn.closeConciergePanels(event.target);
  };

  //
  // Local data
  //

  // Get example suggestions from Funnelback
  qgSiteSearch.fn.getExampleSuggestions = function (inputValue) {
    var exampleResponse = [{'key': 'cancelled', 'disp': 'cancelled', 'disp_t': 'T', 'wt': '77.44', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancellation', 'disp': 'cancellation', 'disp_t': 'T', 'wt': '72.139', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancel', 'disp': 'cancel', 'disp_t': 'T', 'wt': '69.493', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancelling', 'disp': 'cancelling', 'disp_t': 'T', 'wt': '43.151', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancellations', 'disp': 'cancellations', 'disp_t': 'T', 'wt': '32.28', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancellation of membership', 'disp': 'cancellation of membership', 'disp_t': 'T', 'wt': '2.2', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancellation form', 'disp': 'fill out this cancellation form', 'disp_t': 'T', 'wt': '2', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancel a booking', 'disp': 'cancel a booking', 'disp_t': 'T', 'wt': '1.1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancel a disability parking permit', 'disp': 'cancel a disability parking permit', 'disp_t': 'T', 'wt': '1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}, {'key': 'cancelling your registration', 'disp': 'cancelling your registration', 'disp_t': 'T', 'wt': '1', 'cat': '', 'cat_t': '', 'action': '', 'action_t': 'S'}];

    var filteredResponse = exampleResponse.filter(function (suggestion) {
      return suggestion['disp'].indexOf(inputValue.toLowerCase()) !== -1;
    });

    return filteredResponse;
  };

  // Get example service results from Funnelback
  qgSiteSearch.fn.getExampleServices = function () {
    var exampleResponse = {'response': {'resultPacket': {'query': 'grants', 'results': [{'rank': 1, 'title': 'Grants and funding | Environment, land and water | Queensland Government', 'collection': 'qgov-web', 'metaData': {'license': 'https://creativecommons.org/licenses/by/4.0/', 'r': 'all', 'c': 'Grants and funding are available to support environmental programs in Queensland. This includes koala and marine life conservation, and nature refuges.', 'C': 'Grants and funding are available to support environmental programs in Queensland. This includes koala and marine life conservation, and nature refuges.', 's': 'Grant; funding; nature assist; koala; Everyones environment; Indigenous sea rangers; research; NatureAssist; Indigenous Sea Country Management Grants Program; Koala Rescue and Rehabilitation Grants Program; Koala Research Grant Program; koala', 'd': '2019-07-31', 't': 'Grants and funding | Environment, land and water | Queensland Government;Grants and funding | Environment and pollution management', 'e': 'Text', 'f': 'guidelines', 'j': 'https://www.qld.gov.au/environment/pollution/funding'}, 'liveUrl': 'https://www.qld.gov.au/environment/pollution/funding', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding&auth=qzUXw9sTwPwOdKvslCPbog&profile=qld_preview&rank=1&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/environment/pollution/funding'}, {'rank': 2, 'title': 'Funding and grants | Recreation, sport and arts | Queensland Government', 'collection': 'qgov-web', 'metaData': {'c': 'Find what funding and grants are available for young athletes and for clubs to upgrade sport and recreation facilities or equipment.', 'C': 'Find what funding and grants are available for young athletes and for clubs to upgrade sport and recreation facilities or equipment.', 'sprequired': 'yes', 'd': '2019-07-19', 'e': 'Collection', 'f': 'index', 'stype': 'apply-for-it', 'j': 'https://www.qld.gov.au/recreation/sports/funding', 'sid': 'P001085', 'sfinder': 'yes', 'license': 'https://creativecommons.org/licenses/by/4.0/', 'scategory': 'recreation-sports-and-arts', 'r': 'all', 's': 'Funding and grants; funding for young athletes; grants for young athletes; athlete scholarships; funding for kids and young people; funding for clubs and organisations; grants for clubs and organisations; funding to upgrade sport and recreation', 't': 'Funding and grants | Recreation, sport and arts | Queensland Government;Funding and grants | Sport', 'skioskonly': 'no'}, 'liveUrl': 'https://www.qld.gov.au/recreation/sports/funding', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Frecreation%2Fsports%2Ffunding&index_url=https%3A%2F%2Fwww.qld.gov.au%2Frecreation%2Fsports%2Ffunding&auth=cM3gwHE6wlGI5UzFw2iszA&profile=qld_preview&rank=2&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/recreation/sports/funding'}, {'rank': 3, 'title': 'Everyones Environment grants program | Environment, land and water | Queensland Government', 'collection': 'qgov-web', 'metaData': {'c': 'This program provides funding for Queensland community groups with projects aimed at delivering practical actions for local environmental improvements.', 'C': 'This program provides funding for Queensland community groups with projects aimed at delivering practical actions for local environmental improvements.', 'sprequired': 'no', 'd': '2015-03-23', 'e': 'Text', 'f': 'guidelines', 'stype': 'find-it', 'j': 'https://www.qld.gov.au/environment/pollution/funding/everyones', 'sid': 'P000369', 'sfinder': 'yes', 'license': 'https://creativecommons.org/licenses/by/4.0/', 'scategory': 'environment-land-and-water', 'r': 'all', 's': 'Grants; everyone; environment; heritage; Queensland; funding', 't': 'Everyones Environment grants program | Environment, land and water | Queensland Government;Everyones Environment grants program | Grants and funding', 'skioskonly': 'no'}, 'liveUrl': 'https://www.qld.gov.au/environment/pollution/funding/everyones', 'clickTrackingUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding%2Feveryones&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fenvironment%2Fpollution%2Ffunding%2Feveryones&auth=QaZNQYwacyhU7xtVcs%2FPbg&profile=qld_preview&rank=3&query=grants', 'explain': null, 'indexUrl': 'https://www.qld.gov.au/environment/pollution/funding/everyones'}], 'error': null}, 'curator': {'exhibits': [{'titleHtml': 'Queensland Government Grants Finder', 'displayUrl': 'https://www.grants.services.qld.gov.au/#/', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.grants.services.qld.gov.au%2F%23%2F&index_url=https%3A%2F%2Fwww.grants.services.qld.gov.au%2F%23%2F&auth=wEzza0HDD%2BGN4WIzBUq0%2Fg&profile=qld_preview&type=FP', 'descriptionHtml': 'The Queensland Government Grants Finder is a comprehensive list of our grants and funding programs.', 'additionalProperties': {'icon': 'fa-car fa-motorcycle fa-address-card', 'buttonText': 'Find out more', 'service': 'yes'}, 'category': ''}, {'titleHtml': 'North Queensland flood assistance', 'displayUrl': 'https://www.qld.gov.au/community/disasters-emergencies/queensland-disasters/fnq-monsoonal-trough', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.qld.gov.au%2Fcommunity%2Fdisasters-emergencies%2Fqueensland-disasters%2Ffnq-monsoonal-trough&index_url=https%3A%2F%2Fwww.qld.gov.au%2Fcommunity%2Fdisasters-emergencies%2Fqueensland-disasters%2Ffnq-monsoonal-trough&auth=qbavFamsPcqvWK5M3INRmA&profile=qld_preview&type=FP', 'descriptionHtml': 'Personal hardship financial assistance has been activated for some communities at this time.', 'additionalProperties': {}, 'category': ''}, {'titleHtml': 'Change of address', 'displayUrl': 'https://www.change-of-address.services.qld.gov.au/', 'linkUrl': '/s/redirect?collection=qld-gov&url=https%3A%2F%2Fwww.change-of-address.services.qld.gov.au%2F&index_url=https%3A%2F%2Fwww.change-of-address.services.qld.gov.au%2F&auth=RrjhEMq01%2B%2BZwQhpwXAjPg&profile=qld_preview&type=FP', 'descriptionHtml': 'Use this online form to change your home and/or postal address online, rather than contacting multiple Queensland Government departments/services.', 'additionalProperties': {'icon': 'fa-car fa-motorcycle fa-address-card', 'service': 'yes'}, 'category': ''}]}}};
    return exampleResponse;
  };

  //
  // Functions
  //

  // Close the conceirge menus
  qgSiteSearch.fn.closeConciergePanels = function () {
    var initialConcierge = $('.qg-search-concierge-initial');
    var helpfulConcierge = $('.qg-search-concierge-help');

    // Immediately close both concierge panels
    initialConcierge.addClass('hide').removeClass('show');
    helpfulConcierge.addClass('hide').removeClass('show');

    setTimeout(function () {
      initialConcierge.removeClass('hide');
      helpfulConcierge.removeClass('hide');
    }, 300);
  };

  // Check Funnelback for suggested results
  qgSiteSearch.fn.checkForSuggestions = function (inputValue, targetInput) {
    var initialConcierge = targetInput.parent().find($('.qg-search-concierge-initial'));
    var helpfulConcierge = targetInput.parent().find($('.qg-search-concierge-help'));
    var numChars = inputValue.length;

    // Remove initial state
    initialConcierge.removeClass('show');

    // Query Funnelback when three characters are entered
    if (numChars >= 3) {
      // Get suggestions
      qgSiteSearch.fn.getSuggestions(inputValue, targetInput);

      // Get services
      qgSiteSearch.fn.getServices(inputValue, targetInput);

      // Transition reveal suggestions
      helpfulConcierge.addClass('show');
    }
  };

  //
  // Suggestion Keywords
  //

  // Get suggestion keywords
  qgSiteSearch.fn.getSuggestions = function (inputValue, targetInput) {
    var suggestURL = targetInput.parents('.qg-site-search__form').attr('data-suggestions');
    // var suggestURL = searchForm.attr('data-suggestions');

    $.ajax({
      cache: true,
      dataType: 'json',
      url: suggestURL,
      data: {
        partial_query: inputValue,
      },
      success: function (suggestions){
        qgSiteSearch.fn.formatSuggestions(suggestions, targetInput);
      },
    });
  };

  // Format suggestion keywords
  qgSiteSearch.fn.formatSuggestions = function (suggestions, targetInput) {
    var inputField = targetInput.parent().find($('.qg-search-site__input'));
    var inputValue = inputField.val();
    var suggestionsContainer = targetInput.parent().find($('.qg-search-concierge-help .qg-search-concierge-group.suggestions'));
    var suggestionsHeading = '<h4>Suggestions</h4>';
    var suggestionsHTML = '';
    var maxSuggestions = 3;

    if (suggestions.length > 0) {
      targetInput.parent().find($('.qg-search-concierge-help')).show();
      // Reduce count to maximum limit
      suggestions = suggestions.slice(0, maxSuggestions);

      // Start the HTML for suggestions listing
      suggestionsHTML += '<div class="qg-search-concierge-content">';

      // Add the heading
      suggestionsHTML += suggestionsHeading;
      suggestionsHTML += '<ul class="list-group">';

      suggestions.forEach(function (item) {
        suggestionsHTML += '<li class="list-group-item">';
        suggestionsHTML += '<button tabindex="-1" data-analytics-link-group="qg-global-search-suggestion">';
        suggestionsHTML += getBoldText(inputValue, item['disp']);
        suggestionsHTML += '</button>';
        suggestionsHTML += '</li>';
      });

      suggestionsHTML += '</ul>';
      suggestionsHTML += '</div>';
    } else {
      targetInput.parent().find($('.qg-search-concierge-help')).hide();
    }
    // Update the concierge container
    suggestionsContainer.html(suggestionsHTML);
  };

  //
  // Related Services
  //

  // Get suggested services
  qgSiteSearch.fn.getServices = function (inputValue) {
    var searchForm = $('#qg-global-search-form');
    var resultsURL = searchForm.attr('data-results-url');

    $.ajax({
      cache: true,
      dataType: 'json',
      url: resultsURL,
      data: {
        query: inputValue,
      },
      success: qgSiteSearch.fn.processServices,
    });
  };

  // Process suggested services and filter out bad results
  qgSiteSearch.fn.processServices = function (services) {
    var allResults = services['response']['resultPacket']['results'];
    var serviceResults = [];
    var featuredService = null;
    var curatorIndex = services['response']['curator'];

    // Look for curated results
    if (typeof (curatorIndex) !== 'undefined') {
      var allCuratedResults = curatorIndex['exhibits'];

      if (typeof (allCuratedResults) !== 'undefined') {
        if (allCuratedResults.length > 0) {
          // The first result is always featured
          featuredService = allCuratedResults[0];

          // Process any additional exhibits
          for (var index = 1; index < allCuratedResults.length; index++) {
            var result = allCuratedResults[index];
            var additionalProperties = result['additionalProperties'];

            if (additionalProperties['service'] === 'yes') {
              serviceResults.push(result);
            }
          }
        }
      }
    }

    // Look for services in standard results
    if (allResults.length > 0) {
      var filteredResults = allResults.filter(function (result) {
        return result['metaData']['sfinder'] === 'yes';
      });

      serviceResults = serviceResults.concat(filteredResults);

      if (serviceResults.length > 3) {
        serviceResults = serviceResults.slice(0, 3);
      }
    }

    // Format the featured suggested service
    qgSiteSearch.fn.formatFeaturedService(featuredService);

    // Format the related services
    qgSiteSearch.fn.formatServices(serviceResults);
  };

  // Format featured service
  qgSiteSearch.fn.formatFeaturedService = function (featuredService) {
    var featuredServiceContainer = $('.qg-search-concierge-help .qg-search-concierge-group.highlight');
    var serviceHTML = '';

    if (featuredService) {
      var title = featuredService['titleHtml'];
      var linkURL = featuredService['displayUrl'];
      var description = featuredService['descriptionHtml'];
      var additionalProperties = featuredService['additionalProperties'];

      serviceHTML = '<div class="qg-search-concierge-content">';
      serviceHTML += '<div class="d-flex justify-content-between align-content-center flex-wrap">';
      serviceHTML += '<h4>' + title + '</h4>';

      // Check for icons
      if (typeof (additionalProperties['icon']) !== 'undefined') {
        var allIcons = additionalProperties['icon'].split(' ');

        var iconHTML = allIcons.map(function (icon) {
          return '<span class="fa ' + icon + '"></span>';
        });

        serviceHTML += '<div>' + iconHTML.join('') + '</div>';
      }

      serviceHTML += '</div>';
      serviceHTML += '<p>' + description + '</p>';
      if (linkURL) {
        if (additionalProperties['buttonText']) {
          serviceHTML += '<a href="' + linkURL + '"  tabindex="-1" data-analytics-link-group="qg-global-search-feature" class="btn btn-global-primary-white">' + additionalProperties['buttonText'] + '</a>';
        } else {
          serviceHTML += '<a href="' + linkURL + '"  tabindex="-1" data-analytics-link-group="qg-global-search-feature" class="btn btn-global-primary-white">Continue</a>';
        }
      }
      serviceHTML += '</div>';
    }

    featuredServiceContainer.html(serviceHTML);
  };

  // Format suggested services
  qgSiteSearch.fn.formatServices = function (serviceResults) {
    var servicesContainer = $('.qg-search-concierge-help .qg-search-concierge-group.helper');
    var servicesHeading = '<h4>Related services</h4>';
    var serviceHTML = '';

    if (serviceResults.length > 0) {
      serviceHTML = '<div class="qg-search-concierge-content">';
      serviceHTML += servicesHeading;
      serviceHTML += '<ul class="list-group">';

      serviceResults.forEach(function (service) {
        var serviceName = service['title'];
        var serviceLink = service['liveUrl'];

        if (typeof (serviceName) !== 'undefined') {
          serviceName = serviceName.split('|')[0].trim();
        } else {
          serviceName = service['titleHtml'];
        }

        if (typeof (serviceLink) === 'undefined') {
          serviceLink = service['displayUrl'];
        }

        serviceHTML += '<li class="list-group-item">';
        serviceHTML += '<a href="' + serviceLink + '" tabindex="-1" data-analytics-link-group="qg-global-search-related-service">' + serviceName + '</a>';
        serviceHTML += '</li>';
      });

      serviceHTML += '</ul>';
      serviceHTML += '</div>';
    }

    servicesContainer.html(serviceHTML);
  };

  //
  // Ready
  //

  $(document).ready(function () {
    var searchInput = $('.qg-search-site__input');
    // Set up events
    searchInput.on('focus keydown', debouncer(qgSiteSearch.fn.inputEventHandler, 200));
  });

  // Binds
  $('body').on('focusin', '.qg-navigation .nav-link', qgSiteSearch.fn.handleFocus);
  $('body').on('click', qgSiteSearch.fn.handleBodyClick);
  $('body').on('click', '.qg-search-close-concierge', qgSiteSearch.fn.clearInputField);
  $('body').on('click', '.qg-search-concierge-group.suggestions button', qgSiteSearch.fn.searchSuggestionClick);
  $('body').on('submit', '#qg-global-search-form', qgSiteSearch.fn.searchSubmitHandler);
  $('body').on('keydown', '.qg-search-concierge-group a, .qg-search-concierge-group button', qgSiteSearch.fn.keyboardNavigation);

  // on load check if input has a value then display a close icon
  if (document.getElementsByClassName('qg-search-site__input')[1].value.length > 0){
    $('.qg-site-search__component').find('.qg-search-close-concierge').removeClass('hide');
  }
});
