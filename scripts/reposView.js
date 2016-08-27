var reposView = (function($, repos) {
  'use strict';

  var repoView = {};

  var ui = function() {
    // Best practice: Cache the DOM query if it's used more than once.
    var $github = $('#github');

    $github.find('*').empty();
    $github.show().siblings().hide();
  };

  // Set up a new compile method to help render our repos.
  var render = Handlebars.compile($('#repo-template').html());

  repoView.index = function() {
    // ui();

    $('#github').append(
      repos.with('name').map(render)
    );
  };

  return repoView;
})(jQuery, repos);
