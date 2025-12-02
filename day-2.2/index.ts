import * as fs from "fs";

import { getIds } from "./lib";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const lines = input.split(",");
const sum = getIds(lines).reduce((sum, value) => sum + value, 0);

console.log(sum);
