function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value) || '';
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSquareRoot() {
    const display = document.getElementById('display');
    try {
        display.value = Math.sqrt(eval(display.value));
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePower() {
    const display = document.getElementById('display');
    try {
        display.value = Math.pow(eval(display.value), 2);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSin() {
    const display = document.getElementById('display');
    try {
        display.value = Math.sin(eval(display.value) * (Math.PI / 180)).toFixed(5);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateCos() {
    const display = document.getElementById('display');
    try {
        display.value = Math.cos(eval(display.value) * (Math.PI / 180)).toFixed(5);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateTan() {
    const display = document.getElementById('display');
    try {
        display.value = Math.tan(eval(display.value) * (Math.PI / 180)).toFixed(5);
    } catch (error) {
        display.value = 'Error';
    }
}
