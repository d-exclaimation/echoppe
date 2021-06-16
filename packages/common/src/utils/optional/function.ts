//
//  function.ts
//  echoppe
//
//  Created by d-exclaimation on 13:10.
//

/**
 * Optional Function,
 * Any function that does not return a value
 */
type OptionalFunction = ((...args: never[]) => void) | undefined;

/**
 * Applies Optional Function
 * @returns a function if defined otherwise returnes a empty function
 */
export const optional = <Fn extends OptionalFunction>(fn: Fn) =>
  fn ?? (() => {});
