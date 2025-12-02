const total = 100;

export const spinLock = (
  lines: string[],
  { start = 50, simple = false } = {},
) => {
  let zeros = 0;
  let current = start;

  lines.forEach((line) => {
    const match = line.match(/^(R|L)(\d+)$/);
    if (!match) {
      return;
    }

    const [_, dir, string] = match;
    const num = parseInt(string);
    let relative = dir === "R" ? current + num : current - num;

    // -10 -> -10 -> 90 -> 90
    // 190 -> 90 -> 190 -> 90
    const newCurrent = ((relative % total) + total) % total;

    if (simple) {
      if (newCurrent === 0) {
        zeros++;
      }
    } else {
      if (relative === 0 || relative === total) {
        zeros++;
      } else if (current === 0) {
        if (dir === "R") {
          zeros += Math.floor(num / total);
        } else {
          zeros += Math.abs(Math.floor(num / total));
        }
      } else if (relative < 0) {
        // -1 -> 1
        // -100 -> 2
        // -101 -> 2
        zeros += Math.abs(Math.floor(relative / total));
        if (relative % 100 === 0) zeros++;
      } else if (relative > total) {
        // 101 -> 1
        // 201 -> 2
        zeros += Math.floor(relative / total);
      }
    }

    current = newCurrent;
  });

  return { current, zeros };
};
