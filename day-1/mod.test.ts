import assert from "node:assert/strict";
import test, { it, suite } from "node:test";

import { spinLock } from "./mod";

suite("current", () => {
  it("counts up correctly", () => {
    assert.strictEqual(spinLock(["R40"]).current, 90);
    assert.strictEqual(spinLock(["R40", "R40"]).current, 30);
    assert.strictEqual(spinLock(["R100"]).current, 50);
    assert.strictEqual(spinLock(["R150"]).current, 0);
    assert.strictEqual(spinLock(["R200"]).current, 50);
  });

  it("counts down correctly", () => {
    assert.strictEqual(spinLock(["L40"]).current, 10);
    assert.strictEqual(spinLock(["L40", "L40"]).current, 70);
    assert.strictEqual(spinLock(["L100"]).current, 50);
    assert.strictEqual(spinLock(["L150"]).current, 0);
    assert.strictEqual(spinLock(["L200"]).current, 50);
  });

  it("counts up from zero", () => {
    assert.strictEqual(spinLock(["R40"], { start: 0 }).current, 40);
    assert.strictEqual(spinLock(["R100"], { start: 0 }).current, 0);
    assert.strictEqual(spinLock(["R140"], { start: 0 }).current, 40);
    assert.strictEqual(spinLock(["R200"], { start: 0 }).current, 0);
    assert.strictEqual(spinLock(["R240"], { start: 0 }).current, 40);
  });

  it("counts down from zero", () => {
    assert.strictEqual(spinLock(["L40"], { start: 0 }).current, 60);
    assert.strictEqual(spinLock(["L100"], { start: 0 }).current, 0);
    assert.strictEqual(spinLock(["L140"], { start: 0 }).current, 60);
    assert.strictEqual(spinLock(["L200"], { start: 0 }).current, 0);
    assert.strictEqual(spinLock(["L240"], { start: 0 }).current, 60);
  });
});

suite("part one -- counting stopping on zeros", () => {
  test("partial spins", () => {
    assert.strictEqual(spinLock(["L40"], { simple: true }).zeros, 0);
    assert.strictEqual(spinLock(["R40"], { simple: true }).zeros, 0);
  });

  test("stop on 0", () => {
    assert.strictEqual(spinLock(["L50"], { simple: true }).zeros, 1);
    assert.strictEqual(spinLock(["R50"], { simple: true }).zeros, 1);
  });

  test("stop on 0 multiple times", () => {
    assert.strictEqual(spinLock(["L50", "L100"], { simple: true }).zeros, 2);
    assert.strictEqual(spinLock(["R50", "R100"], { simple: true }).zeros, 2);
  });

  test("wrapping around", () => {
    assert.strictEqual(spinLock(["L150"], { simple: true }).zeros, 1);
    assert.strictEqual(spinLock(["R150"], { simple: true }).zeros, 1);
  });
});

type TestCase = [
  string[],
  { start?: number; simple?: boolean } | undefined,
  number,
];

suite("part two -- counting all zeros", () => {
  const testCases: TestCase[] = [
    [["L40"], undefined, 0],
    [["L50"], undefined, 1],
    [["L60"], undefined, 1],
    [["L100"], undefined, 1],
    [["L150"], undefined, 2],
    [["L160"], undefined, 2],
    [["L200"], undefined, 2],
    [["L250"], undefined, 3],
    [["R40"], undefined, 0],
    [["R50"], undefined, 1],
    [["R60"], undefined, 1],
    [["R100"], undefined, 1],
    [["R150"], undefined, 2],
    [["R160"], undefined, 2],
    [["R200"], undefined, 2],
    [["R250"], undefined, 3],
    [["L40"], { start: 0 }, 0],
    [["L100"], { start: 0 }, 1],
    [["L150"], { start: 0 }, 1],
    [["L200"], { start: 0 }, 2],
    [["L250"], { start: 0 }, 2],
    [["L300"], { start: 0 }, 3],
    [["R40"], { start: 0 }, 0],
    [["R100"], { start: 0 }, 1],
    [["R150"], { start: 0 }, 1],
    [["R200"], { start: 0 }, 2],
    [["R250"], { start: 0 }, 2],
    [["R300"], { start: 0 }, 3],
  ];

  testCases.forEach(([lines, options, expected]) => {
    test(`${lines}${options ? ` ${JSON.stringify(options)}` : ""} -> { zeros: ${expected} }`, () => {
      assert.strictEqual(spinLock(lines, options).zeros, expected);
    });
  });
});
