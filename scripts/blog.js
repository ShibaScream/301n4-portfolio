var blog = (function (window, $, Handlebars) {
  'use strict';

  // Article constructor - for loading JSON data into article objects
  function Article(opts) {
    this.title = opts.title;
    this.language = opts.language;
    this.category = opts.category;
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.publishedOn = opts.publishedOn;
    this.body = opts.body;
  }

  // moving the articles variable out of the global namespace
  Article.articleData = [];

  Article.loadAll = function (data) {

    this.articleData = data.sort(function (a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function (article) {
      return new Article(article);
    });
    
  };
  

  Article.prototype.toHTML = function () {

    var templateScript = $('#portfolioTemplate').html(),
      theTemplate = Handlebars.compile(templateScript);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return theTemplate(this);

  };
  

  Article.setTeasers = function () {
    
    // Hide elements beyond the first 2 in any article body.
    $('.article-body *:nth-of-type(n+2)').hide();

    $('#projects').on('click', 'a.read-on', function (e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
      $(this).parent().find('a.read-less').show();
    });

    $('#projects').on('click', 'a.read-less', function (e) {
      e.preventDefault();
      $('.article-body *:nth-of-type(n+2)').hide();
      $(this).hide();
      $(this).parent().find('a.read-on').show();
    });
    
  };

  
  Article.initPage = function () {
    
    this.articleData.forEach(function (article) {
      $('#projects').append(article.toHTML());
    });
    
    this.setTeasers();
    
  };
  
  
    
  Article.fetchAll = function () {
    
    if (localStorage.articleData) {
      
      this.loadAll(JSON.parse(localStorage.articleData));
      
    } else {
      
      $.getJSON('../data/articleData.json', function (data) {
        Article.loadAll(data);
        localStorage.setItem('articleData', JSON.stringify(Article.articleData));
      }).fail(function (x, textStatus, y) {
        console.log('Blog failed to load. Error: ', textStatus);
      });
      
    }
    
    this.initPage();
    
  };
  
  // attaching to DOM
  return Article;

}(window, jQuery, Handlebars));