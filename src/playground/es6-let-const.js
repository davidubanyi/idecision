class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };

    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
  }
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

  componentWillUnmount() {}

  handleRemoveOption(optionText) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return optionText !== option;
      })
    }));
  }

  handleRemoveAll() {
    this.setState(() => ({ options: [] }));
  }

  handlePick() {
    if (this.state.options.length > 0) {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      return alert(option);
    }
  }
  handleAddOption(option) {
    if (!option) {
      return "Please provide an option";
    } else if (this.state.options.indexOf(option) > -1) {
      return "The selected option is already an option";
    }
    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const subtitle = " Let your Computer suggest your next steps for you";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Actions
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleRemoveAll={this.handleRemoveAll}
          handleRemoveOption={this.handleRemoveOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
};

const Actions = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        what should i do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      {props.options.length === 0 && <p>Please provide some options</p>}
      {props.options.map(option => (
        <Option
          key={props.options.indexOf(option)}
          handleRemoveOption={props.handleRemoveOption}
          optionText={option}
        />
      ))}
    </div>
  );
};
class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };

    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();

    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));
    if (!error) {
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button
        onClick={e => {
          props.handleRemoveOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

ReactDOM.render(<IndecisionApp />, document.getElementById("app"));
