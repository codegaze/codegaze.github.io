---
layout: post
title: "Use JavaScript to Navigate Through a Table And Other Elements"
description: Capture key with Javascript to navigate an HTML table or other elements
categories: [JS, Coding]
---

The browser API has given us many tools to navigate through a webpage, and if done correctly, you will have a great result without the use of any Javascript.

In some case though, you might need to enhance some of the navigation experience. Usually, this is a challenge in an application environment, or more specifically, on some elements of the application. And here is when JavaScript comes in handy.

## A Beautiful Table
If you are using Gmail, then you probably have seen that you can navigate between the mail list with your up and down arrow keys. Gmail uses a table, and I have no idea what they are doing under the hood, but let's see how we can accomplish this.

We will go through some sections of the code, but keep in mind that we can use this code for various HTML elements.

## The Basics
Let's get the basic stuff out of the way. We will create an HTML file. Let's call it `index.html`. Yes, we will do everything in a single file, no bundlers or anything.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Use JavaScript to Navigate Through a Table And Other Elements</title>
  <style>
    .is-active {
      box-shadow: inset 0 -1px 0 0 rgb(0 0 0);
    }
  </style>
</head>
<body>
  <table id="mytable" tabindex="0">
    <tr>
      <td>One</td>
     </tr>
     <tr>
      <td>Two</td>
     </tr>
     <tr>
      <td>Three</td>
     </tr>
     <tr>
      <td>Four</td>
     </tr>
     <tr>
      <td>Five</td>
     </tr>
   </table>
  <script></script>
</body>
</html>
```

Here, we have a simple file with a table and a CSS part with one class to visualise a selected table row.

One small addition that makes the difference is the `tabindex` attribute so we can focus on our table.

## The Key Navigation Backbone

Let's design our navigation function. What could be the main parts of it.

```javascript
  <script>
    function navigateElement(elementID, itemsTagName, activeClass, scroller) {
      function handleKeyboard() { };
      function handleScroll() { }
    }
  </script>
```

We have one main function here called `navigateElement` - which I'm sure you can find a better name for it - that takes some parameters. We could have everything hardcoded, but you will probably reuse this in other elements in your application.

* `elementID`: The element we are going to add our key capture event listener to and includes our list items. We need to have this in case we have more than one `navigateElement` instance.
* `itemsTagName`: The element's tag name we will navigate through.
* `activeClass`: The active class we mentioned in our CSS part.
* `scroller`: The element that is responsible for our content overflow. More on that later. Secret sauce.

The `handleKeyboard` does what it promises. It will handle the navigation between items, and the `handleScroll` will be responsible for always having in our viewport the selected element. This simple design is all we need for now.

## The Key Navigation Code
Right now, our page doesn't do anything. Let's add what we promised.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Use JavaScript to Navigate Through a Table And Other Elements</title>
  <style>
    .is-active {
      box-shadow: inset 0 -1px 0 0 rgb(0 0 0);
    }
  </style>
</head>
<body>
  <table id="mytable" tabindex="0">
    <tr>
      <td>One</td>
     </tr>
     <tr>
      <td>Two</td>
     </tr>
     <tr>
      <td>Three</td>
     </tr>
     <tr>
      <td>Four</td>
     </tr>
     <tr>
      <td>Five</td>
     </tr>
   </table>
  <script>
    function navigateElement(elementID, itemsTagName, activeClass, scroller) {
      const mainDOMElement = document.getElementById(elementID);
      const scrollElement = document.getElementById(scroller) || window;
      const items = mainDOMElement.querySelectorAll(itemsTagName);
      const itemsLength = items.length;
      let selection = -1;

      function handleKeyboard(e, which) {
        if (e) e.preventDefault();
        if (!e && !which) return;
        items.forEach(item => item.classList.remove(activeClass));
        const selectedIndex = which || e.which;
        switch (selectedIndex) {
          case 38:
            if (selection == 0) {
              selection = itemsLength - 1;
            } else {
              selection--;
            }
            handleScroll();
            break;
          case 40:
            if (selection == itemsLength - 1) {
              selection = 0;
            } else {
              selection++;
            }
            handleScroll();
            break;
          default:
            break;
        }
        items[selection].classList.add(activeClass);
      };
      function handleScroll() {
        const el = mainDOMElement.getElementsByClassName(activeClass);
        if (el.length) {
          el[0].scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }
      mainDOMElement.addEventListener('keydown', handleKeyboard);
      mainDOMElement.addEventListener("focus", () => {
        if (selection < 0) handleKeyboard(null, 40);
      });
    }

    navigateElement('mytable', 'tr', 'is-active');
  </script>
</body>
</html>

```

