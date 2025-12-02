const fs = require("node:fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf8" });

let zeroes = 0;
let current = 50;
const total = 100;

input.split("\n").forEach((line, index) => {
  const match = line.match(/^(R|L)(\d+)$/);
  if (!match) {
    return;
  }

  const [_, dir, string] = match;
  const num = parseInt(string);
  let relative = dir === "R" ? current + num : current - num;

  while (relative < 0) {
    console.log("adjusting");
    relative += total;
  }

  current = relative % total;

  console.log(line, dir, num, relative, current);
  if (current === 0) zeroes++;
});

console.log(zeroes);
