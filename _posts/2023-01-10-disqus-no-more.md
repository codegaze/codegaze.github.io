---
layout: post
title: Disqus No More
description: It was time to migrate to a different commenting system, giscus
categories: ["Jekyll"]
---

Back in 2015, I created - I'm still having difficulty calling it a blog for some reason - this place. GitHub Pages with [Jekyll](https://jekyllrb.com/) (free hosting FTW), the [Poole theme](https://github.com/poole/poole) with some CSS and layout changes, and there was a thing - my own thing, besides work - in the internet. _"Introverts of the world, unite"_.

Depending on the mood I'm in, I make minor improvements here and there or remove parts I don't like.

So a few weeks ago, it was time for Disqusm, a commenting system, to be removed from codegazerants.

There were two main reasons for doing this:
* Disqus has had a bad reputation for a long time now. Tracking, ads, JS bloat, loading times etc.
* People don't comment that much so removing it won't do any harm.

Regardless of the last point, I wanted to keep the ability to comment on something. What if someone had a question?

## Search for an Alternative
For a moment, I thought of creating a small custom service to handle the whole commenting system, but this has been done too many times in the past by other people. Maybe a weekend project at some point.

It was time for a Google search, and the only requirements were something that worked on a static site and was lightweight.

I saw [webmention](https://en.wikipedia.org/wiki/Webmention) - maybe for another time - and then two similar approaches that looked good to me. The first one was [utterances](https://utteranc.es/), and the second one was [giscus](https://github.com/giscus/giscus).

Both are Github apps that use its features as a commenting system. The only reason I chose one over the other was that giscus - a newer app - is using comments instead of issues.

## Enter giscus
The setup was straightforward. You install the app in Github for the specific repository, include a JS script in your page, and that's it.

You can also do some CSS tweaking, but I didn't bother. The default one looks nice on this site.

The only "issue" with the giscus (and utterances) approach is that only people with a Github account can interact with it, but it's something I can live with.

## Old Comments and Moving Forward
I apologise a bit for removing some old comments, although I'm sure no one remembers.

I will try to keep giscus for some time, and if no one is using it, I will remove this too.
