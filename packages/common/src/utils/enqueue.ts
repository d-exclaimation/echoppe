//
//  enqueue.ts
//  echoppe
//
//  Created by d-exclaimation on 14:18.
//

export type ThreadTask = () => void;
export type TaskQueue<Fn extends ThreadTask> =
  | NodeJS.Timeout
  | Promise<void | ReturnType<Fn>>;
export type QueueOptions = { task: "macro"; delay: number } | { task: "micro" };

export const enqueue = <Fn extends ThreadTask>(
  task: Fn,
  options: QueueOptions = { task: "macro", delay: 0 }
): TaskQueue<Fn> =>
  options.task === "macro"
    ? setTimeout(task, options.delay)
    : Promise.resolve().then(task);
