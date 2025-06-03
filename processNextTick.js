
//microtask queue has 2 component:
//1. next tick queue (CBs queue) (higher precedence)
//2. promise queue (CBs queue) (precedence after next tick queue)

//next tick queue
process.nextTick(() => console.log('next tick 1'))
process.nextTick(() => {
    console.log('next tick 2')
    process.nextTick(() => console.log('next ticket inner 4'));
})
process.nextTick(() => console.log('next tick 3'))

//promise callbacks queue
Promise.resolve('promise cb 1').then(console.log)
Promise.resolve('promise cb 2').then((msg) =>{
    console.log(msg)
    process.nextTick(() => console.log('next tick cb initiated by promise cb'))
})
Promise.resolve('promise cb 3').then(console.log)

//output
/*
next tick 1
next tick 2
next tick 3
next ticket inner 4
promise cb 1
promise cb 2
promise cb 3
next tick cb initiated by promise cb
*/

//in promise promise cb 2, the inner process.nextTick add another callback to next tick queue.
// However the control is in the callback back queue, so the next promise callback will be executed
// once all the promise cb are done, event loop will check again if there is cb in next tick queue and executes it.
