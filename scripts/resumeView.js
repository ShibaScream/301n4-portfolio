(function (module) {
  'use strict';
  // TO DO: create AJAX call

  function Job(opts) {
    this.title = opts.title;
    this.company = opts.company;
    this.companyURL = opts.companyURL;
    this.companyLogo = opts.companyLogo;
    this.dateFrom = opts.dateFrom;
    this.dateTo = opts.dateTo;
    this.description = opts.description;
  }

  // moving this out of global namespace
  Job.resumeData = [];

  Job.prototype.toHtml = function () {

    var templateScript = $('#resumeTemplate').html(),
        theTemplate = Handlebars.compile(templateScript);

    return theTemplate(this);

  };
  
  Job.loadAll = function (rawResumeItems) {
    
    this.resumeData = rawResumeItems
      .sort(function (a, b) {
        return (new Date(b.dateFrom)) - (new Date(a.dateFrom));
      })
      .map(function (item) {
        return new Job(item);
    });
    
  };
  
  Job.fetchAll = function ()

})(window);