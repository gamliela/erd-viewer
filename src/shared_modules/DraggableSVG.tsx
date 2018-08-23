import * as React from "react";
import {SVGProps} from "react";

// TODO: add a display name and hoist statics

interface WithDraggableSVGProps {
  onSVGDragStarted?: (x, y) => void;
  onSVGDrag?: (x, y) => void;
  onSVGDragEnded?: () => void;
}

type WithDraggableSVGState = {
  dragging: boolean;
  offset: {
    x: number,
    y: number
  }
}

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

const withDraggableSVG = <P extends SVGProps<SVGElement>>(Component: React.ComponentType<P>) =>
  class WithDraggableSVG extends React.Component<P & WithDraggableSVGProps, WithDraggableSVGState> {
    constructor(props) {
      super(props);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUpOrLeave = this.onPointerUpOrLeave.bind(this);
      this.state = {
        dragging: false,
        offset: {x: 0, y: 0}
      };
    }

    onPointerDown(event) {
      const element = event.target;
      element.setPointerCapture(event.pointerId);
      const offset = getPointerPosition(element, event);
      const elementX = getXAttribute(element);
      const elementY = getYAttribute(element);
      offset.x -= elementX;
      offset.y -= elementY;
      this.setState({dragging: true, offset});
      this.props.onSVGDragStarted && this.props.onSVGDragStarted(elementX, elementY);
    }

    onPointerMove(event) {
      if (this.state.dragging) {
        const element = event.target;
        event.preventDefault();
        const coord = getPointerPosition(element, event);
        this.props.onSVGDrag && this.props.onSVGDrag(coord.x - this.state.offset.x, coord.y - this.state.offset.y);
      }
    }

    onPointerUpOrLeave() {
      if (this.state.dragging) {
        this.setState({dragging: false});
        this.props.onSVGDragEnded && this.props.onSVGDragEnded();
      }
    }

    render() {
      const {onSVGDragStarted, onSVGDrag, onSVGDragEnded, ...wrappedProps} = this.props as any;
      return <Component
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUpOrLeave}
        onPointerLeave={this.onPointerUpOrLeave}
        {...wrappedProps}
      >
        {this.props.children}
      </Component>;
    }
  };

export default withDraggableSVG;
