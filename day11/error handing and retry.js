// Task1 The real purpose of try/catch
async function run() {
  try {
    await Promise.reject(new Error("boom"));
    console.log("after");
  } catch (err) {
    console.log("caught:", err.message);
  }
}

run();

//Task2 what's happen without try/catch
async function run() {
  await Promise.reject("error");
}

run();
console.log("after");
/* The better way instead writting run() */
run().catch(console.error); or
try {
  await run();
} catch (e) {
  console.error(e);
}


// Task3 The pitfalls of Promise.all
function task(name, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(name + " failed");
      else resolve(name + " ok");
    }, 500);
  });
}

async function run() {
  try {
    const results = await Promise.all([
      task("A"),
      task("B", true),
      task("C")
    ]);
    console.log(results);
  } catch (err) {
    console.log("error:", err);
  }
}

run();

//Task4 How can an engineer salvage the situation (by retrying)
async function retry(test,maxTime =3) {
    for(let i =1;i<=maxTime;i++){
        try{
            const result = await test();
            return result;
    }catch(error){
        console.log(`The ${i} time falue`);
        }
    }
    
    if(i ===maxTime){
        throw error;
    }
    
}

