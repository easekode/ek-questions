/*
This code demonstrates the order of execution for various asynchronous operations in Node.js:
setTimeout, setImmediate, Promises, and process.nextTick. Here’s a step-by-step explanation with comments added:
*/

console.log('Start'); // Synchronous: prints immediately

setTimeout(() => {
    console.log('setTimeout');
}, 0); // Scheduled in the timers phase of the event loop

setImmediate(() => {
    console.log('setImmediate');
}); // Scheduled in the check phase of the event loop

Promise.resolve().then(() => {
    console.log('Promise');
}); // Microtask: runs after current synchronous code, before next event loop phase

process.nextTick(() => {
    console.log('nextTick');
}); // Runs before other microtasks, after current operation

console.log('End'); // Synchronous: prints immediately

/*
Expected output order:
1. Start
2. End
3. nextTick         // process.nextTick callbacks run before Promises
4. Promise          // Promise microtasks run after nextTick, before timers
5. setTimeout       // setTimeout callbacks run in the timers phase
6. setImmediate     // setImmediate callbacks run in the check phase
Note: setTimeout and setImmediate order may vary depending on the environment, but usually setTimeout runs first if scheduled from the main module.
*/


/*
Key points:

Synchronous code runs first.
process.nextTick runs before Promises.
Promises run before timers and immediates.
setTimeout and setImmediate are scheduled for different phases of the event loop.
The actual order of setTimeout and setImmediate may vary, but in most cases (when run from the main script), setTimeout fires before setImmediate.
*/