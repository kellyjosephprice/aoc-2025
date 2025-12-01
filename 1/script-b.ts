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

  if (
    (dir === "R" && num >= total - current) ||
    (dir === "L" && num >= current)
  ) {
    zeroes += 1;
    zeroes += Math.floor(Math.max(0, (num - total) / total));
  }

  while (relative < 0) {
    relative += total;
  }

  current = relative % total;

  //console.log(line, current, zeroes);
});

console.log(zeroes);
