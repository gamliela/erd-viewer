import * as React from "react";
import {FunctionComponent, SVGProps, useCallback} from "react";
import WithDraggableSVG from "./WithDraggableSVG";

type WithDraggableViewBox<P> = FunctionComponent<P>

function WithDraggableViewBox<P extends SVGProps<SVGElement>>(Component: React.ComponentType<P> | string): WithDraggableViewBox<P> {
  const DraggableContainer = WithDraggableSVG(Component);

  const Wrapper: WithDraggableViewBox<P> = (props: P) => {
    const onSVGDragStarted = useCallback((x: number, y: number) => {
      console.log(`drag started (${x}, ${y})!`);
    }, [])

    const onSVGDrag = useCallback((x: number, y: number) => {
      console.log(`drag (${x}, ${y})...`);
    }, [])

    const onSVGDragEnded = useCallback(() => {
      console.log('drag ended!');
    }, [])

    return <DraggableContainer
      {...props}
      onSVGDragStarted={onSVGDragStarted}
      onSVGDrag={onSVGDrag}
      onSVGDragEnded={onSVGDragEnded}
    />
  }

  // build display name for the wrapper component
  const componentName = (typeof (Component) === "string") ? Component : Component.displayName;
  Wrapper.displayName = componentName + " with draggable ViewBox";

  return Wrapper;
}

export default WithDraggableViewBox;
