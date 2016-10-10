var resumeController = (function () {
  'use strict';

  var controller = {};

  controller.show = function () {
    resumeData.fetchAll(resumeView.initPage);
    $('.section-view').hide();
    $('#resume').show();
  };

  return controller;

}());
