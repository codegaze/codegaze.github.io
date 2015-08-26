---
layout: post
title: Dynamic navigation for Jekyll
keywords: jekyll, menu, dynamic menu, ruby, static site
description: How to create a dynamic navigation menu in Jekyll
header_img: dynamic_menu.jpg
post_description: This is a tutorial on how to create a simple dynamic menu for Jekyll
---

This is a tutorial on how to create a simple dynamic menu for [Jekyll](https://github.com/jekyll/jekyll).

Jekyll is great for static sites, but if you are lazy like me you want to add some scripts here and there to make your life easier.

Jekyll uses the _data folder to create dynamic data with the use of .yml files.
You can name the file however you want but keep in mind that we are going to use it to retrieve the data with site.data.filename.

First of all you need to check if there is a _data folder in your project folder. If not we must create it and add a navigation.yml file in with this data:

{% highlight yaml %}

- title: Home
  url: /
- title: Blog
  url: /blog/
- title: About
  url: /about/  

{% endhighlight %}

Next add this script to your default.html in your _layout folder or create a menu.html file in your _include folder.



{% highlight python %}

{% raw %}
<nav>
    <ul>
    {% for link in site.data.navigation %}
        {% assign current = nil %}
        {% if page.url contains link.url %}
            {% assign current = 'active' %}
        {% endif %}
        <li class="{{ current }}">
            <a href="{{ link.url }}">{{ link.title }}</a>
        </li>
    {% endfor %}
    </ul>
</nav>
{% endraw %}

{% endhighlight %}

The latter is better and you need to include the menu in your preferred place in your default.html

{% highlight python %}

{% raw %}
{% include menu.html %}
{% endraw %}

{% endhighlight %}

Refresh your page and see your new menu!