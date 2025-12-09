import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { largestRectangle } from "./lib.ts";

suite("largestRectangle", () => {
  const input = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`;

  //it("finds the largest rectanle between two corners", () => {
  //assert.strictEqual(largestRectangle(input), 50);
  //});

  it("finds the largest rectanle between two corners of only red or green tiles", () => {
    assert.strictEqual(largestRectangle(input, true), 24);
  });
});

suite("getIsInside", () => {
  const input = `
1,1
7,1
7,11
1,11
1,9
4,9
4,7
1,7
1,5
3,5
3,3
3,1
`;

  it("calculates if a point is in the grid", () => {
    assert.strictEqual(largestRectangle(input, true), 24);
  });
});
