(function() {
  var cheerio, fs, querystring, request;

  cheerio = require('cheerio');

  querystring = require('querystring');

  fs = require('fs');

  request = require('request-promise');

  request = request.defaults({
    jar: true
  });

  module.exports = function(options) {
    return {
      checkRequiredProperties: function(data, exists) {
        if (!data.zip) {
          throw new Error('zip property with path to template is required.');
        }
        if (!exists(data.zip)) {
          throw new Error("path " + data.zip + " apparently doesn\'t exist.");
        }
        if (!data.blog) {
          throw new Error('blog property is required.');
        }
      },
      fetchLoginPage: function() {
        var requestOptions;
        requestOptions = {
          url: options.loginURL,
          resolveWithFullResponse: true,
          headers: {
            'user-agent': options.userAgent
          }
        };
        return request(requestOptions);
      },
      getLoginFormData: function(response) {
        var $, formData;
        formData = {};
        $ = cheerio.load(response.body);
        formData['utf'] = '✓';
        formData['authenticity_token'] = $("input[name='authenticity_token']").val();
        return formData;
      },
      postCredentials: function(formData) {
        var body, requestOptions;
        formData['username'] = process.env[options.userEnv];
        formData['password'] = process.env[options.passEnv];
        body = querystring.stringify(formData);
        requestOptions = {
          resolveWithFullResponse: true,
          followAllRedirects: true,
          uri: options.loginFormActionURL,
          method: 'POST',
          body: body,
          headers: {
            'user-agent': options.userAgent,
            'origin': 'https://ghost.org',
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': body.length
          }
        };
        return request(requestOptions);
      },
      fetchBlogEditPage: function() {
        var requestOptions;
        requestOptions = {
          uri: options.blogsURL + options.blog + '/',
          resolveWithFullResponse: true,
          headers: {
            'user-agent': options.userAgent
          }
        };
        return request(requestOptions);
      },
      getEditFormData: function(response) {
        var $, formData;
        formData = {};
        $ = cheerio.load(response.body);
        formData['utf'] = '✓';
        formData['authenticity_token'] = $("input[name='authenticity_token']").val();
        formData['_method'] = $("input[name='_method']").val();
        formData['name'] = $("input[name='name']").val();
        formData['subdomain'] = $("input[name='subdomain']").val();
        formData['external_domain'] = $("input[name='external_domain']").val();
        return formData;
      },
      uploadTheme: function(formData) {
        var requestOptions;
        formData['custom_theme'] = fs.createReadStream(options.zip);
        requestOptions = {
          resolveWithFullResponse: true,
          followAllRedirects: true,
          uri: options.blogsURL + options.blog + '/',
          method: 'POST',
          formData: formData,
          headers: {
            'user-agent': options.userAgent,
            'origin': 'https://ghost.org'
          }
        };
        return request(requestOptions);
      },
      getResult: function(response) {
        var $;
        $ = cheerio.load(response.body);
        return $('.notification-notice').text();
      }
    };
  };

}).call(this);
