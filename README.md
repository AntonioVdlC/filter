# filter

[![version](https://img.shields.io/npm/v/@antoniovdlc/filter.svg)](http://npm.im/@antoniovdlc/filter)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/filter.svg)](https://github.com/AntonioVdlC/filter/issues)
[![downloads](https://img.shields.io/npm/dt/@antoniovdlc/filter.svg)](http://npm.im/@antoniovdlc/filter)
[![license](https://img.shields.io/npm/l/@antoniovdlc/filter.svg)](http://opensource.org/licenses/MIT)

Custom filter functions for arrays.

## Installation

This package is distributed via npm:

```
npm install @antoniovdlc/filter
```

## Motivation

Filtering arrays is a common operation in JavaScript, so this library provides some common custom compare functions to have a more declarative way of filtering arrays.

## Usage

You can use this library either as an ES module or a CommonJS package:

```js
import { hasValue, equal, match, lesserThan } from "@antoniovdlc/filter";
```

_- or -_

```js
const { hasValue, equal, match, lesserThan } = require("@antoniovdlc/filter");
```

## Examples

All filter functions can be used out of the box for filtering as follows:

```js
import { lesserThan } from "@antoniovdlc/filter";

const arr = [1, 2, 2, 23, 30, 4];
arr.filter(lesserThan(5)); // [1, 2, 2, 4]
```

You can revert every filtering functions by appending `.not`:

```js
import { lesserThan } from "@antoniovdlc/filter";

const arr = [1, 2, 2, 23, 30, 4];
arr.filter(lesserThan(5).not); // [23, 30]
```

Finally, all filter functions provide a `.on("key")` function which allows to sort arrays of objects by nested fields:

```js
const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
];
arr.filter(greaterThanOrEqual(40).on("age"));
/*
[
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
]
*/
```

The same `.not` function can be used for filtering arrays of objects:

```js
const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
];
arr.filter(greaterThanOrEqual(40).on("age").not);
/*
[
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
]
*/
```

## Filter functions

Here is a list of provided compare functions:

### notNull

Removes `null` values from an array.

### hasValue

Removes falsy values from an array (except 0).

### equal(value)

Keeps all values that are strictly equal to `value`.
Uses [lodash.isequal](https://www.npmjs.com/package/lodash.isequal)

### lesserThan(value) / lesserThanOrEqual(value) / greaterThan(value) / greaterThanOrEqual(value)

Filters on numerical or date values applying the appropriate comparaison function.

### match(pattern)

Keeps all values that match the provided `pattern`.

## Creating custom filtering functions

You can create your own filtering functions by using the `createFilterFunction()` function:

```js
import { createFilterFunction } from "@antoniovdlc/filter";

const contains = createFilterFunction(
  (item, value) => Array.isArray(item) && item.includes(value)
);

const arr = [
  { name: "Bob", age: 23, values: [1, 2, 5] },
  { name: "Alice", age: 32, values: [4, 3] },
  { name: "Tom", age: 60, values: [8] },
  { name: "Candice", age: 45, values: [1, 2, 4, 8] },
];
arr.filter(contains(8).on("values"));
/*
[
  { name: "Tom", age: 60, values: [8] },
  { name: "Candice", age: 45, values: [1, 2, 4, 8] },
]
*/
```

```js
import { createFilterFunction } from "@antoniovdlc/filter";

const isBob = createFilterFunction((item, value) => item === value)("Bob");

const arr = ["Bob", "Alice", "Tom", "Candice"];
arr.filter(isBob); // ["Bob"]
arr.filter(isBob.not); // ["Alice", "Tom", "Candice"]
```

Out of the box, your custom filtering functions have the same attributes and methods as the default filtering functions (such as `.not` or `.on()`)!

## Combining filtering functions

You can also combine multiple filtering functions.

Let's say that for example, you need to filter an array of users first by name matching a pattern, and then by age lower than 40 and higher than 30, or age equal to 45. You can achieve that as follows:

```js
import { combine } from "@antoniovdlc/filter";

const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
  { name: "Alice", age: 28 },
];
arr.filter(
  combine({
    operator: "and",
    filters: [
      match(/ice$/).on("name"),
      {
        operator: "or",
        filters: [
          {
            operator: "and",
            filters: [lesserThan(40).on("age"), greaterThan(30).on("age")],
          },
          equal(45).on("age"),
        ],
      },
    ],
  })
);
/*
[
  { name: "Alice", age: 32 },
  { name: "Candice", age: 45 },
]
*/
```

## License

MIT
