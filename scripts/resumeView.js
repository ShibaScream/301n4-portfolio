var jobs = [];

function Job(opts) {
  this.title = opts.title;
  this.company = opts.company;
  this.companyURL = opts.companyURL;
  this.companyLogo = opts.companyLogo;
  this.dateFrom = opts.dateFrom;
  this.dateTo = opts.dateTo;
  this.description = opts.description;
}

Job.prototype.toHtml = function () {
  
  var templateScript = $('#resumeTemplate').html(),
      theTemplate = Handlebars.compile(templateScript);
  
  return theTemplate(this);
  
};

rawResumeItems.sort(function (a, b) {
  return (new Date(b.dateFrom)) - (new Date(a.dateFrom));
});

rawResumeItems.forEach(function (item) {
  jobs.push(new Job(item));
});

jobs.forEach(function (job) {
  $('#resume').append(job.toHtml());
});