import * as fs from "fs";

import { freshCount } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = freshCount(input, true);

console.log(count);
