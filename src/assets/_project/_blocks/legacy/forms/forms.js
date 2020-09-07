/*! Form validation - v1.1.1 - 2014-04-09
 * https://github.com/bboyle/form-validation
 * Copyright (c) 2014 Ben Boyle; Licensed MIT */
(function ($) {
  'use strict';


  var SUBMIT_TOLERANCE = 10000,
    DEFAULT_STATUS_HTML = '<div class="alert alert-warning" role="alert"><div class="inner"><h2><i class="fa fa-exclamation-triangle"></i>Please check your answers</h2><ol></ol></div></div>',
    // fields that validate
    candidateForValidation = 'input, select, textarea',


    // invalidFilter
    invalidFilter = function () {
      return !(this.disabled || this.validity.valid);
    },


    // follow plugin conventions for storing plugin data
    // http://docs.jquery.com/Plugins/Authoring#Data
    pluginDataKey = 'formValidation',
    pluginData = function (key, value) {
      var dataHash = this.data(pluginDataKey) || this.data(pluginDataKey, {}).data(pluginDataKey);

      if (typeof key !== 'undefined') {
        if (typeof value !== 'undefined') {
          dataHash[key] = value;
          return value;
        } else if (typeof dataHash[key] !== 'undefined') {
          return dataHash[key];
        }
        return null;
      }

      return dataHash;
    },


    // helper for .label, .hint and .alert
    getLabelComponent = function (component, options) {
      return this.map(function (index, domElement) {
        var $element = $(domElement),
          labelElement = null,
          foundElement = null;

        if (typeof options === 'object' && options.level === 'group') {
          foundElement = $element.formValidation('group').find(component)[0];
        } else if ($element.is(':radio, :checkbox')) {
          foundElement = $element.closest('fieldset').find(component)[0];
        } else {
          labelElement = $element.closest('form').find('label[for="' + domElement.id + '"]');
          foundElement = labelElement.children(component)[0];
          if (!foundElement) {
            if (component === '.hint') {
              labelElement.append('<small class="hint"></small>');
              foundElement = labelElement.children(component)[0];
            }
          }
        }
        return foundElement;
      });
    },


    changeValidityCheck = function () {
      var $this = $(this),
        alertElement = $this.formValidation('alert'),
        alertLevel,
        invalidContainers;

      // is this control valid?
      if (this.validity.valid) {
        // is it part of a group that contain other invalid controls?
        if ($this.formValidation('question').find('.alert').filter(alertElement).length > 0) {
          alertElement.remove();
        } else {
          // update message from first invalid field in group
          invalidContainers = $this.formValidation('group').find(candidateForValidation).filter(invalidFilter);
          if (invalidContainers.length > 0) {
            alertElement.text(invalidContainers.formValidation('getValidationMessage'));
          } else {
            // all fields valid
            alertElement.remove();
          }
        }

        // remove invalid class from ancestors that do not contain invalid fields
        $this.parentsUntil('form', '.invalid').filter(function () {
          return $(this).find(candidateForValidation).filter(invalidFilter).length === 0;
        })
        // remove .invalid class
          .removeClass('invalid')
          // remove old alerts (change handler should have already done this)
          .find('.alert')
          .remove();
      } else {
        // does alert exist?
        if (alertElement.length === 0) {
          alertElement = $('<em class="alert"/>');
        }
        // show message
        alertElement.text($this.formValidation('getValidationMessage'));
        // append to form
        if ($this.formValidation('group').hasClass('atomic')) {
          alertLevel = { 'level': 'group' };
        }

        $this.formValidation( 'label', alertLevel ).parent().find( '.label, abbr[title="(required)"]' ).eq( -1 )
          .after(alertElement);

        // NOTE we don't flag the question as .invalid now
        // .invalid only happens on submit, to soften inline validation errors
      }
    },


    // checks for invalid elements
    // returns number of invalid elements
    submitValidityCheck = function () {
      // form object
      var form = $(this).closest('form'),

        // invalid fields
        invalid = form.find(candidateForValidation).filter(function invalidFields() {
          // skip disabled
          if (this.disabled) {
            return false;
          }

          // only check radio button groups once (skip individual radio button)
          if (this.type === 'radio') {
            if (!invalidFields.cache) {
              invalidFields.cache = {};
            } else if (invalidFields.cache[this.name] === true) {
              return false;
            }
            invalidFields.cache[this.name] = true;
          }

          return this.validity && !this.validity.valid;
        }),

        // alert container
        alert = pluginData.call(form, 'summaryElement') || pluginData.call(form, 'summaryElement', $(DEFAULT_STATUS_HTML)),

        // messages within alert
        messages = alert.find('ol'),

        // track groups
        lastGroupSeen = true;

      if (invalid.length > 0) {
        // remove old messages
        messages.find('li').remove();

        // add new messages
        invalid.each(function () {
          // get field
          var $this = $(this),
            // get group (if exists)
            group = $this.formValidation('group'),
            // get label or group label
            label = $this.formValidation('label', {
              level: group.length > 0 ? 'group' : null
            }),
            labelId,
            item;

          // get the label id
          if (label.length > 0) {
            labelId = label[0].id || label.generateId('label-' + this.id)[0].id;
          } else {
            labelId = this.name;
          }

          // get alert item
          item = pluginData.call( $this, 'summaryElement' ) || pluginData.call( $this, 'summaryElement', $( '<li><a href="#' + labelId + '"></a></li>' ));

          if ( group.length === 0 || group[0] !== lastGroupSeen ) {
            // update last group seen
            lastGroupSeen = group[ 0 ];

            // create error message with link to label
            item
              .find('a')
              .text( label.text().replace( /\?$/, '' ) + ': ' + $this.formValidation( 'getValidationMessage' ))
              .end()
              .appendTo( messages );
          } else {
            // remove from DOM
            item.remove();
          }
        });
      }

      return invalid.length;
    },


    submitValidationHandler = function (event) {
      // validate form
      var count = submitValidityCheck.call( this ),
        form = $( this );

      // remove invalid class from questions that do not contain invalid fields
      form.find( '.invalid' ).filter(function() {
        return $( this ).find( candidateForValidation ).filter( invalidFilter ).length === 0;
      })
      // remove .invalid class
        .removeClass( 'invalid' )
        // remove old alerts (change handler should have already done this)
        .find( '.alert' )
        .remove()
      ;


      // anything invalid?
      if ( count > 0 ) {
        // cancel submit
        event.stopImmediatePropagation();
        event.preventDefault();

        // show the error summary
        (function(form) {
          var summary = pluginData.call( form, 'summaryElement' );
          // hide any previous status blocks
          form.prev( '.alert' ).not( summary ).remove();
          // show the new summary
          form.before( summary.fadeIn() );
          // focus/scroll summary element
          if (window.innerWidth < 992) {
            $( window ).scrollTop( summary.offset().top - $('.qg-site-header').height());
          } else {
            $( window ).scrollTop( summary.offset().top );
          }
        }( form ));

        // find all the invalid fields
        form.find( candidateForValidation ).filter( invalidFilter ).each(function() {
          // update inline alerts
          changeValidityCheck.call( this );
        })
        // set .invalid on ancestor LI elements
          .parentsUntil( 'form', '.questions > li' )
          // but not sections
          .not( '.section, .compact' )
          .addClass( 'invalid' )
        ;

        // trigger x-invalid
        form.trigger( 'x-invalid' );

        // cancel submit
        return false;
      }
    },


    // bind this AFTER the validation handler
    // only invoked if validation did not prevent submit
    // This will softlock submit if form submit passes this function with in SUBMIT_TOLERANCE timerange
    submitDoneHandler = function( event ) {
      // use event.timeStamp when available and $.now() otherwise
      var timeStamp = event.timeStamp || $.now(),
        form = $( this ),
        summaryElement = pluginData.call( form, 'summaryElement' ),
        lastSubmitTimeStamp
      ;

      // remove summary element from DOM on successful submit
      if ( summaryElement ) {
        summaryElement.remove();
      }

      // is this submit event too soon after the last one?
      lastSubmitTimeStamp = pluginData.call( form, 'lastSubmitTimeStamp' );
      if ( lastSubmitTimeStamp && timeStamp - lastSubmitTimeStamp < SUBMIT_TOLERANCE ) {
        // cancel the submit event
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
      } else {
        // store the timestamp
        pluginData.call( form, 'lastSubmitTimeStamp', timeStamp );
      }
    },


    // plugin methods
    methods = {
      // $( x ).formValidation( 'alert' ) -- get
      // get alert text
      alert: function() {
        return this.map(function( index, domElement ) {
          var $element = $( domElement ),
            group;

          if ( $element.is( ':radio, :checkbox' ) === true ) {
            return $element.closest( 'fieldset' ).find( 'legend > .alert' )[ 0 ];
          } else {
            // atomic groups
            group = $element.formValidation( 'group' ).filter( '.atomic' );
            if ( group.length > 0 ) {
              return group.find( 'legend > .alert' )[ 0 ];
            } else {
              return $( 'label[for="' + domElement.id + '"] > .alert' )[ 0 ];
            }
          }
        });
      },


      // $( x ).formValidation( 'label' )
      // $( x ).formValidation( 'label', { level : group })
      // return .label associated with element or containing group
      label : function( options ) {
        return getLabelComponent.call( this, '.label', options );
      },


      // $( x ).formValidation( 'hint' )
      // $( x ).formValidation( 'hint', { level : group })
      // return .hint associated with element or containing group
      hint : function( options ) {
        return getLabelComponent.call( this, '.hint', options );
      },


      // $( x ).formValidation( 'question' )
      // return question element for item
      question : function( options ) {
        // looking for group?
        if ( typeof options === 'object' && options.level === 'group' ) {
          // return the group
          return this.formValidation( 'group' );
        }

        // not looking for group
        return this.map(function( index, domElement ) {
          return $( domElement ).parentsUntil( 'form', '.questions > li' )[ 0 ];
        });
      },


      // $( x ).formValidation( 'group' )
      // return group element for item
      group : function() {
        return this.map(function( index, domElement ) {
          return $( domElement ).parentsUntil( 'form', '.group' ).filter(function() {
            // ignore groups that do not contain fieldsets
            return $( this ).children( 'fieldset' ).length > 0;
          })[ 0 ];
        });
      },


      // $( x ).formValidation( 'validate' )
      // binds validation handler functions
      // sets @novalidate on form to disable built-in validation
      // TODO allow this to be called multiple times without binding additional handlers!
      validate : function() {
        return this.each(function() {
          $( this ).closest( 'form' )
          // turn off native validation
            .attr( 'novalidate', true )
            // unbind and rebind handlers
            .off( 'submit', submitDoneHandler )
            .off( 'submit', submitValidationHandler )
            // validate this form
            .on( 'submit', submitValidationHandler )
            // if validation did not cancel submit…
            .on( 'submit', submitDoneHandler )
            // bind inline validation handlers to form elements
            .find( candidateForValidation )
            .off( 'change', changeValidityCheck )
            .on( 'change', changeValidityCheck )
          ;
        });
      },

      // jQuery("div.alert.alert-warning").remove(); //as this function only add's to it. submitDoneHandler did the removal on success.
      // $( x ).formValidation( 'validate', event )
      // validates the form it is attached too
      // return false if invalid
      // var fakeEvent = jQuery.Event( "click" );
      // $("form#myForm").formValidation("validateNow", fakeEvent);
      // The fakeEvent captures the .stopImmediatePropagation() .preventDefault()
      // and to allow you to check with:
      //isDefaultPrevented, isImmediatePropagationStopped
      validateNow : function( event ) {
        return submitValidationHandler.call( this, event );
      },


      // $( x ).formValidation( 'getValidationMessage' )
      // return String validation message, e.g. "Must be completed"
      getValidationMessage : function() {

        var validityState = this[ 0 ].validity;

        if ( typeof validityState === 'undefined' || validityState.valid === true ) {
          return '';
        } else if ( validityState.valueMissing ) {
          return 'Must be completed';
        } else if ( validityState.customError ) {
          return this[ 0 ].validationMessage;
        } else if ( validityState.typeMismatch ) {
          return 'Must be an email address';
        } else if ( validityState.patternMismatch ) {
          return 'Must use the format shown';
        } else {
          return 'Must be a valid answer';
        }
      }

    };

  $.fn.formValidation = function( method ) {
    // Method calling logic
    // http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.formValidation' );
    }

  };


  // legacy API
  $.fn.forcesForms = $.fn.formValidation;
}( jQuery ));
/*! Generate ID - v1.0.3 - 2014-09-18
 * https://github.com/bboyle/Generate-ID
 * Copyright (c) 2014 Ben Boyle; Licensed MIT */
