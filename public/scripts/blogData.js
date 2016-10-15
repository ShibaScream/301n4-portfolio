var blogData = (function () {
  'use strict';

  // Article constructor - for loading JSON data into article objects
  function Article(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
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

}());
