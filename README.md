# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- 
### Screenshot

![](/assets/images/screenShot.png)

### Links

- [Solution URL](https://your-solution-url.com)
- [Live Site URL](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- BEM
- Flexbox
- Mobile-first workflow
- JS
- OOP

### What I learned

- To convert a string to an integer and calculate an equation, I used the following code:

```js
eval("50 + 50");
```

There is a small error when I write eval("02 + 0003"). It converts the numbers to octal because of the leading zeros. To solve this, I removed the unnecessary zeros before the numbers using the following regex:

```js
theEquation = theEquation.replace(/([+\-*/])0+(\d+)/g, "$1$2");
```