(function( $ ) {
  'use strict';


  /**
   * Assigns a unique value to `@id` unless hasAttribute( 'id' ) is true
   *
   * @param preferredId string to use for id value
   *
   * @return jquery object (chaining supported)
   */
  $.fn.generateId = function( preferredId ) {

    var i = 1;

    if ( ! preferredId ) {
      preferredId = 'id';
    } else {
      preferredId = $.trim( preferredId.toLowerCase().replace( /[^a-z0-9_]+/g, ' ' )).replace( /\s+/g, '-' );
    }

    return this.each(function() {

      var id;

      if ( ! this.getAttribute( 'id' )) {

        id = preferredId;
        while ( document.getElementById( id )) {
          id = preferredId + String( i );
          i++;
        }
        this.setAttribute( 'id', id );
      }
    });

  };


}( jQuery ));
/*! HTML5 constraintValidationAPI - v1.0.7 - 2015-02-19
 * https://github.com/bboyle/html5-constraint-validation-API
 * Copyright (c) 2015 Ben Boyle; Licensed MIT */
/*exported initConstraintValidationAPI*/
if ( jQuery !== 'undefined' ) {
  (function( $ ) {
    'use strict';


    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    // 1*( atext / "." ) "@" ldh-str 1*( "." ldh-str )
    var REXP_EMAIL = /^[A-Za-z0-9!#$%&'*+\-\/=\?\^_`\{\|\}~\.]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)*$/,

      // fields that validate
      candidateForValidation = 'input, select, textarea',

      // for feature detection
      input = $( '<input>' ).get( 0 ),

      // polyfill test
      polyfill = typeof input.validity !== 'object',

      // radio button bug (google earth internal browser)
      radioButtonBug = ! polyfill && $( '<input type="radio" required checked>' ).get( 0 ).validity.valueMissing === true,
      validateBuggyRadioButtons,

      // invalid fields filter
      isInvalid = function() {
        return ! ( this.disabled || this.validity.valid );
      },

      // get all radio buttons
      getRadioButtonsInGroup = function( radio ) {
        return $( radio.form.elements[ radio.name ] ).filter( '[name="' + radio.name + '"]' );
      },


      // manage validity state object
      validityState = function( typeMismatch, valueMissing, customError, message, patternMismatch ) {

        if ( typeof message === 'string' ) {
          customError = !! message;
        }
        return {
          customError: customError,
          typeMismatch: !! typeMismatch,
          patternMismatch: !! patternMismatch,
          valueMissing: !! valueMissing,
          valid: ! valueMissing && ! customError && ! typeMismatch && ! patternMismatch
        };
      },


      validateField = function(message) {
        var $this = $( this ),
          required = !!$this.attr( 'required' ),
          radio = this.type === 'radio' && getRadioButtonsInGroup( this ),
          valueMissing,
          invalidEmail = this.getAttribute( 'type' ) === 'email' && !!this.value && ! REXP_EMAIL.test( this.value ),
          patternMismatch,
          pattern,
          newValidityState
        ;

        // radio buttons are required if any single radio button is flagged as required
        if ( radio && !required ) {
          required = radio.filter( '[required]' ).length > 0;
        }
        // if required, check for missing value
        if ( required ){

          if ( /^select$/i.test( this.nodeName )) {
            valueMissing = this.selectedIndex === 0 && this.options[ 0 ].value === '';

          } else if ( radio ) {
            valueMissing = radio.filter( ':checked' ).length === 0;

          } else if ( this.type === 'checkbox' ) {
            valueMissing = !this.checked;

          } else {
            valueMissing = !this.value;
          }

        }

        if ( !! this.getAttribute( 'pattern' ) ) {
          if ( this.value.length > 0 ) {
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#compiled-pattern-regular-expression
            pattern = new RegExp( '^(?:' + this.getAttribute( 'pattern' ) + ')$' );

            patternMismatch = ! pattern.test( this.value );

          } else {
            patternMismatch = false;
          }
        }

        // set .validityState
        newValidityState = validityState( invalidEmail, valueMissing, this.validity.customError || false, message, patternMismatch );
        if ( radio ) {
          getRadioButtonsInGroup( this ).each(function() { this.validity = newValidityState; });
        } else {
          this.validity = newValidityState;
        }

        // set .validationMessage
        if ( this.validity.valid ) {
          this.validationMessage = '';

        } else if ( this.validity.customError ) {
          if ( typeof message === 'string' ) {
            this.validationMessage = message;
          }

        } else if ( this.validity.valueMissing ) {
          this.validationMessage = 'Please answer this question';

        } else if ( this.validity.typeMismatch ) {
          this.validationMessage = 'Please type an email address';

        } else if ( this.validity.patternMismatch ) {
          this.validationMessage = 'Please use the format shown';

        } else {
          this.validationMessage = 'Please answer the question correctly';
        }

        return this.disabled || this.validity.valid;
      },


      changeHandler = function( event ) {
        var target = event.target;

        validateField.call( target );

        if ( target.type === 'radio' ) {
          getRadioButtonsInGroup( target ).each(function() {
            this.validity = target.validity;
            this.validationMessage = target.validationMessage;
          });
        }
      },


      submitHandler = function( event ){

        var form = $( this ),
          novalidate = !!form.attr( 'novalidate' ),
          invalid = false
        ;

        // polyfill validation?
        if ( polyfill ) {
          // check fields
          form.find( candidateForValidation ).each(function() {

            invalid = !validateField.call( this );


            // unless @novalidate
            if ( ! novalidate ) {
              // if invalid
              if ( invalid ) {
                // use triggerHandler because invalid does not bubble
                $( this ).triggerHandler( 'invalid' );
              }
            }
          });
        }

        // NOTE all the code below runs in all browsers to polyfill implementation bugs

        // required radio button check
        if ( radioButtonBug ) {
          validateBuggyRadioButtons( this );
        }

        // Opera 11 on OSX fires submit event even when fields are invalid
        // correct implementations will not invoke this submit handler until all fields are valid

        // unless @novalidate
        // if there are invalid fields
        if ( ! novalidate && form.find( candidateForValidation ).filter( isInvalid ).length > 0 ) {
          // abort submit
          event.stopImmediatePropagation();
          event.preventDefault();
          return false;
        }
      },


      initConstraintValidationAPI = function() {
        var candidates = $( candidateForValidation );

        // INPUT validityState
        if ( polyfill ) {
          // set us up the API
          candidates.filter(function() {
            return typeof this.validity !== 'object';
          }).each(function() {

            this.validity = validityState( false, false, false, '', false );
            this.validationMessage = '';

          });

          // check validity on change
          candidates
            .off( 'change.constraintValidationAPI' )
            .on( 'change.constraintValidationAPI', changeHandler )
          ;
        }

        // INPUT validitationMessage
        if ( typeof input.validationMessage !== 'string' ) {
          // set us up the API
          candidates.filter(function() {
            return typeof this.validationMessage !== 'string';
          }).each(function() {
            this.validationMessage = '';
          });
        }

        // INPUT checkValidity
        if ( typeof input.checkValidity !== 'function' ) {
          // set us up the API
          candidates.filter(function() {
            return typeof this.checkValidity !== 'function';
          }).each(function() {
            var domElement = this;

            this.checkValidity = function() {
              var valid = validateField.call( domElement );

              // if invalid, and unless novalidate
              if ( ! valid && ! this.form.getAttribute( 'novalidate' )) {
                // use triggerHandler because invalid does not bubble
                $( domElement ).triggerHandler( 'invalid' );
              }

              return valid;
            };
          });
        }

        // INPUT setCustomValidity
        if ( typeof input.setCustomValidity !== 'function' ) {
          // set us up the API
          candidates.filter(function() {
            return typeof this.setCustomValidity !== 'function';
          }).each(function() {
            var that = this;

            this.setCustomValidity = function( message ) {
              validateField.call( that, message );
            };
          });
        }

        // check for required radio button bug (google earth internal browser)
        if ( radioButtonBug ) {
          validateBuggyRadioButtons = function( form ) {
            var seen = {};
            var radio,
              valueMissing;

            // check every required radio button
            $( 'input', form ).filter( ':radio' ).filter( '[required],[aria-required="true"]' ).each(function() {
              if ( typeof seen[ this.name ] === 'undefined' ) {
                seen[ this.name ] = true;

                radio = getRadioButtonsInGroup( this );
                valueMissing = radio.filter( ':checked' ).length === 0;

                if ( valueMissing ) {
                  // make sure @required is set to use validation API
                  radio.attr( 'required', 'required' );
                } else {
                  // using @aria-required=true so we can track this control
                  // removing @required here to bypass validation bug
                  radio.attr( 'aria-required', true ).removeAttr( 'required' );
                }
              }
            });
          };

          // initial validity
          $( 'form' ).each( validateBuggyRadioButtons );

          // watch changes
          if ( ! polyfill ) {
            candidates.filter( ':radio' )
              .off( 'change.constraintValidationAPI' )
              .on( 'change.constraintValidationAPI', function() {
                validateBuggyRadioButtons( this.form );
              })
            ;
          }
        }

        // check validity on submit
        // this should be bound before all other submit handlers bound to the same form
        // otherwise they will execute before this handler can cancel submit (oninvalid)
        $( 'form' )
          .off( 'submit.constraintValidationAPI' )
          .on( 'submit.constraintValidationAPI', submitHandler )
        ;
      }
    ;


    // run immediately and ondocumentready
    initConstraintValidationAPI();
    $( initConstraintValidationAPI );


    // expose init function
    window.initConstraintValidationAPI = initConstraintValidationAPI;


  }( jQuery ));
}
/*
 * jQuery Simply Countable plugin
 * Provides a character counter for any text input or textarea
 *
 * @version  0.4.2
 * @homepage http://github.com/aaronrussell/jquery-simply-countable/
 * @author   Aaron Russell (http://www.aaronrussell.co.uk)
 *
 * Copyright (c) 2009-2010 Aaron Russell (aaron@gc4.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */

(function($){

  $.fn.simplyCountable = function(options){

    options = $.extend({
      counter:            '#counter',
      countType:          'characters',
      maxCount:           140,
      strictMax:          false,
      countDirection:     'down',
      safeClass:          'safe',
      overClass:          'over',
      thousandSeparator:  ',',
      onOverCount:        function(){},
      onSafeCount:        function(){},
      onMaxCount:         function(){}
    }, options);

    var navKeys = [33,34,35,36,37,38,39,40];

    return $(this).each(function() {

      var countable = $(this),
        counter = $(options.counter);
      if (!counter.length) { return false; }

      var countCheck = function() {

        var count;
        var revCount;

        var reverseCount = function(ct) {
          return ct - (ct * 2) + options.maxCount;
        };

        var countInt = function() {
          return (options.countDirection === 'up') ? revCount : count;
        };

        var numberFormat = function(ct) {
          var prefix = '';
          if (options.thousandSeparator) {
            ct = ct.toString();
            // Handle large negative numbers
            if (ct.match(/^-/)) {
              ct = ct.substr(1);
              prefix = '-';
            }
            for (var i = ct.length - 3; i > 0; i -= 3){
              ct = ct.substr(0,i) + options.thousandSeparator + ct.substr(i);
            }
          }
          return prefix + ct;
        };

        var changeCountableValue = function(val) {
          countable.val(val).trigger('change');
        };

        /* Calculates count for either words or characters */
        if (options.countType === 'words') {
          count = options.maxCount - $.trim(countable.val()).split(/\s+/).length;
          if (countable.val() === '') { count += 1; }
        } else {
          count = options.maxCount - countable.val().length;
        }
        revCount = reverseCount(count);

        /* If strictMax set restrict further characters */
        if (options.strictMax && count <= 0) {
          var content = countable.val();
          if (count < 0) {
            options.onMaxCount(countInt(), countable, counter);
          }
          if (options.countType === 'words') {
            var allowedText = content.match( new RegExp('\\s?(\\S+\\s+){'+ options.maxCount +'}') );
            if (allowedText) {
              changeCountableValue(allowedText[0]);
            }
          } else { changeCountableValue(content.substring(0, options.maxCount)); }
          count = 0, revCount = options.maxCount;
        }

        counter.text(numberFormat(countInt()));

        /* Set CSS class rules and API callbacks */
        if (!counter.hasClass(options.safeClass) && !counter.hasClass(options.overClass)) {
          if (count < 0) {
            counter.addClass(options.overClass);
          } else {
            counter.addClass(options.safeClass);
          }
        } else if (count < 0 && counter.hasClass(options.safeClass)){
          counter.removeClass(options.safeClass).addClass(options.overClass);
          options.onOverCount(countInt(), countable, counter);
        } else if (count >= 0 && counter.hasClass(options.overClass)){
          counter.removeClass(options.overClass).addClass(options.safeClass);
          options.onSafeCount(countInt(), countable, counter);
        }

      };

      countCheck();

      countable.on('keyup blur paste', function(e) {
        switch (e.type) {
          case 'keyup':
            // Skip navigational key presses
            if ($.inArray(e.which, navKeys) < 0) { countCheck(); }
            break;
          case 'paste':
            // Wait a few miliseconds if a paste event
            setTimeout(countCheck, (e.type === 'paste' ? 5 : 0));
            break;
          default:
            countCheck();
            break;
        }
      });

    });

  };

})(jQuery);/*! relevance - v2.1.0 - 2015-03-04
 * https://github.com/bboyle/relevance
 * Copyright (c) 2015 Ben Boyle; Licensed MIT */
if ( jQuery !== 'undefined' ) {
  (function( $ ) {
    'use strict';

    var relevantEvent = 'relevant',
      irrelevantEvent = 'irrelevant',
      elementsToDisable = 'button, input, select, textarea',
      polyfillHidden = (function() {
        var hidden = $( '<div hidden></div>' );
        var hiddenSupported = hidden.appendTo( 'body' ).is( ':hidden' );
        hidden.remove();
        return ! hiddenSupported;
      }()),

      formElementsByName = function( form, name ) {
        // filter out the @id matching of HTMLFormElement.elements[]
        return $( form.elements[ name ] ).filter( '[name="' + name + '"]' );
      },

      filterRelevant = function() {
        return $( this ).closest( '[hidden]' ).length === 0;
      },

      filterIrrelevant = function() {
        return $( this ).closest( '[hidden]' ).length > 0;
      },

      valueMap = function( element ) {
        return element.value;
      },

      valueInArray = function( possibleValues, actualValues ) {
        var i;
        if ( typeof possibleValues !== 'object' ) {
          possibleValues = [possibleValues];
        }

        for ( i = 0; i < actualValues.length; i++ ) {
          if ( $.inArray( actualValues[ i ], possibleValues ) !== -1 ) {
            return true;
          }
        }

        return false;
      },

      // when changing a control that alters relevance of other elements…
      recalculateRelevance = function() {
        // assume dependency map exists
        var map = $( this.form ).data( 'relevance' ).dependencyMap[ this.name ],
          values = $.map( formElementsByName( this.form, this.name ).filter( 'select,:checked' ).filter( ':visible' ), valueMap )
        ;

        $.each( map, function( index, config ) {
          config.items.relevance( 'relevant', valueInArray( config.values, values ) !== config.negate );
        });
      },

      // when an element changes relevance, check descendent controls that alter relevance in turn…
      recalculateDependents = function( isRelevant ) {
        var form,
          dependencyMap,
          targets;

        // any change to relevant toggles?
        form = this.closest( 'form' );
        if ( form.length ) {
          dependencyMap = form.data( 'relevance' );
          if ( typeof dependencyMap === 'object' ) {
            dependencyMap = dependencyMap.dependencyMap;
            if ( typeof dependencyMap === 'object' ) {
              // get descendent-or-self select, radio and checkbox
              targets = this.add( this.find( 'select,input' )).filter( 'select,:radio,:checkbox' );
              // get unique @name for select, radio and checkbox
              targets = $.unique( $.map( targets, function( elementOfArray ) {
                return elementOfArray.name;
              }));
              $.each( targets, function( index, name ) {
                var map = dependencyMap[ name ],
                  values;

                if ( typeof map === 'object' ) {
                  $.each( map, function( index, config ) {
                    if ( isRelevant === false ) {
                      config.items.relevance( 'relevant', false );

                    } else {
                      values = $.map( formElementsByName( form[ 0 ], name ).filter( 'select,:checked' ).filter( ':visible' ), valueMap );
                      config.items.relevance( 'relevant', valueInArray( config.values, values ) !== config.negate );
                    }
                  });
                }
              });
            }
          }
        }
      },


      methods = {

        // $( x ).relevance( 'relevant', true )
        // if the element is hidden, fire a 'relevant' event
        // $( x ).relevance( 'relevant', false )
        // if the element is visible, fire an "irrelevant" event
        relevant: function( makeRelevant ) {
          var targets;
          if ( makeRelevant ) {
            targets = this.filter( filterIrrelevant ).trigger( relevantEvent );
          } else {
            targets = this.filter( filterRelevant ).trigger( irrelevantEvent );
          }
          if ( targets.length ) {
            recalculateDependents.call( targets, makeRelevant );
          }
          return this;
        },

        // $( x ).relevance( 'show' )
        // shows the element (does not check if element is already visible)
        // triggers 'relevant-done' after showing is complete
        show: function() {
          // enable elements before they are shown
          this.add( this.find( elementsToDisable ))
          // but not any controls that will remain irrelevant
            .not( this.find( '[hidden]' ).find( elementsToDisable ))
            .each(function() {
              this.removeAttribute( 'disabled' );
            });

          // stop animation, remove @hidden and @aria-hidden, start showing
          if ( polyfillHidden ) {
            this.stop( true, true ).slideDown();
          }
          return this.removeAttr( 'hidden' ).removeAttr( 'aria-hidden' );
        },

        // $( x ).relevance( 'hide' )
        // hides the element (does not check if element is already hidden)
        hide: function() {
          this.attr({
            hidden: 'hidden',
            'aria-hidden': 'true'
          });

          if ( polyfillHidden ) {
            this.stop( true, true ).hide( 0, function() {
              var $this = $( this );
              // disable elements (including self if appropriate)
              $this.filter( elementsToDisable ).add( $this.find( elementsToDisable )).each(function() {
                this.setAttribute( 'disabled', 'disabled' );
              });
            });
          } else {
            this.filter( elementsToDisable ).add( this.find( elementsToDisable )).each(function() {
              this.setAttribute( 'disabled', 'disabled' );
            });
          }

          return this;
        },

        // $( x ).relevance( 'relevantWhen', { name: radio/checkbox/select, value: requiredValue, negate: false | true })
        // sets up dependent relevance
        // example: $( '#red' ).relevance( 'relevantWhen', { name: 'rgb', value: 'red' })
        // example: $( '#red' ).relevance( 'relevantWhen', { id: 'rgb-red', value: 'red' })
        // #red will be shown/hidden when '@name=rgb' value changes.
        relevantWhen: function( config ) {
          var form,
            data,
            name,
            values;

          values = config.values || [config.value];

          if ( config.name ) {
            name = config.name;
          } else if ( config.id ) {
            name = document.getElementById( config.id ).name;
          } else if ( config.container ) {
            name = $( config.container ).find( 'select,:radio,:checkbox' ).attr( 'name' );
          }
          config.negate = config.negate === true;

          // find the form that has this control
          form = this.closest( 'form' );
          // get dependency map (create it if needed)
          data = form.data( 'relevance' );
          if ( typeof data !== 'object' ) {
            data = {};
            form.data( 'relevance', data );
          }
          if ( typeof data.dependencyMap !== 'object' ) {
            data.dependencyMap = {};
          }
          if ( typeof data.dependencyMap[ name ] !== 'object' ) {
            data.dependencyMap[ name ] = [];
            // setup event handlers for name
            formElementsByName( form[ 0 ], name )
              .filter( ':radio,:checkbox' )
              .on( 'click', recalculateRelevance )
              .end()
              .filter( 'select' )
              .on( 'change', recalculateRelevance )
            ;
          }
          // add or update relevance rule
          data.dependencyMap[ name ].push({
            items: this,
            values: values,
            negate: config.negate
          });

          // initial relevance
          this.relevance( 'relevant', valueInArray( values, $.map( formElementsByName( form[ 0 ], name ).filter( 'select,:checked' ).filter( ':visible' ), valueMap )) !== config.negate );

          return this;
        },

        // $( x ).relevance( 'instructions', options )
        // sets up relevance handling based on text instructions
        // options ::= { instructions: '.relevance', questions: '.questions > li' }
        instructions: function( options ) {
          options = $.extend( {
            instructionSelector: '.relevance',
            questionSelector: '.questions > li'
          }, options );

          this.find( options.instructionSelector ).each(function() {
            var $this = $( this ),
              value = $this.text(),
              question = $this.closest( options.questionSelector ),
              toggle = question.prevAll( options.questionSelector ),
              i,
              answers,
              nestedToggles,
              match = false,
              negate = false;

            // pattern: (If different to <PREVIOUS QUESTION>)
            if ( /If different to/.test( value )) {
              // assume previous 'li' is the toggle
              match = true;
              toggle = toggle.eq( 0 );
              value = toggle.find( ':checkbox' ).val();
              negate = true;
            } else {
              value = value.replace( /^.*chose\s+\S([^'"’]+)\S\s+above.*$/, '$1' );
              // which of the previous questions is the toggle?
              i = 0;
              while ( i < toggle.length ) {
                // does this item have the answer we need?
                answers = $.map( toggle.eq( i ).find( 'option,:radio,:checkbox' ), valueMap );
                if ( valueInArray( value, answers )) {
                  nestedToggles = toggle.eq( i ).find( options.questionSelector );
                  if ( nestedToggles.length ) {
                    toggle = $( nestedToggles.get().reverse() );
                    i = 0;
                  } else {
                    match = true;
                    toggle = toggle.eq( i ); // toggle.length becomes 1, loop will exit
                    i = 1; // exit loop
                  }
                } else {
                  i++;
                }
              }
            }
            if ( match ) {
              toggle = toggle.add( toggle.find( 'select,input' )).filter( 'select,:radio,:checkbox' );
              question.relevance( 'relevantWhen', { name: toggle.attr( 'name' ), value: value, negate: negate });
            }
          });
          return this;
        }
      };
    // fallback (default) event handling
    $( document ).on( 'relevant irrelevant', function( event ) {
      var target = $( event.target );
      if ( event.type === 'relevant' ) {
        target.relevance( 'show' );
      } else {
        target.relevance( 'hide' );
      }
    });

    $.fn.relevance = function( method ) {
      // Method calling logic
      // http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1 ));
      } else if ( typeof method === 'object' || !method ) {
        // return methods.init.apply( this, arguments );
        return this;
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.relevance' );
      }
    };
  }( jQuery ));
}
(function( $ ) {
  'use strict';

  // window.console.log( 'file-size-validation.js' );

  var displayFileSize;


  // bail out if no file API support
  if ( typeof $( '<input type="file">' )[ 0 ].files !== 'object' ) {
    // duplicate fsize instruction before submit button
    $( '.max-fsize' ).each(function() {
      var fsize = $( this ),
        form;
      form = fsize.closest( '.preamble' ).nextAll( 'form' ).eq( 0 );
      form.find( '.actions' ).before( '<p>' + fsize.parent().html() + '</p>' );
    });
    return;
  }


  // display file size
  displayFileSize = function( input ) {
    input.nextAll( '.fsize' ).remove();
    if ( input[ 0 ].files.length > 0 ) {
      var filesize = input[ 0 ].files[ 0 ].size / 1024;

      if ( filesize >= 1024 ) {
        filesize = filesize / 1024;
        input.after( '<span class="fsize">File size: ' + ( Math.round( filesize * 10 ) / 10 ) + 'MB' + '</span>' );
      } else {
        input.after( '<span class="fsize">File size: ' + ( Math.round( filesize * 10 ) / 10 ) + 'KB' + '</span>' );
      }
    }
  };


  // forms with max file size
  $('.max-fsize').each(function() {
    var fsize = $( this ),
      form,
      maxFileSize;

    // read fsize, assume MB
    maxFileSize = parseInt( fsize.text().replace( /\D+/g, '' ), 10 ) * 1024 * 1024;
    // window.console.log( 'found max fsize', maxFileSize );

    // get form (closest form after the preamble)
    form = fsize.closest( '.preamble' ).nextAll( 'form' ).eq( 0 );

    form.find( ':file' ).on( 'change', function() {
      var input = $( this );

      displayFileSize( input );

      // recalculate file sizes
      var total = 0,
        valid;
      $( ':file', this.form ).each(function( index, element ) {
        var size = element.files.length ? element.files[ 0 ].size : 0;
        total += size; // total = total + size;
      });

      // is everything valid or invalid?
      valid = total <= maxFileSize;

      // window.console.info( 'file size validation:', total, '<', maxFileSize, total < maxFileSize );

      $( ':file', this.form )
      // update validity for :file inputs with values
        .filter(function() {
          return !!this.value;
        })
        .each(function( index, element ) {
          element.setCustomValidity( valid ? '' : 'Attachments are too large' );
        })
        // blank :file inputs should not have a custom error
        .filter(function() {
          return ! this.value;
        })
        .each(function( index, element ) {
          element.setCustomValidity( '' );
        });

    });

  });

}( jQuery ));
(function( $ ) {
  'use strict';

  var xorConstraintSubmitHandler = function( event ) {
      // has one of the required fields been answered?
      var xorFields = event.data[ 0 ],
        validationMessage = event.data[ 1 ],
        xorConstraintMet = xorFields.filter(function() {
          return this.value.length > 1;
        }).length > 0
      ;

      xorFields.each(function() {
        this.setCustomValidity(
          xorConstraintMet ? '' : validationMessage
        );
      });
    },

    xorConstraintChangeHandler = function( event, validationUiRefreshOnly ) {
      if ( validationUiRefreshOnly === true ) {
        // pass through to other change handlers
        return;
      }

      var xorFields = event.data[ 0 ];

      // constraint validity check
      xorConstraintSubmitHandler( event );

      // trigger validation UI  on other fields?
      if ( event.type === 'change' ) {
        xorFields.not( event.target ).triggerHandler( 'change', true );
      }
    }
  ;


  // plugin
  $.fn.initXorConstraint = function( validationMessage ) {
    // custom validation for XOR options
    this.closest( 'form' ).on( 'submit', [this, validationMessage], xorConstraintSubmitHandler );
    this.on( 'change', [this, validationMessage], xorConstraintChangeHandler );
  };
}(jQuery));

(function( $ ){
  'use strict';


  /* detect required field markers for IE6 */
  $( 'abbr[title*="required"]' ).addClass( 'required' );


  // show/hide entire 'question' when fields become irrelevant
  $( '.questions > li' ).not( '.section' )
    .on( 'relevant', function( event ) {
      $( this ).relevance( 'show' );
      event.stopImmediatePropagation();
    })
    .on( 'irrelevant', function( event ) {
      $( this ).relevance( 'hide' );
      event.stopImmediatePropagation();
    })
  ;


  // click the table cell to click on a matrix option
  $( '.matrix' ).delegate( 'td', 'click', function( evt ) {
    $( evt.target )
      .find( 'input' )
      .trigger( 'click' )
      .trigger( 'change' )
    ;
  });

}( jQuery ));


/**
 * This file initialises forms
 */
(function( $ ) { /* start closure */
  'use strict';
  var initValidation = function() {
    window.initConstraintValidationAPI();
    $( 'form' ).formValidation( 'validate' );
  };
  // now: hookup form validation
  initValidation();
  // document ready: hookup form validation
  $( initValidation );
  // instruction based relevance
  if ( $( '.relevance', 'form' ).length > 0 ) {
    $('#qg-primary-content form').relevance( 'instructions' );
  }
}(jQuery)); /* end closure */
(function($) {
  'use strict';


  // extend jquery to 'toggle required'
  $.fn.toggleRequired = function( required ) {
    return this.each(function() {
      var controls = $( this.form.elements[ this.name ] ),
        question = $( this ).closest( '.questions > li' );

      if ( required ) {
        if ( question.find( 'abbr[title="(required)"]' ).length === 0 ) {
          question.find( '.label' ).after(
            // create ABBR shiv for IE6
            $( document.createElement( 'abbr' ))
              .attr( 'title' , '(required)' )
              .text( '*' )
              .addClass( 'required' )
          );
        }
        controls.attr( 'required', 'required' );
      } else {
        controls.removeAttr( 'required' );
        question.find( 'abbr[title="(required)"]' ).remove();
      }
    });
  };
}(jQuery));
/*globals qg*/
// globals
var qg = { oldIE: false };
qg.date = (function() {
  'use strict';


  var datePackage = {},

    // Public holiday dates for 2010-2014 (viewed 2012-09-28)
    // http://www.justice.qld.gov.au/fair-and-safe-work/industrial-relations/public-holidays/dates
    qldHolidays = {
      // 2010
      '2010-01-01' : 'New Year’s Day',
      '2010-01-26' : 'Australia Day',
      '2010-04-02' : 'Good Friday',
      '2010-04-03' : 'Easter Saturday',
      '2010-04-05' : 'Easter Monday',
      '2010-04-26' : 'Anzac Day',
      '2010-05-03' : 'Labour Day',
      '2010-06-14' : 'Queen’s Birthday',
      '2010-12-25' : 'Christmas Day',
      '2010-12-27' : 'Boxing Day',
      '2010-12-28' : 'Christmas Day holiday',

      // 2011
      '2011-01-01' : 'New Year’s Day',
      '2011-01-03' : 'New Year’s Day holiday',
      '2011-02-26' : 'Australia Day',
      '2011-04-22' : 'Good Friday',
      '2011-04-23' : 'Easter Saturday',
      '2011-04-25' : 'Anzac Day',
      '2011-04-26' : 'Easter Monday',
      '2011-05-02' : 'Labour Day',
      '2011-06-13' : 'Queen’s Birthday',
      '2011-12-25' : 'Christmas Day',
      '2011-12-26' : 'Boxing Day',
      '2011-12-27' : 'Christmas Day holiday',

      // 2012
      '2012-01-01' : 'New Year’s Day',
      '2012-01-02' : 'New Year’s Day holiday',
      '2012-02-26' : 'Australia Day',
      '2012-04-06' : 'Good Friday',
      '2012-04-07' : 'Easter Saturday',
      '2012-04-09' : 'Easter Monday',
      '2012-04-25' : 'Anzac Day',
      '2012-05-07' : 'Labour Day',
      '2012-06-11' : 'Queen’s Diamond Jubilee',
      '2012-10-01' : 'Queen’s Birthday',
      '2012-12-25' : 'Christmas Day',
      '2012-12-26' : 'Boxing Day',

      // 2013
      '2013-01-01' : 'New Year’s Day',
      '2013-01-28' : 'Australia Day holiday',
      '2013-03-29' : 'Good Friday',
      '2013-03-30' : 'Easter Saturday',
      '2013-04-01' : 'Easter Monday',
      '2013-04-25' : 'Anzac Day',
      '2013-06-10' : 'Queen’s Birthday',
      '2013-10-07' : 'Labour Day',
      '2013-12-25' : 'Christmas Day',
      '2013-12-26' : 'Boxing Day',

      // 2014
      '2014-01-01' : 'New Year’s Day',
      '2014-01-27' : 'Australia Day holiday',
      '2014-04-18' : 'Good Friday',
      '2014-04-19' : 'Easter Saturday',
      '2014-04-21' : 'Easter Monday',
      '2014-04-25' : 'Anzac Day',
      '2014-06-09' : 'Queen’s Birthday',
      '2014-10-06' : 'Labour Day',
      '2014-12-25' : 'Christmas Day',
      '2014-12-26' : 'Boxing Day',

      // 2015
      '2015-01-01' : 'New Year’s Day',
      '2015-01-26' : 'Australia Day holiday',
      '2015-04-03' : 'Good Friday',
      '2015-04-04' : 'Easter Saturday',
      '2015-04-06' : 'Easter Monday',
      '2015-04-25' : 'Anzac Day',
      '2015-06-08' : 'Queen’s Birthday',
      '2015-10-05' : 'Labour Day',
      '2015-12-25' : 'Christmas Day',
      '2015-12-26' : 'Boxing Day',
      '2015-12-28' : 'Boxing Day holiday',

      // 2016
      '2016-01-01' : 'New Year’s Day',
      '2016-01-26' : 'Australia Day holiday',
      '2016-03-25' : 'Good Friday',
      '2016-03-26' : 'Easter Saturday',
      '2016-03-28' : 'Easter Monday',
      '2016-04-25' : 'Anzac Day',
      '2016-06-13' : 'Queen’s Birthday',
      '2016-10-03' : 'Labour Day',
      '2016-12-25' : 'Christmas Day',
      '2016-12-27' : 'Christmas Day holiday',
      '2016-12-26' : 'Boxing Day',

      // 2017
      '2017-01-01' : 'New Year’s Day',
      '2017-01-02' : 'New Year’s Day holiday',
      '2017-01-26' : 'Australia Day holiday',
      '2017-04-14' : 'Good Friday',
      '2017-04-15' : 'Easter Saturday',
      '2017-04-17' : 'Easter Monday',
      '2017-04-25' : 'Anzac Day',
      '2017-06-12' : 'Queen’s Birthday',
      '2017-10-02' : 'Labour Day',
      '2017-12-25' : 'Christmas Day',
      '2017-12-26' : 'Boxing Day',

      // 2018
      '2018-01-01' : 'New Year’s Day',
      '2018-01-26' : 'Australia Day holiday',
      '2018-03-30' : 'Good Friday',
      '2018-03-31' : 'Easter Saturday',
      '2018-04-02' : 'Easter Monday',
      '2018-04-25' : 'Anzac Day',
      '2018-05-07' : 'Labour Day',
      '2018-10-01' : 'Queen’s Birthday',
      '2018-12-25' : 'Christmas Day',
      '2018-12-26' : 'Boxing Day'
    }
  ;


  // is a public holiday
  datePackage.isPublicHoliday = function( date ) {
    var d = date.getDate(),
      m = date.getMonth() + 1,
      y = String( date.getFullYear() ),
      dateString = y + ( m < 10 ? '-0' : '-' ) + m + ( d < 10 ? '-0' : '-' ) + d
    ;

    // return true, date is a public holiday
    // TODO, if not a state-wide public holiday and given a latlong, check if it is a show holiday
    // return false, date is not a public holiday
    // TODO
    // return undefined, it is not known if the date is a public holiday (beyond 2 years in the future?)

    return !!qldHolidays[ dateString ];
  };
  return datePackage;
}());
(function($) {
  'use strict';


  // find any textareas with a word count
  $( '.hint' ).filter(function() {
    return ( /Maximum:\s+\d+\s+words/ ).test( $( this ).text() );
  }).each(function() {
    var hint = $( this ),
      max = parseInt( hint.text().replace( /Maximum:\s+(\d+)\s+words/, '$1' ), 10 ),
      textField = hint.closest( 'label' ).nextAll( 'textarea' ),
      counter;

    // add counter
    counter = $( '<span/>' ).generateId( 'word-count' );
    //eg. Maximum: 50 words (50 remaining)
    hint.append( ' (', counter, ' remaining)' );

    textField.simplyCountable({
      counter: '#' + counter[ 0 ].id,
      countType: 'words',
      countDirection: 'down',
      maxCount: max,
      onOverCount: function() {
        textField[ 0 ].setCustomValidity( 'Too many words' );
      },
      onSafeCount: function() {
        textField[ 0 ].setCustomValidity( '' );
      }
    });
  });
}( jQuery ));

//# sourceMappingURL=qg-forms.js.map
