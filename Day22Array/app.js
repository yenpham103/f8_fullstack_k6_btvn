//bai 3
// function smallestMissingPositive(nums) {
//   nums.sort((a, b) => a - b);

//   let numberMin = 1;

//   for (let i = 0; i < nums.length; i++) {
//     const num = nums[i];
//     if (num === numberMin) {
//       numberMin++;
//     } else if (num > numberMin) {
//       return numberMin;
//     }
//   }
//   return numberMin;
// }
// const nums = [1, 2, 0];
// console.log(smallestMissingPositive(nums));

//Bai 1
// Check Prime
function isNumberPrime(numberPrime) {
  if (numberPrime > 1 && numberPrime % 1 === 0) {
    for (let i = 2; i < numberPrime; i++) {
      if (numberPrime % i === 0) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}
console.log(isNumberPrime(127));
//Check Opposite
function isNumberOpposite(numberOpp) {
  const reversedNumber = parseInt(
    numberOpp.toString().split("").reverse().join("")
  );
  return reversedNumber === numberOpp;
}

//Handle Result
function searchNumber(number) {
  let currentNumber = number + 1;
  while (!isNumberOpposite(currentNumber) || !isNumberPrime(currentNumber)) {
    currentNumber++;
  }
  return currentNumber;
}
const N = 12321;
const result = searchNumber(N);
console.log(result);

//Bai 2
// function midNumber(nums1, nums2) {
//   const merge = nums1.concat(nums2);

//   merge.sort((a, b) => a - b);

//   const totalLength = merge.length;
//   const midIndex = Math.floor(totalLength / 2);

//   if (totalLength % 2 === 0) {
//     return (merge[midIndex - 1] + merge[midIndex]) / 2;
//   } else {
//     return merge[midIndex];
//   }
// }
// const nums1 = [1, 3];
// const nums2 = [4, 7];
// console.log(midNumber(nums1, nums2));
