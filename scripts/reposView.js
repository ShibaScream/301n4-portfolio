var reposView = (function() {
  'use strict';

  var repoView = {};

  var render = Handlebars.compile($('#repo-template').html());

  repoView.index = function() {
    var $github = $('#github');

    $github.empty();

    $github.append(
      repos.with('name').map(render)
    );
  };

  return repoView;
})();
