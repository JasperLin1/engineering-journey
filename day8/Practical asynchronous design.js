// ex1
async function foo() {
  console.log("1");
  await bar();
  console.log("3");
}

async function bar() {
  console.log("2");
}

foo();

// ex2(compare with ex1)

async function foo() {
  console.log("1");
  await Promise.resolve();
  console.log("3");
}

async function bar() {
  console.log("2");
}

foo();
bar();

//add practice asynchronous design exercise