type FilterFunction = <T>(item: T) => boolean;

type Filter = {
  operator: "and" | "or";
  filters: Array<Filter | FilterFunction>;
};

/**
 *
 * @param item
 * @param filter
 * @returns
 */
function applyFilters<T>(item: T, filter: Filter | FilterFunction): boolean {
  if ("operator" in filter) {
    return filter.filters.reduce(
      (acc, curr) => {
        const filterValue =
          "operator" in curr ? applyFilters(item, curr) : curr(item);

        switch (filter.operator) {
          case "and":
            return acc && filterValue;
          case "or":
            return acc || filterValue;
        }
      },
      // Initialize it at "true" if operator is AND, "false" if it's OR
      filter.operator === "and"
    );
  }

  return filter(item);
}

/**
 *
 * @param filter
 * @returns
 *
 * Examples:
 *
 * {
 *   operator: "and",
 *   filters: [
 *     hasValue,
 *     lessThan(5),
 *   ]
 * }
 *
 * {
 *   operator: "or",
 *   filters: [
 *     {
 *       operator: "and",
 *       filters: [
 *         notNull.on("age"),
 *         equal("Bob").on("name"),
 *       ]
 *     },
 *     match(/[0-9]/).not,
 *     greaterThanOrEqual(5).on("age"),
 *   ]
 * }
 *
 */
function combine<T>(filter: Filter | FilterFunction) {
  return function (item: T) {
    return applyFilters(item, filter);
  };
}

export default combine;
