var articles = [];

var articleView = {};

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

articleView.setTeasers = function() {
  // Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#projects').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
    $(this).parent().find('a.read-less').show();
  });
  
  $('#projects').on('click', 'a.read-less', function(e) {
    e.preventDefault();
    $('.article-body *:nth-of-type(n+2)').hide();
    $(this).hide();
    $(this).parent().find('a.read-on').show();
  });
};

// LOAD ARTICLES FROM RAW DATA
rawArticles.sort(function (a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawArticles.forEach(function (article) {
  articles.push(new Article(article));
});

// APPEND ARTICLES TO DOM AFTER APPLYING HANDLEBARS TEMPLATE
articles.forEach(function (article) {
  $('#projects').append(article.toHtml());
});

// HIDE BODY OF ARTICLES EXCEPT FOR TEASER
articleView.setTeasers();

