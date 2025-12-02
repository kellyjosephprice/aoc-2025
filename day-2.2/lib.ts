export const getPrefix = (string: string, affinityUp: boolean = true) => {
  // up: 783 => 1000 (10 ** length)
  // down: 783 => 99 (10 ** (length - 1) - 1)
  if (string.length % 2 === 1) {
    string = (
      affinityUp ? 10 ** string.length : 10 ** (string.length - 1) - 1
    ).toString(10);
  }

  return parseInt(string.slice(0, string.length / 2));
};

export const getIds = (ranges: string[]): number[] => {
  let ids: number[] = [];

  ranges.forEach((string) => {
    const [minString, maxString] = string.split("-");
    const [min, max] = [minString, maxString].map((str) => parseInt(str));

    const prefix = getPrefix(minString);
    const maxPrefix = getPrefix(maxString, false);

    for (let i = prefix; i <= maxPrefix; i++) {
      const badId = i * 10 ** i.toString(10).length + i;

      if (min <= badId && badId <= max) {
        ids.push(badId);
      }
    }
  });

  return ids;
};
