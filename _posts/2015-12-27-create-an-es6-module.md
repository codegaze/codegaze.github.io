---
layout: post
title: Create an ES6 module
description: Create an ES6 module & other ES6 features
post_description: And other ES6 features.
categories: [Coding, JS]
---

### Introduction

ES6 Time! I decided to migrate the share buttons script to ECMASCRIPT 6.

First some things I want to say:

* This is a prototype that may contain errors in code or concept. I am open to suggestions :)
* I just started, and if you are interested in ES6 you should too, reading the <a href="https://leanpub.com/exploring-es6/" target="_blank">"Exploring ES6 - Upgrade to the next version of JavaScript"</a> by Axel Rauschmayer.
* I started this code by reading <a href="http://exploringjs.com/es6/ch_deploying-es6.html#sec_webpack-babel" target="_blank">this chapter</a> from this book and using this <a href="https://github.com/rauschma/webpack-babel-demo" target="_blank">repository</a>.
* The code of this article is available in my github account in <a href="https://github.com/codegaze/es6-module-codegaze-blog-post-code">this</a> repository to check it out.

### What's this post about

This post is about creating a small ES6 module we created in a previous post about <a href="http://codegaze.github.io/2015/11/24/share-buttons-performance/">Share Buttons Performance</a> and a script to avoid all these problems. It's a simple script that scans the dom for a specific class and adds a click event.

### ES6 fast catchup

To fully understand this post you 'll need to understand some basic ES6 features. This is a rough explaination of these features, you should take a look at Axel Rauschmayer's book for more in depth stuff.

#### VAR vs LET

In ES6 we can use ```let``` to create block variables. Here is an example from MDN:

{% highlight javascript %}
function varTest() {
  var x = 31;
  if (true) {
    var x = 71;  // same variable!
    console.log(x);  // 71
  }
  console.log(x);  // 71
}

function letTest() {
  let x = 31;
  if (true) {
    let x = 71;  // different variable
    console.log(x);  // 71
  }
  console.log(x);  // 31
}
{% endhighlight %}

I noticed that if you set with ```let``` the same variable in the same block you 'll get an error.
{% highlight javascript %}
    let x = 2;
    let x = 4;
    // Uncaught TypeError: unknown: Line 2: Duplicate declaration "x"
{% endhighlight %}

#### Arrow functions

In my opinion the main difference of using arrow functions is that the word ```this``` doesn't refer to the current arrow function's scope but to some parent function that has a ```this``` definition (We will see this in our code later). This means no more ``` that = this ``` etc but this can be tricky, especially inside modules.

But here are some examples:
{% highlight javascript %}


    // No parameters (parenthesis is required)
    let logMe = () => console.log('ME!');

    logMe();

    // One parameter (can ommit parenthesis)
    let logMe = name => console.log(name);

    logMe('Jim');

    // More than one parameter (parenthesis is required)
    let logMe = (what, name) => console.log(what + ' ' + name);

    logMe('Hello', 'Jim');

    // More than one parameter and multiple line expression
    let logMe = (what, name) => {
        let text = what + ' ' + name;
        console.log(text);
    };

    logMe('Hello', 'Jim');


    /*
        The `this` scope. this will refer to the logMe() and not the setTimeout function.
        There is no `this` inside that arrow function.
    */

    function logMe() {
        setTimeout(() => {
            console.log("Who:", this.name);
        },500);
    };

    // or
    function logMe() {
        setTimeout(() => console.log("Who:", this.name),500);
    };

    logMe.call({name: 'Jim'})();


{% endhighlight %}

#### Template Strings

Yay! No more errors in your string templates! From MDN:

> Template strings are enclosed by the back-tick (``) (grave accent) character instead of double or single quotes. Template strings can contain place holders. These are indicated by the Dollar sign and curly braces (${expression}). The expressions in the place holders and the text between them get passed to a function. The default function just concatenates the parts into a single string. If there is an expression preceding the template string (tag here),  the template string is called "tagged template string". In that case, the tag expression (usually a function) gets called with the processed template string, which you can then manipulate before outputting.

There is so much to learn about this but we are just going to cover the very basics just like we did before.
Here is how we are going to use our ```logMe()``` with the new shiny string templates.

