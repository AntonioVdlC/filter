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

/**
 *
 * @param value
 * @returns
 */
function equal<T>(value: T) {
  /**
   *
   * @param item
   * @returns
   */
  function fn(item: T | null): boolean {
    // TODO: add deep equality for non-primitive types
    return item === value;
  }

  /**
   *
   * @param key
   * @returns
   */
  fn.on = function <T>(key: string) {
    return function (item: T) {
      return fn(getValueByKey(item, key));
    };
  };

  return fn;
}

export { notNull, hasValue, equal };