If you copy/paste this code in an HTML file, should work out of the box.

Focus on the element and navigate through your up and down arrow keys.

But let's rubberduck the script in sections.

```javascript
function navigateElement(elementID, itemsTagName, activeClass, scroller) {
  const mainDOMElement = document.getElementById(elementID);
  const scrollElement = document.getElementById(scroller) || window;
  const items = mainDOMElement.querySelectorAll(itemsTagName);
  const itemsLength = items.length;
  let selection = -1;
...
};
```


Simple things, we initiate some variables based on our parameters and set a `selection` to `-1`, which means that nothing is selected. If `scroller` is not defined, we get the window as our element.

### The navigation part

```javascript
...
function handleKeyboard(e, which) {
  if (e) e.preventDefault();
  if (!e && !which) return;
  items.forEach(item => item.classList.remove(activeClass));
  const selectedIndex = which || e.which;
  switch (selectedIndex) {
    case 38:
      if (selection == 0) {
        selection = itemsLength - 1;
      } else {
        selection--;
      }
      handleScroll();
      break;
    case 40:
      if (selection == itemsLength - 1) {
        selection = 0;
      } else {
        selection++;
      }
      handleScroll();
      break;
    default:
      break;
  }
  items[selection].classList.add(activeClass);
};
...
```

For each event we capture, we prevent the default behaviour. This is used to avoid browser page or element scrolling, resulting in a weird user experience. We are going to handle it ourselves in `handleScroll`.

Our selected item is based on the `event.which` or just a programmatically given `which` we are utilising the first time someone is focusing the element. If both of these are not set, we just `return`.

We remove the active class from all the items, then we have some logic checking if we are going up or down, and we decide to increase or decrease the selected. We also cover the first/last item case, and we go to the appropriate position.

After we have the selected item, we apply the active class to it.

### The Scrolling Part

Now let's explain a bit the scrolling part. This is one thing I see people forgetting when creating custom navigation in HTML elements.

```javascript
function handleScroll() {
  const el = mainDOMElement.getElementsByClassName(activeClass);
  if (el.length) {
    el[0].scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
}
```

Each time we use our keys to navigate, two things can happen:

1. The browser will catch the key event and scroll any element that could be considered valid, like the screen scroll, for example, and not our element. This is the reason why we use `preventDefault` in our previous code.
2. Since the event is not bubbling up, there is no scrolling happening, and if the content exceeds the viewport, the user won't be able to see the selected item at some point.

This is why we use the fantastic `scrollIntoView`. Before this, we would try to calculate the scrolling position of the wrapper, the element height, offset, and things that sound boring. `scrollIntoView` will solve this, and this is why we are calling it with each key press.

### Adding the Event Listeners

One more thing left. To add the listeners for the key event and choose the first item when the item is focused if no selection is set.

```javascript
mainDOMElement.addEventListener('keydown', handleKeyboard);
mainDOMElement.addEventListener("focus", () => {
  if (selection < 0) handleKeyboard(null, 40);
});
```

We are all set.

## Takeaways
These small snippers are cool the first time you bump into them. After that, it gets a bit boring. You will want to make a helper for it. With some more work, it could include logic for the state if you want to combine it with a frontend framework like React, Vue or anything like that. But this is the basic logic.

If I wasn't lazy, I could also add some checks and validations with some beautiful errors for the developer, but I'll leave this up to you.

Once again, please don't forget to use `tab` to focus on the table first.
