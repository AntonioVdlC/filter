import getValueByKey from "get-value-key";

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

export default createFilterCompareFunction;
