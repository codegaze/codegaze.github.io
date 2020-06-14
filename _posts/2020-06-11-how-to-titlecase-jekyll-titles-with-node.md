---
layout: post
title: How to TitleCase Jekyll Titles With Node
description: No third party libraries needed
categories: [Coding, JS]
---

Back in December, I decided to refresh this place and start writing again. What I noticed then was that my post titles are a bit inconsistent. Some words are uppercase, some lowercase, some don't even bother, but you get the point.

I wanted to change these titles then, but let's be honest, sometimes I'm a bit lazy. So while I was sitting in my couch yesterday I thought of doing something about it.

I had two choices, doing it manually wasn't one of them. Install a dependency and get it done in two minutes or try to build something. I chose the latter because I didn't want to install any dependency. And that was the only rule, no dependencies.

It was a bit easy since I told my self that a) There was no shame in this, which means no tests no fear of judgement b) No need to freak out about details, just make it work and have some fun.

## What Was Built

This is a simple node script that runs in the Jekyll blog root and will change the titles in the `_posts` folder. No more no less.

I started thinking of how I will tackle this and there were three parts:

- Read the contents of the `_posts` folder.
- Find and change the title based on some criteria.
- Write the new content to the file.

### Loop Through the `_posts` Folder

Simple stuff, we use Node's core libraries to:

- Read the contents of a directory.
- For each item of this directory, we read the contents of this item.

You could log your `data` in case you need to see the contents of a file. We just used some basic file-based operations.

```js
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '_posts');
// Loop through the folder's files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // Loop through all files
  files.forEach((filename) => {
    const file = `${directoryPath}/${filename}`;
    fs.readFile(file, 'utf-8', (err, data) => {
      console.log(`go wild!`);
    });
  });
});
```

## Find and Change the Title Based on Some Criteria

The fun part! All the code we are going to use is going to inside the `readFile` function.

We have three things we need to tackle:

- Get the FrontMatter part.
- Extract the title.
- Split the title by spaces and check each word if it needs to be changed, also based on a list of small words that shouldn't be changed. We are going to do this with simple regular expressions and not a library. Remember, we are just hacking our way to result.

```js
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '_posts');
// Loop through the folder's files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // Loop through all files
  files.forEach((filename) => {
    const file = `${directoryPath}/${filename}`;
    fs.readFile(file, 'utf-8', (err, data) => {

      // ======== NEW CODE FROM HERE =========

      // Split the content with `---`. The second key will be what we want
      const frontMatter = data.split('---');
      if (frontMatter) {
        // Parse the frontMatter and find the title
        const [originalTitle, uselessKey, title] = frontMatter[1].match(
          /(title:\s*)(.+)/im
        );
        // These words should not be capitalised
        const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
        // Split the title by spaces
        let newTitle = title
          .split(' ')
          // Loop through all the items
          .map((item, index, array) => {
            if (
              // Does it belong to the smallwords
              item.search(smallWords) > -1 &&
              // and it's not first or last word
              index !== 0 &&
              index !== array.length - 1
            ) {
              // This needs to be lowercase
              return item.toLowerCase();
            } else {
              // Everything else should be capitalised
              return item.replace(/^['A-Za-z']/, (item) => item.toUpperCase());
            }
          })
          .join(' ');
          console.log(oldTitle, newTitle);
      }
    });
  });
});
```

Ok, you may think, a lot is going on here. If you run this, nothing is changed in your files, but you should see in your terminal a list of new and old titles.

What I'd like to explain is the two regular expressions we have here.
The first one, `/(title:\s*)(.+)/im` :

- Will try to find a match of `title: some content`.
- We create two groups. The `(title:\s*)` will get the `title:` and any kind of white space after it.
- The `(.+)` part will get the rest, in our example the `some content`.

If this regular expression finds a match this will produce an array of results which will be:

```js
[
    'title: some content', // Full Match - originalTitle
    'title: ', // Group 1 - uselessKey
    'some content' // Group 2 - title
    ...
]
```

And that's why we named the second one `uselessKey` in our code since we are not going to use it. We only need the `originalTitle` and the `title`.

The second one is easier `/^['A-Za-z']/`

From a given string match the first character if it is in the range of `A-Z` or `a-z`.

I know it's a bit silly to explain it to this extent, but for a lot of people, regular expressions are a mystery.

## Write the New Content to the File

We have one more small thing to do. Replace the title in the original file data and save the file.

```js
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '_posts');
// Loop through the folder's files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // Loop through all files
  files.forEach((filename) => {
    const file = `${directoryPath}/${filename}`;
    fs.readFile(file, 'utf-8', (err, data) => {
      // Split the content with `---`. The second key will be what we want
      const frontMatter = data.split('---');
      if (frontMatter) {
        // Parse the frontMatter and find the title
        const [originalTitle, uselessKey, title] = frontMatter[1].match(
          /(title:\s*)(.+)/im
        );
        // These words should not be capitalised
        const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
        // Split the title by spaces
        let newTitle = title
          .split(' ')
          // Loop through all the items
          .map((item, index, array) => {
            if (
              // Does it belong to the smallwords
              item.search(smallWords) > -1 &&
              // and it's not first or last word
              index !== 0 &&
              index !== array.length - 1
            ) {
              // This needs to be lowercase
              return item.toLowerCase();
            } else {
              // Everything else should be capitalised
              return item.replace(/^['A-Za-z']/, (item) => item.toUpperCase());
            }
          })
          .join(' ');

        // ======== NEW CODE FROM HERE =========

        // Replace the old title with the new one in the original content
        data = data.replace(originalTitle, `title: ${newTitle}`);
        fs.writeFile(file, data, (err, result) => {
          if (err) console.log('something went wrong with ' + file);
          console.log('Yay!');
        });
      }
    });
  });
});
```

There are better ways to do all this and more beautiful approaches, but it wasn't about that. I was probably bored a bit, so I did some quick hacky code and have my titles corrected. This could also be used to change headings in the document.

Oh, by the way, I didn't add any kind of report or validation since I'm using git for my blog and I can do a quick manual QA on commit.

The gist in [Github](https://gist.github.com/codegaze/5d517826fd14d1697720374205247da2).

Two repos I visited to get some inspiration from:

- [https://github.com/kvz/jekyll-fix-titlecase/](https://github.com/kvz/jekyll-fix-titlecase/)
- [https://github.com/gouch/to-title-case/](https://github.com/gouch/to-title-case/)
