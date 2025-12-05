type Range = [number, number];
type Interval = [number, number];

type IntervalTreeNode = {
  interval: Interval;
  max: number;
  left?: IntervalTreeNode;
  right?: IntervalTreeNode;
};

const parseInput = (input: string): [Range[], number[]] => {
  const ranges: Range[] = [];
  const ids: number[] = [];
  let foundIds = false;

  input
    .trim()
    .split("\n")
    .forEach((line) => {
      if (line === "") {
        foundIds = true;
      } else if (!foundIds) {
        const [_, min, max] = line.match(/^(\d+)-(\d+)$/) || [];

        ranges.push([parseInt(min), parseInt(max)]);
      } else {
        ids.push(parseInt(line));
      }
    });

  return [ranges, ids];
};

const isInRange = (ranges: Range[], id: number): boolean => {
  return !!ranges.find(([min, max]) => min <= id && id <= max);
};

//const rangesToIntervals = (ranges: Range[]): Interval[] =>
//ranges.reduce((memo: Interval[], [min, max]: Range) => {
//const magnitude = max - min;
//memo.push([min, magnitude]);

//return memo;
//}, []);

//const buildBST = (
//intervals: Interval[],
//start: number,
//end: number,
//): undefined | IntervalTreeNode => {
//if (start < 0 || start > end || end >= intervals.length) return;

//const index = Math.floor((start + end) / 2);
//const interval = intervals[index];

//const node = {
//interval,
//max: interval[0] + interval[1],
//left: buildBST(intervals, start, index - 1),
//right: buildBST(intervals, index + 1, end),
//};

//node.max = Math.max(
//...[node.max, node?.left?.max, node?.right?.max].filter(
//(n) => typeof n === "number",
//),
//);

//return node;
//};

// 1 . 3
//   2 . . 5
//     3 . . 6
//           6 . 7
const mergeRanges = (ranges: Range[]): Range[] => {
  let merged: Range[] = [];

  let i = 0;

  while (i < ranges.length) {
    let [min, max] = ranges[i];
    let j = i + 1;

    for (; j < ranges.length; j++) {
      if (max < ranges[j][0] - 1) {
        break;
      }

      if (max < ranges[j][1]) {
        max = ranges[j][1];
      }
    }

    i = j;
    merged.push([min, max]);
  }

  return merged;
};

const pp = (label: string, ranges: Range[]) => {
  console.log(`${label}: [`);
  ranges.forEach(([min, max]) => {
    console.log(`  [${min}, ${max}],`);
  });
  console.log("]");
};

export const freshCount = (input: string, part2: boolean = false): number => {
  const [ranges, ids] = parseInput(input);

  if (!part2) {
    return ids.filter((id) => isInRange(ranges, id)).length;
  }

  //const intervals = rangesToIntervals(ranges).sort(([a], [b]) => a - b);
  //const tree = buildBST(intervals, 0, intervals.length - 1);
  const sorted = ranges.sort(([a], [b]) => a - b);
  const merged = mergeRanges(sorted);
  const found = new Set<Range>();

  pp("sorted", sorted);
  pp("merged", merged);

  //for (let id of ids) {
  //const range = merged.find(([min, max]) => min <= id && id <= max);
  //if (range) {
  //found.add(range);
  //}
  //}

  //pp(
  //"found",
  //[...found.values()].sort(([a], [b]) => a - b),
  //);

  //console.log(merged.length, found.size);

  return merged.reduce((memo, [min, max]) => {
    return memo + max - min + 1;
  }, 0);
};
