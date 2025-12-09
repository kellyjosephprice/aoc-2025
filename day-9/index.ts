import * as fs from "fs";

import { largestRectangle } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = largestRectangle(input, true);

//console.log(count);
