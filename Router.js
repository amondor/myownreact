import "./main.js"

class Router extends Component {
  state = {
    path: "/home",
    root: "/"
  };

  render() {
    return React.createElement("div", {}, [
      React.createElement(
        "button",
        { onClick: () => this.setState({ path: "/home" }) },
        ["Home"]
      ),
      React.createElement(
        "button",
        { onClick: () => this.setState({ path: "/about" }) },
        ["About"]
      ),
      path === "/" && React.createElement(root),
      path === "/home" && React.createElement(Home)
    ]);
  }

  // cette fonction est à appeler qlq part
  reRender(element){
    let root;
    element.children.forEach(
      root.appendChild(childElement)
    )
    return root;
  }
}

ReactDOM.render(
  React.createElement("div", { toWhat: { name: "World" } }, [
    "Hello {{toWhat.name}}",
    React.createElement(todoList, { name: "world" }),
    React.createElement(Counter, { defaultValue: 10 }),
    React.createElement(Counter, { defaultValue: 0 }),
  ]),
  document.getElementById("root")
);