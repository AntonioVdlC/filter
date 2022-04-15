import getValueByKey from "get-value-key";

/**
 * Creates a filter function, with `.not` and `on("key")` utility fields and methods
 * @param compareFn A function used to filter items
 * @returns A filter functions (to be used in Array#filter())
 */
function createFilterFunction(
  compareFn: <T>(item: T | null, value: T) => boolean
) {
  return function <T, V>(value?: V) {
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

export default createFilterFunction;
