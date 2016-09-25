---
layout: post
title: First steps with Facebook's Instant Articles
keywords: Facebook, Instant Articles, RSS, codegaze
description: First steps with Facebook's Instant Articles and things I dealt with
post_description: And things I dealt with.
keywords: FACEBOOK,RSS
---

## Introduction
I think Instant Articles is the Facebook's way of saying "You had one job" to all developers out there. For me (a developer) is nothing more than a way to give your content to users fast without all the problems that our CMS's and code add to the user experience.

But I have one question:

>If you are willing to do some work to give your content stripped down to a third party service, why can't you make the same things to you website to make it better?

Anyway I 'll give a mini start guide for the RSS feed thing for everyone who is interested, with some issues I dealt with.

## What happened
Started working with Facebook's Instant Articles a few days ago. After two days of frustration I got my first articles consumed by this new Facebook feature. This might be due to my lack of patience with facebook's documentation or their lack of good documentation. I just tried the RSS way to add content to the Articles (Who the f*ck is going to add manually content to this thing FFS?!)

I'm not going to guide you through the steps of enabling the Instant Articles because there are ton of articles out there, but I am going to guide you through the painful work of creating a compatible RSS feed by yourself and not by using some plugin.

## Let's start

First thing you need to do is go to your page and click `Settings` at the upper right corner and then `Instant Articles` at the left menu. If you can't find it, this means you haven't enabled Instant Articles for you page. Go back, do it and come back to this section.

For your first trial and error stuff we are going to need two thing from the `tools` section, the `Claim your url` and the `Development RSS Feed`.

<figure>
  <a href="/public/instant_articles/scrn_1.png"><img src="/public/instant_articles/scrn_1.png" border="0"></a>
</figure>

<hr class="post__separator"/>

For the `Claim your Url` tool **first** you need to add the og tag to your website tags inside `<head></head>` and **then** add you domain you are going to use to authorize your website to give RSS for this feature.

<figure>
  <a href="/public/instant_articles/scrn_2.png"><img src="/public/instant_articles/scrn_2.png" border="0"></a>
</figure>

<hr class="post__separator"/>

Now, the best part. You need to provide a url with your RSS file that you can do tests. Just write your url and don't be scared. This is a development feature. You can do anything you want and nothing goes public.

>Forgot to say that you need to "Get the Pages Manager App" to preview your articles and styles on iOS or Android. Yeap, there is no other way to preview/debug your instant articles, only your mobile device!

I followed the instructions of facebook for a compatible RSS and built something like this:

{% highlight xml %}

<rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>News Publisher</title>
    <link>http://www.example.com/</link>
    <description>
      Read our awesome news, every day.
    </description>
    <language>en-us</language>
    <lastBuildDate>2014-12-11T04:44:16Z</lastBuildDate>
    <item>
      <title>This is an Instant Article</title>
      <link>http://example.com/article.html</link>
      <content:encoded>
        <![CDATA[
        <!doctype html>
        <html lang="en" prefix="op: http://media.facebook.com/op#">
          <head>
            <meta charset="utf-8">
            <link rel="canonical" href="http://example.com/article.html">
            <meta property="op:markup_version" content="v1.0">
          </head>
          <body>
            <article>
              <header>
                <!— Article header goes here -->
              </header>

              <!— Article body goes here -->

              <footer>
                <!— Article footer goes here -->
              </footer>
            </article>
          </body>
        </html>
        ]]>
      </content:encoded>
    </item>
    ....
</channel>
</rss>
{% endhighlight %}

As you see there is nothing special. Of course this had my content but these were my tags I wanted to use as I read in the documentation, right? **Nope!**

For some time I was changing things and trying the results but nothing happened, not even one error. I even tried using a 404 page to see if I was going to get any message from Facebook... **Nope!**(again)

After some time I was ready to give up and my last hope was installing Wordpress and the plugin for Instant Messages to see the differences and come up with a solution. After a while I found out that the only different thing was the `pubDate`.

What did you say? Facebook says it is not required? Yes it does:

<figure>
  <a href="/public/instant_articles/scrn_3.png"><img src="/public/instant_articles/scrn_3.png" border="0"></a>
</figure>

After two days and one minute before going to a colleague or a stranger for help I saw my Development Instant Articles consuming my RSS feed. Just go to `Publishing Tools` from your top menu and then to your left side menu to your `Instant Articles -> Development`.

<figure>
  <a href="/public/instant_articles/scrn_4.png"><img src="/public/instant_articles/scrn_4.png" border="0"></a>
</figure>

<hr class="post__separator"/>

And just like that, I felt better!

But not for long. Added some more stuff like images, article text etc, but when I tried to see the articles in my mobile device I couldn't see the images and got some other errors from facebook. What I noticed was that my figure images where inside a paragraph tag because... editors!

The reason: **Your wysiwyg editor sucks!**

<hr class="post__separator"/>

Facebook Instant Articles need clean HTML code. If your image is wrapped in a paragraph you have a problem. If your text isn't inside a paragraph you have a problem and other stuff that I haven't gotten into.

This means you may have to do some code-post-clean-up work.


**2016-09-25 Update:**
Chris Coyer wrote a interesting  [article](http://mediatemple.net/blog/tips/wordpress-apple-news-instant-articles-amp/) about making content available to Instant Articles, Apple News and AMP. Not everyone uses Wordpress (only the 25% of the internet websites do :P), but it'a a great case study.

<hr class="post__separator"/>

That's all for now. Test and debug your articles and stay tuned to see if I manage to deliver the project and how! :P

Don't trust Facebook's documentation and build beautiful lightweight websites so we won't use third party services.

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
