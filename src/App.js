import React, { Component } from "react";
import Button from "./component/Button/Button";
import { evaluate } from "mathjs";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      formula: "",
      isResult: false,
    };
  }

  isOpearator = (value) => {
    return value === "+" || value === "-" || value === "*" || value === "/";
  };

  calculate = () => {
    const formula =
      this.state.formula &&
      (this.isOpearator(this.state.formula.slice(-1)) ||
        this.state.formula.slice(-1) === ".")
        ? this.state.formula.slice(0, -1)
        : this.state.formula;

    const result = formula ? evaluate(formula).toString() : 0;

    this.setState({
      input: result,
      formula: result,
      isResult: true,
    });
  };

  handleButtonClick = (event) => {
    const value = event.target.value;

    const { input, formula, isResult } = this.state;

    let newFormula = "";
    let newInput = "";
    switch (value) {
      case "AC":
        break;
      case "CE":
        if (isResult) {
          newInput = 0;
          newFormula = 0;
        } else {
          newInput = input && input.slice(0, -1);
          newFormula = formula && formula.slice(0, -1);
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (formula && this.isOpearator(formula.slice(-1))) {
          newInput = value;
          newFormula = formula.slice(0, -1) + value;
        } else if (formula) {
          newInput = value;
          newFormula = formula + value;
        }
        break;
      case ".":
        if (formula && this.isOpearator(formula.slice(-1))) {
          newInput = 0;
          newFormula = formula;
        } else {
          newInput = input + value;
          newFormula = formula + value;
        }
        break;
      default:
        if (isResult) {
          newInput = value;
          newFormula = value;
        } else if (formula && this.isOpearator(formula.slice(-1))) {
          newInput = value;
          newFormula = formula + value;
        } else {
          newInput = input + value;
          newFormula = formula + value;
        }
        break;
    }

    this.setState({
      input: newInput,
      formula: newFormula,
      isResult: false,
    });
  };

  render() {
    const { input, formula } = this.state;

    return (
      <div className="App">
        <div className="calculator-wrapper">
          <div className="row">
            <div className="monitor">
              {input}
              <div className="formula">{formula}</div>
            </div>
          </div>
          <div className="row">
            <Button onClick={this.handleButtonClick} classname="clear">
              AC
            </Button>
            <Button onClick={this.handleButtonClick} classname="clear">
              CE
            </Button>
            <Button onClick={this.handleButtonClick}>/</Button>
            <Button onClick={this.handleButtonClick}>*</Button>
          </div>
          <div className="row">
            <Button onClick={this.handleButtonClick}>7</Button>
            <Button onClick={this.handleButtonClick}>8</Button>
            <Button onClick={this.handleButtonClick}>9</Button>
            <Button onClick={this.handleButtonClick}>-</Button>
          </div>
          <div className="row">
            <Button onClick={this.handleButtonClick}>4</Button>
            <Button onClick={this.handleButtonClick}>5</Button>
            <Button onClick={this.handleButtonClick}>6</Button>
            <Button onClick={this.handleButtonClick}>+</Button>
          </div>
          <div className="row">
            <div className="row-75">
              <div className="row">
                <Button onClick={this.handleButtonClick}>1</Button>
                <Button onClick={this.handleButtonClick}>2</Button>
                <Button onClick={this.handleButtonClick}>3</Button>
              </div>
              <div className="row">
                <Button onClick={this.handleButtonClick} classname="button-2">
                  0
                </Button>
                <Button onClick={this.handleButtonClick}>.</Button>
              </div>
            </div>
            <Button onClick={this.calculate} classname="equal">
              =
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
