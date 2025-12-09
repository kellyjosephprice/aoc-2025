import fs from "node:fs";

type Coord = [number, number];

type Segment = [Coord, Coord];

type Edge = "left" | "right";

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

const getIsClosed = (segments: Segment[], a: Coord, b: Coord) => {
  const c: Coord = [a[0], b[1]];
  const d: Coord = [b[0], a[1]];

  return getIsInside(segments, c) && getIsInside(segments, d);
};

const xIntersect = (coord: Coord, segment: Segment): boolean => {
  const min = Math.min(segment[0][1], segment[1][1]);
  const max = Math.max(segment[0][1], segment[1][1]);

  return min <= coord[0] && coord[0] <= max;
};

/*
..........
.#      #.
.
.#   #
.....
.#   #
.
.#    #
......
..#   #
..
..#     #.
..........
 */

export const getIsInside = (segments: Segment[], coord: Coord): boolean => {
  let inside = false;
  let edge: Edge | undefined = undefined;
  let found = false;

  for (let i = 0; i < segments.length; i++) {
    const [point1, point2] = segments[i];

    // coincident with vertical line
    if (coord[0] === point1[0] && coord[0] === point2[0]) {
      // nothing to change
      // intersects a point
    } else if (coord[0] === point1[0] || coord[0] === point2[0]) {
      const otherPoint = coord[0] === point1[0] ? point2 : point1;
      const nextEdge = coord[0] < otherPoint[0] ? "right" : "left";

      if (edge) {
        if (inside && edge === nextEdge) {
          inside = false;
        }
      } else {
        inside = true;
      }

      edge = nextEdge;

      // intersects a point
    } else if (xIntersect(coord, segments[i])) {
      inside = !!inside;
    }
  }

  return found;
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

  const allX = new Set<number>();
  const allY = new Set<number>();

  coords.forEach(([x, y]) => {
    allX.add(x);
    allY.add(y);
  });

  const bigToSmallX: Record<number, number> = {};
  const smallToBigX: Record<number, number> = {};
  const bigToSmallY: Record<number, number> = {};
  const smallToBigY: Record<number, number> = {};

  [...allX.values()].sort().forEach((number, index) => {
    bigToSmallX[number] = index;
    smallToBigX[index];
  });
  [...allY.values()].sort().forEach((number, index) => {
    bigToSmallY[number] = index;
    smallToBigY[index] = number;
  });

  const shrunk: Coord[] = coords.map(([x, y]) => [
    bigToSmallX[x],
    bigToSmallY[y],
  ]);

  const grid = genGrid(shrunk);

  const segments = shrunk.reduce<Segment[]>((memo, coord, index) => {
    if (index === 0) {
      memo.push([shrunk[shrunk.length - 1], coord]);
    } else {
      memo.push([memo[memo.length - 1][1], coord]);
    }
    return memo;
  }, []);

  segments.forEach(([a, b]) => {
    if (a[0] === b[0]) {
      for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
        grid[y][a[0]] = "x";
      }
    } else {
      for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
        grid[a[1]][x] = "x";
      }
    }
  });

  console.log(grid.map((row) => row.join("")).join("\n"));

  // sort by y coords
  segments.sort(([[, a]], [[, b]]) => a - b);

  let max = 0;
  coords.forEach((a, index) => {
    coords.slice(index).forEach((b) => {
      const isClosed = getIsClosed(segments, a, b);
      if (!isClosed) {
        return;
      }

      const area = getArea(a, b);
      if (max < area) {
        max = area;
      }
    });
  });

  return max;
};
