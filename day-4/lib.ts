const offsets = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const surrounded = (grid: string[][], x: number, y: number): number => {
  const count = offsets
    .map(([xOffset, yOffset]) => [x + xOffset, y + yOffset])
    .filter(([xb, yb]) => {
      return (
        yb >= 0 &&
        yb < grid.length &&
        xb >= 0 &&
        xb < grid[yb].length &&
        grid[yb][xb] === "@"
      );
    }).length;

  return count;
};

const getAccessibleCoords = (grid: string[][]): [number, number][] => {
  return grid
    .flatMap<[number, number]>((row, y) =>
      row.map<[number, number]>((_, x) => [x, y]),
    )
    .filter(([x, y]) => {
      return grid[y][x] == "@" && surrounded(grid, x, y) < 4;
    });
};

export const accessibleRolls = (map: string, remove?: boolean): number => {
  const grid = map
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  if (!remove) {
    return getAccessibleCoords(grid).length;
  }

  let accessibleCoords = getAccessibleCoords(grid);
  let count = 0;

  while (accessibleCoords.length > 0) {
    count += accessibleCoords.length;
    accessibleCoords.forEach(([x, y]) => {
      grid[y][x] = ".";
    });

    accessibleCoords = getAccessibleCoords(grid);
  }

  return count;
};
