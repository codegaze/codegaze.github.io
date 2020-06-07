---
layout: post
title: IE's InnerHTML Quirks
description: IE's innerHTML quirks and a definition of insanity
post_description: And a definition of insanity.
categories: [Coding, JS]
---

### The background
There are a lot of articles out there and StackOverflow threads about this,
most of which come to the conclusion that we shouldn't do it.
But let's face it, sometimes you have to parse the DOM or parts of the DOM
with regular expressions, because it's faster.

> It's a dirty job but someones gotta do it [*](https://www.youtube.com/watch?v=7GnGwlBRe7w)

I'm not going to get into details, because it would be boring, but I had to
parse an element with regular expression that would exclude some specific HTML
tags from highlighting and process the rest.

Here is an example of the regex:

{% highlight javascript %}
  new RegExp('<span class=\"no-highlight.*?<\/span>|' + word, 'gi');
{% endhighlight %}

Everything worked find until the IE incident. For some reason the regex didn't
worked as it should.

### The debugging period
I run the function in the IE console with some "dummy" string which worked fine.
Tried a lot of things without any solid result. I knew it was something simple,
but I couldn't get my head around it. The local browserstack testing speed in IE
didn't help either (loving the tool but sometimes local testing is a bitch).

> The definition of insanity is doing something over and over again and
expecting a different result.
[*](http://www.news.hypercrit.net/2012/11/13/einstein-on-misattribution-i-probably-didnt-say-that/)

### The epiphany
Then... what was my input? As I said before, my input was a DOM element,
which means I would take the source with `innerHTML` or jQuery's `.html()` function.
I did a console log of the input and I noticed something strange.  The HTML source
wasn't the same, IE had its own way of dealing with the order of the HTML attributes.

I've lost three hours of my life because of this stupid mistake.

[Here](http://codepen.io/codegaze/pen/WpqJWj) is a simple example you can check
the difference in any other browser than IE and IE itself (in a Windows machine
of course).

When you get the innerHTML of an element in IE, [its attributes are sorted by name, native attributes first. But if you add an attribute at runtime IE adds it at the end](http://stackoverflow.com/a/32273037/2321666).

My regex would fail because of this. I did find I quick solution for this:

{% highlight javascript %}
  new RegExp('<span.[^>]*?class=\"no-highlight.*?<\/span>|' + word, 'gi');
{% endhighlight %}

I know the problems of this solution, but in my case there won't be any nesting
in these tags because everything else is escaped.

<hr class="post__separator"/>

**TL;DR** Don't use regular expressions to parse the DOM, but if you do, beware
of the IE's attributes order.

Cheers!

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
