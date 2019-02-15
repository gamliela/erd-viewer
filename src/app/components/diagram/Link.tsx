import * as React from "react";
import {observer} from "mobx-react";
import {Node} from "./Node";
import style from "./style.scss";
import {castToReferenceSnapshot, getIdentifier, Instance, types} from "mobx-state-tree";
import {IRelation, Relation} from "../../models/erd/Relation";
import {IDiagram} from "./Diagram";
import {SimulatedLink} from "./Simulation";

const Link = types
  .model('Link', {
    id: types.identifierNumber,
    relation: types.reference(Relation),
    source: types.reference(Node),
    target: types.reference(Node)
  })
  .volatile(self => ({
    simulatedLink: SimulatedLink(self.source.id, self.target.id)
  }));

type ILink = Instance<typeof Link>;

const LinkMap = types.map(Link);

function createLinkEntry(id: number, relation: IRelation, nodeIdResolver: (IEntity) => number): Instance<typeof LinkMap> {
  return LinkMap.create({
    id: {
      id,
      relation: castToReferenceSnapshot(relation),
      source: castToReferenceSnapshot(nodeIdResolver(relation.source)),
      target: castToReferenceSnapshot(nodeIdResolver(relation.target))
    }
  });
}

type LinkViewProps = {
  link: ILink,
}

@observer
class LinkView extends React.Component<LinkViewProps> {
  render() {
    const {link} = this.props;
    const x1 = link.source.simulatedNode.dx;
    const y1 = link.source.simulatedNode.dy;
    const x2 = link.target.simulatedNode.dx;
    const y2 = link.target.simulatedNode.dy;
    return (
      <line className={style.Link} x1={x1} y1={y1} x2={x2} y2={y2}/>
    );
  }
}

export {Link, ILink, LinkMap, createLinkEntry, LinkView};
