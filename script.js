function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function division(a, b)
{
    return a / b;
}

function operate(op1, operator, op2)
{
    switch(operator)
    {
        case "+":
            return add(op1, op2);
        case "-":
            return subtract(op1, op2);
        case "*":
            return multiply(op1, op2);
        case "/":
            return division(op1, op2);
    }
}


let display = "0";
const displayElement = document.querySelector("#display-calc");

function updateDisplay()
{
    displayElement.textContent = +(Number(display).toFixed(3));
    if(String(display).substring(0, display.length - 1) === ".") displayElement.textContent += ".";
}

let btnContainer = document.querySelector("#button-container");

let firstOperand = null;
let opBuffer = null;


function crash()
{
    let firstOperand = null;
    let opBuffer = null;
}


function onButtonPress(event)
{
    const buttonName = event.target.id;

    if(buttonName.startsWith("btn"))
    {
        const inputButton = buttonName.slice(3);
        if(inputButton === "dot")
        {
            if(display === "0") display = "0.";
            else if(display.indexOf(".") < 0) display += ".";
        }
        else if(display === "0") display = inputButton;
        else display += inputButton;

        updateDisplay();
    }
    if(buttonName === "cmd-clear")
    {
        firstOperand = null;
        opBuffer = null;
        display = "0";
        updateDisplay();
    }
    if(buttonName === "cmd-backspace")
    {
        if(display.length > 0)
        {
            display = display.slice(0, display.length - 1);
        }
        updateDisplay();
    }
    if(buttonName === "cmd-equal")
    {
        if(Number(display) === 0 && opBuffer === "/")
        {
            firstOperand = null;
            opBuffer = null;
            displayElement.textContent = "LMAO";
            display = "0";
            return;
        }
        if(opBuffer !== null)
        {
            firstOperand = operate(firstOperand, opBuffer, Number(display));
            display = firstOperand;
            firstOperand = null;
            opBuffer = null;
        }
        updateDisplay();
    }
    if(buttonName === "cmd-sign")
    {
        if(display !== "0" || display != "")
        {
            if(display.startsWith("-"))
            {
                display = String(display).slice(1);
            }
            else display = "-" + display;
            updateDisplay();
        }
        
    }
    if(buttonName.startsWith("op"))
    {
        let operator;
        const inputOperator = buttonName.slice(3);
        switch(inputOperator)
        {
            case "plus":
                operator = "+";
                break;
            case "minus":
                operator = "-";
                break;
            case "by":
                operator = "/";
                break;
            case "into":
                operator = "*";
                break;
            default:
                console.error("Problem in op switch");
        }

        if(opBuffer === null)
        {
            firstOperand = Number(display);
            opBuffer = operator;
        }
        else
        {
            if(Number(display) === 0 && opBuffer === "/")
            {
                firstOperand = null;
                opBuffer = null;
                display = "LMAO";
                updateDisplay();
                display = "0";
                return;
            }

            firstOperand = operate(firstOperand, opBuffer, Number(display));
            opBuffer = operator;
            display = firstOperand;
            updateDisplay();
        }
        display = "";
    }
}

btnContainer.addEventListener("click", onButtonPress);
