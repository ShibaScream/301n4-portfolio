var resumeView = (function ($, Handlebars) {
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
    
    resumeData.all.forEach(function (job) {
      $('#resume').append(job.toHTML());
    });
    
  };
  
  return view;
  
}(jQuery, Handlebars, resumeData));