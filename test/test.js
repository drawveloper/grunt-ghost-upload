var grunt = require('grunt');
var getSteps = require('../tasks/lib/steps');
var options = {
  userEnv: 'GHOST_USER',
  passEnv: 'GHOST_PASS',
  loginURL: 'https://ghost.org/login/',
  loginFormActionURL: 'https://ghost.org/login/',
  blogsURL: 'https://ghost.org/blogs/',
  userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
};

exports.nodeunit = {
  please_fail: function (test) {
    grunt.util.spawn({
      grunt: true,
      args: ['ghost-upload:noZip']
    }, function (err, result, code) {
      test.notEqual(null, err);
      test.done();
    });
  },
  loginFormData: function (test) {
    var page = grunt.file.read('./test/login.html');
    var steps = getSteps(options);
    var formData = steps.getLoginFormData({body: page});
    test.equal("6bL0lthWLqI4+oc4sZuIaY5ZagrwFjfU/BvjW/TOBOA=", formData['authenticity_token']);
    test.done()
  },
  editFormData: function (test) {
    var page = grunt.file.read('./test/edit.html');
    var steps = getSteps(options);
    var formData = steps.getEditFormData({body: page});
    test.equal("LKdb4MFixKel5A/tqd6MFO75LyXPD5ms9TYMb03OdP0=", formData['authenticity_token']);
    test.equal("patch", formData['_method']);
    test.equal("Example", formData['name']);
    test.equal("example", formData['subdomain']);
    test.equal("example.com", formData['external_domain']);
    test.done()
  }
};
