# How exactly are the function calls ordered in an asynchronous JavaScript program?

As you might be aware by now JavaScript engine executes on a single thread, so how are asynchronous operations handled? You are partially true in the below statement, but there is more to it :

> Consider the above code. I learnt that JS uses a call-stack and an event-queue to order the execution of instructions.

True, we do have a call stack and an event loop. But we also have a WEB APIs environment, Call-back Queue and a Micro-task Queue.

Whenever there is any asynchronous task, it moves to the WEB API Environment, for example, when you have an tag with a very large image in the "src" attribute, this image is not downloaded synchronously, because that would block the thread, instead it is moved into the WEB API Environment where the image is loaded.

> <img src="largeimg.jpg">