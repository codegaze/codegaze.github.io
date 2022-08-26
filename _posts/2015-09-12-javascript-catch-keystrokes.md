---
layout: post
title: How to Capture User Keystrokes With Vanilla Javascript
description: How to capture user keystrokes with a few lines of javascript code
post_description: These days I am in the mood for ditching big libraries.
categories: [Coding, JS]
---

These days I am in the mood for ditching big libraries and having my own mini libraries or a few lines of code only for using the things I need.

It's not that I don't like the libraries we have, it's that sometimes I just want to have only the things I need for my project.

*Why should I map all the keys if I just want two or three of them?*

Enough with the developers guilt that loves abstraction layers. Let's proceed with our script.

An example I came accross while I was reading the [https://webtypography.net/](https://webtypography.net/){:target="_blank"} site — it's great, give it a try — was using keys to navigate through artiles. I know, I am a lazy person, but I miss this when I read tutorials with page sections or a book like site. It's a small script and won't affect the no javascript users.

Let's start by creating a function that captures keystrokes. After we include this in a script, the browser will execute this function for every key press.

{% highlight javascript %}
document.onkeydown = function (e) {
  console.log('I stroke a key');
};
{% endhighlight %}

If you use this function in your document, for every keystroke the browser will log `I stroke a key`.
The ```e``` parameter is the event itself that is going to give us the unicode character of the key we pressed.

Now we need to tell this function what to do when a specific key is pressed. In this case we need to map the right and left arrow key to send us to the next page or previous page.

{% highlight javascript %}
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
        console.log('Go to the previous page!');
        break;
    case 39:
        console.log('Got to the next page');
        break;

    default:
        return; // Do nothing for the rest
  }
};
{% endhighlight %}

And that's it!

You can use whatever key you want without using any library, or create your own lightweight 'plugin' for a number of keys!
Here is a list of keycodes from the [Toptal](https://www.toptal.com/developers/keycode){:target="_blank"} website.
