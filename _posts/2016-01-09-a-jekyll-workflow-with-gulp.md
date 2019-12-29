---
layout: post
title: Jekyll workflow with Gulp
description: Jekyll workflow with Gulp
post_description: It's never too late.
categories: [Jekyll, Coding]
---

## Introduction

This weekend I decided to take this blog's design and create a theme. Of course it's not ready yet, because in the process of refactoring the SASS code I came across a problem. I 'm using flexbox but I didn't have prefixes! It's not the end of the world but this led to the fact that because of the github pages limitations I 'm limiting my workflow too. This is a problem.

## Gulp to the rescue

So, we are going to include Gulp and some plugins to make our lives easier.

This process has two parts. The first one is the Jekyll's _config.yml configuration and the creation of a new folder we are going to have our development files, and our gulpfile.js configuration/setup.

### Part I: Jekyll

Let's add some configuration to _config.yml.

{% highlight yaml %}

  exclude: ["_dev",
            "gulpfile.js",
            "node_modules",
            "package.json"]

{% endhighlight %}

```exclude``` is a configuration setting variable in Jekyll's core to exlude paths or files from the site's conversion. (aka _site folder).

>Exclude directories and/or files from the conversion. These exclusions are relative to the site's source directory and cannot be outside the source directory.

So, we don't want these files in our production site. I think it's pretty straightforward what we did here, but what you are goin to say is **'What the f*uck is the _dev folder?'** and you 'll be right. The _dev folder is going to be the folder to keep our sass,js...(and whatever you want) source files which we don't want to be visible to the website.

Our project folder should be like this. The partials folder isn't mandatory, it's the way I structure my sass code. (if you feel comfortable tweaking the gulpfile.js you can work with any structure you want :) ):

<pre>
|-- project
    |-- gulpfile.js
    |-- index.html
    |-- package.json
    |-- _config.yml
    |-- assets
    |   |-- css
    |   |   |-- style.css
    |   |-- img
    |   |-- js
    |-- _dev
    |   |-- src
    |       |-- sass
    |           |-- style.scss
    |           |-- partials
    |               |-- _base.scss
    |               |-- _functions.scss
    |               |-- _grid.scss
    |               |-- _layout.scss
    |               |-- _reset.scss
    |               |-- _syntax.scss
    |               |-- _variables.scss
    |-- _includes
    |-- _layouts
    |-- _posts
    |-- _site
</pre>

And that's all we need to do for the Jekyll part.

### Part II: Gulp

Now, let's install all the things!

You can copy paste this to a package.json file

{% highlight json %}
{
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-connect": "^2.3.1",
    "gulp-clean-css": "^2.0.13",
    "gulp-plumber": "^1.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.1.1",
    "gulp-util": "^3.0.7"
  }
}
{% endhighlight %}

and install by typing in your terminal

{% highlight javascript %}
npm install
{% endhighlight %}

or create an empty package.json by typing

{% highlight javascript %}
npm init
{% endhighlight %}

and follow the instructions to create a package.json file.

And then install by

{% highlight javascript %}
npm install --save-dev gulp gulp-sass gulp-util gulp-plumber gulp-rename gulp-clean-css gulp-autoprefixer gulp-connect
{% endhighlight %}

<hr class="post__separator"/>

Now we have our dependences let's build our gulpfile.js.

{% highlight javascript %}

// Require all the things
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      gutil = require('gulp-util'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      minifyCSS = require('gulp-clean-css'),
      prefixer = require('gulp-autoprefixer'),
      connect = require('gulp-connect');
      cp = require('child_process');

// Set the path variables
const base_path = './',
      src = base_path + '_dev/src',
      dist = base_path + 'assets',
      paths = {
          js: src + '/js/*.js',
          scss: [ src +'/sass/*.scss',
                  src +'/sass/**/* .scss',
                  src +'/sass/**/**/*.scss'],
          jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*']
      };


// Compile sass to css
gulp.task('compile-sass', () => {
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
        gutil.log(gutil.colors.red(error.message));
        gulp.task('compile-sass').emit('end');
    }))
    .pipe(sass())
    .pipe(prefixer('last 3 versions', 'ie 9'))
    .pipe(minifyCSS())
    .pipe(rename({dirname: dist + '/css'}))
    .pipe(gulp.dest('./'));
});

