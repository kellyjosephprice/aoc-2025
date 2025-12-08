import * as fs from "fs";

import { lightCircuits } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = lightCircuits(input, -1);

console.log(count);
