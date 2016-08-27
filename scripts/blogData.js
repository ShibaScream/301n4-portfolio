var blogData = (function ($) {
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
  Article.all = [];

  Article.loadAll = function (data) {

    this.all = data
      .sort(function (a, b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      })
      .map(function (article) {
        return new Article(article);
      });

    console.log(this.all);

  };

  Article.fetchAll = function (callback) {

    if (localStorage.articleData && localStorage.articleData !== 'undefined') {

      this.loadAll(JSON.parse(localStorage.articleData));
      callback();

    } else {

      $.getJSON('../data/articleData.json', function (data) {
        Article.loadAll(data);
        localStorage.setItem('articleData', JSON.stringify(Article.all));
        callback();
      }).fail(function (x, textStatus) {
        console.error('Blog failed to load. Error: ', textStatus);
      });

    }

  };
  // attaching to DOM
  return Article;

}(jQuery));
