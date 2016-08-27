var resumeData = (function ($, Handlebars) {
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

  Job.all = [];

  Job.loadAll = function (data) {

    this.all = data
      .sort(function (a, b) {
        return (new Date(b.dateFrom)) - (new Date(a.dateFrom));
      })
      .map(function (item) {
        return new Job(item);
      });

  };

  Job.fetchAll = function (callback) {

    if (localStorage.resumeData && localStorage.resumeData !== 'undefined') {

      this.loadAll(JSON.parse(localStorage.resumeData));
      callback();

    } else {

      $.getJSON('../data/resumeData.json', function (data) {
        Job.loadAll(data);
        localStorage.setItem('resumeData', JSON.stringify(Job.all));
        callback();
      }).fail(function (x, textStatus, y) {
        console.error('Resume failed to load. Error: ', textStatus);
      });

    }

  };

  return Job;

}(jQuery, Handlebars));
