import * as React from "react";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {castToReferenceSnapshot, Instance, types, getParent, SnapshotIn} from "mobx-state-tree";
import {SimulationNodeDatum} from "d3-force";
import withDraggableSVG from "../../shared_modules/DraggableSVG";
import {GRID_PRECISION, IDiagram} from "./Diagram";
import style from "./style.scss";
import {Entity, EntityMap, IEntity} from "../../models/erd/Entity";
import {DotObject} from "../../models/erd/dot_json_types";
import {SimulatedNode} from "./Simulation";

// continue.......... code refactor completed, make it run! currently build fails

// TODO: IDEAS:
// * facilitate castToSnapshot in all models
// * put all MST models and simulation classes under models directory
// * create app.ts to be the root of the MST (instead of workbench)
// * app.ts will handle adding/removing nodes from the diagram
// * convert components to functional style (use hooks if we need effects)
// * log running times for simulation
// * try replacing volatile with react hooks. does it look better?
const NodeModel = types
  .model('Node', {
    id: types.identifierNumber,
    entity: types.reference(Entity),
    x: 0,
    y: 0
  });

const Node = NodeModel
  .volatile(self => {
    const parentDiagram = getParent<any>(self);   // TODO: can we get rid of the any? IDiagram cause problems...
    return {
      simulatedNode: SimulatedNode(self.id, self.x, self.y, parentDiagram.notifyDragStarted, parentDiagram.notifyDragEnded)
    }
  });

type INode = Instance<typeof Node>;

type INodeSnapshot = SnapshotIn<INode>;

// const NodeMap = types.map(Node);
//
// function createNodeEntry(id: number, entity: IEntity, x = 0, y = 0): Instance<typeof NodeMap> {
//   return NodeMap.create({id: {id, entity: castToReferenceSnapshot(entity), x, y}});
// }

function nodeSnapshotFromEntity(id: number, entity: SnapshotIn<typeof Entity>, x = 0, y = 0): INodeSnapshot {
  return {
    id,
    entity: entity.id,
    x,
    y
  }
}

const DraggableGroup = withDraggableSVG("g");

type NodeViewProps = {
  node: INode
}

@observer
class NodeView extends React.Component<NodeViewProps> {

  render() {
    const {node} = this.props;
    const x = node.simulatedNode.dx;
    const y = node.simulatedNode.dy;
    return (
      <DraggableGroup className={style.Node}
                      onSVGDragStarted={node.simulatedNode.onSVGDragStarted}
                      onSVGDrag={node.simulatedNode.onSVGDrag}
                      onSVGDragEnded={node.simulatedNode.onSVGDragEnded}>
        <circle r="1" cx={x} cy={y}/>
        <text x={x} y={y - 1}>{node.entity.name}</text>
      </DraggableGroup>
    );
  }
}

export {Node, INode, nodeSnapshotFromEntity, NodeView};
