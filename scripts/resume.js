var resume = (function (window, $, Handlebars) {
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
  
  Job.resumeData = [];

  Job.loadAll = function (data) {

    this.resumeData = data.sort(function (a, b) {
      return (new Date(b.dateFrom)) - (new Date(a.dateFrom));
    }).map(function (item) {
      return new Job(item);
    });

  };
  

  Job.prototype.toHTML = function () {

    var templateScript = $('#resumeTemplate').html(),
      theTemplate = Handlebars.compile(templateScript);

    return theTemplate(this);

  };

  Job.initPage = function () {
    
    this.resumeData.forEach(function (job) {
      $('#resume').append(job.toHTML());
    });
    
  };
  
  Job.fetchAll = function () {
    
    if (localStorage.resumeData) {
      
      this.loadAll(JSON.parse(localStorage.resumeData));
    
    } else {
      
      $.getJSON('../data/resumeData.json', function (data) {
        Job.loadAll(data);
        localStorage.setItem('resumeData', JSON.stringify(Job.resumeData));
      }).fail(function (x, textStatus, y) {
        console.log('Resume failed to load. Error: ', textStatus);
      });
      
    }
    
    this.initPage();
    
  };
  
  return Job;

}(window, jQuery, Handlebars));