//Bai 1 Tinh tien taxi

function tinhTienTaxi(kmDiDuoc) {
  const tienMocMot = 15000;
  const tienMochai = 13500;
  const tienMocBa = 11000;

  let tongTien = 0;
  if (kmDiDuoc <= 1) {
    tongTien = kmDiDuoc * tienMocMot;
  } else if (kmDiDuoc > 1 && kmDiDuoc <= 5) {
    tongTien = 1 * tienMocMot + (kmDiDuoc - 1) * tienMochai;
  } else if (kmDiDuoc > 5 && kmDiDuoc <= 120) {
    tongTien = 1 * tienMocMot + 4 * tienMochai + (kmDiDuoc - 5) * tienMocBa;
  } else {
    const tienMocCuoi =
      1 * tienMocMot + 4 * tienMochai + (kmDiDuoc - 5) * tienMocBa;
    tongTien = tienMocCuoi - tienMocCuoi / 10;
  }
  return tongTien;
}

const kmDiduoc = 120;
const tienTaxi = tinhTienTaxi(kmDiduoc);
console.log(`Tien taxi phai tra la: ${tienTaxi} VND `);
//Bai 2 Tinh tien dien

function tinhTienDien(kwDien) {
  const tienDienBac1 = 1678;
  const tienDienBac2 = 1734;
  const tienDienBac3 = 2014;
  const tienDienBac4 = 2536;
  const tienDienBac5 = 2834;
  const tienDienBac6 = 2927;

  let tongTien = 0;

  if (kwDien > 0 && kwDien <= 50) {
    tongTien = kwDien * tienDienBac1;
  } else if (kwDien > 50 && kwDien <= 100) {
    tongTien = 50 * tienDienBac1 + (kwDien - 50) * tienDienBac2;
  } else if (kwDien > 100 && kwDien <= 200) {
    tongTien =
      50 * tienDienBac1 + 50 * tienDienBac2 + (kwDien - 100) * tienDienBac3;
  } else if (kwDien > 200 && kwDien <= 300) {
    tongTien =
      50 * tienDienBac1 +
      50 * tienDienBac2 +
      100 * tienDienBac3 +
      (kwDien - 200) * tienDienBac4;
  } else if (kwDien > 300 && kwDien <= 400) {
    tongTien =
      50 * tienDienBac1 +
      50 * tienDienBac2 +
      100 * tienDienBac3 +
      100 * tienDienBac4 +
      (kwDien - 300) * tienDienBac5;
  } else {
    tongTien =
      50 * tienDienBac1 +
      50 * tienDienBac2 +
      100 * tienDienBac3 +
      100 * tienDienBac4 +
      100 * tienDienBac5 +
      (kwDien - 400) * tienDienBac6;
  }
  return tongTien;
}

const kwDien = 200;
const tienDien = tinhTienDien(kwDien);
console.log(`Tien dien can thanh toan la: ${tienDien} VND`);

//Bai 3

var total = 0;
var n = 5;
for (var i = 1; i <= n; i++) {
  var subTotal = i * (i + 1);
  total += subTotal;
}
console.log(total);

//bai 4
var inprime = true;
function checkInprime(number) {
  if (number % 1 !== 0 || number < 1) {
    inprime = false;
  } else if (number === 2) {
    inprime = true;
    console.log(`${2} la so nguyen to`);
  } else {
    for (var i = 2; i < number; i++) {
      if (number % i === 0) {
        inprime = false;
        break;
      } else {
        inprime = true;
      }
    }
  }
  if (inprime) {
    console.log(`${number} la so nguyen to`);
  } else {
    console.log(`${number} khong la so nguyen to`);
  }
}
checkInprime(9);

//Bai 5
var length = 5;
var triangle = "";
var number = 1;
for (var i = 1; i <= length; i++) {
  for (var j = 1; j <= i; j++) {
    triangle += number++ + " ";
  }
  triangle += "<br>";
}
document.write(triangle);

//Bai 6

const boardSize = 8;
const board = document.querySelector(".board");

for (let i = 1; i <= boardSize; i++) {
  for (let j = 1; j <= boardSize; j++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if ((i + j) % 2 === 0) {
      square.classList.add("white");
    } else {
      square.classList.add("black");
    }
    board.appendChild(square);
  }
}

// Bai 7
const multiTableSize = 10;
const multiTable = document.querySelector(".multi-table");

let result = 0;
for (let i = 1; i <= multiTableSize; i++) {
  const multi = document.createElement("div");
  // console.log(multi);
  multi.classList.add("multi");
  for (let j = 1; j <= multiTableSize; j++) {
    result = i * j;
    const cell = document.createElement("span");
    cell.textContent = `${i} x ${i} = ${result}`;
    multi.appendChild(cell);
  }
  multiTable.appendChild(multi);
}

//Bai 8
let valueNumber = 5;
let totalNumber = 0;
let totalS = 0;
if (valueNumber % 1 !== 0 || valueNumber <= 0) {
  console.log(`${valueNumber} khong thoa man yeu cau de bai`);
} else {
  for (let i = 1; i <= valueNumber; i++) {
    totalNumber = i;
    totalS += 1 / totalNumber;
  }
}
console.log(totalS);

//Cach 2
function Sum(N) {
  if (N === 1) {
    return 1;
  } else {
    return 1 / N + Sum(N - 1);
  }
}
const N = 5;
const resultS = Sum(N);
console.log(`Gia tri cua bieu thuc voi N = ${N} la: ${resultS}`);
