const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

// functions
const calculate = (n1, operator, n2) => {
  // Preform calculation and return calculated value
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      console.log("number key!");
      calculator.dataset.previousKey = "number";
    }

    if (
      action == "add" ||
      action == "subtract" ||
      action == "multiply" ||
      action == "divide"
    ) {
      key.classList.add("is-depressed");
      // We're adding a custom attribute
      calculator.dataset.previousKeyType = "operator";
      //calculator.dataset.firstValue = displayedNum;
      //calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      console.log("decimal key!");
      if (!displayedNum.includes(".")) {
        display.textContent = displayNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKey = "decimal";
    }

    if (action === "clear") {
      console.log("clear key!");
      calculator.dataset.previousKey = "clear";
    }

    if (action === "calculate") {
      console.log("equal key!");
      calculator.dataset.previousKey = "calculate";
    }
  }
});

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const displayedNum = display.textContent;

    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }
    if (action === "decimal") {
      display.textContent = displayedNum + ".";
    }
    // remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
    }

    if (!displayedNum.includes(".")) {
      display.textContent = displayedNum + ".";
    }
  }
});
