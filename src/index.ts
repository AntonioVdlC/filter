import getValueByKey from "get-value-key";

import isDateOrNumber from "./utils/is-date-or-number";

/**
 *
 * @param compareFn
 * @returns
 */
function createFilterCompareFunction(
  compareFn: <T>(item: T | null, value: T) => boolean
) {
  /**
   *
   * @param value
   * @returns
   */
  return function <T, V>(value?: V) {
    /**
     *
     * @param item
     * @returns
     */
    function fn(item: T | V | null): boolean {
      return compareFn(item, value);
    }

    /**
     *
     * @param key
     * @returns
     */
    fn.on = function <T>(key: string) {
      /**
       *
       * @param item
       * @returns
       */
      function on(item: T) {
        return fn(getValueByKey(item, key));
      }

      /**
       *
       * @param item
       * @returns
       */
      on.not = function (item: T): boolean {
        return fn.not(getValueByKey(item, key));
      };

      return on;
    };

    /**
     *
     * @param item
     * @returns
     */
    fn.not = function (item: T | V | null): boolean {
      return !compareFn(item, value);
    };

    return fn;
  };
}

/**
 *
 */
const notNull = createFilterCompareFunction((item) => item != null)();

/**
 *
 */
const hasValue = createFilterCompareFunction(
  (item) => Boolean(item) || (typeof item === "number" && item === 0)
)();

/**
 *
 */
const equal = createFilterCompareFunction((item, value) => {
  // TODO: add deep equality for non-primitive types
  return item === value;
});

/**
 *
 */
const lesserThan = createFilterCompareFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item < value;
  }
  return false;
});

/**
 *
 */
const lesserThanOrEqual = createFilterCompareFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item <= value;
  }
  return false;
});

/**
 *
 */
const greaterThan = createFilterCompareFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item > value;
  }
  return false;
});

/**
 *
 */
const greaterThanOrEqual = createFilterCompareFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item >= value;
  }
  return false;
});

/**
 *
 */
const match = createFilterCompareFunction((item, value) => {
  if (!(value instanceof RegExp)) {
    throw new Error(
      `Error: cannot match again pattern "${value}". Not a regular expression.`
    );
  }
  return value.test(String(item));
});

export { notNull, hasValue };
export {
  equal,
  lesserThan,
  lesserThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  match,
};
export { createFilterCompareFunction };
