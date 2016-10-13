var blogController = (function () {
  'use strict';

  var controller = {};

  controller.show = function (ctx, next) {
    // blogData.fetchAll(blogView.initPage);
    // $('.section-view').hide();
    // $('#projects').show();
    blogView.initPage(ctx.articles);
  };

  controller.loadAll = function (ctx, next) {
    var loadArticles = function () {
      ctx.articles = blogData.all;
      next();
    };

    if (blogData.all.length) {
      ctx.articles = blogData.all;
      next();
    } else {
      blogData.fetchAll(loadArticles);
    }

  };

  return controller;

}());
