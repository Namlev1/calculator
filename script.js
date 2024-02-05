let buffer = 0;
let prevOperation = null
let currOperation = null;
let refreashCurrDisp = true; // flag
const MAX_LEN = 20;

const numBtns = document.querySelectorAll('.number');
const periodBtn = document.querySelector('.period');
const operBtns = document.querySelectorAll('.operator');
const displayCurr = document.querySelector('#display-current');
const displayHist = document.querySelector('#display-history');
const CButton = document.querySelector('#C');
const ACButton = document.querySelector('#AC');
const equalBtn = document.querySelector('#equal');

// NUMBER BUTTONS
numBtns.forEach(button =>
    button.addEventListener('click', e => {
        if (displayCurr.textContent == 'ERROR')
            return;
        if (currOperation == '=')
            clear();
        if (displayCurr.textContent == '0' || refreashCurrDisp) {
            displayCurr.textContent = e.target.textContent;
            refreashCurrDisp = false;
        }
        else if (displayCurr.textContent.length != MAX_LEN)
            displayCurr.textContent += e.target.textContent;
    })
);

// PERIOD BUTTON
periodBtn.addEventListener('click', e => {
    if (displayCurr.textContent == 'ERROR' || currOperation == '=' || displayCurr.textContent.length == MAX_LEN)
        return;
    if (displayCurr.textContent == '0' || refreashCurrDisp) {
        displayCurr.textContent = '0' + e.target.textContent;
        refreashCurrDisp = false;
    }
    else
        displayCurr.textContent += e.target.textContent;
})

// OPERATORS
operBtns.forEach(button =>
    button.addEventListener('click', e => {
        if (displayCurr.textContent == 'ERROR')
            return;

        if (refreashCurrDisp) {
            prevOperation = currOperation;
            currOperation = e.target.textContent;
        }
        else {
            if (currOperation != '=')
                buffer = eval(currOperation);
            prevOperation = currOperation = e.target.textContent;
            refreashCurrDisp = true;
        }
        displayHist.textContent = buffer + '' + currOperation;
        displayCurr.textContent = buffer;
    })
);

// EQUAL BUTTON
equalBtn.addEventListener('click', () => {
    if (displayCurr.textContent == 'ERROR' || refreashCurrDisp || currOperation == null)
        return;
    prevOperation = currOperation;
    currOperation = '=';
    buffer = eval(prevOperation);
    refreashCurrDisp = true;
    let resultText = displayHist.textContent + displayCurr.textContent + '=';
    if (resultText.length > 34)
        resultText = '=';
    displayHist.textContent = resultText;
    displayCurr.textContent = buffer;
});

function eval(operation) {
    switch (operation) {
        case '+':
            return buffer + Number(displayCurr.textContent);

        case '-':
            return buffer - Number(displayCurr.textContent);

        case 'x':
            return buffer * Number(displayCurr.textContent);

        case '÷':
            if (Number(displayCurr.textContent) == 0)
                return 'ERROR';
            return buffer / Number(displayCurr.textContent);

        case '%':
            if (Number(displayCurr.textContent) == 0)
                return 'ERROR';
            return buffer % Number(displayCurr.textContent);

        default:
            return Number(displayCurr.textContent);
    }
}

// CLEAR BUTTON
CButton.addEventListener('click', () => {
    if (displayCurr.textContent == 'ERROR' || currOperation == '=')
        return;
    displayCurr.textContent = '0';
});

// ALL CLEAR BUTTON
ACButton.addEventListener('click', () => {
    clear();
})

function clear() {
    buffer = 0;
    displayHist.textContent = '';
    displayCurr.textContent = '0';
    prevOperation = null;
    currOperation = null;
}