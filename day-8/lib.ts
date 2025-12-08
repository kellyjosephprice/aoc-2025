type Coord = [number, number, number];

type Connection = {
  distance: number;
  a: Coord;
  b: Coord;
};

const distance3d = (a: Coord, b: Coord) =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

export const lightCircuits = (input: string, count: number): number => {
  const coords: Coord[] = input
    .trim()
    .split("\n")
    .map((str) => str.split(",").map((n) => parseInt(n)) as Coord);

  const connections: Connection[] = coords
    .reduce<Connection[]>((memo, coord, index) => {
      for (let j = index + 1; j < coords.length; j++) {
        let distance = distance3d(coord, coords[j]);
        memo.push({
          distance,
          a: coord,
          b: coords[j],
        });
      }

      return memo;
    }, [])
    .sort((a, b) => a.distance - b.distance);

  const unconnected = count === -1 ? connections : connections.slice(0, count);

  const circuits = [];
  let last = unconnected[0];
  while (unconnected.length > 0) {
    const current = unconnected.shift();
    if (typeof current === "undefined") {
      throw new Error("typescript and shift");
    }

    const coords = new Set([current.a, current.b]);
    const circuit = new Set([current.a, current.b]);

    console.log(current.distance);

    while (coords.size > 0) {
      [...coords.values()].forEach((coord) => {
        const indices: number[] = [];

        unconnected.forEach((conn, index) => {
          if (conn.a === coord || conn.b === coord) {
            coords.add(conn.a);
            coords.add(conn.b);
            circuit.add(conn.a);
            circuit.add(conn.b);

            indices.unshift(index);
            last = conn;
          }
        });

        indices.forEach((idx) => unconnected.splice(idx, 1));
        coords.delete(coord);
      });
    }

    circuits.push(circuit);
  }

  console.log(circuits, last);
  if (count === -1) {
    if (typeof last === "undefined") {
      throw new Error("ooph");
    }

    return last.a[0] * last.b[0];
  } else {
    return circuits
      .sort((a, b) => b.size - a.size)
      .slice(0, 3)
      .reduce((product, circuit) => product * circuit.size, 1);
  }
};
