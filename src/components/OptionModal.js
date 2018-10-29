import React from "react";
import Modal from "react-modal";

const OptionModal = props => {
  return (
    <Modal
      isOpen={!!props.selectedOption}
      contentLabel="Selected Option"
      onRequestClose={props.handleModalClose}
      closeTimeoutMS={400}
      className="modal"
    >
      <h3 className="modal__tile">Selected Option</h3>
      {props.selectedOption && (
        <p className="modal__body">{props.selectedOption}</p>
      )}
      <button className="button" onClick={props.handleModalClose}>
        Okay, I'll get to it
      </button>
    </Modal>
  );
};

export default OptionModal;
