module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')
  config =
    coffee:
      main:
        files:
          'tasks/ghost-upload.js': 'tasks/ghost-upload.coffee'
          'tasks/lib/steps.js': 'tasks/lib/steps.coffee'

    coffeelint:
      options:
        "camel_case_classes": true,
        "indentation": 2,
        "line_endings": "linux",
        "no_empty_param_list": true,
        "no_implicit_braces": true,
        "no_stand_alone_at": true,
        "no_tabs": true,
        "no_trailing_semicolons": true,
        "no_trailing_whitespace": true,
        "space_operators": true
      main:
        src: ['tasks/**/*.coffee']

    watch:
      coffee:
        files: ['tasks/**/*.coffee']
        tasks: ['coffeelint', 'coffee']
      grunt:
        files: ['Gruntfile.coffee']

    'ghost-upload':
      main:
        zip: 'build/example.zip'
        blog: 'example'
      noZip: {}

    nodeunit:
      all: ['test/*.js']

  tasks =
    # Building block tasks
    build: ['coffeelint', 'coffee']
    test: ['build', 'nodeunit']
    # Development tasks
    default: ['build', 'watch']
    # Deploy
    deploy: ['ghost-upload']

  # Project configuration.
  grunt.initConfig config
  grunt.loadTasks('tasks')
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'
  grunt.registerTask taskName, taskArray for taskName, taskArray of tasks
