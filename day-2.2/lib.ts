const hasPattern = (num: number): boolean => {
  const str = num.toString(10);
  const maxFactor = Math.floor(str.length / 2);
  let found = false;

  for (let i = 1; i <= maxFactor; i++) {
    const substr = str.slice(0, i);
    const pattern = substr.repeat(Math.floor(str.length / i));

    if (pattern === str) {
      found = true;
      break;
    }
  }

  return found;
};

export const getIds = (ranges: string[]): number[] => {
  let ids: number[] = [];

  ranges.forEach((string) => {
    const [minString, maxString] = string.split("-");
    const [min, max] = [minString, maxString].map((str) => parseInt(str));

    for (let i = min; i <= max; i++) {
      if (hasPattern(i)) {
        ids.push(i);
      }
    }
  });

  return ids;
};

// n = 3
// 111
// 222
// 333
//
// 1111
// 1010
//
// 11111
//
// 111111
// 101010
// 100100
