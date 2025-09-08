const arabicInput = document.getElementById('arabicInput');
const romanInput = document.getElementById('romanInput');
const romanOutput = document.getElementById('romanOutput');
const arabicOutput = document.getElementById('arabicOutput')

const romanValues = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
];

function convertToRoman() {
    const num = parseInt(arabicInput.value);
    if (isNaN(num) || num < 1 || num > 3999) {
        romanOutput.textContent = 'Erro: Digite um número entre 1 e 3999';
        return;
    }
    let result = '';
    let remaining = num;
    for (let i = 0; i < romanValues.length; i++) {
        while (remaining >= romanValues[i].value) {
            result += romanValues[i].symbol;
            remaining -= romanValues[i].value;
        }
    }
    romanOutput.textContent = result;
}

function convertToArabic() {
    const roman = romanInput.value.toUpperCase().trim();
    if (!isValidRoman(roman)) {
        arabicOutput.textContent = 'Erro: Número romano inválido';
        return;
    }
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const currentSymbol = roman[i];
        const nextSymbol = roman[i + 1];
        const currentValue = romanValues.find(r => r.symbol === currentSymbol).value;
        const nextValue = nextSymbol ? romanValues.find(r => r.symbol === nextSymbol).value : 0;
        
        if (currentValue < nextValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }
    }
    arabicOutput.textContent = result;
}

function isValidRoman(roman) {
    if (!roman || !/^[IVXLCDM]+$/.test(roman)) {
        return false;
    }

    // Regra de repetição (ex: IIII ou VV)
    if (/(.)\1{3,}/.test(roman)) { // Permite repetição de até 3 vezes (e.g., III)
        return false;
    }
    if (/V{2,}|L{2,}|D{2,}/.test(roman)) { // Proíbe repetição de V, L, D
        return false;
    }
    
    // Regras de subtração (ex: VX)
    if (/I[LCDM]|X[DM]|C[M]/.test(roman)) {
        return false;
    }
    
    return true;
}

arabicInput.addEventListener('input', convertToRoman);
romanInput.addEventListener('input', convertToArabic);