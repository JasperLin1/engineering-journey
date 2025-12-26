function wait(ms){
    return new Promise((resolve, reject) => {
        if(ms < 0){
            reject (new Error("ms must be positive "))
            return;
        }

        setTimeout(()=>{
            resolve(`waited ${ms} ms`);
        },ms);

    });
}

wait(1000)
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error.message);
    });

// The other better way to write .then ~

async function run(){
    try{
        const result = await wait(1000);
        console.log(result);
    }catch(error){
        console.log(error.message);
    }
}

run();