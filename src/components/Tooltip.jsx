import React from "react";
import Button from "react-bootstrap/Button";
const Tooltip = (props) => {
  const tags = ["Person", "Organization", "Place", "Event"];
  const offset = 50;
  const { show, positionX, positionY } = props.tooltip;
  return show ? (
    <div
      className="tooltip-overlay"
      ref={props.tooltipRef}
      style={{ left: positionX, top: positionY - offset }}
    >
      {tags.map((tag, index) => {
        return (
          <Button
            size={"sm"}
            variant={"primary"}
            onClick={props.setTag}
            value={tag}
            key={index}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  ) : null;
};

export default Tooltip;
