import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastNotification = (props) => {
  const { show, onClose } = props;
  const position = "top-end";
  return (
    <ToastContainer className="p-3" position={position}>
      <Toast
        className={"not-selectable"}
        onClose={onClose}
        delay={4000}
        show={show}
        autohide
        bg={"light"}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">LOW-COST ANNOTATOR</strong>
        </Toast.Header>
        <Toast.Body>Annotations saved!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
