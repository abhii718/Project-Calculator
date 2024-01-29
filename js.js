document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("inputBox");
  const buttons = document.querySelectorAll("button");
  const operators = ["+", "-", "*", "/"];

  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(event) {
    const buttonValue = event.target.innerText;
    const currentInput = inputBox.value;

    switch (buttonValue) {
      case "AC":
        inputBox.value = "";
        break;
      case "DEL":
        inputBox.value = currentInput.slice(0, -1);
        break;
      case "=":
        try {
          inputBox.value = new Function('return ' + currentInput)();
        } catch (error) {
          inputBox.value = "E";
        }
        break;
      case ".":
        if (!currentInput.includes(".")) {
          inputBox.value += buttonValue;
        }
        break;
      case "%":
        if (currentInput !== "" && !isOperator(currentInput.slice(-1))) {
          inputBox.value += buttonValue;
        }
        break;
      default:
        if ((currentInput !== "" || /\d/.test(buttonValue)) && !isOperator(currentInput.slice(-1)) && !isOperator(buttonValue)) {
          inputBox.value += buttonValue;
        }
        break;
    }
  }

  function isOperator(value) {
    return operators.includes(value);
  }
});
