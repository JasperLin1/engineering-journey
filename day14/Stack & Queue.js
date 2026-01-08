//Queue practice
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    // put it behind.
    this.items.push(item);
  }

  dequeue() {
    // Take it out from the front.
    if(this.isEmpty()){
        return "Queue is empty";
    }
    return this.items.shift();
  }

  isEmpty() {
    // Check if it is empty.
    return this.items.length === 0;
  }
}
