class Scheduler{
    constructor(limit){
        this.limit =limit;
        this.running = 0;
        this.queue =[];
    }

    add(task){
        return new Promise(resolve =>{
            this.queue.push({task,resolve});
            this.runNext();
        })
    }

    runNext(){
        if(this.running >= this.limit)return;
        if(this.queue.length ===0)return;
        const {task,resolve} =this.queue.shift();
        this.running++;

        console.log("start");

        task()
        .then(resolve)
        .finally(()=>{
            console.log("end");
            this.running--;
            this.runNext();
        })
    }
}


// 1. Utility function to simulate an asynchronous task:
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time);
});

// 2. Instantiate the scheduler with a concurrency limit of 2
const scheduler = new Scheduler(2);

// 3. Helper function to add tasks easily and log their status
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(`Task ${order} fished (Expected duration ${time}ms)`));
};

// 4. Batch add 5 tasks with varying durations
addTask(1000, '1'); // 1秒
addTask(500, '2');  // 0.5秒
addTask(300, '3');  // 0.3秒
addTask(400, '4');  // 0.4秒
addTask(100, '5');  // 0.1秒