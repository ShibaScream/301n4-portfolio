(function (window, $) {
  'use strict';

  // TO DO: create AJAX call
  
  // INIT OBJECTS
  var menuView = {}, articleView = {};
  
  // INIT THE MENUS

  menuView.handleMenu = function () {
    var $menu = $('#menu'), $sections = $('.section-view');

    $menu.on('click', 'li', function () {
      $sections.hide();
      $('#' + $(this).data('section')).show();
    });

    $('#menu li:first').click();
  };

  menuView.toggleMobileMenu  = function () {
    $('#mobilemenu').on('click', function () {
      $('#menu ul').fadeToggle('fast');
    });
  };

  menuView.hideMobileMenu = function () {
    $('#menu ul').fadeOut('fast');
  };

  menuView.goHome = function () {
    $('#drplogo').on('click', function () {
      $('#menu li:first').click();
    });

    $('#homeheader').on('click', function () {
      $('#menu li:first').click();
    });
  };

  /*****
    credit to https://www.fourfront.us/blog/jquery-window-width-and-media-queries
    found way to check if in mobile version of site
    only then, attach event listener to main so if a user clicks it hides menu
    consider adding underscore.js library and __debounce method to hold off on firing
    function until resize is completed 
  *****/
  menuView.checkSize = function () {
    if ($('#mobilemenu').css("display") === "block") {
      $('main').on('click', menuView.hideMobileMenu);
    } else {
      $('main').off('click', menuView.hideMobileMenu);
    }
  };

  $(document).ready(function () {
    menuView.handleMenu();
    menuView.goHome();
    menuView.toggleMobileMenu();
    // fire the first time
    menuView.checkSize();
    // check again on resize, using debounce to avoid multiple firings
    $(window).resize(_.debounce(menuView.checkSize, 500));
  });

  
  // attach to window dom
  window.menuView = menuView;

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

  Article.prototype.toHtml = function () {

    var templateScript = $('#portfolioTemplate').html(),
        theTemplate = Handlebars.compile(templateScript);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return theTemplate(this);

  };

  articleView.setTeasers = function () {
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

  // LOAD ARTICLES FROM RAW DATA
  rawArticles.sort(function (a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawArticles.forEach(function (article) {
    Article.articleData.push(new Article(article));
  });

  // APPEND ARTICLES TO DOM AFTER APPLYING HANDLEBARS TEMPLATE
  Article.articleData.forEach(function (article) {
    $('#projects').append(article.toHtml());
  });

  // HIDE BODY OF ARTICLES EXCEPT FOR TEASER
  articleView.setTeasers();
  
  function Job(opts) {
    this.title = opts.title;
    this.company = opts.company;
    this.companyURL = opts.companyURL;
    this.companyLogo = opts.companyLogo;
    this.dateFrom = opts.dateFrom;
    this.dateTo = opts.dateTo;
    this.description = opts.description;
  }

  // moving this out of global namespace
  Job.resumeData = [];

  Job.prototype.toHtml = function () {

    var templateScript = $('#resumeTemplate').html(),
        theTemplate = Handlebars.compile(templateScript);

    return theTemplate(this);

  };
  
  Job.loadAll = function (rawResumeItems) {
    
    this.resumeData = rawResumeItems
      .sort(function (a, b) {
        return (new Date(b.dateFrom)) - (new Date(a.dateFrom));
      })
      .map(function (item) {
        return new Job(item);
      });
    
  };
  
  Job.fetchAll = function () {};

})(window, jQuery);