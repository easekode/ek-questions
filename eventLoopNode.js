//how nextTick queue, micro task queue, and macrotask queue work in Node.js
setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve('Promise 1').then(console.log);
  Promise.reject('Promise 2').catch(console.log);
  process.nextTick(console.log, 'nextTick 1');
}, 0);

setTimeout(console.log, 0, 'setTimeout 2');
setTimeout(console.log, 0, 'setTimeout 3');

//WIP file
