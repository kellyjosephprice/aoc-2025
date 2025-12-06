import * as fs from "fs";

import { cephalopodHomework } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = cephalopodHomework(input, true);

console.log(count);
