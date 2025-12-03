import * as fs from "fs";

import { maxJoltage } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const lines = input.split("\n");
const sum = lines.reduce((memo, line) => {
  return line ? memo + maxJoltage(line, { batteries: 12 }) : memo;
}, 0);

console.log(sum);
