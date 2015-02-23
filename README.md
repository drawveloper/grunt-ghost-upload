# grunt-ghost-upload

Upload a theme to Ghost Pro via the POST API.

## Motivation

Basically, I was tired of the boresome process of uploading a theme to Ghost Pro.

You need to

- Create a zip
- Open your browser
- Login
- Select the zip in the form
- Press save

Yikes!

So, I did what any programmer tired of repetition does: I automated the process.
This task uses your credentials to login and upload your theme.

Your credentials are expected to be in environment variables `GHOST_USER` and `GHOST_PASS`.

Then, simply configure this task with the `zip` (path to your theme's zip) and `blog` (your blog id in Ghost Pro) properties and you're good to go.

**DISCLAIMER:** This is a **major hack** and is in no way guaranteed to work for you :)
Once the Ghost API is finished and public, I'll probably rewrite this using it.

## Getting Started
This plugin requires Grunt `{%= grunt_version %}`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ghost-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ghost-upload');
```

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-02-22   v0.1.0   Initial release.
