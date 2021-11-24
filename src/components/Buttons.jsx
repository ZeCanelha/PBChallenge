import React from "react";
import Button from "react-bootstrap/Button";

const Buttons = (props) => {
  const { onClearText, onSaveSession } = props;
  return (
    <div className="button-group">
      <Button size={"lg"} onClick={onSaveSession} variant="primary">
        Save
      </Button>
      <Button size={"lg"} onClick={onClearText} variant="primary">
        New Text
      </Button>
    </div>
  );
};

export default Buttons;
