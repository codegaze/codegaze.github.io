---
layout: post
title: BEMIT CSS based grid mixin
keywords: BEMIT, css, csswizardry, sass, codegaze, bem
description: Create a grid based on a Harry Roberts' article
post_description: Create a grid based on a Harry Roberts' article.
keywords: CSS,SASS,BEM
---

After reading [this](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) article from [@csswizardry](https://twitter.com/csswizardry) about taking the BEM naming a step further I wanted to create as simple mixin to build grid classes with this pattern ```u-1/3@md```.

If you 've read any of Harry Roberts' articles, you know that ```u``` stands for utility, ```1/3``` declares that this element takes one third of the available space  and ```@md``` declares the breakpoint.


**Pros:**

* The CSS and HTML code is highly readable for you and your coworkers
* Abstraction/DRY

**Cons:**

* CSS size
* Declaration of layout in the dom


I want to say is that I am using this in a project, but this is simple prototype and it needs tuning.
I need to come up with an elegant way to add a 'hide this' feature without having to declare it to each grid item because not everyone has the privilege to mess with the backend item loop (if there is any).

This is the (current) sass code to create this kind of grid.

{% highlight css %}

@mixin u-grid-setup($namespace, $width) {
  
  @media screen and (min-width: $width) {

    @for $i from 1 through $max-cols {

      // If is in the ingore list do nothing
      @if( index($ignore, $i)) {}
      @else {
        $j: 1;
        
        // Take care of the one col 100% width
        // The `\` character is used to escape characters
        @if $j == 1 and $i == 1 {
          .u-#{$j}\/#{$i}\@#{$namespace} {
              width: percentage($j/$i); 
          }
        }
        
        // Take care of the rest
        @while $j < $i {
          .u-#{$j}\/#{$i}\@#{$namespace} {
              width: percentage($j/$i); 
          }
          
          $j: $j + 1
        }
      }
    }

  }
}

  @for $i from 1 through length($versions) {
    @include u-grid-setup( nth($versions, $i), nth($sizes, $i) + px );
  }

{% endhighlight %}

Somewhere in our sass file we need to declare the variables we used in our mixin:

{% highlight css %}

// Set your breakpoints' names and sizes
$versions: "sm", "md", "lg";
$sizes: 320, 768, 1024;

// Set breakpoint unit
$unit: 'px';
// Set you max columns
$max-cols: 12;

// Set columns you want to ignore separated by comma e.g 7,8
$ignore: '';

{% endhighlight %}


You don't need to mess with the mixin, you can just declare you variables and compile your files.

You can get a more structured code in my [github repository](https://github.com/codegaze/bemit-u-grid).

If you have any comments or recommendations feel free to comment here or on github.