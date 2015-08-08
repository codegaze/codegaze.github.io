---
layout: post
title: A Dynamic Jekyll Menu
---
`​``yml
- title: Home
  url: /index.html
``​`

Jekyll is great for static things, but if you are lazy like me you want to add some scripts here and there to make your life easier.

{% highlight ruby %}
{% for i in (1..10) %}

    Don't repeat yourself!
{% endfor %}
{% endhighlight %}

What you need to know when creating dynamic stuff with jekyll is that you need to create a _data folder if there isn't one in your working folder and add your yml file.

[Jekyll](http://jekyllrb.com) is a static site generator, an open-source tool for creating simple yet powerful websites of all shapes and sizes. From [the project's readme](https://github.com/jekyll/jekyll/blob/master/README.markdown):

> Jekyll is a simple, blog aware, static site generator. It takes a template directory [...] and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind GitHub Pages, which you can use to host your project’s page or blog right here from GitHub.

It's an immensely useful tool. Find out more by [visiting the project on GitHub](https://github.com/jekyll/jekyll).
