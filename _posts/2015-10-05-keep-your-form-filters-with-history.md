---
layout: post
title: Browser History API
description: Keep your form selections with the help of browser history API
post_description: Keep your form selections with the help of browser history API.
categories: [Coding, JS]
---

This is a simple tutorial about using browsers' history API to keep your form selections.
Imagine you have a form that filters some posts with ajax. If the user goes to one of those links without opening to another tab, all the filters are going to disappear if he comes back.

This can be easily bypassed with the use of browser history API.

## Back to the future I

We 've all used the ```history.back()``` back in the old days (and in this example too) to go back to a previous page.

***It was awful! Don't do it***

If you don't have your own controlled environment e.g a mobile app, you don't know what was the previous page.


## Back to the future II

Nowadays we have ```history.pushState();``` that adds a state to the browser history.

This method has three parameters. The state object, the state description and the state url.

* State Object: Here you can store an object with things you want to retrieve from this state. A title, some html content and other things tou consider useful. For example, you can store a protion of data to show to the user when he comes back and the retrieve the rest. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) proposal is a size limit of 640k characters on the serialized representation of a state object.

* State Description: You can add a description to your state.

* Your state url: This is optional. This changes/is appended to the current url without reloading the page. But if you go to another url and then come back this will be in your url.

I didn't explained all the parameters in depth because we are only going to use the last parameter, the state url.

What we want to do is pass all our form parameters to our url and when we come back we will get these parameters to fill our form.

[Here](https://codegaze.github.io/demos/) is a live example of what we are going to do.



{% highlight javascript %}

    // Get our elements by id
    var selectBox = document.getElementById('select_value'),
        textBox = document.getElementById('text_value');

    /*
       With every value change in our elements
       we serialize our form (I was to lazy to create a serialize
       function so I used jquery) and send it to the function
       setBrowserHistory();
    */

    textBox.onkeyup = function() {
      setBrowserHistory(serializeForm());
    }

    selectBox.onchange = function() {
      setBrowserHistory(serializeForm());
    }

    /*
       Serialize the form with jQuery (Lazy SOB)
       as a string
    */

    function serializeForm() {
     return $('#form_to_serialize').serialize();
    }

{% endhighlight %}

Now we are going to use the history API.

{% highlight javascript %}

  function setBrowserHistory(url) {
    history.pushState(null, null, "?" + url);
  }

{% endhighlight %}

As I said before  we are only going to use the url parameter and null the other two.
We just pushState our url with our parameters with a ```?``` in front of it and that's how magic works.

If you go to another url and then hit back our parameters will be in our url.

This doesn't mean our parameters will be selected in our form. This must be done with some help from your backend.
In my demo I just used a function to deserialize the url parameters to show you how it should work.

I hope this was helpful to you!
