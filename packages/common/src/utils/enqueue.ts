//
//  enqueue.ts
//  echoppe
//
//  Created by d-exclaimation on 14:18.
//

/**
 * Any function that takes no argument does not return a value
 * ```ts
 * // An Example
 * () => setState(prev => prev + 1)
 * ```
 */
export type ThreadTask = () => void;

/**
 * Returned TaskQueue from a ThreadTask, which is either a Timeout or a Promise
 * ```ts
 * // Macro Task returned Timeout referrence
 * const ref: NodeJS.Timeout = enqueue(() => {});
 * clearTimeout(ref);
 * ```
 */
export type TaskQueue<Fn extends ThreadTask> =
  | NodeJS.Timeout
  | Promise<void | ReturnType<Fn>>;

/**
 * QueueOptions
 * Macro / Micro task
 * ```ts
 * // Macro Task
 * enqueue(() => {});
 * enqueue(() => {}, { task: "macro", delay: 0 });
 * // Micro Task
 * enqueue(() => {}, { task: "micro" });
 * ```
 */
export type QueueOptions = { task: "macro"; delay: number } | { task: "micro" };

/**
 * Queued a function / callback to the macro / micro task.
 * Default option is macro task (right after the event loop).
 */
export const enqueue = <Fn extends ThreadTask>(
  task: Fn,
  options: QueueOptions = { task: "macro", delay: 0 }
): TaskQueue<Fn> =>
  options.task === "macro"
    ? setTimeout(task, options.delay)
    : Promise.resolve().then(task);
