import * as fs from "fs";

import { tachyonManifold } from "./lib.ts";

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

const count = tachyonManifold(input, true);

console.log(count);
