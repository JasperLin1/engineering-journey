// ex1
async function getData() {
  return 42;
}

async function main() {
  const a = getData();
  const b = await getData();
  console.log(a, b);
}

main();

// ex2(compare with ex1)
async function f() {
  return "hello";
}

const x = f();
x.then(v => console.log(v));
