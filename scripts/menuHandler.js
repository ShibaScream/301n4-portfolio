(function ($, _) {
  'use strict';

  var menuView = {};

  // I think I can get rid of this?
//  menuView.handleMenu = function () {
//    var $menu = $('#menu'),
//      $sections = $('.section-view');
//
//    $menu.on('click', 'li', function () {
//      $sections.hide();
//      $('#' + $(this).data('section')).show();
//    });
//
//    $('#menu li:first').click();
//  };

  menuView.toggleMobileMenu = function () {
    $('#mobilemenu').on('click', function () {
      $('#menu').find('ul').fadeToggle('fast');
    });
  };

  menuView.hideMobileMenu = function () {
    $('#menu').find('ul').fadeOut('fast');
  };

  // I think I can get rid of this?
//  menuView.goHome = function () {
//    $('#drplogo').on('click', function () {
//      $('#menu li:first').click();
//    });
//
//    $('#homeheader').on('click', function () {
//      $('#menu li:first').click();
//    });
//  };

  /*****
    credit to https://www.fourfront.us/blog/jquery-window-width-and-media-queries
    found way to check if in mobile version of site
    only then, attach event listener to main so if a user clicks it hides menu
    consider adding underscore.js library and __debounce method to hold off on firing
    function until resize is completed
  *****/
  menuView.checkSize = function () {
    if ($('#mobilemenu').css('display') === 'block') {
      $('main').on('click', menuView.hideMobileMenu);
    } else {
      $('main').off('click', menuView.hideMobileMenu);
    }
  };

  $(document).ready(function () {
//    menuView.handleMenu();
//    menuView.goHome();
    menuView.toggleMobileMenu();
    // fire the first time
    menuView.checkSize();
    // check again on resize, using debounce to avoid multiple firings
    $(window).resize(_.debounce(menuView.checkSize, 500));
  });
  //
  // // attach to window dom
  // return menuView;

}(jQuery, _));
