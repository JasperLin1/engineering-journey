// use function declaration
function double(num){
    return num*2;
}
// use arrow funtion
const triple = (num)=>{
    return num*3;
}
// const / let (practice)
const number = [1,2,3,4];
let result = [];

for(let i =0; i < number.length; i++){
    result.push(number[i]*2)
}

console.log(result);

// implement map by myself

function myMap(array,callback){
    const output = [];

    for(let i =0; i<array.length; i++){
        output.push(callback(array[i],i))
    }
    
    return output;
}

//test

const nums = [1,2,3];

const doubled = myMap(nums,function(n){return n*2});

console.log(doubled);
