import getValueByKey from "get-value-key";

/**
 *
 * @param item
 * @returns
 */
function notNull<T>(item: T): boolean {
  return item != null;
}
/**
 *
 * @param key
 * @returns
 */
notNull.on = function <T>(key: string) {
  return function (item: T) {
    return notNull(getValueByKey(item, key));
  };
};

/**
 *
 * @param item
 * @returns
 */
function hasValue<T>(item: T): boolean {
  return Boolean(item) || (typeof item === "number" && item === 0);
}
/**
 *
 * @param key
 * @returns
 */
hasValue.on = function <T>(key: string) {
  return function (item: T) {
    return hasValue(getValueByKey(item, key));
  };
};

function createFilterCompareFunction(
  compareFn: <T>(item: T | null, value: T) => boolean
) {
  return function <T, V>(value: V) {
    function fn(item: T | V | null): boolean {
      return compareFn(item, value);
    }

    fn.on = function <T>(key: string) {
      function on(item: T) {
        return fn(getValueByKey(item, key));
      }

      on.not = function (item: T): boolean {
        return fn.not(getValueByKey(item, key));
      };

      return on;
    };

    fn.not = function (item: T | V | null): boolean {
      return !compareFn(item, value);
    };

    return fn;
  };
}

const equal = createFilterCompareFunction((item, value) => {
  // TODO: add deep equality for non-primitive types
  return item === value;
});

const match = createFilterCompareFunction((item, value) => {
  if (!(value instanceof RegExp)) {
    throw new Error("Error");
  }

  return value.test(String(item));
});

export { notNull, hasValue };
export { equal, match };
