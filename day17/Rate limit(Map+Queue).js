//frame 2~11 line
const userQueues = new Map();

function handleRequest(userId, task) {
  if (!userQueues.has(userId)) {
    userQueues.set(userId, new RequestQueue(2));
  }

  const queue = userQueues.get(userId);
  queue.add(task);
}

class RequestQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._runNext();
    });
  }

  _runNext() {
    if (this.running >= this.concurrency) return;
    const next = this.queue.shift();
    if (!next) return;

    this.running += 1;

    Promise.resolve()
      .then(() => next.task())
      .then(result => next.resolve(result))
      .catch(err => next.reject(err))
      .finally(() => {
        this.running -= 1;
        this._runNext();
      });

    if (this.running < this.concurrency) {
      this._runNext();
    }
  }
}