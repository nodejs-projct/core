import { isMainThread, parentPort, Worker } from "worker_threads";


import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// Get the current file's URL
const __filename = fileURLToPath(import.meta.url);
if (isMainThread) {
  console.log("main theard: Starting worker");

  const worker = new Worker(__filename);

  worker.on("message", (message) => {
    console.log("main thread received: ", message);
  });
} else {
  parentPort.postMessage("hello from thread worker");
}
