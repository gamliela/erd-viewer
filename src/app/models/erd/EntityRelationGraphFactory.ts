import EntityRelationGraph from "./EntityRelationGraph";
import * as demoData from "./DemoData";

function buildEntityRelationGraph() {
  return new EntityRelationGraph(demoData.entites, demoData.relations);
}

export default buildEntityRelationGraph;
