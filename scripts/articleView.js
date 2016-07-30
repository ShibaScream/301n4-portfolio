var articles = [];

function Article(opts) {
  this.title = opts.title;
  this.language = opts.language;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function () {
  
  var templateScript = $('#portfolioTemplate').html(),
      theTemplate = Handlebars.compile(templateScript);
  
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  
  return theTemplate(this);
  
};

rawArticles.sort(function (a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawArticles.forEach(function (article) {
  articles.push(new Article(article));
});

articles.forEach(function (article) {
  $('#projects').append(article.toHtml());
});