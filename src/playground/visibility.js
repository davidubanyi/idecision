class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
  }
  handleToggleVisibility() {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? "Hide Me" : "Show Me"}
        </button>
        {this.state.visibility && (
          <p>
            Wow so you finally get to see me hiding here. Hmm I thought you
            would have never clicked the button
          </p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));
