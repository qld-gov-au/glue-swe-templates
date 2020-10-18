// Helper to pass linting with google APIs
/* eslint-disable no-undef */

$(function () {
  'use strict';

  //
  // Namespace
  //

  var qgLocation = {
    'fn': {},
    'vars': {
      'cookie_name': 'qg-location',
      'event_coordinates_set': 'qgLocationCoordsSet',
      'event_locality_set': 'qgLocationLocalitySet',
      'event_location_found': 'qgLocationFound',
      'event_location_cleared': 'qgLocationCleared',
      'error_message': '',
      'suburb_input': '',
    },
  };

  //
  // Helpers
  //

  // Check if we're on a local environment
  // function isDevelopment () {
  //   var location = window['location']['hostname'];
  //
  //   if (location === 'localhost') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // Create a cookie
  function setCookie (cookieName, cookieValue, daysActive) {
    var cookieEntry = cookieName + '=' + encodeURIComponent(cookieValue) + ';';

    // Timed cookie
    var rightNow = new Date();
    rightNow.setTime(rightNow.getTime() + daysActive * 24 * 60 * 60 * 1000);

    var expiryTime = 'expires=' + rightNow.toUTCString();
    document.cookie = cookieEntry + expiryTime + '; path=/;';
  }

  // Get a cookie by name
  function getCookie (cookieName) {
    var target = cookieName + '=';
    var cookieJar = decodeURIComponent(document.cookie).split(';');

    var filteredJar = cookieJar.filter(function (cookie, index) {
      var current = cookie.trim();
      var matchIndex = current.indexOf(target);

      if (matchIndex === 0) {
        return true;
      }
    });

    if (filteredJar.length > 0) {
      var chosenCookie = filteredJar[0].trim();
      return chosenCookie.substring(target.length, chosenCookie.length);
    } else {
      return '';
    }
  }

  // Delete a cookie by name
  function deleteCookie (cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Hide the dropdown as the native dropdown() function doesn't work
  function closeDropdown () {
    $('.header-location').removeClass('show');
    $('.header-location .dropdown-toggle').attr('aria-expanded', 'false');
    $('.header-location .qg-location-setter').removeClass('show');
  }

  // Handle custom events
  function customEventHandler (event, eventName) {
    switch (eventName) {
    case qgLocation['vars']['event_coordinates_set']:
      qgLocation.fn.getLocality();
      break;
    case qgLocation['vars']['event_locality_set']:
      qgLocation.fn.getCoordinates();
      break;
    case qgLocation['vars']['event_location_found']:
      qgLocation.fn.setLocationName();
      qgLocation.fn.initServiceCentre();
      break;
    case qgLocation['vars']['event_location_cleared']:
      qgLocation.fn.resetLocationContainers();
      break;
    }
  }

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

  // Convert to title case
  function titleCase (str) {
    var splitStr = str.toLowerCase().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    // Directly return the joined string
    return splitStr.join(' ');
  }

  // Wrap part of a string in bold tags
  function getBoldText (subString, stringToChange) {
    var targetString = stringToChange.substr(0, subString.length);

    // Wrap the text in bold tags
    var formattedString = '<b>';
    formattedString += targetString;
    formattedString += '</b>';

    return stringToChange.replace(targetString, formattedString);
  }

  //
  // Events
  //

  // Keep location dropdown open the elements inside of the dropdown are clicked
  $('.header-location .dropdown-menu').click(function (e) {
    var eventTarget = event['target'];
    var targetElement = eventTarget['tagName'].toLowerCase();

    // Close suburb list if clicking outside
    if (event['keyCode'] !== 40 && event['keyCode'] !== 38) {
      qgLocation.fn.closeSuburbsIfOutside(e);
    }

    if (targetElement !== 'button') {
      e.stopPropagation();
    }
  });

  // Prompt the browser to access inbuilt geolocation functionality
  qgLocation.fn.getDeviceLocation = function (event) {
    event.stopPropagation();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(qgLocation.fn.processPositionData, qgLocation.fn.failure);
    }
  };

  // Clear position data from browser
  qgLocation.fn.deletePositionData = function (event) {
    event.stopPropagation();

    var cookieName = qgLocation['vars']['cookie_name'];
    deleteCookie(cookieName);

    // Notify the rest of the page
    $('body').trigger('custom', qgLocation['vars']['event_location_cleared']);
  };

  // Close the popup
  qgLocation.fn.closeLocationPopup = function (event) {
    event.stopPropagation();

    // Manually close the dropdown
    closeDropdown();

    // Add class to give immediate effect instead of transition
    $('.header-location .dropdown-menu').addClass('closed');

    // Remove this class after dropdown has closed
    setTimeout(function () {
      $('.header-location .dropdown-menu').removeClass('closed');
    }, 300);
  };

  // Manually search for location
  qgLocation.fn.initManualSearch = function (event) {
    var inputField = event['target'];
    var keyCode = event['keyCode'];
    var inputValue = inputField['value'];
    var numChars = inputValue.length;

    $('.qg-location-setter-form input[type=text]').removeClass('error');

    if (keyCode === 40) {
      if ($('.qg-location-setter-autocomplete button').length) {
        $('.qg-location-setter-autocomplete button')[0].focus();
        $('.qg-location-setter-form input[type=text]').attr('data-navindex', '0');
      }
    } else if (numChars >= 3) {
      // Save the manual suburb input value
      qgLocation['vars']['suburb_input'] = inputValue;

      // Query the suburbs API
      qgLocation.fn.querySuburbsAPI();
    } else {
      $('.qg-location-setter-autocomplete').addClass('hide');
    }
  };

  qgLocation.fn.keyboardNavigation = function (event) {
    var navIndex = parseInt($('.qg-location-setter-form input[type=text]').attr('data-navindex'));
    if (event['keyCode'] === 40) {
      navIndex++;
      $('.qg-location-setter-autocomplete button')[navIndex].focus();
    } else if (event['keyCode'] === 38) {
      if (navIndex > 0) {
        navIndex--;
        $('.qg-location-setter-autocomplete button')[navIndex].focus();
      } else {
        $('.qg-location-setter-form input[type=text]').focus();
      }
    }
    $('.qg-location-setter-form input[type=text]').attr('data-navindex', navIndex);
  };

  // Get suburb from suggestion click
  qgLocation.fn.getManualSuburbName = function (event) {
    event.stopPropagation();

    var suburbButton = event['target'];
    var suburbName = suburbButton.getAttribute('data-location');
    var suburbFullArea = $(suburbButton).text();

    // Update the input field
    var inputField = $('.qg-location-setter-form input[type=text]');
    inputField.attr('data-choice', suburbName);
    inputField.attr('data-choice-full', suburbFullArea);
    inputField.val(suburbFullArea);

    // Hide the suggestions
    $('.qg-location-setter-autocomplete').addClass('hide');
  };

  // Save manually selected suburb
  qgLocation.fn.setManualSuburb = function (event) {
    event.stopPropagation();
    var inputField = $('.qg-location-setter-form input[type=text]');
    var inputError = $('.qg-location-setter-error');

    if (inputField.val().length > 2) {
      inputError.addClass('hide');

      // Get manual suburb selection
      var savedSuburb = inputField.attr('data-choice');
      var savedSuburbFull = inputField.attr('data-choice-full');

      if (savedSuburb === '') {
        inputField.addClass('error');
        inputError.removeClass('hide');
      } else {
        // Manually close the dropdown
        closeDropdown();

        qgLocation.fn.saveLocality(savedSuburb, savedSuburbFull);
      }
    } else {
      inputField.addClass('error');
      inputError.removeClass('hide');
    }
  };

  // Prevent form from performing a submission
  qgLocation.fn.locationSubmitHandler = function (event) {
    event.preventDefault();
  };

  // Close popup if clicking outside
  qgLocation.fn.closePopupIfOutside = function (e) {
    if (!$(e.target).closest('#qg-location-dropdown').length && !$(e.target).is('#qg-location-dropdown') && !$(e.target).is('.dropdown-toggle') && $('.header-location .qg-location-setter').hasClass('show')) {
      // Manually close the dropdown
      closeDropdown();

      // Add class to give immediate effect instead of transition
      $('.header-location .dropdown-menu').addClass('closed');

      // Remove this class after dropdown has closed
      setTimeout(function () {
        $('.header-location .dropdown-menu').removeClass('closed');
      }, 300);
    }
  };

  // Close suburb list if clicking outside
  qgLocation.fn.closeSuburbsIfOutside = function (event) {
    if (!$(event['target']).closest('.qg-location-setter-form').length && event['view'] !== undefined) {
      $('.qg-location-setter-autocomplete').addClass('hide');
    }
  };

  //
  // Local data
  //

  // Get local example of Google Maps API
  qgLocation.fn.getExampleLocation = function () {
    var exampleResponse = [ { 'address_components': [ { 'long_name': 'Browning St near Boundary Rd, stop 5', 'short_name': 'Browning St near Boundary Rd, stop 5', 'types': [ 'establishment', 'point_of_interest', 'transit_station' ] }, { 'long_name': 'South Brisbane', 'short_name': 'South Brisbane', 'types': [ 'locality', 'political' ] }, { 'long_name': 'Brisbane City', 'short_name': 'Brisbane', 'types': [ 'administrative_area_level_2', 'political' ] }, { 'long_name': 'Queensland', 'short_name': 'QLD', 'types': [ 'administrative_area_level_1', 'political' ] }, { 'long_name': 'Australia', 'short_name': 'AU', 'types': [ 'country', 'political' ] }, { 'long_name': '4101', 'short_name': '4101', 'types': [ 'postal_code' ] } ], 'formatted_address': 'Browning St near Boundary Rd, stop 5, South Brisbane QLD 4101, Australia', 'geometry': { 'location': { 'lat': -27.477727, 'lng': 153.01314 }, 'location_type': 'GEOMETRIC_CENTER', 'viewport': { 'northeast': { 'lat': -27.4763780197085, 'lng': 153.0144889802915 }, 'southwest': { 'lat': -27.4790759802915, 'lng': 153.0117910197085 } } }, 'place_id': 'ChIJufdIyqBQkWsRlnW4qQxzN94', 'types': [ 'establishment', 'point_of_interest', 'transit_station' ] } ];

    return exampleResponse;
  };

  // Get local example of service centres
  qgLocation.fn.getExampleServiceCentres = function () {
    var exampleCentres = {'question': {'rawInputParameters': {'origin': ['-27.477413799999997;153.01329099999998']}}, 'response': {'resultPacket': {'results': [{'rank': 1, 'title': 'Asif AMin Justices of the Peace Branch', 'kmFromOrigin': 0.2, 'metaData': {'area': 'Brisbane City', 'hours': 'Monday to Friday, 10am-2pm|Mon,Mon,Tues,Tues,Wednes,Wednes,Thurs,Thurs,Fri,Fri,', 'agency': 'DJAG', 'address2': 'Level 6, 154 Melbourne Street', 'address1': 'See reception', 'viewpageassetid': '21806', 'postcode': '4101', 'type': 'Service', 's': 'Volunteer Justice of the Peace or Commissioner for Declarations', 't': 'Justices of the Peace Branch', 'phone': '1300 301 147', 'datasource': 'JP', 'suburb': 'SOUTH BRISBANE', 'location': '-27.4761712;153.0149019', 'id': '92'}}, {'rank': 2, 'title': 'Family Court Brisbane', 'kmFromOrigin': 1.2, 'metaData': {'area': 'Brisbane City', 'hours': 'Monday, Thursday and Friday 9am-2pm Note this service is for Family Court matters only. Hours of service may vary daily.|Mon,Mon,Thurs,Thurs,Fri,Fri,', 'agency': 'DJAG', 'address2': '(Entrance via Tank Street)', 'address1': 'Corner North Quay and Tank Streets', 'viewpageassetid': '21806', 'postcode': '4000', 'type': 'Service', 's': 'Hours of service vary daily, please phone before attending. Volunteer Justice of the Peace or Commissioner for Declarations', 't': 'Family Court Brisbane', 'datasource': 'JP', 'suburb': 'BRISBANE', 'location': '-27.468426;153.019921', 'id': '62'}}]}}};

    return exampleCentres;
  };

  //
  // Google Maps API Handlers
  //

  // Contact Google Maps API with query and callback
  qgLocation.fn.queryLocationAPI = function (geocoderQuery, successCallback) {
    var geocoderLookup = new google.maps.Geocoder();

    geocoderLookup.geocode(geocoderQuery, function (results, status) {
      if (status === 'OK') {
        successCallback(results);
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  // Get the locality from Google Maps API
  qgLocation.fn.getLocality = function () {
    var storedData = qgLocation.fn.getStoredLocation();

    // Get location coordinates from storage
    var geocoderQuery = {
      'location': {
        'lat': parseFloat(storedData['latitude']),
        'lng': parseFloat(storedData['longitude']),
      },
    };

    // Query the Google Maps API with location coordinates
    qgLocation.fn.queryLocationAPI(geocoderQuery, qgLocation.fn.processLocality);
  };

  // Process the Google Maps API data for a suburb
  qgLocation.fn.processLocality = function (jsonResponse) {
    var targetType = 'locality';
    var locality = 'unknown';

    // Check over all address matches
    for (var index = 0; index < jsonResponse.length; index++) {
      var address = jsonResponse[index];
      var addressComponents = address['address_components'];

      // Break out of the loop if a locality is found
      if (locality !== 'unknown') {
        break;
      }

      // Check over all address components
      for (var componentIndex = 0; componentIndex < addressComponents.length; componentIndex++) {
        var component = addressComponents[componentIndex];
        var componentTypes = component['types'];

        // Find the locality component
        if (componentTypes.indexOf(targetType) !== -1) {
          locality = component['short_name'];
          break;
        }
      }
    }

    // Proceed if an address is found
    if (locality !== 'unknown') {
      qgLocation.fn.saveLocality(locality);
    }
  };

  // Find coordinates based on address
  qgLocation.fn.getCoordinates = function () {
    var storedData = qgLocation.fn.getStoredLocation();

    if (typeof (storedData['latitude']) === 'undefined') {
      var address = storedData['address'];

      if (address) {
        // Get location coordinates from storage
        var geocoderQuery = {
          'address': storedData['address'],
        };

        // Query the Google Maps API with location coordinates
        qgLocation.fn.queryLocationAPI(geocoderQuery, qgLocation.fn.processCoordinates);
      }
    } else {
      // Notify the rest of the page
      $('body').trigger('custom', qgLocation['vars']['event_location_found']);
    }
  };

  // Process the Google Maps API data for coordinates
  qgLocation.fn.processCoordinates = function (jsonResponse) {
    var coordinates = null;

    // Check over all address matches
    for (var index = 0; index < jsonResponse.length; index++) {
      var address = jsonResponse[index];
      var geometry = address['geometry'];

      if (typeof (geometry) !== 'undefined') {
        coordinates = geometry['location'];

        if (typeof (coordinates) !== 'undefined') {
          break;
        }
      }
    }

    // Proceed if coordinates are found
    if (coordinates !== null) {
      qgLocation.fn.saveCoordinates(coordinates);
    }
  };

  //
  // ArcGIS API Handlers
  //

  // Check the ArcGIS API
  qgLocation.fn.querySuburbsAPI = function () {
    var suburbsURL = 'https://gisservices.information.qld.gov.au/arcgis/rest/services/PlanningCadastre/LandParcelPropertyFramework/MapServer/19/query';
    var suburbsParams = {
      'f': 'json',
      'where': 'ADMINAREANAME+%3C%3E+%27Null%27',
      'returnGeometry': 'false',
      'spatialRel': 'esriSpatialRelIntersects',
      'outFields': 'ADMINAREANAME',
      'orderByFields': 'ADMINAREANAME%20ASC',
    };

    // Construct query params from data
    var suburbsQuery = '?';
    suburbsQuery += Object.keys(suburbsParams).map(function (key) {
      return key + '=' + suburbsParams[key];
    }).join('&');

    // Query the endpoint
    $.ajax({
      cache: true,
      dataType: 'json',
      url: suburbsURL + suburbsQuery,
      success: qgLocation.fn.processSuburbsData,
    });
  };

  // Check the ArcGIS API
  qgLocation.fn.processSuburbsData = function (jsonResponse) {
    var locationList = [];
    var userSuburb = qgLocation['vars']['suburb_input'];

    if (jsonResponse.hasOwnProperty('features')) {
      // Add each suburb to the location list
      jsonResponse['features'].forEach(function (object) {
        var sourceName = object['attributes']['ADMINAREANAME'].toLowerCase();
        var suburbLGA = titleCase(sourceName);
        var suburbObject = {
          'name': sourceName,
          'name_friendly': suburbLGA,
          'name_formatted': suburbLGA,
          'suburb': suburbLGA.split(',')[0],
        };

        // Filter out the suburb if user input exists
        if (userSuburb !== '') {
          // Compare values
          if (sourceName.indexOf(userSuburb) === 0) {
            suburbObject['name_formatted'] = getBoldText(userSuburb, suburbLGA);

            locationList.push(suburbObject);
          }
        } else {
          locationList.push(suburbObject);
        }
      });
    }

    qgLocation.fn.displaySuburbSuggestions(locationList);
  };

  //
  // Functions
  //

  // Script loader
  qgLocation.fn.initScript = function () {
    var scriptID = 'googleapi';

    if ($('#' + scriptID).length === 0) {
      //console.log('Maps not loaded');
      // Maps not loaded
      // Create script tag
      var apiKey = 'AIzaSyDvR5MCDqi0HtcjkehKqbKhyoCxt4Khqac';
      var scriptURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
      var scriptElement = document.createElement('script');

      // Populate tag
      scriptElement['type'] = 'text/javascript';
      scriptElement['src'] = scriptURL;
      scriptElement['id'] = scriptID;

      // Insert into the DOM
      document.querySelector('body').appendChild(scriptElement);
      scriptElement.onload = function () {
				qgLocation.fn.init();
			};
    } else {
      //console.log('Maps already loaded on page');
      // Maps already loaded on page
      // Initialise location module
      qgLocation.fn.init();
    }
  };

  // Initialiser
  qgLocation.fn.init = function () {
    // Set up events
    qgLocation.fn.setUpListeners();

    // Check for saved data
    var storedData = qgLocation.fn.getStoredLocation();

    if (storedData) {
      var dataEvent = '';

      // Check for coordinates
      if (typeof (storedData['latitude']) !== 'undefined') {
        if (storedData['locality'] !== 'unknown') {
          // All location data found, update the page
          dataEvent = qgLocation['vars']['event_locality_set'];
        } else {
          // Coordinates exist, find locality
          dataEvent = qgLocation['vars']['event_coordinates_set'];
        }
      }

      // Notify the rest of the page
      $('body').trigger('custom', dataEvent);
    }
  };

  // Set up input field listeners
  qgLocation.fn.setUpListeners = function () {
    var suburbInputField = $('.qg-location-setter-form input[type=text]');
    suburbInputField.on('keyup', debouncer(qgLocation.fn.initManualSearch, 200));
  };

  // Check for saved location
  qgLocation.fn.getStoredLocation = function () {
    var cookieName = qgLocation['vars']['cookie_name'];
    var storedData = getCookie(cookieName);

    if (storedData !== '') {
      var locationData = JSON.parse(storedData);
      return locationData;
    } else {
      return null;
    }
  };

  // The user has allowed geolocation
  qgLocation.fn.processPositionData = function (response) {
    var positionData = response['coords'];

    qgLocation.fn.setPositionData(positionData);
    closeDropdown();
  };

  // The user has blocked geolocation
  qgLocation.fn.failure = function (response) {
    var responseMessage = response['message'];

    qgLocation['vars']['error_message'] = responseMessage;
  };

  // Save the position data to the browser
  qgLocation.fn.setPositionData = function (positionData) {
    var location = {
      'latitude': positionData['latitude'],
      'longitude': positionData['longitude'],
      'locality': 'unknown',
    };

    // Save to cookie
    qgLocation.fn.saveLocationCookie(location);

    // Notify the rest of the page
    $('body').trigger('custom', qgLocation['vars']['event_coordinates_set']);
  };

  // Save data to the location cookie
  qgLocation.fn.saveLocationCookie = function (cookieData) {
    var cookieName = qgLocation['vars']['cookie_name'];
    var cookieValue = JSON.stringify(cookieData);
    var daysActive = 7;

    setCookie(cookieName, cookieValue, daysActive);
  };

  // Save the target locality
  qgLocation.fn.saveLocality = function (locality, address) {
    var storedData = qgLocation.fn.getStoredLocation();

    // Handle no cookie present
    if (storedData === null) {
      storedData = {
        'locality': 'unknown',
      };
    }

    // Handle optional address value
    if (address) {
      storedData['address'] = address;
    }

    storedData['locality'] = locality;

    // Save to cookie
    qgLocation.fn.saveLocationCookie(storedData);

    // Notify the rest of the page
    $('body').trigger('custom', qgLocation['vars']['event_locality_set']);
  };

  // Save the suburb coordinates
  qgLocation.fn.saveCoordinates = function (coordinates) {
    var storedData = qgLocation.fn.getStoredLocation();

    // Handle no cookie present
    if (storedData === null) {
      storedData = {};
    }

    // Data is processed differently depending on environment
    storedData['latitude'] = coordinates.lat();
    storedData['longitude'] = coordinates.lng();

    // Save to cookie
    qgLocation.fn.saveLocationCookie(storedData);

    // Notify the rest of the page
    $('body').trigger('custom', qgLocation['vars']['event_location_found']);
  };

  // Populate the suburb suggestion list
  qgLocation.fn.displaySuburbSuggestions = function (allSuburbs) {
    var targetContainer = $('.qg-location-setter.show .qg-location-setter-form');
    var suggestionHTML = '';

    if (targetContainer) {
      var suggestionList = targetContainer.find('.qg-location-setter-autocomplete');

      // Check for returned data
      if (allSuburbs.length > 0) {
        suggestionHTML = '<ul>';

        allSuburbs.forEach(function (suburbData) {
          var suburbName = suburbData['suburb'];
          var suburbHTML = suburbData['name_formatted'];

          suggestionHTML += '<li><button class="qg-location-manual" tabindex="-1" data-location="' + suburbName + '">' + suburbHTML + '</button></li>';
        });

        suggestionHTML += '</ul>';

        suggestionList.removeClass('hide');
      }

      suggestionList.html(suggestionHTML);
    }
  };

  // Visually set the location data
  qgLocation.fn.setLocationName = function () {
    var storedData = qgLocation.fn.getStoredLocation();
    var locality = storedData['locality'];

    // Update header
    $('.header-location .dropdown-toggle').attr('aria-label', 'Your location is ' + locality);
    $('.header-location .location-name').text(locality);

    // Update all location containers
    setTimeout(function () {
      $('.qg-location-default').addClass('hide');
      $('.qg-location-set').removeClass('hide');
    }, 300);
  };

  // Initialise functions for finding the nearest service centre
  qgLocation.fn.initServiceCentre = function () {
    var serviceCentreModule = $('.qg-service-centre__wrapper');

    if (serviceCentreModule.length > 0) {
      var storedData = qgLocation.fn.getStoredLocation();
      var centreTypes = serviceCentreModule.attr('data-types').split('; ');
      var noneIndex = centreTypes.indexOf('None');

      // Remove "None" from centre types
      if (noneIndex !== -1) {
        centreTypes.splice(noneIndex, 1);
      }

      // Query Funnelback with location and service centre types
      var locationOrigin = storedData['latitude'] + ',' + storedData['longitude'];
      var targetURL = serviceCentreModule.attr('data-centres');
      var queryMetadata = centreTypes.join('+');

      $.ajax({
        cache: true,
        dataType: 'json',
        url: targetURL,
        data: '&origin=' + locationOrigin + '&meta_datasource_orsand=' + queryMetadata,
        success: qgLocation.fn.findServiceCentre,
      });
    }
  };

  // Process the service centre response
  qgLocation.fn.findServiceCentre = function (jsonResponse) {
    var results = jsonResponse['response']['resultPacket']['results'];
    var centreData = null;
    var centreContainer = $('.qg-service-centre__results');
    var centreHTML = '';

    if (results.length > 0) {
      centreData = results[0];
    }

    if (centreData) {
      var centreName = centreData['metaData']['t'];
      var centreID = centreData['metaData']['id'];
      var centreDistance = centreData['kmFromOrigin'];
      var centreAddress1 = centreData['metaData']['address1'];
      var centreAddress2 = centreData['metaData']['address2'];

      // Build URL
      var centreType = centreData['metaData']['datasource'].toLowerCase();
      var centreURL = centreContainer.attr('data-' + centreType);

      // Handle special cases
      switch (centreType) {
        case 'hsc':
          centreURL += 'id=' + centreID + '&title=' + centreName;
          break;
        default:
          centreURL += centreName;
      }

      // Build HTML
      centreHTML += '<a href="' + centreURL + '" class="qg-service-centre__link" data-analytics-link-group="qg-nearest-service-centre-details">' + centreName + '</a>';
      centreHTML += '<ul class="qg-service-centre-list">';
      centreHTML += '<li class="qg-service-centre-list-item">';
      centreHTML += '<a href="' + centreURL + '" data-analytics-link-group="qg-nearest-service-centre-services">Services available</a>';
      centreHTML += '</li>';
      centreHTML += '<li class="qg-service-centre-list-item">' + centreDistance + ' km away</li>';
      centreHTML += '<li class="qg-service-centre-list-item">';
      if (centreAddress1 !== undefined) {
        centreHTML += '<span class="qg-service-centre__address">' + centreAddress1 + '</span>';
      }
      if (centreAddress2 !== undefined) {
        centreHTML += '<span class="qg-service-centre__address">' + centreAddress2 + '</span>';
      }
      centreHTML += '</li>';
      centreHTML += '</ul>';
    } else {
      centreHTML += '<p>Browse all service centre locations to find the nearest one to you.</p>';
    }

    centreContainer.html(centreHTML);
  };

  // Restore location containers to default state after location cleared
  qgLocation.fn.resetLocationContainers = function () {
    var defaultLocation = 'unknown';
    var inputField = $('.qg-location-setter-form input[type=text]');

    // Update header
    closeDropdown();
    $('.header-location .dropdown-toggle').attr('arisa-label', 'Your location is ' + defaultLocation);
    $('.header-location .location-name').text(defaultLocation);

    // Update suburb section
    $('.qg-location-setter-error').addClass('hide');
    $('.qg-location-setter-form input[type=text]').removeClass('error');
    inputField.attr('data-choice', '');
    inputField.attr('data-choice-full', '');
    inputField.val('');

    // Update all location containers
    setTimeout(function () {
      $('.qg-location-default').removeClass('hide');
      $('.qg-location-set').addClass('hide');
    }, 300);
  };

  // Close service centre collapsible
  qgLocation.fn.closeServiceCentre = function () {
    $('#qg-service-centre-location-setter').collapse('hide');
  };

  $('.qg-location-setter .set-location').on('focus', function () {
    $('.qg-location-setter-autocomplete').addClass('hide');
  });

  //
  // Ready
  //

  $(document).ready(function () {
    var locationID = '.header-location';

    if ($(locationID).length > 0) {
      qgLocation.fn.initScript();
    }
  });

  // Binds
  $('body').on('custom', customEventHandler);
  $('body').on('click', '.qg-location-setter .detect-location', qgLocation.fn.getDeviceLocation);
  $('body').on('click', '.qg-location-setter .clear-location', qgLocation.fn.deletePositionData);
  $('body').on('click', '.qg-location-setter .qg-location-manual', qgLocation.fn.getManualSuburbName);
  $('body').on('click', '.qg-location-setter .set-location', qgLocation.fn.setManualSuburb);
  $('body').on('click', '.qg-location-setter .qg-location-setter-close', qgLocation.fn.closeLocationPopup);
  $('body').on('submit', '.qg-location-setter .qg-location-setter-form', qgLocation.fn.locationSubmitHandler);
  $('body').on('click', qgLocation.fn.closePopupIfOutside);
  $('body').on('click', qgLocation.fn.closeSuburbsIfOutside);
  $('body').on('click', '.qg-location-setter-close', qgLocation.fn.closeServiceCentre);
  $('body').on('keydown', '.qg-location-setter-autocomplete button', qgLocation.fn.keyboardNavigation);
});
