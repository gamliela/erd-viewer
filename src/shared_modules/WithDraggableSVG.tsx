import * as React from "react";
import {FunctionComponent, SVGProps, useCallback, useState} from "react";

function getPointerPosition(svg, event) {
  const CTM = svg.getScreenCTM();
  return {
    x: (event.clientX - CTM.e) / CTM.a,
    y: (event.clientY - CTM.f) / CTM.d
  };
}

function getXAttribute(element) {
  return parseFloat(element.getAttributeNS(null, "x") || element.getAttributeNS(null, "cx")) || 0;
}

function getYAttribute(element) {
  return parseFloat(element.getAttributeNS(null, "y") || element.getAttributeNS(null, "cy")) || 0;
}

interface DraggableSVGProps {
  onSVGDragStarted?: (x: number, y: number) => void;
  onSVGDrag?: (x: number, y: number) => void;
  onSVGDragEnded?: () => void;
}

type WithDraggableSVGProps<P> = P & DraggableSVGProps

type WithDraggableSVG<P> = FunctionComponent<WithDraggableSVGProps<P>>

function WithDraggableSVG<P extends SVGProps<SVGElement>>(Component: React.ComponentType<P> | string): WithDraggableSVG<P> {
  const Wrapper: WithDraggableSVG<P> = ({
                                          onSVGDragStarted,
                                          onSVGDrag,
                                          onSVGDragEnded,
                                          ...wrappedProps
                                        }: WithDraggableSVGProps<P>) => {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});

    const onPointerDown = useCallback((event) => {
      const element = event.target;
      element.setPointerCapture(event.pointerId);
      const offset = getPointerPosition(element, event);
      const elementX = getXAttribute(element);
      const elementY = getYAttribute(element);
      offset.x -= elementX;
      offset.y -= elementY;
      setDragging(true);
      setOffset(offset);
      onSVGDragStarted && onSVGDragStarted(elementX, elementY);
    }, [onSVGDragStarted])

    const onPointerMove = useCallback((event) => {
      if (dragging) {
        const element = event.target;
        event.preventDefault();
        const coord = getPointerPosition(element, event);
        onSVGDrag && onSVGDrag(coord.x - offset.x, coord.y - offset.y);
      }
    }, [onSVGDrag, dragging, offset])

    const onPointerUpOrLeave = useCallback(() => {
      if (dragging) {
        setDragging(false);
        onSVGDragEnded && onSVGDragEnded();
      }
    }, [onSVGDragEnded, dragging])

    return <Component
      {...wrappedProps as P} // children are passed in wrapperProps
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUpOrLeave}
      onPointerLeave={onPointerUpOrLeave}
    />
  }

  // build display name for the wrapper component
  const componentName = (typeof (Component) === "string") ? Component : Component.displayName;
  Wrapper.displayName = "Draggable " + componentName;

  return Wrapper;
}

export default WithDraggableSVG;
