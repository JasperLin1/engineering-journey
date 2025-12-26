/*Question request
1.`createCounter()` returns a function.
2.The number is incremented by 1 each time the function is called.
3.This number cannot be modified directly from outside the function.*/

function createCounter(){
    let count = 0;

    return function(){
        count+=1;
        return count;
    };
}

//test

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());



