---
layout: post
title: Got Rid of Google Fonts and I Feel Fine
description: Got rid of Google Fonts and I feel fine. I really do.
post_description: I really do.
categories: [Performance, UX]
---

I started writing in this blog in 2015, and I made a decision to use the Roboto font as my weapon of choice. Why? Actually, I'm not sure. But I did.

This means I have to add a script to my page to use the Google Font which adds ~36kb of data to this page. You can say it's not a significant amount for a page which usually has only text, but these are additional resources.

I do care about performance and UX. So, I use lazy loading with a fallback and a service worker which gets assets from cache after the client downloads the resource.

After some discussion with colleagues we ended up having some questions:

* Does this make a difference to this blog?
* Does this add any value to the user?

**No - Nope - Nada.** But let me explain what I mean.

**Does it make a difference to this blog?**

I'm not a brand or a product that is going to add some value to it.  And if you think about it, the web is full of the Roboto font. My writings won't stand out because of the font I'm using. Getting better at this will *(I really do try!)*.

**Does it add any value to the user?**

Well, no. If I use Helvetica (or Arial for windows and Linux machines) will have **almost** the same result. I'm not saying it's the same, but I wont make any big difference to the untrained eye. As I said before, the content will, and readability.

<hr class="post__separator"/>


[Here](https://theunderstatement.com/post/11645166791/roboto-vs-helvetica) is a `Roboto/Helvetica` and [here](https://www.webdesignerdepot.com/2013/03/arial-vs-helvetica-can-you-spot-the-difference/) a `Helvetica/Arial` comparison.

Not a long time ago Github changed its stack to `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`. So, who am I to judge?

Having said that, at least for now I decided to remove the Roboto font and use the `'Helvetica, Arial, sans-serif'` stack. I'm working on an Apple machine, so I'm going to do some experiments to get a great result to other systems too.

Also, now that I'm removing this dependency, I can also get some kb of the small JS that used to check when the web font available for use. These two changes I did reduced the home page resources from ~80kb to ~35kb. I say home page because in the article pages I have the Disqus dependency (at least for now).

**TL;DR** I got rid of the Google Fonts and I feel fine!

**P.S.** I'm not a typography expert (shocker!).

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
  </style>
