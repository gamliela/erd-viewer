import * as React from "react";
import {observer} from "mobx-react";
import {values} from "mobx";
import {SimulatedDiagram} from "./Simulation";
import {createNodeEntry, NodeMap, NodeView} from "./Node";
import {createLinkEntry, Link, LinkMap, LinkView} from "./Link";
import style from "./style.scss";
import cx from "classnames";
import {Instance, types} from "mobx-state-tree";
import {mergeAll} from "ramda";
import {IGraph} from "../../models/erd/Graph";

const GRID_PRECISION = 0.1;

const Diagram = types
  .model('Diagram', {
    zoomFactor: 50,
    nodes: NodeMap,
    links: LinkMap
  })
  .extend(SimulatedDiagram);

type IDiagram = Instance<typeof Diagram>;

function createEmptyDiagram(): IDiagram {
  return Diagram.create({nodes: {}, links: {}})
}

function createDiagram(graph: IGraph): IDiagram {
  const diagram = createEmptyDiagram();
  const nodeIdResolver = (entity) => entity.id;
  diagram.nodes = mergeAll(values(graph.entities).map(entity => createNodeEntry(entity.id, entity)));
  diagram.links = mergeAll(values(graph.relations).map(relation => createLinkEntry(relation.id, relation, nodeIdResolver)));
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
    return values(this.props.diagram.nodes).map(node => <NodeView key={node.id} node={node}/>);
  }

  renderLinks() {
    return values(this.props.diagram.links).map(link => <LinkView key={link.id} link={link}/>);
  }
}

export {GRID_PRECISION, Diagram, IDiagram, createDiagram, DiagramView};
