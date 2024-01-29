// Wait for the HTML document to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the input box and all buttons
  const inputBox = document.getElementById("inputBox");
  const buttons = document.querySelectorAll("button");

  // Define an array of operators
  const operators = ["+", "-", "*", "/", "%"];

  // Add click event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  // Function to handle button clicks
  function handleClick(event) {
    // Extract the button value and current input value
    const buttonValue = event.target.innerText;
    const currentInput = inputBox.value;

    // Switch statement to handle different button actions
    switch (buttonValue) {
      case "AC":
        // Clear the input box if AC (All Clear) button is clicked
        inputBox.value = "";
        break;
      case "DEL":
        // Delete the last character from the input if DEL button is clicked
        inputBox.value = currentInput.slice(0, -1);
        break;
      case "=":
        // Evaluate and display the result when = button is clicked
        try {
          inputBox.value = new Function("return " + currentInput)();
        } catch (error) {
          inputBox.value = "E"; // Display "E" for errors
        }
        break;
      case ".":
        // Allow only one decimal point in the input
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
          inputBox.value += buttonValue; // Add the button value to the input
        }
        break;
    }
  }

  // Function to check if a value is an operator
  function isOperator(value) {
    return operators.includes(value);
  }
});

