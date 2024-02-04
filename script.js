let buffer = 0;
let currOperation = null;
let refreashBuffer = true; // flag

const numBtns = document.querySelectorAll('.number');
const periodBtn = document.querySelector('.period');
const operBtns = document.querySelectorAll('.operator');
const displayCurr = document.querySelector('#display-current');
const displayHist = document.querySelector('#display-history');
const CButton = document.querySelector('#C');
const ACButton = document.querySelector('#AC');
const equalBtn = document.querySelector('#equal');

numBtns.forEach(button =>
    button.addEventListener('click', e => {
        if (displayCurr.textContent == '0' || refreashBuffer) {
            displayCurr.textContent = e.target.textContent;
            refreashBuffer = false;
        }
        else
            displayCurr.textContent += e.target.textContent;
    })
);

periodBtn.addEventListener('click', e => {
    if (displayCurr.textContent == '0' || refreashBuffer) {
        displayCurr.textContent = '0' + e.target.textContent;
        refreashBuffer = false;
    }
    else
        displayCurr.textContent += e.target.textContent;

})

operBtns.forEach(button =>
    button.addEventListener('click', e => {
        buffer = Number(displayCurr.textContent);
        displayHist.textContent = buffer + ' ' + e.target.textContent;
        refreashBuffer = true;
    })
);

CButton.addEventListener('click', () => displayCurr.textContent = '0');
ACButton.addEventListener('click', () => {
    buffer = 0;
    displayHist.textContent = '';
    displayCurr.textContent = '0';
    currOperation = null;
})