import * as fs from "fs";

import { spinLock } from "./mod";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const lines = input.split("\n");
const state = spinLock(lines);

console.log("zeroes:", state.zeros);
