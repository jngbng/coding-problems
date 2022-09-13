/*
길이가 32인 걸로. double 구조 자체를 쓰라는 말인가?

0.5
=> 0.1 인데 이 경우 길이가 3이냐? 1이냐?

0.10101010101011


    11      52
1|       |              |
*/

function printToBinary(num) {
  const bits = [];

  if (num == 0) {
    console.log("0.0");
    return;
  }
  for (let i = 0; i < 32; ++i) {
    num *= 2;
    if (num >= 1) {
      bits.push(1);
      num -= 1;
      if (num == 0) {
        console.log("0." + bits.join(''));
        return;
      }
    } else {
      bits.push(0);
    }
  }
  console.log('ERROR');
}

printToBinary(0.5625);
