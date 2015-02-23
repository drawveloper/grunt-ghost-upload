# grunt-ghost-upload

Upload a theme to Ghost Pro via the POST API.

## Motivation

Basically, I was tired of the boresome process of uploading a theme to Ghost Pro, where you need to:

- Create a zip
- Open your browser
- Login
- Select the zip in the form
- Press save

Yikes!

So, I did what any programmer tired of repetition does: I automated the process.

This task uses your credentials to login and upload your theme zip.

**DISCLAIMER:** This is a **major hack** and is in no way guaranteed to work for you :)

Once the Ghost API is finished and public, I'll probably rewrite this using it.

## Getting Started
This plugin requires Grunt `0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ghost-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ghost-upload');
```

## Credentials in environment variables

Your credentials in Ghost Pro are expected to be in environment variables `GHOST_USER` and `GHOST_PASS`.

You can export them by issuing the following commands in your terminal:

    export GHOST_USER=myuser@gmail.com
    export GHOST_PASS=mysupersecretpassword


## The "ghost-upload" task

### Overview
In your project's Gruntfile, add a section named `ghost-upload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'ghost-upload': {
    options: {
      userEnv: 'GHOST_USER',
      passEnv: 'GHOST_PASS',
      loginURL: 'https://ghost.org/login/',
      loginFormActionURL: 'https://ghost.org/login/',
      blogsURL: 'https://ghost.org/blogs/',
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
    },
    main: {
      zip: 'build/example.zip',
      blog: 'example'
    },
  },
});
```

### Required properties

#### zip
Type: `String`

The path to your theme's zip file.

#### blog
Type: `String`

The id of your blog in Ghost Pro. It's the string that appears after `blogs/` when you're logged in.

For example, if your URL reads:

    https://ghost.org/blogs/firstdoit/

Then, the blog id is `firstdoit`.

## Using with `grunt-contrib-compress`

You can use [grunt-contrib-compress](https://github.com/gruntjs/grunt-contrib-compress) in tandem with this task to achieve easy deploy of your Ghost theme. You can check a working example at [this Gruntfile](https://github.com/firstdoit/firstdoit.com/blob/39070bb6eff920e7f90d44d4f4c296f0ab483170/Gruntfile.coffee#L100).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-02-22   v0.1.0   Initial release.