// Rebuild Jekyll
gulp.task('build-jekyll', (code) => {
  return cp.spawn('jekyll', ['build', '--incremental'], { stdio: 'inherit' }) // Adding incremental reduces build time.
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code);
})

// Setup Server
gulp.task('server', () => {
  connect.server({
    root: ['_site'],
    port: 4000
  });
})

// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.jekyll, ['build-jekyll']);
});

// Start Everything with the default task
gulp.task('default', [ 'compile-sass', 'build-jekyll', 'server', 'watch' ]);

{% endhighlight %}

**Important For Windows users:** You need to replace in the build-jekyll task the 'jekyll' string with the path of your jekyll.bat. In my case it was in the `C:\Ruby22-x64\bin` so I changed this code to:

**2016/11/20 Update:** As [Ron Dyar](https://talk.jekyllrb.com/t/jekyll-workflow-with-gulp-tutorial/1752/2?u=codegaze) commented, in some Windows OS cases a jekyll.bat is enough, without the path. You can try both and see which one works for you.

{% highlight javascript %}

// Rebuild Jekyll
gulp.task('build-jekyll', (code) => {
  return cp.spawn('C:\\your_ruby_path\\bin\\jekyll.bat', ['build'], {stdio: 'inherit'})
    .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', code)
})
{% endhighlight %}

**2016/01/10 Update:** [Alex Lockwood](http://disq.us/p/1ds1bx6) was kind enough to create a [gist](https://gist.github.com/alexjlockwood/9a4201b5a4b47c3f1c3de69dde4e8ece) for older npm versions on which ES6 features cause errors.

**2017/02/11 Update:** A user's comment I cannot find requested to update the ruby path with a newer version. So, in the `your_ruby_path` you need to set your ruby path. For example, mine was `Ruby22-x64` at the time.

<div class="important">
Now, if you don't care to know how this works or why, just copy/paste all these we talked about, and when you are ready just execute in your terminal <code>gulp</code> and you can go to <code>http://localhost:4000</code> and see your site. All changes will be watched and compiled.
</div>

<hr class="post__separator"/>


What our gulpfile does:

* Builds Jekyll
* Minifies/compiles/autoprefixes SASS
* Sets up a local server
* Watches our source files(Jekyll's and static assets) and recompile when changes on update.

**Let's see what each plugin does for our case:**

**gulp:** You know what this does!

**gulp-sass:** Takes our sass files and compiles them to css.

**gulp-util/gulp-plumber:** Some gulp utilities to catch and report errors. For some reason the gulp-sass plugin stops gulp on error and we have to start it again, so with these two we can prevent that.

**gulp-rename:** Renames our CSS files because if we didn't we would get a file like this `/assets/css/src/css/style.css`.

**gulp-~~minify~~clean-css:** Simple!

**gulp-autoprefixer:** What started all this! This prefixes our css. There are some great options for this plugin, be sure to check them out! [Github](https://github.com/postcss/autoprefixer)

**gulp-connect:** Setups a local web server to preview our site. It's inevitable because we can't use `jekyll serve` like we did before.

**child_process:** This is not a plugin. This is a Node.js core module. We are using this because (very roughly) Gulp is running in one process and we need to run the `jekyll build` process at the same time, we cannot stop Gulp. So we are 'attaching' the jekyll command to a child process that returns that everything went fine when it finishes. I want to see this in depth but I got carried away with the Windows problem I warned you before.

<hr class="post__separator"/>

That's it! As I said before just run `gulp` and work with your masterpiece!

## Conclusion

Having this workflow might be strange at the beginning but it will help you, I promise. I didn't include the js files manipulation on purpose so that you can do some tests. But it will be available to the theme workflow I am working right now. Stay tuned!

If you have and questions or comments don't hesitate to contact me here or at my [twitter](https://twitter.com/codegaze) account.

Cheers!

<style>

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
  .important {
    border-top: 3px solid #000;
    border-bottom: 3px solid #000;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
