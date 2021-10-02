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

class History {
  constructor() {
    this.prevDisplay = document.getElementById("prevDisplay");
    this.historyOutput = document.getElementById("history_output__text");
    this.history = [];
  }

  ShowPreviousCalculation(pop, cop, oper, result) {
    this.history.push({
      firstOperand: pop,
      secondOperand: cop,
      operator: oper,
      result: result,
    });

    console.log(this.history);

    this.prevDisplay.innerHTML = `${pop} ${oper} ${cop} =`;

    this.historyOutput.innerHTML += `<p> ${pop} ${oper} ${cop} = ${result} </p>`;
  }
  HidePreviousCalculation() {
    prevDisplay.innerHTML = "";
  }
}

class Calculator {
  constructor() {
    this.previousOperand = new Operand();
    this.currentOperand = new Operand();
    this.operator = "";
    this.state = "firstOperand";

    this.text_mainOutput = "0";
    this.mainDisplay = document.getElementById("mainDisplay");

    this.history = new History();
  }

  AddOperand(textVal) {
    switch (this.state) {
      case "firstOperand":
        if (this.operator != "") {
          // change current operand to previous, create new current operand
          this.previousOperand = this.currentOperand;
          this.currentOperand = new Operand();
          this.state = "secondOperand";
        }
        break;
      case "postResult":
        // change current operand to previous, create new current operand
        this.previousOperand = this.currentOperand;
        this.currentOperand = new Operand();
        this.state = "secondOperand";
        break;
      case "result":
        this.currentOperand = new Operand();
        this.previousOperand = new Operand();
        this.operator = "";
        this.state = "firstOperand";
        break;
      default:
    }

    if (this.currentOperand.number == undefined) {
      this.currentOperand.number = 0;
    }

    // this.text_mainOutput = this.currentOperand.number;

    // checking text format of current operand
    if (this.text_mainOutput == "0") this.text_mainOutput = "";
    if (textVal == "." && this.text_mainOutput == "") {
      this.text_mainOutput = "0";
    }

    // add new number to current operand
    this.text_mainOutput += textVal;

    // Update with new values
    this.UpdateMainDisplay();
    this.currentOperand.UpdateNumber(+this.text_mainOutput);
    this.history.HidePreviousCalculation();
  }

  DeleteOperand() {
    if (this.text_mainOutput.length >= 2) {
      this.text_mainOutput = this.text_mainOutput.slice(0, -1);
    } else {
      this.text_mainOutput = "0";
    }
    this.UpdateMainDisplay();
    this.currentOperand.UpdateNumber(+this.text_mainOutput);
    this.history.HidePreviousCalculation();
  }

  AddOperator(oper) {
    if (this.state == "result") {
      this.currentOperand = this.previousOperand;
      this.state = "firstOperand";
    }

    this.text_mainOutput = "";

    // add operator
    this.operator = oper;
    this.history.HidePreviousCalculation();

    //logs
    {
      console.log("operator: " + oper);
      console.log("prev operand: " + this.previousOperand.number);
      console.log("curr operand: " + this.currentOperand.number);
      console.log(
        "expression: " +
          `${this.previousOperand.number} ${oper} ${this.currentOperand.number}`
      );
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

      this.history.ShowPreviousCalculation(pop, cop, this.operator, result);

      // save result value as previous operand
      this.previousOperand.number = result;

      // display result value
      this.text_mainOutput = result;
      this.UpdateMainDisplay();

      this.state = "result";
    }

    //logs
    {
      console.log(
        "expression: " +
          `${this.previousOperand.number} ${this.operator} ${this.currentOperand.number}`
      );
    }
  }

  ClearOperand() {
    let cop = this.currentOperand;
    let pop = this.previousOperand;

    if (this.state == "result") {
      pop.number = 0;
      this.previousOperand = new Operand();
      this.currentOperand = new Operand();
      this.operator = "";
      this.state = "firstOperand";
    }

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
    this.history.HidePreviousCalculation();
  }

  ConvertSign() {
    this.currentOperand.ConvertNumber();
    this.text_mainOutput = this.currentOperand.number;
    this.UpdateMainDisplay();
    console.log(
      "convert number| current operand: " + this.currentOperand.number
    );
    this.history.HidePreviousCalculation();
  }

  GetPercent() {
    this.currentOperand.number /= 100;

    this.text_mainOutput = this.currentOperand.number;
    this.currentOperand.UpdateNumber(+this.text_mainOutput);
    this.UpdateMainDisplay();
  }

  UpdateMainDisplay() {
    this.mainDisplay.innerHTML = this.text_mainOutput;
  }
}

////////////////////////////////////////////////////////////////////////////

let calculator = new Calculator();
let historyOutput = document.getElementById("history_output");
let historyHidden = true;

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
function ConvertSign() {
  calculator.ConvertSign();
}
function GetPercent() {
  calculator.GetPercent();
}

function ToggleHistory() {
  if (historyHidden) {
    historyOutput.style.opacity = 1;
    historyOutput.style.visibility = "visible";
  } else {
    historyOutput.style.opacity = 0;
    historyOutput.style.visibility = "hidden";
  }

  historyHidden = !historyHidden;

  console.log("historyHidden: " + historyHidden);
}

////////////////////////////////////////////////////////////////////////////
