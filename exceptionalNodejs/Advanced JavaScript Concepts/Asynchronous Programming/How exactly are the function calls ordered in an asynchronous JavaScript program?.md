# How exactly are the function calls ordered in an asynchronous JavaScript program?

As you might be aware by now JavaScript engine executes on a single thread, so how are asynchronous operations handled? You are partially true in the below statement, but there is more to it :

> Consider the above code. I learnt that JS uses a call-stack and an event-queue to order the execution of instructions.

True, we do have a call stack and an event loop. But we also have a WEB APIs environment, Call-back Queue and a Micro-task Queue.

Whenever there is any asynchronous task, it moves to the WEB API Environment, for example, when you have an tag with a very large image in the "src" attribute, this image is not downloaded synchronously, because that would block the thread, instead it is moved into the WEB API Environment where the image is loaded.

> <img src="largeimg.jpg">

Now, if you want to do something once the image is loaded, you will need to listen to the image's 'load' event.

> document.querySelector('img').addEventListener('load', imgLoadCallback);

Now once the image has been loaded, this callback function is still not executed, instead now it is moved into the callback queue. The callback function waits in the callback queue, the event loop will check for synchronous code, and wait until the call stack is empty. Once the call stack is empty, the event loop will push in a first in callback function into the call stack in one event loop tick. And that is when that call back function is executed.

However, this changes when there are micro-tasks such as Promises. When there is a promise, it is sent to the microtask queue. Microtasks will always have priority over the callbacks and they can and will halt the callbacks until they are executed, event loop will always prioritize microtasks.

**This is how the JavaScript Call Stack, Event Loop, Call Back Queue, Microtasks Queue and WEB API Environments work.**


Now Run this below code, before running try to guess the outcome. It will be exactly as per what I have written above :

```js
//Synchronous Code - Always prioritized over async code
console.log('Asynchronous TEST start');

//It is a 0 Second Timer, But a timer is not a microtask
setTimeout(() => console.log('0 sec timer'), 0);

//Promise is a microtask
Promise.resolve('Resolved promise 1').then(res => console.log(res)); 

//2nd promise is a microtask too
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {} //very large loop
  console.log(res);
});

//Synchronous Code - Always prioritized over async code
console.log('Test end');
```
```
Asynchronous TEST start
Test end
Resolved promise 1
Resolved promise 2
0 sec timer
```