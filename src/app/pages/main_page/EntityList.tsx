import * as React from "react";
import {observer} from "mobx-react";
import cx from "classnames";
import style from "./style.scss";
import {WorkbenchModel} from "../../models/workbench/WorkbenchModel";

const ListItem = ({entity}) => <li className="list-group-item list-group-item-action">{entity.name}</li>;

const ListItems = ({entities}) => entities.map(entity => <ListItem key={entity.id} entity={entity}/>);

@observer
class EntityList extends React.Component<{ className?: string, workbench: WorkbenchModel }> {
  render() {
    const {className, workbench} = this.props!;
    return (
      <ul className={cx(style.EntityList, 'list-group list-group-flush', className)}>
        <ListItems entities={workbench.graph.entities}/>
      </ul>
    );
  }
}

export {EntityList};
