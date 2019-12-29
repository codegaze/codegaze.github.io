---
layout: post
title: Swiper-JW Player
description: Swiper-JW Player - A plugin to extend Swiper for easier JW Player integration
post_description: A plugin to extend Swiper for easier JW Player integration.
categories: [Coding, JS]
---

[Swiper-JW Player](https://github.com/codegaze/Swiper-JWPlayer) is a very small plugin that extends iDangero.us [Swiper](http://www.idangero.us/swiper/) to avoid setting up the configuration for stopping [JW Player](http://www.jwplayer.com/) videos between slide navigation in each Swiper instance.


This was created to satisfy my need for a fairly abstract/dynamic way to deal with JW Player events, in this case stopping it, without writing code in Swipper callbacks everytime I need something like this.

The goal was to be slide targeted and not just call a ```jwplayer().stop()``` that can cause a UX problem by stopping any other player on the page.

### Code
{% highlight javascript %}
(function (Swiper) {

  Swiper.prototype.plugins.jwplayer = function (swiper) {
      'use strict';

      return {
          onSlideChangeStart: function () {

            var jwplayer_elements = swiper.slides[swiper.previousIndex].getElementsByClassName('jwplayer');

            if ( jwplayer_elements.length > 0) {
              for (var i = 0; i < jwplayer_elements.length; i++){
                jwplayer(jwplayer_elements[i].id).stop();
              }
            }

          }
      };
  };

})(Swiper);
{% endhighlight %}

### How it works

Each time Swiper runs ```onSlideChangeStart()```, this plugin searches for any jwplayer instance in the previous slide and stops it, without messing with the code specified in the configuration for the ```onSlideChangeStart()```.

### Usage

Just include the `swiper.jwplayer.js` or `swiper.jwplayer.min.js` script file in your page after your Swiper script.

### Compatibility

JW Player 6, 7

---

You can download the minified and source code from github [https://github.com/codegaze/Swiper-JWPlayer](https://github.com/codegaze/Swiper-JWPlayer).
