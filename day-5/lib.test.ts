import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { freshCount } from "./lib.ts";

suite("freshCount", () => {
  const input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

  it("counts fresh ids", () => {
    assert.strictEqual(freshCount(input), 3);
  });

  it("counts fresh ids ranges", () => {
    assert.strictEqual(freshCount(input, true), 14);
  });
});

//suite("freshCount -- part 2 debug", () => {
//const input = `
//1-2
//2-2
//3-5

//1
//5
//8
//11
//17
//32
//`;

//it("counts fresh ids ranges", () => {
//assert.strictEqual(freshCount(input, true), 3);
//});
//});
