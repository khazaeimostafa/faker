/**
 * Bind all functions of the given instance to itself so you can use them independently.
 *
 * @internal
 *
 * @param that The class instance of which the methods are to be bound to itself.
 *
 * @example
 * const someModule = new SomeModule(faker);
 * bindThisToMemberFunctions(someModule); // Usually called inside the constructor passing `this`
 * const someMethod = someModule.someMethod;
 * someMethod(); // Works
 */
export function bindThisToMemberFunctions<
  TClass extends { new (...args: any[]): any }
>(that: InstanceType<TClass>): void {
  // Bind `this` so namespaced is working correctly
  for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(that))) {
    if (name === 'constructor' || typeof that[name] !== 'function') {
      continue;
    }

    that[name] = that[name].bind(that);
  }
}
