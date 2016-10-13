page('/', indexController.show);
page('/projects', blogController.loadAll, blogController.show);
page('/resume', resumeController.loadAll, resumeController.show);
page('/contact', contactController.show);

// TO DO: Add an actual error page
page('*', function () {
  console.error('This should be a 404 Error Page');
});

page();
