---
layout: post
title: A Service Worker first release
keywords: Service Wrokers, javascript, pwa, ux, codegaze
description: A Service Worker first release. Just added offline availability for this blog
post_description: Just added offline availability for this blog.
keywords: SERVICE WORKERS,UX
---

I 've been experimenting for some time with progressive web apps and service workers. I know I am not the first one not even have the best implementation (google has already [built](https://github.com/GoogleChrome/sw-toolbox) a collection of tools for service workers), but this works and I am happy about it.

I just wanted to say that you can read the posts you have visited while you have internet connection available, when you are offline.

But what's next?

* <span class="check">✔</span> Observe update issues with current service worker setup.
* Implement better caching strategy for pages.
* Fix a bug on mobile devices that offline fallback page doesn't get retrieved.
* Maybe write a post about this experience and issues I've dealt with.
* Implement offline google analytics.
* <span class="check">✔</span> Maybe create a manifest file.
* <span class="check">✔</span> Check score with google's [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en) (100 / 100).

Cheers!

<style>
    .check {
        color: #8fc847;
    }
</style>
