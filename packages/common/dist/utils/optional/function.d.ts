/**
 * Optional Function,
 * Any function that does not return a value
 */
declare type OptionalFunction<T = unknown> = ((params: T) => void) | undefined;
/**
 * Applies Optional Function
 * @returns a function if defined otherwise returnes a empty function
 */
export declare const optional: <T>(fn: OptionalFunction<T>) => (params: T) => (params: T) => void;
export {};
