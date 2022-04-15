import isEqual from "lodash.isequal";

import isDateOrNumber from "./utils/is-date-or-number";

import createFilterFunction from "./create-filter-function";
import combine from "./combine";

/**
 * Removes items that are `null`.
 */
const notNull = createFilterFunction((item) => item != null)();

/**
 * Removes falsy values from an array (except 0).
 */
const hasValue = createFilterFunction(
  (item) => Boolean(item) || (typeof item === "number" && item === 0)
)();

/**
 * Keeps all values that are equal to `value`.
 * Uses lodash.isequal (https://www.npmjs.com/package/lodash.isequal)
 */
const equal = createFilterFunction((item, value) => {
  return isEqual(item, value);
});

/**
 * Filters on number or date stricly lesser than the `value`.
 */
const lesserThan = createFilterFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item < value;
  }
  return false;
});

/**
 * Filters on number or date stricly lesser or equal than the `value`.
 */
const lesserThanOrEqual = createFilterFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item <= value;
  }
  return false;
});

/**
 * Filters on number or date stricly greater than the `value`.
 */
const greaterThan = createFilterFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item > value;
  }
  return false;
});

/**
 * Filters on number or date greater or equal than the `value`.
 */
const greaterThanOrEqual = createFilterFunction((item, value) => {
  if (item != null && isDateOrNumber(item)) {
    return item >= value;
  }
  return false;
});

/**
 * Keeps all values that match the provided `value` pattern.
 */
const match = createFilterFunction((item, value) => {
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
export { createFilterFunction, combine };
