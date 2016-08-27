page('/', indexController.show);
page('/projects', blogController.show);
page('/resume', resumeController.show);
page('/contact', contactController.show);

// TO DO: Add an actual error page
page('*', function () {
  console.log('This should be a 404 Error Page');
});

page();