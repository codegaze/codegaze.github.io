---
layout: post
title: Responsive CSS Rounded Buttons
keywords: CSS, responsive, buttons, frontend, codegaze
description: Responsive Rounded Buttons with a few lines of CSS
post_description: With a few lines of CSS.
keywords: SASS
---

Last week I wanted to create three rounded buttons for a client's site. 

I didn't keep it in the design but here is some code and explaination of how this is done for responsive cases.


First of all our button needs to have a wrapper with a width. For our example we are going to use a list.

{% highlight css %}
    
li {
  width: 15%;
  display: inline-block;
}

{% endhighlight %}


Now, each button needs to have 100% width and magic trick number 1: we give a zero height and a ```padding-bottom: 100%``` to resize the height fluidly. And ```overflow: hidden``` to hide the remaining color of the link.

{% highlight css %}

.button {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  overflow: hidden;
}

{% endhighlight %}

For the next part, our link needs to have ```padding-top: 50%;``` & ```padding-bottom: 50%;``` to be in the "middle" of the link and a ```margin-top``` half the size of the ```line-height``` to create an "absolute middle". It's the same logic with absolute centering things.

{% highlight css %}
.button__link {
    border: 1px solid red;
    display: block;
    width: 100%;
    padding-top: 50%;
    padding-bottom: 50%;
    text-align: center;
    color: #fff;
    text-decoration: none;
    line-height: 2em;
    font-size: 2em;
    margin-top: -1em;
    background: #E9C46A; 
  }
{% endhighlight %}

Here is a demo of what we created and the sass code for it.

<ul class="demo--buttons">
  <li>
    <div class="button">
      <a href="#" class="button__link">About</a>
    </div>
  </li><li>
    <div class="button">
      <a href="#" class="button__link">Home</a>
    </div>
  </li><li>
    <div class="button">
      <a href="#" class="button__link">Contact</a>
    </div>
  </li>
</ul>



{% highlight css %}

li {
  width: 15%;
  display: inline-block;
}

.button {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  overflow: hidden;

  &__link {
    border: 1px solid red;
    display: block;
    width: 100%;
    padding-top: 50%;
    padding-bottom: 50%;
    text-align: center;
    color: #fff;
    text-decoration: none;
    line-height: 2em;
    font-size: 2em;
    margin-top: -1em;
    background: #E9C46A; 
  }
}
{% endhighlight %}

That's all you need to know to work with rounded buttons. Below there is a new "section" you can check out about status when I write each post. 

Maybe it works for you too **:)**.


<div class="happy-hour">

  <ul>
    <li>Drink: Coffee</li>
    <li>Listen To: <a href="https://www.youtube.com/watch?v=4a-YB6Cch0w" target="_blank">The Cure - Three Imaginary Boys</a></li>
  </ul>
</div>