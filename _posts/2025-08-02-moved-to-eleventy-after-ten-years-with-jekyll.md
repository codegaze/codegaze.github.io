---
layout: post
title: Moved to Eleventy After Ten Years With Jekyll
description: Things are looking good with Eleventy
categories: ["Jekyll", "Eleventy", "Coding"]
---

Based on the git log, it’s been about six or seven months since I moved this blog over to Eleventy. I did take notes at the time and even started drafting a post about it, but then life happened. Things shifted, priorities changed, and that early draft is probably lost for good now.

So instead, I’m writing this from memory. I’ll try to cover what I did and why, though I can only recall one specific citation. The rest? Let's make some assumptions. 😄

For years, this blog was powered by Jekyll, using GitHub Pages - all provided by the good people of Github - which meant I could push to the main branch and the whole thing would build and deploy on its own.

Setup details, more or less:

- Jekyll handled Sass preprocessing from some very old CSS files I wrote at the start of this blog.
- There was also some magic JavaScript bundling, cobbled together from a guide I [created](https://codegazerants.com/2016/01/09/a-jekyll-workflow-with-gulp/) nine years ago and never touched it again.
- It all just worked, until it didn’t.

## The Reason for Change

Jekyll itself wasn’t the problem. I liked it. Still do. But Ruby on a Mac can be a headache, especially when you don’t live in that ecosystem.

My old Mac? Jekyll ran fine. Why? No idea. Some mix of good luck and forgotten installs. But when I tried to get it running on a new machine, everything broke. I believe the last time I tried, I didn't manage to make it work even after a few hours, and I do like things simple.

I wanted a setup that didn't argue with me. It was time for a change!

## The Plan

I knew I had to solve a few things quickly:

- Find a Jekyll alternative that could preserve my URL structure.
- Migrate all existing posts and templates.
- Set up a build pipeline to deploy automatically through GitHub Pages.
- Do it fast. If it took more than an afternoon or two, I'd probably abandon it and never come back. I had done something similar in the past, but as soon as I managed to make something work I lost my interest.

## The Candidates

I started with Next.js. I'd been messing with it recently, so it felt like a natural first option. I got most of the migration done before realizing it was overkill. Too many moving parts. The URLs didn't work as I wanted. Everything felt heavier than it needed to be, especially for a blog.

So I looked elsewhere. Enter Eleventy.

I’d had my eye on 11ty for a while but never used it seriously. One of the downsides of Eleventy is the documentation. At that time at least, it was more of a reference than documentation, so it was... okay. But there were enough blog posts and migration guides to piece things together and don't get me wrong, the people at 11ty are trying their best.

Now that I'm thinking about it, why wasn't I using ChatGPT during all this?

After a one or two afternoons of reading and tinkering during a weekend, the blog was up and running again at least locally!

## Eleventy Configuration

Most of Eleventy’s logic lives in `eleventy.config.js`. You can break things out more if you want, and structure it as any JS library, but this setup was enough for me. I also added two config files in, `_posts` and `_data`.

Here’s where I defined the preprocessing behavior, added collections, and plugged in a few filters. For CSS, I went with PostCSS and some basic plugins:

```js
eleventyConfig.on("eleventy.before", async () => {
  const cssSourceFile = "./assets/css/index.css";
  const cssDestinationFile = "./_site/index.css";

  fs.readFile(cssSourceFile, (err, css) => {
    postcss([postcssImport, postNested, autoprefixer, cssnano])
      .process(css, { from: cssSourceFile, to: cssDestinationFile })
      .then((result) => {
        console.log("Writing CSS to _site");
        fs.writeFile(cssDestinationFile, result.css, () => true);
      });
  });

  eleventyConfig.addWatchTarget("./assets/css/");
});
```

For collections, I added one for posts and another for categories:

```js
eleventyConfig.addCollection("posts", (collectionApi) => {
  return collectionApi.getFilteredByGlob(["_posts/*"]).reverse();
});

eleventyConfig.addCollection("postsByCategory", (collectionApi) => {
  const posts = collectionApi.getFilteredByGlob(["_posts/*"]).reverse();
  const categoriesMap = {};

  posts.forEach((post) => {
    const categories = post.data.categories || [];
    categories.forEach((category) => {
      if (!categoriesMap[category]) {
        categoriesMap[category] = [];
      }
      categoriesMap[category].push(post);
    });
  });

  return Object.entries(categoriesMap).map(([category, posts]) => ({
    category,
    posts,
  }));
});
```

To replicate Jekyll’s `excerpt` filter, I added this:

```js
eleventyConfig.addLiquidFilter("excerpt", function (input) {
  if (!input) return "";
  const separator = "</p>";
  return input
    .split(separator)[0]
    .replace(/<script.*?<\/script>/gs, "")
    .replace(/<!--.*?-->/gs, "")
    .replace(/<style.*?<\/style>/gs, "")
    .replace(/<.*?>/gs, "");
});
```

You can check this file on [Github](https://github.com/codegaze/codegaze.github.io/blob/master/eleventy.config.cjs) of course for all the contents!

As mentioned, I also added:

- [`site.js`](https://github.com/codegaze/codegaze.github.io/blob/master/_data/site.js) for shared variables.
- [`_posts.json`](https://github.com/codegaze/codegaze.github.io/blob/master/_posts/_posts.json) to keep paths consistent with Jekyll.

## Non-Mandatory Updates

During the migration process I made some other updates that really simplified things:

- Removed all old JS build steps and ended up with just seven dependencies. Five are for CSS. Two are Eleventy itself.
- Simplified the CSS setup. Sass was overkill. I switched to native CSS variables, kept nesting via PostCSS, and stuck with BEM. Everything stayed in separate files, which keeps me happy.

No big flashy features here, but it felt good to clean house. Small dopamine dose!

## The Build Pipeline

Once the blog was working locally, I needed a way to deploy it.

Of course I looked for something that Github Actions would help. There were a bunch of solutions that used a secret or something like that which I tried to avoid.

Somewhere along the way, I found [`actions/upload-pages-artifact`](https://github.com/actions/upload-pages-artifact). I can’t remember where, maybe GitHub Docs, maybe a blog post. Either way, it did the trick.

One more thing, because the repo is used for Github Pages and we are creating our own build pipeline, we need to inform Github about this. I added an empty `.nojekyll` file to skip their automation and let my build handle everything.

## Final Thoughts

It’s been months since I finished this migration the beggining of this year. I’ve barely touched the setup since and things seems to be working even in a machine that I just installed it. That’s a good thing. No... That's a very good thing. Initial goal is done!

It runs. It builds. It deploys.

If it holds together for another ten years like Jekyll did, I’ll call that a success.

And one last thing: I still think Jekyll is great. It served me well for a long time. My move away from it was more about my limited Ruby skills and a desire for a simpler experience than any fault in the tool itself.

My suggestion would be to give it a try and see if it works for you. The team has done some amazing work. All the contributors, they’ve built something solid and lasting.

## Assumed Citations

- [https://kittygiraudel.com/2020/11/30/from-jekyll-to-11ty/](https://kittygiraudel.com/2020/11/30/from-jekyll-to-11ty/)
- [https://24ways.org/2018/turn-jekyll-up-to-eleventy/](https://24ways.org/2018/turn-jekyll-up-to-eleventy/)
- [https://alex.pearwin.com/2020/06/jekyll-to-eleventy/](https://alex.pearwin.com/2020/06/jekyll-to-eleventy/)
- [https://github.com/11ty/eleventy/discussions/1455](https://github.com/11ty/eleventy/discussions/1455)
- Dozens more, probably. It was a very productive weekend.
