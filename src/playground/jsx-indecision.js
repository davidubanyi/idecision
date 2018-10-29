const app = {
  title: "the indecision app",
  subtitle: "Some subtitle this is",
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    renderIndecisionApp();
  }
};

const removeAll = () => {
  if (app.options.length > 0) {
    app.options = [];
    renderIndecisionApp();
  }
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const renderIndecisionApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>
        {app.options && app.options.length > 0
          ? "here are your options"
          : "No options"}
      </p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do
      </button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {app.options.map(option => {
          return <li key={app.options.indexOf(option)}>Option: {option}</li>;
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById("app");

renderIndecisionApp();
