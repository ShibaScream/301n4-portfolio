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

  view.initPage = function (jobs) {
    $('.section-view').hide();

    var $resume = $('#resume');

    $resume.empty();

    jobs.forEach(function (job) {
      $resume.append(view.toHTML(job));
    });

    $resume.show();

  };

  return view;

}());
