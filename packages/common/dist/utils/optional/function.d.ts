/**
 * Optional Function,
 * Any function that does not return a value
 */
declare type OptionalFunction = ((...args: never[]) => void) | undefined;
/**
 * Applies Optional Function
 * @returns a function if defined otherwise returnes a empty function
 */
export declare const optional: <Fn extends OptionalFunction>(fn: Fn) => (() => void) | NonNullable<Fn>;
export {};
