const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const fs = require("fs");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postNested = require("postcss-nested");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("assets/img/");
  eleventyConfig.addPassthroughCopy("public/");
  eleventyConfig.addPassthroughCopy("assets/manifest/");
  eleventyConfig.addPassthroughCopy("demos/");
  eleventyConfig.addExtension("xml", { key: "liquid" });
  eleventyConfig.addTemplateFormats("xml");

  eleventyConfig.addPassthroughCopy(
    "ahrefs_d00116e243e9d86aa6b4d2848d1eae183b04e162d64ca3e20d556ab247583ed4"
  );
  eleventyConfig.addPassthroughCopy("googleaae866b09e479e7f.html");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("yandex_c434e6e61b22dd1e.html");
  eleventyConfig.addPassthroughCopy("worker.js");
  eleventyConfig.ignores.add(
    "ahrefs_d00116e243e9d86aa6b4d2848d1eae183b04e162d64ca3e20d556ab247583ed4"
  );
  eleventyConfig.ignores.add("googleaae866b09e479e7f.html");
  eleventyConfig.ignores.add("yandex_c434e6e61b22dd1e.html");
  eleventyConfig.ignores.add("CNAME");

  // Manage CSS processing
  eleventyConfig.on("eleventy.before", async () => {
    // PostCSS processing
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

  // Get Collection of Posts
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob(["_posts/*"]).reverse();
  });

  // Get Collection of Post Categories
  eleventyConfig.addCollection("postsByCategory", (collectionApi) => {
    // Get all posts
    const posts = collectionApi.getFilteredByGlob(["_posts/*"]).reverse();

    // Create an object to group posts by category
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
    // Convert the categories map into an array of objects
    return Object.entries(categoriesMap).map(([category, posts]) => ({
      category,
      posts,
    }));
  });

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

  eleventyConfig.addLiquidFilter(
    "date_to_long_string_locale",
    function (input) {
      const date = new Date(input);
      const formatter = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);
      return formatter;
    }
  );

  return {
    dir: {
      input: "./",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
