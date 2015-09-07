---
layout: post
title: Create custom description for your Jekyll posts
keywords: jekyll, custom excerpt, custom description, codegaze, ruby, static site
description: Creating a custom description for your Jekyll posts
post_description: Learn how to create a custom description/excerpt for your Jekyll blog posts
---

There are two ways to create a description from your post, the first one is use the existing ```post.excerpt``` tag Jekyll has after reading [Jekyll documentation](https://jekyllrb.com/docs/posts/#post-excerpts) or create your own with some simple steps.

The general idea is to create a custom page variable in your posts and use it in your layouts.

For our example we 'll call our variable  ```post_description```, at least that's what I am using for my blog, and give it a value in my markdown post:


{% highlight yaml %}
---
layout: post
title: My post title
post_description: This is my post description 
---
{% endhighlight %}

and in my default.html or any other place I want to use it instead of ```post.excerpt```, now I can use ```post.post_description``` and that's it.

You can use these page values anywhere you want. For instance I am using this for creating meta tags for description and keywords in my ```<head>``` tag. You can take a peak in my [github repository](https://github.com/codegaze/codegaze.github.io) for this site. 

You can add and image for your facebook og tags or anything else you can think of. 