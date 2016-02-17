---
layout: post
title: A simple BEM advice
keywords: BEM, SASS, frontend, codegaze
description: A simple BEM advice and how not to lose your mind
post_description: And how not to lose your mind.
keywords: SASS,BEM
---
For some time now I have been using the BEM methodology for production and I came to a conclusion. 

**"Don't get carried away!"**

What I mean is, when I started using BEM I thought SASS will be my saviour, I will use the sh*t out of '&' and don't ever repeat one single word... 

This was a mistake. If you have a small project that won't scale it's ok, but if you have a big project that will grow, you and your colleagues are going to have a big problem. Code will get more and more complicated, even a simple navigation menu with some modifiers will be difficult to find the right line to change or add something. 

Let me be more clear with an example.

{% highlight css %}
.nav {

  &__item {
    display: inline;
    
    &--primary {
      background: #blue;
    }
    &--dashed {
      border: 1px dashed #000;
    }

    &-link {
      color: #000;
      width: 100%;

      &--gray {
        background: gray;
        color: #fff;
      }
    }
    &-sub {
      &-link {
        .....
      }
    }
  }

}

{% endhighlight %}

This code after a while (or even now) will be incomprehensible. The solution is simple. Write some clean starting points. This code will sure be more readable if we change it to something like this

{% highlight css %}
.nav__item {
  
  display: inline;

  &--primary {
    background: #blue;
    display: block;
  }

  &--dashed {
    border: 1px dashed #000;    
  }

}

.nav__item-sub {
  .....
}

.nav__item-link {
 
  color: #000;
  width: 100%;

  &--gray {
    background: gray;
    color: #fff;    
  }
}

.nav__item-sub-link {
  .......
}
{% endhighlight %}

Now you will know what you are doing the next time you or someone else opens your SASS files.

Cheers!