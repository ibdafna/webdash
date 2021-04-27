class ResponseQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(onSuccessFn) {
    return this.queue.push(onSuccessFn);
  }
  dequeue() {
    return this.queue.shift();
  }

  queue: Array<Function>;
}

export class WorkerManager {
  constructor() {
    this.queue = new ResponseQueue();
    this.worker = new Worker("./worker.js");
  }

  run(script, context, onSuccess, onError): void {
    this.queue.enqueue(onSuccess);
    this.worker.onerror = e => onError(e);
    this.worker.onmessage = e => {
      console.log("[4. Message received from worker]", e.data);
      const success = this.queue.dequeue();
      return success(e.data.results);
    };
    this.worker.postMessage({
      ...context,
      python: script
    });
  }

  asyncRun(script, context): Promise<any> {
    return new Promise((onSuccess, onError) => {
      this.run(script, context, onSuccess, onError);
    });
  }

  async fsReadDir(dir): Promise<any> {
    return new Promise((onSuccess, onError) => {
      this.worker.onerror = onError;
      this.worker.onmessage = (e: MessageEvent) => onSuccess(e.data.results);
      this.worker.postMessage({
        fsCommands: {
          msgType: "readdir",
          param: dir
        }
      });
    });
  }

  async fsReadFile(file): Promise<any> {
    return new Promise((onSuccess, onError) => {
      this.worker.onerror = onError;
      this.worker.onmessage = (e: MessageEvent) => onSuccess(e.data.results);
      this.worker.postMessage({
        fsCommands: {
          msgType: "readFile",
          param: file
        }
      });
    });
  }

  queue: ResponseQueue;
  worker: Worker;
}
