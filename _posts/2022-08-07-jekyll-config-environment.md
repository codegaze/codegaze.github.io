---
layout: post
title: "Jekyll: Goodbye ‘site.GH_ENV’"
description: How an undocumented variable failed me after six years
categories: [Coding, Jekyll]
---

This code has been a great friend for some time now. Based on git history, I added this six years ago and didn’t touch it again.

```ruby
{% raw %}
{% if site.GH_ENV == ‘gh_pages’ %}
    # Analytics code
{% endif %}
{% endraw %}
```

What this does, or better say what it should do, is to check if we are in a production environment - aka Github Pages - and print Google analytics code. Of course, I have no idea where I found this, but it stopped working two months ago.

A few days ago, I saw a warning in the Google Analytics console, a place I don’t hang out much. The message was `Property codegazerants.com is not receiving hits`.

I disregarded it at first, but then I thought it was worth checking out my code.

After doing some “view source” on production, I saw that there was no GA script. 🤷
My beautiful condition just stopped working.

I searched about the `GH_ENV` key and found two or three Github issues from 2014 and 2018, but that was it. Undocumented configuration. That’s the spirit!

Of course, as a responsible engineer, I then went through the proper channels (it’s called documentation) and found that the same thing could be achieved with

```ruby
{% raw %}
{% if jekyll.environment == 'production' %}
    # Analytics code
{% endif %}
{% endraw %}
```

## What are the key takeaways here?

Using undocumented, internal parts of libraries, is a bad practice.

Especially in a work environment, that can result to money loss because someone changed their library.

It’s not worth it, trying to understand what went wrong six months from now.

**See you again in 2028, dear configuration variable!**
