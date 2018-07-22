/*global qg, jQuery, google*/

let qgInitAutocompleteAddress;

(function (qg, $) {
  'use strict';
  let inputLocationId = 'qg-location-autocomplete';
  let locationSelectionInProgress = true;

  const el = {
    $searchWidget: $('#qg-search-widget'),
    $autoComplete: $('.qg-location-autocomplete'),
    $latitude: $('#latitude'),
    $longitude: $('#longitude'),
    $form: $('#qg-search-widget-form'),
  };

  // getting and setting input fields value using query parameter
  var setsValue = function () {
    el.$form.find(':input:not(:checkbox):not(:radio), select, textarea').each(function () {
      let name = $(this).attr('name');
      let getParameterVal = qg.swe.getParameterByName($(this).attr('name'));
      getParameterVal !== false ? $('[name="' + name + '"]').val(getParameterVal) : '';
    }).end().find('input[type=checkbox], input[type=radio]').each(function () {
      let name = $(this).attr('name');
      let getParameterVal = qg.swe.getParameterByName(name);
      getParameterVal !== false ? $('[value="' + getParameterVal + '"]').prop('checked', true) : '';
    });
  };
  setsValue();

  el.$form.find('.qg-location-autocomplete').keydown(function (e) {
    if (event.keyCode === 13 && locationSelectionInProgress) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // removing hidden fields value on reset
  el.$searchWidget.find('button[type="reset"]').click(function (evt) {
    evt.preventDefault();
    el.$form.find(':input:not(:checkbox):not(:radio), select, textarea').each(function () {
      $(this).val('');
    }).end().find('input[type=checkbox], input[type=radio]').each(function () {
      $(this).prop('checked', false);
    });
  });

  // on autoComplete blur removing hidden fields values
  el.$autoComplete.blur(function () {
    if ($(this).val().length === 0) {
      el.$searchWidget.find(el.$latitude).val('')
        .end()
        .find(el.$longitude).val('');
    }
  });

  if ($('.' + inputLocationId).length > 0) {
    let getLocationEle = $('.qg-app-geocoding');
    qgInitAutocompleteAddress = () => {
      let qldBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-29, 138.0578426),
        new google.maps.LatLng(-9.9339, 153.63831));
      let inputLocationEle = document.getElementsByClassName(inputLocationId);
      let addressFormId = 'qg-address-autocomplete';

      $.each(inputLocationEle, function () {
        let dataStrictBounds = $(this).data('strictbounds') || true;
        let options = {
          bounds: qldBounds,
          strictBounds: dataStrictBounds,
          types: ['geocode'],
        };
        let autocomplete = new google.maps.places.Autocomplete(this, options);

        //if address form exists fill the selection
        let form = $(this).siblings('.' + addressFormId);
        if (form.length > 0) {
          let formFields = {
            street_number: {dataType: 'street', name: 'short_name'},
            route: {dataType: 'street', name: 'long_name'},
            locality: {dataType: 'city', name: 'long_name'},
            administrative_area_level_1: {dataType: 'state', name: 'short_name'},
            country: {dataType: 'country', name: 'long_name'},
            postal_code: {dataType: 'zip', name: 'short_name'},
          };
          let fillInAddress = () => {
            let loc = autocomplete.getPlace();
            //clear form
            $.each(formFields, (i, v) => {
              form.find('input[data-type="' + v.dataType + '"]').val('');
            });

            for (let i = 0; i < loc.address_components.length; i++) {
              let type = loc.address_components[i].types[0];
              if (formFields[type] !== undefined && formFields[type].dataType !== undefined) {
                let inputEle = form.find('input[data-type="' + formFields[type].dataType + '"]');
                if (inputEle.length > 0) {
                  let val = inputEle.val() + ' ' + loc.address_components[i][formFields[type].name];
                  inputEle.val(val);
                  inputEle.change();
                }
              }
            }
          };
          autocomplete.addListener('place_changed', fillInAddress);
          // $(this).on('change', google.maps.event.trigger(autocomplete, 'place_changed'))
        } else {
          let fillInAddress = () => {
            locationSelectionInProgress = false;
            var place = autocomplete.getPlace();
            $('.qg-result-title h2').append(`near '<strong><em>${place.formatted_address}'</em></strong>`);
            if (place.geometry) {
              el.$searchWidget.find(el.$latitude).val(place.geometry.location.lat())
                .end()
                .find(el.$longitude).val(place.geometry.location.lng());
            }
          };
          autocomplete.addListener('place_changed', fillInAddress);
        }
      });

      //Get current location
      if (getLocationEle.length > 0) {
        $.each(getLocationEle, (i, ele) => {
          $(ele).on('click', function (event) {
            event.preventDefault();
            if (navigator.geolocation) {
              let showLocation = (position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
                let geocoder = new google.maps.Geocoder();
                let locationInput = $(this).siblings('.' + inputLocationId);
                el.$searchWidget.find(el.$latitude).val(latitude)
                  .end()
                  .find(el.$longitude).val(longitude);
                if (locationInput.length > 0) {
                  geocoder.geocode({'location': latlng}, (results, status) => {
                    if (status === 'OK') {
                      if (results[1]) {
                        locationInput.val(results[1].formatted_address);
                        locationInput.trigger('place_changed');
                      } else {
                        window.alert('No results found');
                      }
                    } else {
                      window.alert('Geocoder failed due to: ' + status);
                    }
                  });
                }
              };
              let errorHandler = (err) => {
                if (err.code === 1) {
                  alert('Error: Access is denied!');
                } else if (err.code === 2) {
                  alert('Error: Position is unavailable!');
                }
              };
              let options = {timeout: 60000};

              navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
              // Browser doesn't support Geolocation
              window.alert('Your browser doesnot support Geolocation');
            }
          });
        });
      }
    };
    qg.loadGoogle(qgInitAutocompleteAddress);
  }
}(qg, jQuery));
