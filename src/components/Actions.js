import React from "react";

const Actions = props => {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        what should i do?
      </button>
    </div>
  );
};

export default Actions;
