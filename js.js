document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("inputBox");
  const buttons = document.querySelectorAll("button");
  const operators = ["+", "-", "*", "/", "%"];

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
          inputBox.value = new Function("return " + currentInput)();
        } catch (error) {
          inputBox.value = "E";
        }
        break;
      case ".":
        if (!currentInput.includes(".")) {
          inputBox.value += buttonValue;
        }
        break;

      default:
        // Check if the last character is not an operator or a dot
        if (
          (currentInput === "" && buttonValue === "-") || // Allow "-" at the beginning
          ((currentInput !== "" || /\d/.test(buttonValue)) &&
            (buttonValue !== "%" || /\d/.test(currentInput.slice(-1))) &&
            (buttonValue !== "+" || /\d/.test(currentInput.slice(-1))) &&
            (buttonValue !== "*" || /\d/.test(currentInput.slice(-1))) &&
            (buttonValue !== "/" || /\d/.test(currentInput.slice(-1))) &&
            (buttonValue !== "-" || /\d/.test(currentInput.slice(-1))) &&
            buttonValue !== ".")
        ) {
          inputBox.value += buttonValue;
        }

        break;
    }
  }
  function isOperator(value) {
    return operators.includes(value);
  }
});
