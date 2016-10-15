var resumeController = (function () {
  'use strict';

  var controller = {};

  controller.show = function (ctx, next) {
    resumeView.initPage(ctx.jobs);
  };

  controller.loadAll = function (ctx, next) {
    var jobData = function () {
      ctx.jobs = resumeData.all;
      next();
    };

    if (resumeData.all.length) {
      jobData();
    } else {
      resumeData.fetchAll(jobData);
    }

  };

  return controller;

}());
