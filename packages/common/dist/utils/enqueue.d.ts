/// <reference types="node" />
export declare type ThreadTask = () => void;
export declare type TaskQueue<Fn extends ThreadTask> = NodeJS.Timeout | Promise<void | ReturnType<Fn>>;
export declare type QueueOptions = {
    task: "macro";
    delay: number;
} | {
    task: "micro";
};
export declare const enqueue: <Fn extends ThreadTask>(task: Fn, options?: QueueOptions) => TaskQueue<Fn>;
