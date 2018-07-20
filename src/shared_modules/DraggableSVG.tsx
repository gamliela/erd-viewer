import * as React from "react";
import {SVGProps} from "react";

// TODO: add a display name and hoist statics

interface WithDraggableSVGProps {
  onSVGDrag?: (x, y) => void;
}

type WithDraggableSVGState = {
  dragging: boolean;
  offset: {
    x: number,
    y: number
  }
}

function getMousePosition(svg, event) {
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
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseUpOrLeave = this.onMouseUpOrLeave.bind(this);
      this.state = {
        dragging: false,
        offset: {x: 0, y: 0}
      };
    }

    onMouseDown(event) {
      const element = event.target;
      const offset = getMousePosition(element, event);
      offset.x -= getXAttribute(element);
      offset.y -= getYAttribute(element);
      this.setState({dragging: true, offset});
    }

    onMouseMove(event) {
      if (this.state.dragging) {
        const element = event.target;
        event.preventDefault();
        const coord = getMousePosition(element, event);
        this.props.onSVGDrag && this.props.onSVGDrag(coord.x - this.state.offset.x, coord.y - this.state.offset.y);
      }
    }

    onMouseUpOrLeave() {
      this.setState({dragging: false})
    }

    render() {
      return <Component
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUpOrLeave}
        onMouseLeave={this.onMouseUpOrLeave}
        {...this.props}
      />;
    }
  };

export default withDraggableSVG;
