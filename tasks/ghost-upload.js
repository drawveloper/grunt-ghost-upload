(function() {
  var getSteps;

  getSteps = require('./lib/steps');

  module.exports = function(grunt) {
    var options;
    options = {
      userEnv: 'GHOST_USER',
      passEnv: 'GHOST_PASS',
      loginURL: 'https://ghost.org/login/',
      loginFormActionURL: 'https://ghost.org/login/',
      blogsURL: 'https://ghost.org/blogs/',
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
    };
    return grunt.registerMultiTask('ghost-upload', function() {
      var done, steps;
      done = this.async();
      options = this.options(options);
      steps = getSteps(options);
      steps.checkRequiredProperties(this.data, grunt.file.exists);
      options.zip = this.data.zip;
      options.blog = this.data.blog;
      return steps.fetchLoginPage().then(steps.getLoginFormData).tap(function() {
        return grunt.log.writeln('Authenticating');
      }).then(steps.postCredentials).tap(function() {
        return grunt.log.writeln('Authentication successful');
      }).then(steps.fetchBlogEditPage).then(steps.getEditFormData).tap(function() {
        return grunt.log.writeln('Starting theme upload');
      }).then(steps.uploadTheme).then(steps.getResult).then(function(notification) {
        grunt.log.writeln(notification);
        return done();
      })["catch"](function(err) {
        grunt.log.error(JSON.stringify(err));
        return done(err);
      });
    });
  };

}).call(this);
