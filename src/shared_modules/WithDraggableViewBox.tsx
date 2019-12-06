import * as React from "react";
import {FunctionComponent, SVGProps, useCallback} from "react";
import WithDraggableSVG from "./WithDraggableSVG";

type WithViewBox<P> = P & { viewBox?: string }

type WithDraggableViewBox<P> = FunctionComponent<WithViewBox<P>>

function WithDraggableViewBox<P extends SVGProps<SVGElement>>(Component: React.ComponentType<WithViewBox<P>> | string): WithDraggableViewBox<P> {
  const DraggableContainer = WithDraggableSVG(Component);

  // continue... remove the last commit from the log. the regex doesn't work for negative numbers. also not for decimal numbers (with dot). is this the right way...?
  // also check that "none" viewbox doesn't get changed by updateViewBox.
  const viewBoxRegex = /^\s*(?:(-?\d+)\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)|none)\s*$/.compile()

  function updateViewBox(viewBox?: string): string | undefined {
    if (typeof (viewBox) !== "string") {
      return viewBox
    }
    const match = viewBox.match(viewBoxRegex)
    if (!match || (match[0] === "none")) {
      return viewBox
    }
    debugger;
    const minX = parseFloat(match[0]);
    const minY = parseFloat(match[1]);
    const width = parseFloat(match[2]);
    const height = parseFloat(match[3]);
    return `${minX} ${minY} ${width} ${height}`;
  }

  const Wrapper: WithDraggableViewBox<P> = ({viewBox, ...restProps}: P) => {
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
      {...restProps as P}
      viewBox={updateViewBox(viewBox)}
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
