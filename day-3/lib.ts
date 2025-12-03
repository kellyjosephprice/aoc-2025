const getHighestIndex = (digits: number[], { start = 0, end = -1 } = {}) => {
  return digits.slice(0, end).reduce((highest, digit, index) => {
    if (index < start) return highest;

    if (digits[highest] < digit) {
      return index;
    } else {
      return highest;
    }
  }, start);
};

export const maxJoltage = (bank: string, { batteries = 2 } = {}): number => {
  const ratings = bank.split("").map((c) => parseInt(c));
  const digits: number[] = [];
  let walker = 0;

  for (let i = 0; i < batteries; i++) {
    const index = getHighestIndex(ratings, {
      start: walker,
      end: ratings.length - (batteries - digits.length) + 1,
    });

    digits.push(ratings[index]);
    walker = index + 1;
  }

  return digits
    .reverse()
    .reduce((product, digit, idx) => product + digit * 10 ** idx, 0);
};
