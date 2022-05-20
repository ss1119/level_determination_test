import Modal from "react-modal";
import React from "react";
import ReactLoading from "react-loading";

export default class LoadingOverlay extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isLoading} style={ModalStyle}>
        <ReactLoading
          type="spin"
          color="#2c6ae1"
          height={"50px"}
          width={"50px"}
        />
      </Modal>
    );
  }
}

const ModalStyle = {
  overlay: {
    zIndex: 100,
  },
  content: {
    top: "50%",
    left: "50%",
    bottom: "auto",
    textAlign: "center",
    border: "none",
    background: "rgba(0, 0, 0, 0)",
  },
};
