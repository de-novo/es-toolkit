import { compareValues } from '../_internal/compareValues';

/**
 * Sorts an array of objects based on the given `criteria`.
 *
 * - If you provide keys, it sorts the objects by the values of those keys.
 * - If you provide functions, it sorts based on the values returned by those functions.
 *
 * The function returns the array of objects sorted in ascending order.
 * If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} arr - The array of objects to be sorted.
 * @param {Array<((item: T) => unknown) | keyof T>} criteria - The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
 * @returns {T[]} - The sorted array.
 *
 * @example
 * const users = [
 *  { user: 'foo', age: 24 },
 *  { user: 'bar', age: 7 },
 *  { user: 'foo ', age: 8 },
 *  { user: 'bar ', age: 29 },
 * ];
 *
 * sortBy(users, ['user', 'age']);
 * sortBy(users, [obj => obj.user, 'age']);
 * // results will be:
 * // [
 * //   { user : 'bar', age: 7 },
 * //   { user : 'bar', age: 29 },
 * //   { user : 'foo', age: 8 },
 * //   { user : 'foo', age: 24 },
 * // ]
 */
export function sortBy<T extends object>(arr: T[], criteria: Array<((item: T) => unknown) | keyof T>): T[] {
  return arr.slice().sort((a, b) => {
    for (let i = 0; i < criteria.length; i++) {
      const iteratee = criteria[i];
      const iterateeIsFunction = typeof iteratee === 'function';

      const valueA = iterateeIsFunction ? iteratee(a) : a[iteratee];
      const valueB = iterateeIsFunction ? iteratee(b) : b[iteratee];

      const result = compareValues(valueA, valueB, 'asc');

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });
}
