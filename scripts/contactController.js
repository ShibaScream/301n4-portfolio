var contactController = (function () {
  'use strict';

  var controller = {};

  controller.show = function () {
    $('.section-view').hide();
    $('#contact').show();
  };

  return controller;

}());
