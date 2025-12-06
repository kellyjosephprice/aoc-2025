import assert from "node:assert/strict";
import { it, suite } from "node:test";

import { cephalopodHomework } from "./lib.ts";

suite("cephalopodHomework", () => {
  const input = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`;

  it("does cephalopod math", () => {
    assert.strictEqual(cephalopodHomework(input), 4277556);
  });

  it("does cephalopod math", () => {
    assert.strictEqual(cephalopodHomework(input, true), 3263827);
  });
});
