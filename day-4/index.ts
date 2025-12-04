import * as fs from "fs";

import { accessibleRolls } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = accessibleRolls(input, true);

console.log(count);
