class RequestQueue {
  constructor(limit) {
    this.limit = limit; // Maximum number of simultaneous executions
    this.running = 0;  // Number of tasks currently being executed
    this.queue = [];  // task waiting array
  }

  add(task) {
    // task is a async function
    if(this.running< this.limit){
        this.runTask(task);  // Not yet exceeded the limit → Execute directly
    }else{
        this.queue.push(this.task);  // Exceeding limits → Enter queue
    }
  }

  async runTask(task){
    this.running++;  // Before execution, the counter is incremented by 1

    try{
        await task();  // Execute the task (assuming this is an asynchronous function)
    }finally{
        this.running--;  // Task completed, counter decremented by 1
        this,runNext();  // Try to execute the next queued task
    }
  }

  async runNext() {
    // if it could execute, take one task to run
    if(this.queue.length===0){return};  // No task → End
    if(this.running>= this.limit){return};  // Limit reached → End

    const nextTask = this.queue.shift();  // Take first task in queue
    this.runTask(this.runTask);  // execute it
  }
}

//test
const rq = new RequestQueue(2);

function fakeRequest(id) {
  return async () => {
    console.log("start", id);
    await new Promise(r => setTimeout(r, 1000));
    console.log("end", id);
  };
}

rq.add(fakeRequest(1));
rq.add(fakeRequest(2));
rq.add(fakeRequest(3));
rq.add(fakeRequest(4));
