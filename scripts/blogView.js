var blogView = (function ($, Handlebars, hljs, blogData) {
  'use strict';
  
  var view = {
    templateScript: $('#portfolioTemplate').html(),
    theTemplate: null
  };

  view.setTeasers = function () {
    
    // Hide elements beyond the first 2 in any article body.
    $('.article-body *:nth-of-type(n+2)').hide();

    var $projects = $('#projects');

    $projects.on('click', 'a.read-on', function (e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
      $(this).parent().find('a.read-less').show();
    });

    $projects.on('click', 'a.read-less', function (e) {
      e.preventDefault();
      $('.article-body *:nth-of-type(n+2)').hide();
      $(this).hide();
      $(this).parent().find('a.read-on').show();
    });
    
  };
  
  view.toHTML = function (article) {
    
    // where should this logic exists? Seems incorrect to have it in view
    article.daysAgo = parseInt((new Date() - new Date(article.publishedOn)) / 60 / 60 / 24 / 1000, 10);
    article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';

    this.theTemplate = Handlebars.compile(view.templateScript);
    
    return this.theTemplate(article);

  };

  
  view.initPage = function () {
    
    blogData.all.forEach(function (article) {
      $('#projects').append(view.toHTML(article));
    });
    
    this.setTeasers();
    
    hljs.initHighlightingOnLoad();
    
  };
  
  return view;
  
}(jQuery, Handlebars, hljs, blogData));