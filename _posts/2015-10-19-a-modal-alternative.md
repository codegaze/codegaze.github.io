---
layout: post
title: A Modal Alternative Proposal
description: A simple lightweight solution for not using modals
post_description: A simple lightweight solution for not using modals.
categories: [Coding, UX]
---

When I saw modals some years ago, I thought it was one of the best things happened. Just use a plugin and show your important stuff to the user and you are ready to go. Things changed since then and plugins went bigger and better, but I think we are using tooooo many resources and third party libraries and we need to stop.

In my projects I usually use a modal either to show a new feature (announcement) to the user or in a photo gallery or something like this. I am ok with the latter - although there is always another solution - but when it comes to the first we can always choose a more lightweight and simplified way.

Here is what I am proposing (live [demo](https://codegaze.github.io/demos/modal_alternative/)):

<figure>
  <a href="/public/example_big.png"><img src="/public/example_big.png" border="0"></a>
</figure>

Add your big announcement in your content. Use just a small script to close your "modal". No more big chunks of js and css.

With this solution the user has three options:

* Ignore it.
* Close it.
* Click it.

Please, don't auto close your message.
If the user ignores it and continues to read your content it will be annoying to remove it while he reads something.

And if someone clicks the close button, give that person a cookie for a while. He clicked it for a reason.

Here is the small script I talked about before:

{% highlight javascript %}

function closeModulePromo() {

  var module_element = document.getElementById('module_promo');
  module_element.parentElement.removeChild(module_element);

}

var module_close_handler = document.getElementById('module_promo_close');

module_close_handler.onclick = function() {
  closeModulePromo();
}

{% endhighlight %}


**Notes:**<br>
In my [demo](https://codegaze.github.io/demos/modal_alternative/) I don't use a cookie.<br>
I used a <a href="http://www.initializr.com/">http://www.initializr.com/</a> boilerplate for the demo.<br>
Maybe I'll do another part about an image gallery version.

If you have any questions or reccomendations, feel free to comment.
