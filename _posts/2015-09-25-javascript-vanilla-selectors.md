---
layout: post
title: Vanilla Javascript Selectors
description: How to select dom elements with vanilla javascript.
post_description: How to select dom elements with vanilla javascript.
categories: [Coding, JS]
---

Everytime I start a new project I try to evaluate my needs for javascript and decide if I am going to use any third party library or not.

I am not talking about prototyping, we can use everything we want to get a prototype fast and easy, **but what about our production code?**

I know there are some lightweight javascript libraries out there but trust me, if you 're just using a library to select elements then something is not right.

And it's slower too!

So, this is a post about using your own selectors!


### Get Elements By id

This is an easy one, just call ```document.getElementById('your_id');``` and you are ready to go!


{% highlight javascript %}

// jQuery / Zepto

var element = $('#my_elements_id');

// Vanilla JS

var element = document.getElementById('my_elements_id');

{% endhighlight %}

If you think this is boring we can create a simple wrapper function to help our coding.

{% highlight javascript %}

// Vanilla JS

var element = getById('my_elements_id');

function getById(el_id) {

  return document.getElementById(el_id);

}

{% endhighlight %}


### Get Elements By Class

Getting elements by class is fairly easy too, but we need to write some code to iterate through the selected elements.

{% highlight javascript %}

// jQuery / Zepto

var elements = $('.my_elements_class');
elements.text('New Text');

// Vanilla JS

var elements = document.getElementsByClassName('my_elements_class');

for ( var i = 0; i < elements.length; i++ ) {

    elements[i].innerHTML = 'New Text';

}

{% endhighlight %}


That's all for now.

Within a few lines of code we saved ourselves a 40kb - 80kb library request and browser memory.
