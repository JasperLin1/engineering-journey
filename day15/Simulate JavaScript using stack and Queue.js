// what the output order?
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");

  setTimeout(() => {
    console.log("D");
  }, 0);
});

(async function () {
  console.log("E");
  await Promise.resolve();
  console.log("F");
})();

console.log("G");
