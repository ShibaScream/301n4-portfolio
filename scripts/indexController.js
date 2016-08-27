var indexController = (function ($) {
  'use strict';
  
  var controller = {};
  
  controller.show = function () {
    $('.section-view').hide();
    $('#home').show();
  };

  return controller;
  
}(jQuery));