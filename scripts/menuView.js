var menuView = {},
    articleView = {},
    resumeView = {};

menuView.handleMenu = function () {
  var $menu = $('#menu'),
      $sections = $('.section-view');
  
  $menu.on('click', 'li', function () {
    $sections.hide();
    $('#' + $(this).data('section')).show();
  });
  
  $('#menu li:first').click();
};

menuView.toggleMobileMenu  = function () {
  $('#mobilemenu').on('click', function () {
    $('#menu ul').fadeToggle('fast');
  });
};

menuView.hideMobileMenu = function () {
  $('#menu ul').fadeOut('fast');
};

/*****
  credit to https://www.fourfront.us/blog/jquery-window-width-and-media-queries
  found way to check if in mobile version of site
  only then, attach event listener to main so if a user clicks it hides menu
  consider adding underscore.js library and __debounce method to hold off on firing
  function until resize is completed 
*****/
menuView.checkSize = function () {
  if ($('#mobilemenu').css("display") === "block") {
    $('main').on('click', menuView.hideMobileMenu);
  } else {
    $('main').off('click', menuView.hideMobileMenu);
  }
};

$(document).ready(function () {
  menuView.handleMenu();
  menuView.toggleMobileMenu();
  // fire the first time
  menuView.checkSize();
  // check again on resize, using debounce to avoid multiple firings
  $(window).resize(_.debounce(menuView.checkSize, 500));
});

// TO-DO: ADD HANDLEBARS FUNCTIONS