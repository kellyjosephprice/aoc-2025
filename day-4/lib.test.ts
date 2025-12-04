import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { accessibleRolls } from "./lib";

suite("accessibleRolls", () => {
  const input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

  it("finds accessible rolls", () => {
    assert.strictEqual(accessibleRolls(input), 13);
  });

  it("finds accessible rolls after removing available ones", () => {
    assert.strictEqual(accessibleRolls(input, true), 43);
  });
});