{% highlight javascript %}
    // The old way
    let logMe = (what, name) => {
        let text = what + ' ' + name;
        console.log(text);
    }

    // The New way
    let logMe = (what, name) => {
        let text = `${what} ${name}`;
        console.log(text);
    };

    // or even in a crazy ugly multiline string
    let logMe = (what, name) => {
        let text = `I just wanted to
         say ${what} to my friend
                    ${name}`;
        console.log(text);
    };

{% endhighlight %}

#### Modules

Last but not least, the modules. At last in ES6 we can create and use our modules in separate files and import them without any third party libraries. And this is what this post is about, building a simple module. But let's cover the basics.

In ES6 we can use ```export``` and have one `default` export for a function or a class per module, or use `named exports` to export as many functions as we want per module.
We are going to use two .js files, our module file called myLogModule.js and our main.js to import our module.

This is an example with a default export. This can be a function or a class.
{% highlight javascript %}

    // myLogModule.js
    export default function(text) {
        console.log(`This is from myLogModule and it says ${text}`)
    };

    // main.js
    import whateverNameYouWant from './myLogModule';
    whateverNameYouWant('hello');

{% endhighlight %}

If we were going to use named exports this is what we were going to do.

{% highlight javascript %}

    // myLogModule.js
    export function saySomething(text) {
        console.log(`This is from myLogModule and it says ${text}`);
    };
    export function saySomethingElse(text) {
        console.log(`This is something else ${text}`);
    };


    // main.js
    import * as myLogModule from './myLogModule';

    myLogModule.saySomething('hellooooo');
    myLogModule.saySomethingElse('hello again');

{% endhighlight %}

Or we can always import a specific function in our main.js

{% highlight javascript %}

    // main.js
    import {saySomething} from './myLogModule';
    saySomething('hellooooo');

{% endhighlight %}

Or more than one

{% highlight javascript %}

    // main.js
    import {saySomething, saySomethingElse} from './myLogModule';
    saySomething('hellooooo');
    saySomethingElse('hello again');

{% endhighlight %}

That's a very (really) rough explaination of these features, but I am sure these are enought to continue with our own module.

### Our Module

As I said before we are going to create our own module to see a more 'complex' situation. The script we are going to use is this and all it does is search the dom for elements with a `.js-share-button` class and add a click event listener to each element that opens a window with a share url for facebook or twitter.

This is the script in 'traditional' javascript:

{% highlight javascript %}


shareButtons = function(){

  // Select all our buttons with the js-share-button class
  var shareButtons = document.querySelectorAll('.js-share-button');

  var init = function(){
    add_listeners_to_buttons();
  };

  var window_open = function(url){
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300');
  };

  var add_listeners_to_buttons = function(){

    for (var i = 0; i < shareButtons.length; i++) {

      // Add a click handler to each of our buttons
      shareButtons[i].addEventListener('click', function(e) {
        e.preventDefault();

        // Get the service from the data attribute
        var service = this.getAttribute('data-service'),

        // Gets the href from our link (Good for ajax)
            page_url = encodeURIComponent(this.href),
            url = '';

        // Check which service we want and attach the right url.
        // window.location give the current url.
        //
        // IMPORTANT! Always remember we need to encode our urls
        //            and variables we are sending.
        switch (service) {
          case 'facebook':
            url+= 'https://www.facebook.com/sharer/sharer.php?u='
               + page_url;
            break;
          case 'twitter':
            url+='https://twitter.com/intent/tweet/?text=' + encodeURIComponent(this.title);
            url+='&url=' + page_url;
            break;
          default:
            console.log('There is no such share service in your `switch`!');
            break;
        }

        window_open(url);
      });
    }
  };

  // Return to the user only the init function
  return{init:init}
}();

// Just call this function to initiate everything.
shareButtons.init();
{% endhighlight %}

What we need to create is a main.js file as we had in our examples before, and a ShareButtons.js file with our module and begin by writing the functions we are going to use in our module.

#### ShareButtons.js

We can use let instead of var for everything without getting and error. This was a trial and error to for me. Every traditional function code is replaced with arrow functions. This module still reveals only the init function to the user.

{% highlight javascript %}
    let shareButtons = function(){

        // Select all our buttons with the js-share-button class
        let shareButtons = document.querySelectorAll('.js-share-button');

        // There are no parameters, so a parenthesis is ok here.
        let init = () => {

        };

        //  No need for a parenthesis here we got one parameter
        let window_open = url => {

        };

        let add_listeners_to_buttons = () => {

        };

        // Return to the user only the init function
        return{init:init}
    }();
{% endhighlight %}

