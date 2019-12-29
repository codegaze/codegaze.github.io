---
layout: post
title: Working with ES6 in the browser
description: Working with ES6 in the browser. The easy configuration and more advanced with Babelify, Browserify and Watchify.
post_description: The easy configuration and more advanced with Babelify, Browserify and Watchify
categories: [Coding, JS]
---

These are some ways to work with ES6 in the browser. We are going to use [Babel](http://babeljs.io/) 6 as our transpiler and [Gulp](http://gulpjs.com/) as our task runner.

## The playground

If you just want to test some of the new features first we must install the following by:

Creating a package.json and add the `gulp`, `gulp-babel`, `gulp-concat`, `gulp-sourcemaps`, `babel-preset-es2015` dependences in it and execute `npm install`
{% highlight json %}
{
  "devDependencies": {
    "babel-preset-es2015": "^6.3.13",
    "gulp": "^3.9.0",
    "gulp-babel": "^6.1.1",
    "gulp-concat": "^2.6.0",
    "gulp-sourcemaps": "^1.6.0"
  }
}
{% endhighlight %}

or just in our command line

{% highlight javascript %}
npm install --save-dev gulp gulp-babel gulp-sourcemaps gulp-concat babel-preset-es2015
{% endhighlight %}

Some explanation of the plugins:

| ------------------- |:-----------------------------------------:|
| **gulp**                | The task/build runner to glue everything  |
| **babel**               | Transforms our ES6 to ES5*                |
| **gulp-sourcemaps**     | For better Debugging                      |
| **gulp-concat**         | Concatenates files (js for us)            |
| **babel-preset-es2015** | Transforms our ES6 to ES5*                |

*As of version 6 Babel doesn't transpile ES2015 by default.

>Since Babel is focusing on being a platform for JavaScript tooling and not an ES2015 transpiler, we’ve decided to make all of the plugins opt-in. This means when you install Babel it will no longer transpile your ES2015 code by default.

<hr class="post__separator"/>

After we install all our plugins we need to create a gulpfile.js with the following content:

{% highlight javascript %}
const gulp = require('gulp'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps');

gulp.task('babel-js', () => {
  return gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/app.js', ['babel-js']);
});

gulp.task('default', ['babel-js', 'watch' ]);
{% endhighlight %}

<hr class="post__separator"/>

For our html file we just need to add our app.js file to our simple html structure:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ES6 Browser Starter</title>
</head>
<body>

<script src="./dist/app.js"></script>
</body>
</html>
{% endhighlight %}

<hr class="post__separator"/>

Now that all our scripts and files are ready, our directory structure should look like this:

<pre>
    |-- gulpfile.js
    |-- index.html
    |-- package.json
    |-- dist
    |-- src
        |-- app.js
</pre>

We execute ```gulp``` in our terminal and any change in our javascript files will be watched and compiled.

## Let's get serious

That was fun, but if we want to use modules requires a different setup. This time we are going to use [Browserify](http://browserify.org/) to bundle our module. You can check how to do this with [Webpack](https://webpack.github.io/) in a [previous post](http://codegaze.github.io/2015/12/27/create-an-es6-module/).

Like before, we need to install our dependences by creating this package.json:

{% highlight json %}
{
  "devDependencies": {
    "babel-preset-es2015": "^6.3.13",
    "babelify": "^7.2.0",
    "browserify": "^12.0.1",
    "gulp": "^3.9.0",
    "gulp-rename": "^1.2.2",
    "gulp-util": "^3.0.7",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0",
    "watchify": "^3.6.1"
  }
}
{% endhighlight %}

or by command line:

{% highlight javascript %}
npm install --save-dev babel-preset-es2015 babelify browserify gulp gulp-rename gulp-util vinyl-buffer vinyl-source-stream watchify
{% endhighlight %}

What our new gulp plugins do:

| ------------------- |:-----------------------------------------:|
| **babelify**            | Browserify transform for Babel. This will transpile our ES6 code to ES5                         |
| **Browserify**          | Browserify lets you require('modules') in the browser by bundling up all of your dependencies. This will make our modules work in the browser when we 'll transpile our ES6 code to ES5                                                                       |
| **gulp-rename**         | Rename files                                                                                    |
| **gulp-util**           | Utilities for gulp plugins. We are using it here to get a colorful message of successful bundle |
| **vinyl-buffer**        | Transforms our bundle to Gulp stream                                                            |
| **vinyl-source-stream** | Transforms our bundle to Gulp stream                                                            |
| **watchify**            | Watches for updates in our browserify files and recompiles them.                                |

<hr class="post__separator"/>

Our `gulpfile.js`

{% highlight javascript %}
"use strict"

const gulp = require('gulp'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      watchify = require('watchify'),
      rename = require('gulp-rename'),
      gutil = require('gulp-util');


const config = {
        src: './src/app.js',
        dest: './dist/'
      };

let bundle = (bundler) => {
  bundler
    .bundle()
    .pipe(source('bundled-app.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(config.dest))
    .on('end', () => gutil.log(gutil.colors.green('==> Successful Bundle!')));
}

gulp.task('default', () => {

  let bundler = browserify(config.src, {debug: true})
                  .plugin(watchify)
                  .transform(babelify, {presets: ['es2015']});

  bundle(bundler);

  bundler.on('update', () => bundle(bundler));
});

{% endhighlight %}

Let's start from the bottom.

{% highlight javascript %}
  let bundler = browserify(config.src, {debug: true})
                  .plugin(watchify)
                  .transform(babelify, {presets: ['es2015']});
{% endhighlight %}

Our default task is creating a bundler variable with a browserify object. Takes two parameters, one is our source file and the second one is to return inline sourcemaps in our `bundle.js` file. Then adds the watchify plugin and transforms it with babelify to ES5 code.

{% highlight javascript %}
  bundle(bundler);

  bundler.on('update', () => bundle(bundler));
{% endhighlight %}

This part of code calls the bundle function for the first time and adds the `on update` event to recall it when our source code changes.

{% highlight javascript %}

let bundle = (bundler) => {
  bundler
    .bundle()
    .pipe(source('bundled-app.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(config.dest))
    .on('end', () => gutil.log(gutil.colors.green('==> Successful Bundle!')));
}
{% endhighlight %}

The ```bundle``` function bundles our code and puts the result in our destination folder.

<hr class="post__separator"/>

For this example we are going to create one more js file to test our module works.

**Important:** Remember to put './' in front of the import folder. I lost a lot of time because I forgot to.

{% highlight javascript %}

  //---- ./app.js

  import {y} from './libs/simpleModule';
  y();

  //---- ./libs/simpleModule.js
  export function y() {
    console.log('This is a Module!');
  }

{% endhighlight %}

<hr class="post__separator"/>
For this html file we are going to change our app.js from our previous example with the bundle.js.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ES6 Browser Modules</title>
</head>
<body>

<script src="./dist/bundle.js"></script>
</body>
</html>
{% endhighlight %}
<hr class="post__separator"/>
And our folder structure must be something like this right now.
<pre>
    |-- gulpfile.js
    |-- index.html
    |-- package.json
    |-- dist
    |-- src
        |-- app.js
        |-- libs
            |-- simpleModule.js
</pre>

Just execute ```gulp``` in your terminal and any change in your javascript files will be watched and compiled. If everything went well you should be able to see the '==> Successful Bundle!' message.

<style>
  table tr td:first-child {
    width: 30%;
  }
  .post__separator {
    border: 0;
    margin: 0;
    color: #E4E4E4;
  }
  .post__separator:before {
    content: '•••';
    margin: 0 45%;
    font-size: 2em;
  }
</style>
