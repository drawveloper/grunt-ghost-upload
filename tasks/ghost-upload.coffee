getSteps = require('./lib/steps')
module.exports = (grunt) ->
  options =
    userEnv: 'GHOST_USER'
    passEnv: 'GHOST_PASS'
    loginURL: 'https://ghost.org/login/'
    loginFormActionURL: 'https://ghost.org/login/'
    blogsURL: 'https://ghost.org/blogs/'
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36
          (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"

  grunt.registerMultiTask 'ghost-upload', ->
    done = @async()
    options = @options(options)
    steps = getSteps(options)

    steps.checkRequiredProperties(@data, grunt.file.exists)
    options.zip = @data.zip
    options.blog = @data.blog

    steps.fetchLoginPage()
      .then(steps.getLoginFormData)
      .tap(-> grunt.log.writeln('Authenticating'))
      .then(steps.postCredentials)
      .tap(-> grunt.log.writeln('Authentication successful'))
      .then(steps.fetchBlogEditPage)
      .then(steps.getEditFormData)
      .tap(-> grunt.log.writeln('Starting theme upload'))
      .then(steps.uploadTheme)
      .then(steps.getResult)
      .then((notification) ->
        grunt.log.writeln notification
        done())
      .catch (err) ->
        grunt.log.error JSON.stringify err
        done err
