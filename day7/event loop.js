setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

console.log("C");

//The printing order is C B A , explaination in ReadMe
