---
layout: post
title: Highlight ruby code in Jekyll
description: How to overcome problems with highlighting ruby code in Jekyll
post_description: A few days ago I was trying to write a tutorial about creating a simple dynamic menu for Jekyll and I came across a strange problem while I was trying to show and highlight some ruby code.
categories: Jekyll
---

A few days ago I was trying to write a [tutorial](https://codegaze.github.io/2015/08/08/how-to-create-a-dynamic-navigation-menu-in-jekyll/){:target="_blank"} about creating a simple dynamic menu for Jekyll and I came across a strange problem while I was trying to show and highlight some ruby code.

Instead of ruby code and html I was getting whitespace and html only.

I reinstalled [pip](https://pip.pypa.io/){:target="_blank"} and [pygments](http://pygments.org/){:target="_blank"} to check if something was wrong with my installation but that wasn't the problem.

After a little research I found out that the problem was that Liquid, the template language Jekyll uses, considered everything inside the curly braces as code to execute.

That thing we call the internet helped me to find out that the solution is another tag called [raw](https://docs.shopify.com/themes/liquid-documentation/tags/theme-tags#raw){:target="_blank"}.

>**raw**
Allows output of Liquid code on a page without being parsed.

That means that if you use the following code(without the spaces between the curly brackets and %) after the highlight tag you can achieve the preferred result.

{% highlight ruby %}

{ % highlight python % }
{ % raw % }

{ % if page.title == 'Highlight ruby code in Jekyll' % }
  You are right!
{ % endif % }

{ % endraw % }
{ % endhighlight % }
{% endhighlight %}

results to:

{% highlight ruby %}
{% raw %}
{% if page.title == 'Highlight ruby code in Jekyll' %}
  You are right!
{% endif %}
{% endraw %}
{% endhighlight %}
