var resumeData = (function () {
  'use strict';
  // TO DO: create AJAX call

  function Job(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
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
}());
