import * as React from "react";
import {DragEventHandler} from "react";

// TODO: add a display name and hoist statics

interface DraggableModelProps<T> {
  onDrag?: DragEventHandler<T>;
  onDragCapture?: DragEventHandler<T>;
  onDragEnd?: DragEventHandler<T>;
  onDragEndCapture?: DragEventHandler<T>;
  onDragEnter?: DragEventHandler<T>;
  onDragEnterCapture?: DragEventHandler<T>;
  onDragExit?: DragEventHandler<T>;
  onDragExitCapture?: DragEventHandler<T>;
  onDragLeave?: DragEventHandler<T>;
  onDragLeaveCapture?: DragEventHandler<T>;
  onDragOver?: DragEventHandler<T>;
  onDragOverCapture?: DragEventHandler<T>;
  onDragStart?: DragEventHandler<T>;
  onDragStartCapture?: DragEventHandler<T>;
  onDrop?: DragEventHandler<T>;
  onDropCapture?: DragEventHandler<T>;
}

interface WithDraggableModelProps<T> {
  model?: DraggableModelProps<T>;
}

const withDraggableModel = <T, P extends DraggableModelProps<T>>(Component: React.ComponentType<P>) =>
  class WithDraggableModel extends React.Component<P | WithDraggableModelProps<T>> {
    render() {
      const {model, ...props} = this.props as WithDraggableModelProps<T>;   // typecasting required due to TS Limitation
      if (model)
        return <Component
          onDrag={model.onDrag}
          onDragCapture={model.onDragCapture}
          onDragEnd={model.onDragEnd}
          onDragEndCapture={model.onDragEndCapture}
          onDragEnter={model.onDragEnter}
          onDragEnterCapture={model.onDragEnterCapture}
          onDragExit={model.onDragExit}
          onDragExitCapture={model.onDragExitCapture}
          onDragLeave={model.onDragLeave}
          onDragLeaveCapture={model.onDragLeaveCapture}
          onDragOver={model.onDragOver}
          onDragOverCapture={model.onDragOverCapture}
          onDragStart={model.onDragStart}
          onDragStartCapture={model.onDragStartCapture}
          onDrop={model.onDrop}
          onDropCapture={model.onDropCapture}
          {...props}
        />;
      else
        return <Component {...props}/>;
    }
  };

export default withDraggableModel;
