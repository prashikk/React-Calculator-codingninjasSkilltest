import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  performOperation = (nextOperator) => {
    const { displayValue, prevValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (prevValue === null) {
      this.setState({
        prevValue: inputValue,
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else if (operator) {
      const result = this.calculate(prevValue, inputValue, operator);

      this.setState({
        displayValue: String(result),
        prevValue: result,
        waitingForOperand: true,
        operator: nextOperator,
      });
    }
  };

  calculate = (prevValue, nextValue, operator) => {
    switch (operator) {
      case '+':
        return prevValue + nextValue;
      case '-':
        return prevValue - nextValue;
      case '*':
        return prevValue * nextValue;
      case '/':
        return prevValue / nextValue;
      default:
        return nextValue;
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button onClick={this.clearDisplay}>AC</button>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.performOperation('+')}>+</button>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.performOperation('-')}>-</button>
          <button onClick={this.inputDecimal}>.</button>
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button onClick={() => this.performOperation('*')}>*</button>
          <button onClick={() => this.performOperation('/')}>/</button>
          <button onClick={() => this.performOperation('=')}>=</button>
        </div>
      </div>
    );
  }
}

export default App;
