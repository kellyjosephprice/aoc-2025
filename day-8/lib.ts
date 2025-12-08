type Coord = [number, number, number];

type Connection = {
  distance: number;
  a: Coord;
  b: Coord;
};

const distance3d = (a: Coord, b: Coord) =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

export const lightCircuits = (input: string, count: number): number => {
  const junctions: Coord[] = input
    .trim()
    .split("\n")
    .map((str) => str.split(",").map((n) => parseInt(n)) as Coord);

  const connections: Connection[] = junctions
    .reduce<Connection[]>((memo, junction, index) => {
      for (let j = index + 1; j < junctions.length; j++) {
        let distance = distance3d(junction, junctions[j]);
        memo.push({
          distance,
          a: junction,
          b: junctions[j],
        });
      }

      return memo;
    }, [])
    .sort((a, b) => a.distance - b.distance);

  const circuits: Set<Coord>[] = [];
  const unconnected = connections.slice(0, count);
  let last: Connection | undefined = undefined;

  for (let index = 0; index < unconnected.length; index++) {
    const connection = unconnected[index];

    if (circuits.length === 0) {
      circuits.push(new Set([connection.a, connection.b]));
      continue;
    }

    let aCircuit: number | undefined = undefined;
    let bCircuit: number | undefined = undefined;

    for (let i = 0; i < circuits.length; i++) {
      if (circuits[i].has(connection.a)) {
        aCircuit = i;
      }
      if (circuits[i].has(connection.b)) {
        bCircuit = i;
      }
    }

    if (typeof aCircuit === "undefined" && typeof bCircuit === "undefined") {
      circuits.push(new Set([connection.a, connection.b]));
    } else if (typeof bCircuit === "undefined") {
      // @ts-expect-error
      circuits[aCircuit].add(connection.b);
    } else if (typeof aCircuit === "undefined") {
      circuits[bCircuit].add(connection.a);
    } else if (aCircuit !== bCircuit) {
      circuits[aCircuit] = circuits[aCircuit].union(circuits[bCircuit]);
      circuits.splice(bCircuit, 1);
    }

    if (circuits[0].size === junctions.length) {
      last = connection;
      break;
    }
  }

  if (count === -1) {
    if (typeof last === "undefined") {
      throw new Error("ooph");
    }

    console.log(last);
    return last.a[0] * last.b[0];
  } else {
    return circuits
      .sort((a, b) => b.size - a.size)
      .slice(0, 3)
      .reduce((product, circuit) => product * circuit.size, 1);
  }
};
