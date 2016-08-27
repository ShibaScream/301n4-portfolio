var indexController = (function ($, repos, reposView) {
  'use strict';

  var controller = {};

  controller.show = function () {
    $('.section-view').hide();
    $('#home').show();
    repos.requestRepos(reposView.index);
  };

  return controller;

}(jQuery, repos, reposView));
