
/**
 * Using process.nextTick()
   The process.nextTick() method is used to add a callback function to the microtask 
   queue that is executed immediately after the current function completes. 
 */

function main() {
    console.log('Start!');
    process.nextTick(() => {
      console.log('Text!');
    });
    console.log('End!');
  }
  main();