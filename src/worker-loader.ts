import { ErrorCallback } from "typescript";

/**
 * A small queue where we queue "OnSuccess" functions
 * for each request sent. For each request, a success
 * function gets queued. Upon each incoming message,
 * we dequeue and execute the "OnSuccess function".
 *
 * TODO: Implement a more efficient queuing system.
 */
class ResponseQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(onSuccessFn: Function) {
    return this.queue.push(onSuccessFn);
  }
  dequeue() {
    return this.queue.shift();
  }

  queue: Array<Function>;
}

/**
 * This class is used as an intermediary between
 * the WebWorker and the application client.
 * It currently supports two main message types:
 *
 *  1. HTTP Request/Response objects.
 *  2. binary file transfers.
 */
export class WorkerManager {
  constructor() {
    this.queue = new ResponseQueue();
    this.worker = new Worker("./worker.js");
  }

  run(
    script: string,
    context: Payload,
    onSuccess: Function,
    onError: Function
  ): void {
    this.queue.enqueue(onSuccess);
    this.worker.onerror = (e) => onError(e);
    this.worker.onmessage = (e) => {
      console.log("[4. Message received from worker]", e.data);
      const success = this.queue.dequeue();
      return success(e.data.results);
    };
    this.worker.postMessage({
      ...context,
      python: script,
    });
  }

  /**
   * Runs a Python script on the WebWorker
   * @param script python script to run
   * @param context optional additional arguments
   * @returns BlobPart or string
   */
  asyncRun(script: string, context: Payload): Promise<BlobPart | string> {
    return new Promise(
      (onSuccess: Function, onError: (e: ErrorEvent) => any) => {
        this.run(script, context, onSuccess, onError);
      }
    );
  }

  async fsReadDir(dir: string): Promise<string> {
    return new Promise(
      (onSuccess: Function, onError: (e: ErrorEvent) => any) => {
        this.worker.onerror = onError;
        this.worker.onmessage = (e: MessageEvent) => onSuccess(e.data.results);
        this.worker.postMessage({
          fsCommands: {
            msgType: "readdir",
            param: dir,
          },
        });
      }
    );
  }

  async fsReadFile(file: string): Promise<BlobPart | string> {
    return new Promise(
      (onSuccess: Function, onError: (e: ErrorEvent) => any) => {
        this.worker.onerror = onError;
        this.worker.onmessage = (e: MessageEvent) => onSuccess(e.data.results);
        this.worker.postMessage({
          fsCommands: {
            msgType: "readFile",
            param: file,
          },
        });
      }
    );
  }

  queue: ResponseQueue;
  worker: Worker;
}

type Payload = { [key: string]: any };
