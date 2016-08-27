var blogController = (function ($, blogData, blogView) {
  'use strict';
  
  var controller = {};
  
  controller.show = function () {
    blogData.fetchAll(blogView.initPage);
    $('.section-view').hide();
    $('#projects').show();
  };
  
  return controller;
  
}(jQuery, blogData, blogView));