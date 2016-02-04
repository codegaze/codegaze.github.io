---
layout: post
title: Upgrading Jekyll 2.x to 3.x
keywords: Jekyll, Github Pages, static, codegaze
description: Upgrading Jekyll 2.x to 3.x and some error solving
post_description: And some error solving.
keywords: JEKYLL,GITHUB PAGES
---

At February 1st Github [announced](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0) the upgrade of Jekyll from 2.4 to 3.0 for Guthub Pages. I thought this was the time to upgrade my local setup to the new version. I 've tried it some time ago but got some error and was too tired to debug anything, but now I had no choice.

Jekyll has a [guide](http://jekyllrb.com/docs/upgrading/2-to-3/) for upgrading but it wasn't enough for me. I ran ```gem update jekyll``` and tried to start my site with ```jekyll serve``` as always but I got the following errors.

### Error Message #1
>Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file.</b>

That was easy, I just removed the ```paginate:``` setting from my _config.yml. I got no pagination so this was easier for me. If you have pagination in your site then you need to install the ```jekyll-paginate``` gem.

### Error Message #2
>Dependency Error: Yikes! It looks like you don't have kramdown or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- kramdown' If you run into trouble, you can find helpful resources at 
http://jekyllrb.com/help/!jekyll 3.1.1  Error:  kramdown

This was a litle bit more complicated than I thought it would be. 

At first I installed the kramdown gem but it kept returning me the same error message. The solution was to uninstall the old Jekyll verions with ```gem uninstall Jekyll```.
<hr class="post__separator"/>
After doing this I got one more error:

### Error Message #3

>Bundler could not find compatible versions for gem "jekyll": (Bundler::VersionConflict) In Gemfile: github-pages x64-mingw32 was resolved to 34, which depends on jekyll (= 2.4.0) x64-mingw32

I removed a Gemfile file I had in my folder and that worked for me.
<hr class="post__separator"/>

If you have any more errors with your upgrade feel free to contact me to add them here!



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
  </style>