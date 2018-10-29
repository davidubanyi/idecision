import React from "react";
import Option from "./Option";

const Options = props => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button className="button button--link" onClick={props.handleRemoveAll}>
          Remove All
        </button>
      </div>
      {props.options.length === 0 && (
        <p className="message">Please provide some options</p>
      )}
      {props.options.map((option, index) => (
        <Option
          key={props.options.indexOf(option)}
          count={index + 1}
          handleRemoveOption={props.handleRemoveOption}
          optionText={option}
        />
      ))}
    </div>
  );
};

export default Options;
