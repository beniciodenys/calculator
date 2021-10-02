"use strict";

class Operand {
  constructor() {
    this.positive = true;
    this.number;
  }

  ConvertNumber() {
    this.positive = !this.positive;
    this.number *= -1;
    return this.positive;
  }

  UpdateNumber(value) {
    this.number = value;
    console.log("current number: " + value + "(" + typeof value + ")");
  }
}

////////////////////////////////////////////////////////////////////////////

class Calculator {
  constructor() {
    this.firstOperand = "";
    this.secondOperand = "";
    this.operator = "";
    this.state = "firstOperand";

    this.text_mainOutput = "0";
    this.mainDisplay = document.getElementById("mainDisplay");
  }

  AddOperand(textVal) {
    switch (this.state) {
      case "firstOperand":
        if (this.text_mainOutput == "0") {
          this.text_mainOutput = "";
        }
        this.text_mainOutput += textVal;
        this.firstOperand = this.text_mainOutput;
        break;
      case "secondOperand":
        if (this.text_mainOutput == "0") {
          this.text_mainOutput = "";
        }
        this.text_mainOutput += textVal;
        this.secondOperand = this.text_mainOutput;
        break;
      case "result":
        break;
      default:
    }

    this.UpdateMainDisplay(this.text_mainOutput);
  }

  DeleteOperand() {
    if (this.text_mainOutput.length >= 2) {
      this.text_mainOutput = this.text_mainOutput.slice(0, -1);
    } else {
      this.text_mainOutput = "0";
    }
    this.UpdateMainDisplay();
  }

  UpdateMainDisplay(value) {
    this.mainDisplay.innerHTML = value;
  }

  ClearOperand() {
    let cop = this.currentOperand;
    let pop = this.previousOperand;

    if (cop.number == 0) {
      pop.number = 0;
      this.previousOperand = new Operand();
      this.currentOperand = new Operand();
      this.operator = "";
      this.state = "firstOperand";
    } else {
      cop.number = 0;
    }

    this.text_mainOutput = cop.number;

    this.UpdateMainDisplay();

    console.log(
      "expression: " +
        `${this.previousOperand.number} ${this.operator} ${this.currentOperand.number}`
    );
  }

  AddOperator(oper) {
    // add operator
    this.operator = oper;

    console.log("operator: " + oper);
    console.log("prev operand: " + this.previousOperand.number);
    console.log("curr operand: " + this.currentOperand.number);
    console.log(
      "expression: " +
        `${this.previousOperand.number} ${oper} ${this.currentOperand.number}`
    );
    if (this.state == "result") {
      this.state = "secondOperand";
    }
  }

  GetResult() {
    if (
      this.operator != "" &&
      this.previousOperand.number != undefined &&
      this.currentOperand.number != undefined
    ) {
      // get short names for values
      let cop = this.currentOperand.number;
      let pop = this.previousOperand.number;
      let result;

      // count result value
      switch (this.operator) {
        case "+":
          result = pop + cop;
          break;
        case "-":
          result = pop - cop;
          break;
        case "*":
          result = pop * cop;
          break;
        case "/":
          result = pop / cop;
          break;
        default:
      }

      // save result value as previous operand
      this.previousOperand.number = result;

      // display result value
      this.text_mainOutput = result;
      this.UpdateMainDisplay();

      console.log(
        "expression: " +
          `${this.previousOperand.number} ${this.operator} ${this.currentOperand.number}`
      );

      this.state = "result";
    }
  }
}

////////////////////////////////////////////////////////////////////////////

let calculator = new Calculator();

function AddOperand(val) {
  calculator.AddOperand(val);
}
function DeleteOperand() {
  calculator.DeleteOperand();
}
function ClearOperand() {
  console.log("clear operand");
  calculator.ClearOperand();
}
function AddOperator(oper) {
  calculator.AddOperator(oper);
}
function GetResult() {
  calculator.GetResult();
}

////////////////////////////////////////////////////////////////////////////
