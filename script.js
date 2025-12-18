let currentValueDisplay = document.getElementById("current-value");
let expressionDisplay = document.getElementById("expression");
let currentInput = "0";
let operator = null;
let previousValue = null;
let waitingForOperand = false;
let expression = "";

function updateDisplay() {
  currentValueDisplay.textContent = currentInput;
  expressionDisplay.textContent = expression;
}

function appendNumber(num) {
  if (waitingForOperand) {
    currentInput = num;
    waitingForOperand = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  updateDisplay();
}

function appendDecimal() {
  if (waitingForOperand) {
    currentInput = "0.";
    waitingForOperand = false;
  } else if (currentInput.indexOf(".") === -1) {
    currentInput += ".";
  }
  updateDisplay();
}

function appendOperator(op) {
  const inputValue = parseFloat(currentInput);

  if (previousValue === null) {
    previousValue = inputValue;
    expression = currentInput + " " + op;
  } else if (operator) {
    const result = performCalculation();
    currentInput = String(result);
    previousValue = result;
    expression = currentInput + " " + op;
  } else {
    expression = currentInput + " " + op;
  }

  waitingForOperand = true;
  operator = op;
  updateDisplay();
}

function performCalculation() {
  const inputValue = parseFloat(currentInput);
  let result = 0;

  if (operator === "+") {
    result = previousValue + inputValue;
  } else if (operator === "-") {
    result = previousValue - inputValue;
  } else if (operator === "*") {
    result = previousValue * inputValue;
  } else if (operator === "/") {
    result = inputValue !== 0 ? previousValue / inputValue : "Error";
  }

  return result;
}

function calculate() {
  if (operator && previousValue !== null) {
    expression = expression + " " + currentInput + " =";
    const result = performCalculation();
    currentInput = String(result);
    operator = null;
    previousValue = null;
    waitingForOperand = true;
    updateDisplay();
    setTimeout(() => {
      expression = "";
      updateDisplay();
    }, 1500);
  }
}

function clearDisplay() {
  currentInput = "0";
  operator = null;
  previousValue = null;
  waitingForOperand = false;
  expression = "";
  updateDisplay();
}

function deleteLastChar() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

document.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9") {
    appendNumber(e.key);
  } else if (e.key === ".") {
    appendDecimal();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    appendOperator(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
    clearDisplay();
  } else if (e.key === "Backspace") {
    deleteLastChar();
  }
});
