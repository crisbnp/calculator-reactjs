import React, { Component } from 'react';
import './App.css';
import Display from './components/Display';
import Button from './components/Button';
import Footer from './components/Footer';

class App extends Component {
  state = {
    storedVal: null,
    displayValue : "0",
    operationSymbol: null,
    isOperandClicked: false,
  }

  AddToInput = (val) => {
    //destructuring
    const { displayValue, isOperandClicked} = this.state

    if (isOperandClicked) {
      this.setState({
        displayValue: val,
        isOperandClicked: false,
      })
    } else {
      if (displayValue === "0") {
        this.setState({displayValue: val})
      } else {
        if (displayValue.length >= 9) {
          return;
        }

        this.setState({displayValue: displayValue + val})
      }
    }

    
  }

  DecimalPoint = () => {
    const { displayValue, isOperandClicked } = this.state

    if (isOperandClicked) {
      this.setState({
        displayValue: ".",
        isOperandClicked: false,
      })
    } else if(displayValue.indexOf(".") === -1) {
      //if decimal point is found on the display value, don't allow point to be added. 
      //Using string.indexOf() to check if a specific string/value exists within the string
      
        this.setState({
          displayValue: displayValue + "."
        })
      } 
  }

  SquareRoot = () => {
    const { displayValue } = this.state
    this.setState({displayValue: Math.sqrt(displayValue)})
  }

  PlusMinus = () => {
    const { displayValue } = this.state
    this.setState({displayValue: (displayValue * -1)})
  }

  Percentage = () => {
    const { displayValue } = this.state
    this.setState({displayValue: (displayValue/100)})
  }

  Clear = () => {
    this.setState({
      storedVal: null,
      displayValue : "0",
      operationSymbol: null,
      isOperandClicked: false,
    })
  }

  PerformOperations = (operator) => {
    const {storedVal, displayValue, operationSymbol} = this.state
    const nextValue = parseFloat(displayValue)

    const Calculating = {
      "+" : (previousValue, nextValue) => previousValue + nextValue,
      "-" : (previousValue, nextValue) => previousValue - nextValue,
      "÷" : (previousValue, nextValue) => previousValue / nextValue,
      "x" : (previousValue, nextValue) => previousValue * nextValue,
      "=" : (previousValue, nextValue) => nextValue,
    }

    if (storedVal === null) {
      const prevVal = parseFloat(nextValue)
      this.setState({
        storedVal: prevVal,
      })
    } else if (operationSymbol) {
      const currentValue = parseFloat(storedVal)
      const computedValue= Calculating[operationSymbol](currentValue, nextValue)

      this.setState({
        storedVal: computedValue,
        displayValue: computedValue,
      })
    }

    this.setState({
      operationSymbol: operator,
      isOperandClicked: true,
    })
  }


  render() {
    const { displayValue } = this.state
    return (
      <div className="App">
        <div className="calc-container">
          <Display>{displayValue}</Display>
          <div className="btn-container">
            <Button handleClick={this.Clear}>AC</Button>
            <Button handleClick={this.PlusMinus} >+/-</Button>
            <Button handleClick={this.Percentage}>%</Button>
            <Button handleClick={this.PerformOperations}>÷</Button>

            <Button handleClick={this.AddToInput}>7</Button>
            <Button handleClick={this.AddToInput}>8</Button>
            <Button handleClick={this.AddToInput}>9</Button>
            <Button handleClick={this.PerformOperations}>x</Button>

            <Button handleClick={this.AddToInput}>4</Button>
            <Button handleClick={this.AddToInput}>5</Button>
            <Button handleClick={this.AddToInput}>6</Button>
            <Button handleClick={this.PerformOperations}>-</Button>

            <Button handleClick={this.AddToInput}>1</Button>
            <Button handleClick={this.AddToInput}>2</Button>
            <Button handleClick={this.AddToInput}>3</Button>
            <Button handleClick={this.PerformOperations}>+</Button>

            <Button className="zero" handleClick={this.AddToInput}>0</Button>
            <Button handleClick={this.DecimalPoint}>.</Button>
            <Button handleClick={this.SquareRoot}>√</Button>
            <Button handleClick={this.PerformOperations}>=</Button>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
