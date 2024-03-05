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

  // Add keydown event listener to the document
  document.addEventListener("keydown", handleKeyDown);

  // Function to handle button clicks
  function handleClick(event) {
    // Extract the button value and current input value
    const buttonValue = event.target.innerText;
    handleInput(buttonValue);
  }

  // Function to handle key presses
  function handleKeyDown(event) {
    // Get the key value
    const keyValue = event.key;

    // Check if the key is a valid key for the calculator
    if (isValidKey(keyValue)) {
        if (keyValue === "Enter") {
            // Handle the Enter key separately as it corresponds to "="
            handleInput("=");
        } else if (keyValue === "Backspace") {
            // Handle the Backspace key separately
            inputBox.value = inputBox.value.slice(0, -1); // Remove the last character from the input
        } else {
            // For other keys, handle the input normally
            handleInput(keyValue);
        }
        event.preventDefault(); // Prevent the default action (e.g., scrolling)
    }
}

  // Function to handle both button clicks and key presses
  function handleInput(value) {
    // Extract the current input value
    const currentInput = inputBox.value;

    // Switch statement to handle different input actions
    switch (value) {
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
          const result = new Function("return " + currentInput)();
          inputBox.value = isFinite(result) ? result : "∞"; // Display infinity symbol for infinite result
        } catch (error) {
          inputBox.value = "E"; // Display "E" for errors
        }
        break;
      case ".":
        // Allow only one decimal point in the input
        if (!currentInput.includes(".")) {
          inputBox.value += value;
        }
        break;
      default:
        // Check if the input is empty or only contains zero
        if (currentInput === "" || currentInput === "0") {
          // Allow only one zero at the beginning
          if (value !== "0" && value !== ".") {
            inputBox.value += value;
          }
        } else {
          // Check if the input length is less than or equal to 12 characters
          if (currentInput.length <= 12) {
            // Check if the input bar contains a single zero
            if (currentInput === "0") {
              // Allow only decimal point to be added after zero
              if (value === ".") {
                inputBox.value += value;
              }
            } else {
              // Check if the clicked button is a digit, operator, or decimal point
              if (/[\d\+\-\*\/\%\.]/.test(value)) {
                // Check if the last character is not an operator or a dot
                if (
                  (currentInput !== "" || /\d/.test(value)) &&
                  (value !== "%" || /\d/.test(currentInput.slice(-1))) &&
                  (value !== "+" || /\d/.test(currentInput.slice(-1))) &&
                  (value !== "*" || /\d/.test(currentInput.slice(-1))) &&
                  (value !== "/" || /\d/.test(currentInput.slice(-1))) &&
                  (value !== "-" || /\d/.test(currentInput.slice(-1))) &&
                  value !== "."
                ) {
                  inputBox.value += value; // Add the button value to the input
                }
              }
            }
          }
        }
        break;
    }
  }

  // Function to check if a value is an operator
  function isOperator(value) {
    return operators.includes(value);
  }

  // Function to check if a key is a valid key for the calculator
  function isValidKey(key) {
    // Allow digits, operators, decimal point, Backspace, Enter, and Escape keys
    return /[\d+\-*/%.]|Backspace|Enter|Escape/i.test(key);
  }

  // Event listener to prevent typing invalid characters into the input box
  inputBox.addEventListener("keypress", function (event) {
    const allowedKeys = /[0-9+\-*/.%]/; // Define the allowed characters using a regular expression

    // Check if the pressed key is not allowed
    if (!allowedKeys.test(event.key)) {
      event.preventDefault(); // Prevent the default action (typing)
    }
  });
});
