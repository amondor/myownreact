import "./helper.js";
import "./Router.js"

let ReactDOM = {
  render(rElement, root) {
    root.appendChild(rElement);
  },
};

let React = {
  createElement(tagOrComponent, props, children) {
    let element;
    if (tagOrComponent === "div") {
      element = document.createElement(tagOrComponent);
      for (let attribute in props) {
        element.setAttribute(attribute, props[attribute]);
      }
      for (let subElement of children) {
        if (typeof subElement === "string")
          subElement = document.createTextNode(
            subElement /**.interpolate(props) */
          );
        element.appendChild(subElement);
      }
    } /** component **/ else {
      if (!type_check(props, tagOrComponent.propTypes)) throw new TypeError();
      return tagOrComponent.display(props);
    }

    return element;
  }//trigger rerenderdom, 
};


class Component {
  
  state = {};
  constructor(props) {
    this.props = props;
  }

  receiveData(data) {
    //propaccess
    this.prevProps = Object.assign({}, this.props);
    this.props.state = data.state;
    this.props.origin = data.origin;
    this.props.position = data.position;
  };

  display(props) {
    receiveData(props);
    if(this.needUpdate()) {
      return this.render();
    }
  }

  render() {
      switch (this.props.state) {
        case "updated":
          return this;
        case "deleted":
          return false
        default:
          this.props = prevProps;
          return this;
      } 
  }

  needUpdate () {
    return (JSON.stringify(this.prevProps) !== JSON.stringify(this.props));
  }
  
  prop_access(props) {

    if (this === "undefined" || !this || typeof props !== "string" || !props) {
      return this;
    }
  
    let path = "";

    for (const prop of props.split(".")) {
      path =  `.${prop}`;

        if (!this[prop]) {
            console.log(`${path} doesn't exist`);
            break;
        }
        else if(this[prop] === null || this[prop] === "" ) {
          return this;
        }
        
        this = this[prop]
    }
    return this;
  }

  prop_accessV1(obj, props) {

    if (obj === "undefined" || !obj || typeof props !== "string" || !props) {
      return obj;
    }
   
    let path = "";

    for (const prop of props.split(".")) {
        path =  `.${prop}`;

        if (!obj[prop]) {
            console.log(`${path} doesn't exist`);
            break;
        }
        else if(obj[prop] === obj || obj[prop] === "" ) {
          return obj;
        }
        
        obj = obj[prop]
    }
    return obj;
  }

}

class DOM extends Component {

    display(compProps) {

    compProps.forEach((element) => compProps.removeChild(element))
    compProps.forEach((child) => 
    {
      // mettre a jour chaque element enfant
    },

    this.router.reRender(compProps));
  }
}

class todoList extends Component {
  propTypes = {
    name: { type: "string", enum: ["world", "you", "me"] },
  };

  render() {
    return React.createElement("div", { toWhat: { name: this.props.name } }, [
      "Hello {{toWhat.name}}",
    ]);
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.defaultValue || 0,
    };
  }

  propTypes = {
    defaultValue: { type: "number" },
  };

  render() {
    return React.createElement("div", {}, [
      React.createElement(
        "button",
        { onClick: () => this.setState({ counter: this.state.counter + 1 }) },
        ["Add"]
      ),
      React.createElement("span", { title: this.state.counter }, ["{{title}}"]),
    ]);
  }
}

//<=>
//<div>
//  Hello World
//  <div>
//    Hello World
//  </div>
//  <div>
//    <button>Add</button>
//    <span>10</span>
//  </div>
//  <div>
//  <button>Add</button>
//    <span>0</span>
//  </div>
//</div>

//I] Pros : generation, Cons: Update
//  React.createElement => DomElement
//  Component.render => DomElement
//  ReactDOM.render => rootElement.appendChild(DomElement);
//
//II] Pros: Update, Cons: generation
//  React.createElement => Object
//  Component.render => Object
//  ReactDOM.render =>
//    1) Object => DomElement
//    2) rootElement.appendChild(DomElement);
