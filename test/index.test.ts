import { describe, it, expect } from "vitest";

import {
  notNull,
  hasValue,
  equal,
  lesserThan,
  lesserThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  match,
  createFilterCompareFunction,
} from "../src";

describe("notNull", () => {
  it("is a function", () => {
    expect(typeof notNull).toBe("function");
  });

  it("filters items that are null", () => {
    const arr = ["hello", 0, null, "", 22];

    const expected = ["hello", 0, "", 22];
    const actual = arr.filter(notNull);

    expect(actual).toEqual(expected);
  });

  describe("notNull.not", () => {
    it("is a function", () => {
      expect(typeof notNull.not).toBe("function");
    });

    it("filters items that are not null", () => {
      const arr = ["hello", 0, null, "", 22];

      const expected = [null];
      const actual = arr.filter(notNull.not);

      expect(actual).toEqual(expected);
    });
  });

  describe("notNull.on", () => {
    it("is a function", () => {
      expect(typeof notNull.on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof notNull.on("")).toBe("function");
    });

    it("filters items that are null", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 0 },
        { name: "Candice" },
      ];

      const expected = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        { name: "Tom", age: 0 },
      ];
      const actual = arr.filter(notNull.on("age"));

      expect(actual).toEqual(expected);
    });

    describe("notNull.on().not", () => {
      it("is a function", () => {
        expect(typeof notNull.on("").not).toBe("function");
      });

      it("filters items that are not null", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 0 },
          { name: "Candice" },
        ];

        const expected = [null, { name: "Candice" }];
        const actual = arr.filter(notNull.on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("hasValue", () => {
  it("is a function", () => {
    expect(typeof hasValue).toBe("function");
  });

  it("filters items that are falsy (except 0)", () => {
    const arr = ["hello", 0, null, "", 22];

    const expected = ["hello", 0, 22];
    const actual = arr.filter(hasValue);

    expect(actual).toEqual(expected);
  });

  describe("hasValue.not", () => {
    it("is a function", () => {
      expect(typeof hasValue.not).toBe("function");
    });

    it("filters items that are not falsy (except 0)", () => {
      const arr = ["hello", 0, null, "", 22];

      const expected = [null, ""];
      const actual = arr.filter(hasValue.not);

      expect(actual).toEqual(expected);
    });
  });

  describe("hasValue.on", () => {
    it("is a function", () => {
      expect(typeof hasValue.on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof hasValue.on("")).toBe("function");
    });

    it("filters items that are falsy (except 0)", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 0 },
        { name: "Candice" },
      ];

      const expected = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        { name: "Tom", age: 0 },
      ];
      const actual = arr.filter(hasValue.on("age"));

      expect(actual).toEqual(expected);
    });

    describe("hasValue.on().not", () => {
      it("is a function", () => {
        expect(typeof hasValue.on("").not).toBe("function");
      });

      it("filters items that are falsy (except 0)", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 0 },
          { name: "Candice" },
        ];

        const expected = [null, { name: "Candice" }];
        const actual = arr.filter(hasValue.on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("equal", () => {
  it("is a function", () => {
    expect(typeof equal).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof equal("")).toBe("function");
  });

  it("filters for values that are equal to the provided value", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [0, 0];
    const actual = arr.filter(
      equal<number | string | null, number | string | null>(0)
    );

    expect(actual).toEqual(expected);
  });

  describe("equal().not", () => {
    it("is a function", () => {
      expect(typeof equal("").not).toBe("function");
    });

    it("filters for values that are notequal to the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", null, "", 22];
      const actual = arr.filter(
        equal<number | string | null, number | string | null>(0).not
      );

      expect(actual).toEqual(expected);
    });
  });

  describe("equal().on", () => {
    it("is a function", () => {
      expect(typeof equal("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof equal("").on("")).toBe("function");
    });

    it("filters for values that are equal to the provided value", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [{ name: "Bob", age: 23 }];
      const actual = arr.filter(equal("Bob").on("name"));

      expect(actual).toEqual(expected);
    });

    describe("equal().on().not", () => {
      it("is a function", () => {
        expect(typeof equal("").on("").not).toBe("function");
      });

      it("filters for values that are not equal to the provided value", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];
        const actual = arr.filter(equal("Bob").on("name").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("lesserThan", () => {
  it("is a function", () => {
    expect(typeof lesserThan).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof lesserThan("")).toBe("function");
  });

  it("filters for values that are lesser than the provided value", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [0, 0];
    const actual = arr.filter(lesserThan(10));

    expect(actual).toEqual(expected);
  });

  it("filters for values that are lesser than the provided value (dates)", () => {
    const arr = [
      new Date("2020-02-02"),
      new Date("1999-01-01"),
      new Date("1970-12-12"),
      new Date("2022-02-22"),
    ];

    const expected = [new Date("1999-01-01"), new Date("1970-12-12")];
    const actual = arr.filter(lesserThan(new Date("2000-01-01")));

    expect(actual).toEqual(expected);
  });

  describe("lesserThan().not", () => {
    it("is a function", () => {
      expect(typeof lesserThan("").not).toBe("function");
    });

    it("filters for values that are not lesser than the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", null, "", 22];
      const actual = arr.filter(lesserThan(10).not);

      expect(actual).toEqual(expected);
    });

    it("filters for values that are not lesser than the provided value (dates)", () => {
      const arr = [
        new Date("2020-02-02"),
        new Date("1999-01-01"),
        new Date("1970-12-12"),
        new Date("2022-02-22"),
      ];

      const expected = [new Date("2020-02-02"), new Date("2022-02-22")];
      const actual = arr.filter(lesserThan(new Date("2000-01-01")).not);

      expect(actual).toEqual(expected);
    });
  });

  describe("lesserThan().on", () => {
    it("is a function", () => {
      expect(typeof lesserThan("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof lesserThan("").on("")).toBe("function");
    });

    it("filters for values that are lesser than the provided value", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [{ name: "Bob", age: 23 }];
      const actual = arr.filter(lesserThan(32).on("age"));

      expect(actual).toEqual(expected);
    });

    describe("lesserThan().on().not", () => {
      it("is a function", () => {
        expect(typeof lesserThan("").on("").not).toBe("function");
      });

      it("filters for values that are not lesser than the provided value", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [null, { name: "Tom", age: 60 }, { name: "Candice" }];
        const actual = arr.filter(lesserThan(40).on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("lesserThanOrEqual", () => {
  it("is a function", () => {
    expect(typeof lesserThanOrEqual).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof lesserThanOrEqual("")).toBe("function");
  });

  it("filters for values that are lesser than or equal to the provided value", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [0, 0];
    const actual = arr.filter(lesserThanOrEqual(10));

    expect(actual).toEqual(expected);
  });

  it("filters for values that are lesser than or equal to the provided value (dates)", () => {
    const arr = [
      new Date("2020-02-02"),
      new Date("1999-01-01"),
      new Date("1970-12-12"),
      new Date("2022-02-22"),
    ];

    const expected = [new Date("1999-01-01"), new Date("1970-12-12")];
    const actual = arr.filter(lesserThanOrEqual(new Date("2000-01-01")));

    expect(actual).toEqual(expected);
  });

  describe("lesserThanOrEqual().not", () => {
    it("is a function", () => {
      expect(typeof lesserThanOrEqual("").not).toBe("function");
    });

    it("filters for values that are not lesser than or equal to the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", null, "", 22];
      const actual = arr.filter(lesserThanOrEqual(10).not);

      expect(actual).toEqual(expected);
    });

    it("filters for values that are not lesser than or equal to the provided value (dates)", () => {
      const arr = [
        new Date("2020-02-02"),
        new Date("1999-01-01"),
        new Date("1970-12-12"),
        new Date("2022-02-22"),
      ];

      const expected = [new Date("2020-02-02"), new Date("2022-02-22")];
      const actual = arr.filter(lesserThanOrEqual(new Date("2000-01-01")).not);

      expect(actual).toEqual(expected);
    });
  });

  describe("lesserThanOrEqual().on", () => {
    it("is a function", () => {
      expect(typeof lesserThanOrEqual("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof lesserThanOrEqual("").on("")).toBe("function");
    });

    it("filters for values that are lesser than or equal to the provided value", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
      ];
      const actual = arr.filter(lesserThanOrEqual(32).on("age"));

      expect(actual).toEqual(expected);
    });

    describe("lesserThanOrEqual().on().not", () => {
      it("is a function", () => {
        expect(typeof lesserThanOrEqual("").on("").not).toBe("function");
      });

      it("filters for values that are not lesser than or equal to the provided value", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [null, { name: "Tom", age: 60 }, { name: "Candice" }];
        const actual = arr.filter(lesserThanOrEqual(40).on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("greaterThan", () => {
  it("is a function", () => {
    expect(typeof greaterThan).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof greaterThan("")).toBe("function");
  });

  it("filters for values that are greater than the provided value", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [22];
    const actual = arr.filter(greaterThan(10));

    expect(actual).toEqual(expected);
  });

  it("filters for values that are greater than the provided value (dates)", () => {
    const arr = [
      new Date("2020-02-02"),
      new Date("1999-01-01"),
      new Date("1970-12-12"),
      new Date("2022-02-22"),
    ];

    const expected = [new Date("2020-02-02"), new Date("2022-02-22")];
    const actual = arr.filter(greaterThan(new Date("2000-01-01")));

    expect(actual).toEqual(expected);
  });

  describe("greaterThan().not", () => {
    it("is a function", () => {
      expect(typeof greaterThan("").not).toBe("function");
    });

    it("filters for values that are not greater than the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", 0, null, "", 0];
      const actual = arr.filter(greaterThan(10).not);

      expect(actual).toEqual(expected);
    });

    it("filters for values that are not greater than the provided value (dates)", () => {
      const arr = [
        new Date("2020-02-02"),
        new Date("1999-01-01"),
        new Date("1970-12-12"),
        new Date("2022-02-22"),
      ];

      const expected = [new Date("1999-01-01"), new Date("1970-12-12")];
      const actual = arr.filter(greaterThan(new Date("2000-01-01")).not);

      expect(actual).toEqual(expected);
    });
  });

  describe("greaterThan().on", () => {
    it("is a function", () => {
      expect(typeof greaterThan("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof greaterThan("").on("")).toBe("function");
    });

    it("filters for values that are greater than the provided value", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [{ name: "Tom", age: 60 }];
      const actual = arr.filter(greaterThan(32).on("age"));

      expect(actual).toEqual(expected);
    });

    describe("greaterThan().on().not", () => {
      it("is a function", () => {
        expect(typeof greaterThan("").on("").not).toBe("function");
      });

      it("filters for values that are not greater than the provided value", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Candice" },
        ];
        const actual = arr.filter(greaterThan(40).on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("greaterThanOrEqual", () => {
  it("is a function", () => {
    expect(typeof greaterThanOrEqual).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof greaterThanOrEqual("")).toBe("function");
  });

  it("filters for values that are greater than or equal to the provided value", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [22];
    const actual = arr.filter(greaterThanOrEqual(10));

    expect(actual).toEqual(expected);
  });

  it("filters for values that are greater than or equal to the provided value (dates)", () => {
    const arr = [
      new Date("2020-02-02"),
      new Date("1999-01-01"),
      new Date("1970-12-12"),
      new Date("2022-02-22"),
    ];

    const expected = [new Date("2020-02-02"), new Date("2022-02-22")];
    const actual = arr.filter(greaterThanOrEqual(new Date("2000-01-01")));

    expect(actual).toEqual(expected);
  });

  describe("greaterThanOrEqual().not", () => {
    it("is a function", () => {
      expect(typeof greaterThanOrEqual("").not).toBe("function");
    });

    it("filters for values that are not greater than or equal to the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", 0, null, "", 0];
      const actual = arr.filter(greaterThanOrEqual(10).not);

      expect(actual).toEqual(expected);
    });

    it("filters for values that are not greater than or equal to the provided value (dates)", () => {
      const arr = [
        new Date("2020-02-02"),
        new Date("1999-01-01"),
        new Date("1970-12-12"),
        new Date("2022-02-22"),
      ];

      const expected = [new Date("1999-01-01"), new Date("1970-12-12")];
      const actual = arr.filter(greaterThanOrEqual(new Date("2000-01-01")).not);

      expect(actual).toEqual(expected);
    });
  });

  describe("greaterThanOrEqual().on", () => {
    it("is a function", () => {
      expect(typeof greaterThanOrEqual("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof greaterThanOrEqual("").on("")).toBe("function");
    });

    it("filters for values that are greater than or equal to the provided value", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [
        { name: "Alice", age: 32 },
        { name: "Tom", age: 60 },
      ];
      const actual = arr.filter(greaterThanOrEqual(32).on("age"));

      expect(actual).toEqual(expected);
    });

    describe("greaterThanOrEqual().on().not", () => {
      it("is a function", () => {
        expect(typeof greaterThanOrEqual("").on("").not).toBe("function");
      });

      it("filters for values that are not greater than or equal to the provided value", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Candice" },
        ];
        const actual = arr.filter(greaterThanOrEqual(40).on("age").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("match", () => {
  it("is a function", () => {
    expect(typeof match).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof match("")).toBe("function");
  });

  it("filters based on a pattern", () => {
    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [0, 22, 0];
    const actual = arr.filter(match(/[0-9]+/));

    expect(actual).toEqual(expected);
  });

  it("throws if not passed a regular expression", () => {
    expect(() =>
      ["hello", 0, null, "", 22, 0].filter(match(123))
    ).toThrowError();
  });

  describe("match().not", () => {
    it("is a function", () => {
      expect(typeof match("").not).toBe("function");
    });

    it("filters based on a pattern", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", null, ""];
      const actual = arr.filter(match(/[0-9]+/).not);

      expect(actual).toEqual(expected);
    });
  });

  describe("match().on", () => {
    it("is a function", () => {
      expect(typeof match("").on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof match("").on("")).toBe("function");
    });

    it("filters for values that are matching to the provided pattern", () => {
      const arr = [
        { name: "Bob", age: 23 },
        { name: "Alice", age: 32 },
        null,
        { name: "Tom", age: 60 },
        { name: "Candice" },
      ];

      const expected = [{ name: "Alice", age: 32 }, { name: "Candice" }];
      const actual = arr.filter(match(/ice$/).on("name"));

      expect(actual).toEqual(expected);
    });

    describe("match().on().not", () => {
      it("is a function", () => {
        expect(typeof match("").on("").not).toBe("function");
      });

      it("filters for values that are not matching to the provided pattern", () => {
        const arr = [
          { name: "Bob", age: 23 },
          { name: "Alice", age: 32 },
          null,
          { name: "Tom", age: 60 },
          { name: "Candice" },
        ];

        const expected = [
          { name: "Bob", age: 23 },
          null,
          { name: "Tom", age: 60 },
        ];
        const actual = arr.filter(match(/ice$/).on("name").not);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe("createFilterCompareFunction", () => {
  it("is a function", () => {
    expect(typeof createFilterCompareFunction).toBe("function");
  });

  it("returns a function", () => {
    expect(typeof createFilterCompareFunction(() => false)).toBe("function");
  });

  it("creates a working filter compare function", () => {
    const hasValueEqualTo = createFilterCompareFunction(
      (item, value) => item != null && item === value
    );

    const arr = ["hello", 0, null, "", 22, 0];

    const expected = [0, 0];
    const actual = arr.filter(hasValueEqualTo(0));

    expect(actual).toEqual(expected);
  });

  it("creates a working filter compare function (with params)", () => {
    const isHello = createFilterCompareFunction(
      (item, value) => item === value
    )("hello");

    const arr = ["hello", 0, null, "", 22, 0];

    const expected = ["hello"];
    const actual = arr.filter(isHello);

    expect(actual).toEqual(expected);
  });
});
