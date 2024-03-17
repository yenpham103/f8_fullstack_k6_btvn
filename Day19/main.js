//Bai 1

function generateFibonacci(N, a = 0, b = 1, count = 2) {
  if (N <= 0) {
    return;
  }

  if (count === 2) {
    console.log(a);
    console.log(b);
  }

  if (count < N) {
    var nextFibonacci = a + b;
    console.log(nextFibonacci);

    generateFibonacci(N, b, nextFibonacci, count + 1);
  }
}

var N = 10;
generateFibonacci(N);

//Bai 2
function daoNguocSo(so) {
  var chuoiSo = so.toString();

  var chuoiDaoNguoc = chuoiSo.split("").reverse().join("");

  return parseInt(chuoiDaoNguoc);
}

var so = 12345;
var ketQua = daoNguocSo(so);
console.log("Số đảo ngược của", so, "là:", ketQua);

//Bai 3
function convertNumberToWords(number) {
  const ones = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const tens = [
    "",
    "mười",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const hundreds = [
    "",
    "một trăm",
    "hai trăm",
    "ba trăm",
    "bốn trăm",
    "năm trăm",
    "sáu trăm",
    "bảy trăm",
    "tám trăm",
    "chín trăm",
  ];

  if (number === 0) {
    return "không";
  }

  let result = "";

  const thousands = Math.floor(number / 1000);
  if (thousands > 0) {
    result += ones[thousands] + " ngàn ";
    number %= 1000;
  }

  const hundredsDigit = Math.floor(number / 100);
  if (hundredsDigit > 0) {
    result += hundreds[hundredsDigit] + " ";
    number %= 100;
  }

  if (number >= 10 && number <= 19) {
    result += "mười ";
    number %= 10;
  } else {
    const tensDigit = Math.floor(number / 10);
    if (tensDigit > 0) {
      result += tens[tensDigit] + " ";
      number %= 10;
    }
  }

  if (number > 0) {
    result += ones[number];
  }

  return result.trim();
}

const number = 6969;
const words = convertNumberToWords(number);
console.log(words);

function addToList(item, list) {
  return list.push(item);
}
const result = addToList("apple", [`bana`]);
console.log(result);
