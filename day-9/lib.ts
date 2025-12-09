import fs from "node:fs";

type Coord = [number, number];

type Segment = [Coord, Coord];

const getArea = (a: Coord, b: Coord) =>
  (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);

const getMax = (nums: number[]) =>
  nums.reduce((max, num) => Math.max(max, num), 0);

const genGrid = (coords: Coord[]) => {
  const x = getMax(coords.map((c) => c[0])) + 1;
  const y = getMax(coords.map((c) => c[1])) + 1;
  const grid = Array.from({ length: y }).map(() =>
    Array.from({ length: x }).fill("."),
  );

  coords.forEach(([x, y]) => {
    grid[y][x] = "#";
  });

  return grid;
};

const pp = (coords: Coord[]) => {
  const grid = genGrid(coords);

  console.log(grid.map((row) => row.join("")).join("\n"));
};

export const largestRectangle = (input: string, redOrGreen = false): number => {
  const coords: Coord[] = input
    .trim()
    .split("\n")
    .map((str) => str.split(",").map((n) => parseInt(n)) as Coord);

  if (!redOrGreen) {
    let max = 0;
    coords.forEach((a, index) => {
      coords.slice(index).forEach((b) => {
        const area = getArea(a, b);

        if (max < area) {
          max = area;
        }
      });
    });

    return max;
  }

  const segments = coords.reduce<Segment[]>((memo, coord, index) => {
    if (index === 0) {
      memo.push([coords[coords.length - 1], coord]);
    } else {
      memo.push([memo[memo.length - 1][1], coord]);
    }
    return memo;
  }, []);

  // sort by y coords
  segments.sort(([[, a]], [[, b]]) => a - b);

  let max = 0;
  coords.forEach((a, index) => {
    coords.slice(index).forEach((b) => {
      // magic

      const area = getArea(a, b);
      if (max < area) {
        max = area;
      }
    });
  });

  return max;
};
