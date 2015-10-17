---
layout: post
title: Better UX for users with ad blockers
keywords: javascript, ux, frontend, codegaze, ad block
description: Inform your users about a feature they might miss 
post_description: Inform your users about a feature they might miss.
keywords: Javascript,UX
---

Let me start by saying that preventing people from using your content if they use an ad blocker is unethical. All this fuzz about ad blockers and no one says that ad blockers may block a site feature too.

## The problem

Some time ago I built a site for a client  which had an iframe with a third party service for booking tickets. We were getting complains from users that couldn't see the widget. 

After some research we found out that these users had an ad blocker enabled, and we needed to find a way, not to bypass this but inform our users that they are missing a service. 

**I repeat**: Please use this to provide to your user a better experience.

## The solution

Usually ad blockers remove the content they think it's an add and put some inline styling to remove any unwanted white space. So what we need to do is check for any "suspicious" styling in our widget. 

{% highlight javascript %}
    
  function checkAdBlocker(iframe_id, error_message_id) {

    var iframe_element = document.getElementById(iframe_id),
        error_meesage_element = document.getElementById(error_message_id);

    if (iframe_element.style.height === 0 || iframe_element.style.display == 'none') {
      error_meesage_element.classList.remove('hidden');
    }
  }

{% endhighlight %}

This script checks our widget height and display status and if its hidden or has 0 height then it removes the hidden class from our beautiful message element explaining the situation. The two arguments needed here are the iframe and error message id.

What we need to do next is set a ```setTimeout``` function with a delay we think it's adequate to have our page ready.

{% highlight javascript %}

setTimeout(function() {checkAdBlocker('fake_service', 'error_msg'); }, 1000);

{% endhighlight %}

Here is a [demo](http://codegaze.github.io/demos/adblock) you can check it's functionality. If you have an add blocker enabled you will see a message, if not you will see an iframe with a ```This is a fake 3d party iframe!``` text.


This script isn't a solid solution but works for most cases. Is just a first step to help your user not miss a feature in your site, but use it carefully.

