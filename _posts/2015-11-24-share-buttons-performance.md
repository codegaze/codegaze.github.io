---
layout: post
title: Share Buttons Performance Issues
keywords: Javascript, social, share, buttons, frontend, codegaze
description: Share Buttons Performance Issues and how to deal with them
post_description: And how to deal with them.
keywords: JAVASCRIPT,PERFORMANCE,SOCIAL
---

Last week we had a series of interviews with a number of candidates for a junior frontend developer position and at the end of each session we gave them a "code challenge" to complete in their spare time, only if they wanted to. Nothing special, just a simple responsive prototype so as to take a peak at the quality of their code.

One thing we had in this prototype was a Facebook share button to see how they could deal with it. There was no restriction to it, they could use any library, service or code snippet they could think of.

Almost a **40%** of the candidates **used a simple link** which redirected you to a facebook share page, a **30% used a third party** library and a **30% used Facebook's default share button**.

The first thing that comes to my mind is: Don't use social network's share buttons, it's bad for the page's performance.

There is always a simple solution to this. With some lines of code you can share your content without loading all these resources that come with the official share buttons.

I know this subject has been covered by many people but here is an example for facebook and twitter share buttons without messing with external libraries.

## Code

Here is the HTML code for the buttons. We are just creating simple links. We use the `js-share-button` class in our script to select all the share buttons. And the `data-service` attribute gives us the services we are going to use.

{% highlight html %}
<a href="#" class="share__button facebook js-share-button" data-service="facebook">Share on Facebook</a>
<a href="#" class="share__button twitter js-share-button" data-service="twitter" title="Share Buttons Performance Issues and how to deal with them - @codegaze">Share on Twitter</a>
{% endhighlight %}


And the javascript code for it with some comments to explain what's going on. 

{% highlight javascript %}
<script>
  
  // Select all our buttons with the js-share-button class
  var shareButtons = document.querySelectorAll('.js-share-button');


  for (var i = 0; i < shareButtons.length; i++) {

    // Add a click handler to each of our buttons
    shareButtons[i].addEventListener('click', function(e) {
      e.preventDefault();

      // Get the service from the data attribute
      var service = this.getAttribute('data-service'),
          url = '';

      // Check which service we want and attach the right url.
      // window.location give the current url.
      // 
      // IMPORTANT! Always remember we need to encode our urls
      //            and variables we are sending.
      switch (service) {
        case 'facebook':
          url+= 'https://www.facebook.com/sharer/sharer.php?u=' 
             + encodeURIComponent(window.location);
          break;
        case 'twitter':
          url+='https://twitter.com/intent/tweet/?text=' + encodeURIComponent(this.title);
          url+='&url=' + encodeURIComponent(window.location);
          break;
        default:
          console.log('There is no such share service in your `switch`!');
          break;
      }
      
      window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300');

    });

  }
  </script>
{% endhighlight %}

---------------------------------------

You  can check the demo of these buttons, will give you a share to the current page url.

<div class="has-centered">
  <a href="#" class="share__button facebook js-share-button" data-service="facebook">Share on Facebook</a>
  <a href="#" class="share__button twitter js-share-button" data-service="twitter" title="Share Buttons Performance Issues and how to deal with them - @codegaze">Share on Twitter</a>
</div>


<div class="happy-hour">

  <ul>
    <li>Drink: Water</li>
    <li>Music: <a href="https://www.youtube.com/watch?v=kxyUl3DrOLE" target="_blank">Iron and Wine - Our Endless Numbered Days</a></li>
  </ul>
</div>



<script>
  var shareButtons = document.querySelectorAll('.js-share-button');

  for (var i = 0; i < shareButtons.length; i++) {

    shareButtons[i].addEventListener('click', function(e) {
      e.preventDefault();

      var service = this.getAttribute('data-service'),
          url = '';

      switch (service) {
        case 'facebook':
          url+= 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location);
          break;
        case 'twitter':
          url+='https://twitter.com/intent/tweet/?text=' + encodeURIComponent(this.title);
          url+='&url=' + encodeURIComponent(window.location);
          break;
        default:
          console.log('There is no such share service in your `switch`!');
          break;
      }
      
      window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300');

    });

  }
</script>

<style>
  
  a.share__button{
    padding: 20px;
    margin: 20px;
    display: inline-block;
    color: #fff;
  }
  a.share__button:hover {
    opacity: .6;
  }
  .facebook {
    background: #47639E;
  }

  .twitter {
    background: #55ACEE;
  }
  .has-centered {
    text-align: center;
  }
</style>