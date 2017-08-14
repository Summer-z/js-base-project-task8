const codeItems = require("../lib/code.js");
let code = codeItems();
function changeToZipCode(str) {
    let arr = [];
    str = str.slice(1, str.length - 1);
    let i = 0;
    while (i < str.length - 5) {
        arr.push(str.substr(i, 5));
        i = i + 5;
    }
    let temp = arr.map(ele => {
        return code.find(item => {
            return ele === item.barcode;
        }).zipCode;
    });
    let zipCode = temp.join('');
    if (zipCode.length === 9) {
        zipCode = zipCode.substr(0, 5) + '-' + zipCode.substr(5, 4);
    }
    return zipCode;
}

function changeToBarcode(str) {
    let arr = str.split('');
    let barcode = arr.map(ele => {
        return code.find(item => {
            return ele === item.zipCode;
        }).barcode;
    });
    return '|' + barcode.join('') + '|';
}

function getCheckCode(str) {
    str = str.split('-').join('');
    let arr = str.split('').map(ele => Number(ele));
    let codeSum = arr.reduce((sum, ele) => {
        return sum + ele;
    });
    let checkCode = Math.ceil(codeSum / 10) * 10 - codeSum;
    return str.concat(checkCode);
}

function main(input) {
    if (input.length <= 10) {
        let totalZipCode = getCheckCode(input);
        return changeToBarcode(totalZipCode);
    }
    return changeToZipCode(input);
}

module.exports = main;
