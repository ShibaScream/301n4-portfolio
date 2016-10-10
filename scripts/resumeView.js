var resumeView = (function () {
  'use strict';

  var view = {
    templateScript: $('#resumeTemplate').html(),
    theTemplate: null
  };

  view.toHTML = function (job) {

    this.theTemplate = Handlebars.compile(view.templateScript);

    return this.theTemplate(job);

  };

  view.initPage = function () {

    var $resume = $('#resume');

    $resume.empty();

    resumeData.all.forEach(function (job) {
      $resume.append(view.toHTML(job));
    });

  };

  return view;

}());
