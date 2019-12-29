---
layout: post
title: Create custom description for your Jekyll posts
description: Creating a custom description for your Jekyll posts
post_description: Learn how to create a custom description/excerpt for your Jekyll blog posts
categories: Jekyll
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

**Update:** As Emilio Lopez correctly mentioned in the [comments](http://codegaze.github.io/2015/09/07/jekyll-custom-description-for-your-posts/#comment-2242343497) you can declare post_excerpt in the page variables too.

{% highlight yaml %}
---
layout: post
title: My post title
excerpt: This is my post description
---
{% endhighlight %}

The truth is I prefer extending things than overwriting default environment variables but this is in the Jekyll documentation so, it's safe. (Thanks Emilio!)
