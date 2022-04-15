import isDateOrNumber from "./utils/is-date-or-number";

import createFilterCompareFunction from "./create-filter-compare-function";
import combine from "./combine";

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
export { createFilterCompareFunction, combine };
