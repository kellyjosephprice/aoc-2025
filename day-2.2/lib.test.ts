import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { getIds } from "./lib";

suite("getIds", () => {
  const testCases = [
    { input: [], expected: [] },
    { input: ["11-22"], expected: [11, 22] },
    { input: ["95-115"], expected: [99, 111] },
    { input: ["998-1012"], expected: [999, 1010] },
    { input: ["1188511880-1188511890"], expected: [1188511885] },
    { input: ["222220-222224"], expected: [222222] },
    { input: ["1698522-1698528"], expected: [] },
    { input: ["446443-446449"], expected: [446446] },
    { input: ["38593856-38593862"], expected: [38593859] },
    { input: ["565653-565659"], expected: [565656] },
    { input: ["824824821-824824827"], expected: [824824824] },
    { input: ["2121212118-2121212124"], expected: [2121212121] },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`case (${JSON.stringify(input)})`, () => {
      assert.deepStrictEqual(getIds(input), expected);
    });
  });
});
