/// <reference types="node" />
export declare type ThreadTask = () => void;
export declare const enqueue: <Fn extends ThreadTask>(task: Fn) => NodeJS.Timeout;
