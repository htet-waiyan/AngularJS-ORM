AngularJS-ORM - Example of scalable architecture
=============

In 2014 I gave a talk at NG-Conf which (unlike half the talks) contains nothing but rich code practices and tips that was quite different from most of the other talks. Sadly, it got snuck in, unofficially at the last minute. This repo and [Slidedeck](http://slid.es/proloser/angularjs-orm) and [older repo (using coffeescript and sockets](https://github.com/ProLoser/AngularJS-ORM/tree/coffee-sockets) go along with [the conference talk](http://www.youtube.com/watch?v=Iw-3qgG_ipU) to demonstrate a perscription on how to organize and design your angular apps so that you never run into the problems people jump ship to React or other frameworks for, and can meet any design or scalability challenge with the greatest of ease. Open an issue if you've got questions!

The project demonstrates ways to **leverage ui-router to the greatest of it's abilities**, how to **keep your controllers down to 1 line of code**, how to **organize your services** in a completely simplified manner, and how to **leverage resolves** like a god. Keeping your application down to a **tiny handful of directives**. Avoid the nightmare of lifecycle bugs, transition bugs, session/stateful bugs, and **keeping your `$scope` clean and tidy**. It doesn't require using `controller as` and it doesn't mean everything is a directive. Write your code to be **angular-agnostic**. Use the router to **manage state, sessions and collections** allows you to avoid the problems solved with complicated flux architectures. Sharing references means **no more watchers and subscribers** strewn across your app.


[![NG-Conf 2014 Talk](http://i1.ytimg.com/vi/Iw-3qgG_ipU/0.jpg)](http://www.youtube.com/watch?v=Iw-3qgG_ipU)

--------------------------------------

Tips / Notes
-----

#### **I don't use a src, css, view, controller, etc folders**  
In today's code, it's sensible keep modules together and small. HTML, JS and CSS are closely tied together, so we should organize projects that way.

#### **If you can't open-source your directives, they probably shouldn't exist**  
A lot of people will create what I refer to as 'one-off' directives. They should usually just be sub-states.

#### **Don't do state management inside services/factories**  
Even though you have an Auth service, or something else, you should always have them bubble their results up to the top of the promise chain. Alway do URL / state jumping from controllers or state definitions, otherwise people have to go diving through a deeply nested chain of service callbacks to figure out why they keep getting an infinite redirect loop. Your services should be implementation agnostic.

#### **[Keep controllers implementation agnostic](https://github.com/ProLoser/AngularJS-ORM/blob/62ce345d6b6152a332562d58b0ec73d194ca3d8c/modules/Authentication/Login.js#L28-L37)**  
Your controllers should be implementation agnostic. Occasionally people use the `ui-boostrap/modal` service which lets you specify a controller and template and resolves. Inside that controller, you have access to `$modalInstance`, which is actually very bad practice. This means if your boss decides one day to no longer use a modal, you have to refactor the controller too (albeit trivially). Instead, have the `$modalInstance` resolve in a state definition, and use the `onEnter()` and `onExit()` callbacks to clean up implementation-specific logic. This leaves the controller free to just focus on it's internal view-related matters. [Example](https://github.com/ProLoser/AngularJS-ORM/blob/62ce345d6b6152a332562d58b0ec73d194ca3d8c/modules/Authentication/Login.js#L28-L37)

ES6 Syntax
------------

I use ES6 because it gives me easy-to-code classes and because the last line is always returned in arrow functions (which is great for promise chaining). You do not have to use ES6, and should not refactor into it 'just because'.

### How To Read

**Javascript:**
```js
function( x, y, z ){
  return z
}

function x(z) {
  // constructor
  this.y = z;
}
x.prototype.method = function(){}
```
**ES6**
```js
( x, y, z ) => {
  this.whatever // `this` is bound to OUTER scope
  z // last line of functions are always returned
}

class x {
  constructor(z) {
    this.y = z;
  }
  method(z) {}
}
```
