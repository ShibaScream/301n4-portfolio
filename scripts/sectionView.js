menuView = {};

menuView.handleMenu = function () {
  var $menu = $('#menu');
  var $sections = $('.section-view')
  
  $menu.on('click', 'li', function () {
    $sections.hide();
    $('#' + $(this).data('section')).show();
  });
  
  $('#menu li:first').click();
}

menuView.toggleMobileMenu  = function () {
  $('#mobilemenu').on('click', function () {
    $('#menu ul').fadeToggle('fast');
  });
}

$(document).ready(function() {
  menuView.handleMenu();
  menuView.toggleMobileMenu();
});

// TO-DO: ADD HANDLEBARS FUNCTIONS