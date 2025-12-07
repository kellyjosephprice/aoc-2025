const slit = "S";
const splitter = "^";

const prettyBeams = (beams: number[], numbers = false) => {
  return numbers
    ? beams.map((v) => v.toString()).join("")
    : beams.map((value) => (value ? "|" : ".")).join("");
};

export const tachyonManifold = (input: string, quantum = false): number => {
  const lines = input.trim().split("\n");
  let beams: number[] = Array.from({ length: lines[0].length }).fill(
    0,
  ) as number[];
  let splits = 0;

  lines.forEach((line) => {
    const nextBeams = beams.slice();

    line.split("").forEach((char, index) => {
      if (char === slit) {
        nextBeams[index] = 1;
        return;
      }

      if (char === splitter && beams[index]) {
        splits++;

        [index - 1, index + 1].forEach((newIndex) => {
          if (newIndex < 0 || newIndex >= lines.length) return;
          nextBeams[newIndex] += beams[index];
        });

        nextBeams[index] = 0;
      }
    });

    if (line.match(/[^.]/)) {
      console.log(line);
      console.log(prettyBeams(nextBeams) + " " + splits);
      if (quantum) {
        console.log(prettyBeams(nextBeams, true));
      }
    }

    beams = nextBeams;
  });

  return quantum ? beams.reduce((a, b) => a + b) : splits;
};
