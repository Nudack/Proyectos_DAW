document.addEventListener('DOMContentLoaded', () => {
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    const display = document.getElementById('display');

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function appendToDisplay(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    function setOperation(op) {
        if (operation !== null) calculate();
        operation = op;
        previousInput = currentInput;
        currentInput = '0';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch(operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    function setTheme(theme) {
        const calculator = document.querySelector('.calculator');
        calculator.className = 'calculator ' + theme;
    }

    // Event listeners
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => appendToDisplay(button.textContent));
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => setOperation(button.dataset.op));
    });

    document.querySelector('.clear').addEventListener('click', clearDisplay);
    document.querySelector('.equals').addEventListener('click', calculate);

    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', () => setTheme(button.dataset.theme));
    });

    updateDisplay();
});