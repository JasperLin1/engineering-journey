const conter = new Map();

function recordRequest(userId){
    if(conter.has(userId)){
        conter.set(userId,conter.get(userId)+1 );
    }else{
        conter.set(userId,1);
    }
}

//test
recordRequest(1);
recordRequest(3);
recordRequest(1);
recordRequest(2);
recordRequest(2);
recordRequest(3);
recordRequest(3);
recordRequest(4);


const sortArray = Array.from(conter).sort((a,b)=>{
    return a[0]-b[0];  // if a minus b smaller than 0, a will be ranked ahead of b.
});                     // if want to ranked who is number one, b[1] - a[1]

const sortMap = new Map(sortArray);

console.log(sortMap);
