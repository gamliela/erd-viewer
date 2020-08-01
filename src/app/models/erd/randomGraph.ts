import {DotGraph} from "./dot_json_types";

function randN(N: number): number {
  return Math.floor(Math.random() * N);
}

// returns a graph with random data. It's not "uniform" random, but good enough.
function randomGraph(size: number): DotGraph {
  const objects = Array(size).fill(null).map((_, i) => ({name: `Object ${i + 1}`}));
  const edges = Array(size - 1).fill(null).map((_, i: number) => {
    return {
      tail: i + 1,
      head: randN(i + 1)
    }
  })
  return {
    name: "Random Graph",
    objects, edges
  }
}

export default randomGraph;
