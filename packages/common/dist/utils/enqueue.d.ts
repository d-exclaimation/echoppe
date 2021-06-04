/// <reference types="node" />
/**
 * Any function that takes no argument does not return a value
 */
export declare type ThreadTask = () => void;
/**
 * Returned TaskQueue from a ThreadTask, which is either a Timeout or a Promise
 * ```ts
 * const ref: NodeJS.Timeout = enqueue(() => {});
 * clearTimeout(ref);
 * ```
 */
export declare type TaskQueue<Fn extends ThreadTask> = NodeJS.Timeout | Promise<void | ReturnType<Fn>>;
/**
 * QueueOptions
 * Macro / Micro task
 */
export declare type QueueOptions = {
    task: "macro";
    delay: number;
} | {
    task: "micro";
};
/**
 * Queued a function / callback to the macro / micro task (defaults to "macro")
 *
 * ---
 * e.g.
 * ```ts
 * enqueue(() => console.log("hello"));
 * console.log("hello again");
 * ```
 * 1. hello again
 * 2. hello
 */
export declare const enqueue: <Fn extends ThreadTask>(task: Fn, options?: QueueOptions) => TaskQueue<Fn>;
