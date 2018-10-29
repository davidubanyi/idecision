import React from "react";

import AddOption from "./AddOption";
import Options from "./Options";
import Header from "./Header";
import Actions from "./Actions";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
  state = {
    options: this.props.options,
    selectedOption: undefined
  };
  handleRemoveOption = optionText => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return optionText !== option;
      })
    }));
  };

  handleRemoveAll = () => {
    this.setState(() => ({ options: [] }));
  };

  handlePick = () => {
    if (this.state.options.length > 0) {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      this.setState(() => ({ selectedOption: option }));
    }
  };
  handleAddOption = option => {
    if (!option) {
      return "Please provide an option";
    } else if (this.state.options.indexOf(option) > -1) {
      return "The selected option is already an option";
    }
    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  };

  handleModalClose = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({
          options
        }));
      }
    } catch (error) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  render() {
    const subtitle = " Let your Computer suggest your next steps for you";
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Actions
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleRemoveAll={this.handleRemoveAll}
              handleRemoveOption={this.handleRemoveOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleModalClose={this.handleModalClose}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

export default IndecisionApp;
