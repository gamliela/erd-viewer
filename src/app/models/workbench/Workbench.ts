import {DotGraph} from "../erd/dot_json_types";
import {Entity} from "./Entity";
import {Relation} from "./Relation";
import {DiagramModel} from "../../components/diagram/Diagram";

class Workbench {
  entities: Entity[];
  relations: Relation[];
  diagram: DiagramModel;

  constructor(graph: DotGraph) {
    this.entities = graph.objects.map((obj, index) => new Entity(index, obj.name));
    this.relations = graph.edges.map((edge, index) => new Relation(index, this.entities[edge.tail], this.entities[edge.head]));
    this.diagram = new DiagramModel(graph);
  }
}

export {Workbench};
