//Part 1
/*Call Stack（synchronous）
→ Microtask Queue（Promise.then / await）
→ Macrotask Queue（setTimeout / setInterval）*/

//Part 2 
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

(async function () {
  console.log("D");
  await null;
  console.log("E");
})();

console.log("F");

//Part 3 
await something;
console.log("X");
/* equal*/
Promise.resolve(something).then(() => {
  console.log("X");
});

// Part 4
/*
❌ `await` freezes the entire program.

✅ It only freezes the currently asynchronous function.

❌ `await` always takes a long time.

✅ `await null` / `await 1` also toggle microtasks.

❌ `Promise.all` executes sequentially.

✅ It executes in parallel, waiting for all instances to complete.
*/

//Part 5
// Writing method A
await task1();
await task2();
await task3();

// Writing method B
const p1 = task1();
const p2 = task2();
const p3 = task3();
await Promise.all([p1, p2, p3]);