Nothing else is changed in our `init` or `window_open` function
{% highlight javascript %}

  let init = () => {
    add_listeners_to_buttons();
  };

  let window_open = url => {
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300');
  }
{% endhighlight %}

The most interesting parts are in the `add_listeners_to_buttons` function.

First of all instead of using a `for(var i=....)` function we used the new ES6 `for...of` to iterate through our array of elements. Then we replaced our traditional string concatenation with the new ES6 string templates as we did in our examples before. That was easy and fun, I must say!

{% highlight javascript %}
  let add_listeners_to_buttons = () => {

    for (let button of shareButtons) {
      button.addEventListener('click', e => {
        e.preventDefault();

        let service = button.getAttribute('data-service'),
            title = encodeURIComponent(button.title),
            page_url = encodeURIComponent(button.href),
            url = '';

        switch (service) {
          case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${page_url}`;
            break;
          case 'twitter':
            url = `https://twitter.com/intent/tweet/?text=${title}&url=${page_url}`;
            break;
          default:
            console.log(`There is no ${service} share service in your 'switch'!`);
            break;
        }

        window_open(url);
      });
    }
  };
{% endhighlight %}

And now the evil event listener with arrow function and `this`!

First I tried using `this.getAttribute()` and never worked. Of course it never worked, it returned undefined, because `this` doesn't refer to the dom element but to some parent function.
{% highlight javascript %}
    button.addEventListener('click', e => {
        e.preventDefault();

        let service = button.getAttribute('data-service'),
            title = encodeURIComponent(button.title),
            page_url = encodeURIComponent(button.href),
            url = '';
        ...
    });
{% endhighlight %}

After some research(google it) and some experemental time I came to the conclusion that I could either use a traditional `function(e) {}` to get `this` to work or (the experemental time we talked about) use the button variable that keeps the dom element. I wasn't sure this would work but there was no error and the buttons worked whithout a problem. Up to this time I 'm sure there is a way to make arrow functions and `this` work inside an event listener but I don't know it.

Another conceptual 'problem' I faced was the "What I am going to export? The main function? The init? What I am talking about? I just want to give the init to the user will the function export expose the other functions too?" and other fun things like these. At the end, it was easy, I needed to export the `ShareButtons` function and expose only the `init()` like I did before. Nothing else will be visible to the user.

So to export our module we add to the end of our ShareButtons.js file `export default shareButtons;`. And that's all for our module. It's ready. I know this wasn't difficult but if you create it from scratch you are going to face some problems - or not. I did :).

Remember, we could make this a class or we could separate our `window_open` to another module and use it in our module to make things more interesting.

So, this is our complete module:

{% highlight javascript %}
let shareButtons = function(){

  // Select all our buttons with the js-share-button class
  let shareButtons = document.querySelectorAll('.js-share-button');

  let init = () => {
    add_listeners_to_buttons();
  };

  //  No need for a parenthesis here we got one parameter
  let window_open = url => {
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=500,height=300');
  };

  let add_listeners_to_buttons = () => {

    for (let button of shareButtons) {
      /*
        We cannot use an arrow function because `this` will return `undefined`.
        So, we are using the button variable to have the preferred functionality.
      */
      button.addEventListener('click', e => {
        e.preventDefault();

        let service = button.getAttribute('data-service'),
            title = encodeURIComponent(button.title),
            page_url = encodeURIComponent(button.href),
            url = '';

        switch (service) {
          case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${page_url}`;
            break;
          case 'twitter':
            url = `https://twitter.com/intent/tweet/?text=${title}&url=${page_url}`;
            break;
          default:
            console.log(`There is no ${service} share service in your 'switch'!`);
            break;
        }

        window_open(url);
      });
    }
  };

  // Return to the user only the init function
  return{init:init}
}();

export default shareButtons;
{% endhighlight %}

#### main.js

For our main.js file things are much easier. We just import our module as we did before and call the init function.

{% highlight javascript %}
import ShareButtons from './ShareButtons';

ShareButtons.init();
{% endhighlight %}

### The code

You can try this code by downloading <a href="https://github.com/codegaze/es6-module-codegaze-blog-post-code">this</a> repository from my github account.

### Conclusion

Well, this was a big and fun post, at least for me.

As I said before, ES6 is new to me and I 'm sure there are some errors in my concept or the code and it would be great if someone has any comment on this to make it better.
Cheers!
