import { describe, it, expect } from "vitest";

import { notNull, hasValue, equal } from "../src";

describe("notNull", () => {
  it("is a function", () => {
    expect(typeof notNull).toBe("function");
  });

  it("filters items that are falsy (except 0)", () => {
    const arr = ["hello", 0, null, "", 22];

    const expected = ["hello", 0, "", 22];
    const actual = arr.filter(notNull);

    expect(actual).toEqual(expected);
  });

  describe("notNull.on", () => {
    it("is a function", () => {
      expect(typeof notNull.on).toBe("function");
    });

    it("returns a function", () => {
      expect(typeof notNull.on("")).toBe("function");
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
      const actual = arr.filter(notNull.on("age"));

      expect(actual).toEqual(expected);
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
    const actual = arr.filter(equal<number | string | null>(0));

    expect(actual).toEqual(expected);
  });

  describe("equal().not", () => {
    it("is a function", () => {
      expect(typeof equal("").not).toBe("function");
    });

    it("filters for values that are notequal to the provided value", () => {
      const arr = ["hello", 0, null, "", 22, 0];

      const expected = ["hello", null, "", 22];
      const actual = arr.filter(equal<number | string | null>(0).not);

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
