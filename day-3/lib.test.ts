import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { maxJoltage } from "./lib";

suite("maxJoltage", () => {
  const testCases = [
    { input: "987654321111111", expected: 98 },
    { input: "811111111111119", expected: 89 },
    { input: "234234234234278", expected: 78 },
    { input: "818181911112111", expected: 92 },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`case (${JSON.stringify(input)})`, () => {
      assert.deepStrictEqual(maxJoltage(input), expected);
    });
  });
});

suite("maxJoltage with 12 batteries", () => {
  const testCases = [
    { input: "987654321111111", expected: 987654321111 },
    { input: "811111111111119", expected: 811111111119 },
    { input: "234234234234278", expected: 434234234278 },
    { input: "818181911112111", expected: 888911112111 },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`case (${JSON.stringify(input)})`, () => {
      assert.deepStrictEqual(maxJoltage(input, { batteries: 12 }), expected);
    });
  });
});
