/*
정수를 영어로.

예외가 되는 경우가 몇개 있다.

특수한 이름을 가지는 경우들을 살펴봐야겠다.

0 => Zero
1~9 => One ~ Nine
10~19 => 

20 ~ 90 => Twenty, Thirty, ... Ninety

100 ~ 900 => One Hundred ~ Nine Hundred


1000 단위로 끊어서 영어로 읽으면 된다.

1,000 -> thousand (K)
1,000,000 -> Million (M)
1,000,000,000 -> Billion (G)

integer면 billion으로 충분.

*/

const OneDigitName = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TenDigitName = [
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
]
 
function toEnglishUnder1000(num) {
  if (num <= 0) {
    return "";
  }
  let result = "";
  if (num >= 100) {
    const digit = (num / 100) | 0;
    result += OneDigitName[digit] + " Hundred";
    num = num % 100;
  }
  if (num < 20) {
    if (num > 0) {
      result += " " + OneDigitName[num];
    }
  } else {
    const tenDigit = (num / 10) | 0;
    result += " " + TenDigitName[tenDigit - 2];
    const oneDigit = num % 10;
    if (oneDigit > 0) {
      result += " " + OneDigitName[oneDigit];
    }
  }
  return result.trim();
}

function toEnglish(num) {
  if (num == 0) {
    return "Zero";
  }

  let result = "";
  if (num < 0) {
    result = "Minus ";
    num = -num;
  }
  const names = ["Billion", "Million", "Thousand"];
  let div = 1000000000;
  for (const name of names) {
    const upper = (num / div) | 0;
    if (upper > 0) {
      result += " " + toEnglishUnder1000(upper) + " " + name;
    }
    num = num % div;
    div /= 1000;
  }
  if (num > 0) {
    result += " " + toEnglishUnder1000(num);
  }
  return result.trim();
}

console.log(toEnglish(1001));
