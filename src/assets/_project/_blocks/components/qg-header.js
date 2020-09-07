$(function () {
    'use strict';

    // Polyfill for position: sticky;
    var Stickyfill = require('stickyfill');
    var stickyfill = Stickyfill();
    stickyfill.add($('.sticky')[0]);

    // Mobile menu & Search events to prevent both of them opening at the same time
    $('.qg-show-menu, .qg-show-search').on('click', function () {
        if ($(this).attr('aria-expanded') === 'false') {
            $('body').addClass('header-active');
        } else {
            $('body').removeClass('header-active');
        }
        if ($(this).hasClass('qg-show-menu')) {
            $('.qg-search-form').collapse('hide');
        } else {
            setTimeout(() => {
                $('.qg-search-form .input-group input[type=text]').focus();
            }, 300);
            $('.qg-navigation').collapse('hide');
        }
    });

    function reorderTabbing () {
        if (window.innerWidth > 991) {
            $('.qg-portal-links button, .qg-portal-links a').attr('tabindex', '2');
        } else {
            $('.qg-portal-links button, .qg-portal-links a').attr('tabindex', '0');
        }
    }

    reorderTabbing();

    window.addEventListener('resize', function () {
        reorderTabbing();
    });
});