import * as React from "react";
import {observer} from "mobx-react";
import {values} from "mobx";
import {SimulatedDiagramType} from "./Simulation";
import {INode, INodeParent, Node, nodeSnapshotFromEntity, NodeView} from "./Node";
import {Link, linkSnapshotFromRelation, LinkView} from "./Link";
import style from "./style.scss";
import cx from "classnames";
import {cast, Instance, SnapshotIn, SnapshotOrInstance, types} from "mobx-state-tree";
import {mergeAll} from "ramda";
import {Graph, IGraph} from "../../models/erd/Graph";
import {Entity, IEntity} from "../../models/erd/Entity";

const GRID_PRECISION = 0.1;

const DiagramModel = types
  .model('Diagram', {
    zoomFactor: types.optional(types.number, 50),
    nodes: types.array(Node),
    links: types.array(Link)
  });

const Diagram = DiagramModel
  .views(self => ({
    get simulatedNodes() {
      return self.nodes.map(node => node.simulatedNode)
    },
    get simulatedLinks() {
      return self.links.map(node => node.simulatedLink)
    }
  }))
  .extend(SimulatedDiagramType);

type IDiagram = Instance<typeof Diagram> & INodeParent;

type IDiagramSnapshot = SnapshotIn<IDiagram>;

function emptyDiagramSnapshot(): IDiagramSnapshot {
  return {
    zoomFactor: 50,  // TODO: zoomFactor is redundant but TS complains
    nodes: [],
    links: []
  };
}

function diagramSnapshotFromGraph(graph: SnapshotIn<typeof Graph>): IDiagramSnapshot {
  const diagram = emptyDiagramSnapshot();
  diagram.nodes = graph.entities.map(entity => nodeSnapshotFromEntity(entity.id, entity));
  diagram.links = graph.relations.map(relation => linkSnapshotFromRelation(relation.id, relation, relation.source, relation.target));

  return diagram;
}

// class DiagramModel {
//   zoomFactor: number = 50;
//   @observable nodesByKey: { [key: number]: NodeModel } = {};
//   @observable linksByKey: { [key: number]: LinkModel } = {};
//   readonly simulationModel = new Simulation();
//
//   constructor() {
//     // this.nodes = graph.objects.map((obj, index) => new NodeModel(index, obj.name, this.simulationModel, GRID_PRECISION));
//     // this.links = graph.edges.map((edge, index) => new LinkModel(index, this.nodes[edge.tail], this.nodes[edge.head]));
//     this.simulationModel.init(this.nodes, this.links);
//   }
//
//   @computed get nodes() {
//     return Object.values(this.nodesByKey)
//   }
//
//   @computed get links() {
//     return Object.values(this.linksByKey)
//   }
//
//   addEntity(entity: Entity) {
//     if (this.nodesByKey[entity.key])
//       return;
//     this.nodesByKey[entity.key] = new NodeModel(entity.key, entity.name, this.simulationModel, GRID_PRECISION);
//   }
// }

type DiagramViewProps = {
  diagram: IDiagram,
  className?: string
}

@observer
class DiagramView extends React.Component<DiagramViewProps> {
  render() {
    const {zoomFactor} = this.props.diagram;
    const viewBoxProp = `-${zoomFactor / 2} -${zoomFactor / 2} ${zoomFactor} ${zoomFactor}`;

    return (
      <svg className={cx(style.Diagram, this.props.className)} viewBox={viewBoxProp}>
        {this.renderNodes()}
        {this.renderLinks()}
      </svg>
    );
  }

  renderNodes() {
    return this.props.diagram.nodes.map(node => <NodeView key={node.id} node={node}/>);
  }

  renderLinks() {
    return this.props.diagram.links.map(link => <LinkView key={link.id} link={link}/>);
  }
}

export {GRID_PRECISION, DiagramModel, Diagram, IDiagram, emptyDiagramSnapshot, diagramSnapshotFromGraph, DiagramView};
