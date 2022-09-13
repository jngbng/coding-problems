/*
정수 A, B가 주어졌을 때 A->B로 바꾸기 위해 뒤집어야하는 비트 개수

즉 A,B에서 서로 다른 비트 갯수를 새야 한다. 이는 단순 XOR 연산이다.
*/


function flipNum(a, b) {
  const flipBit = a ^ b;
  let count = 0;
  while (flipBit != 0) {
    if (flipBit & 1 == 1) {
      count++;
    }
    flipBit >>>= 1;
  }
  return count;
}


function flipNum(a, b) {
  const flipBit = a ^ b;
  let count = 0;
  while (flipBit != 0) {
    count++;
    flipBit = flipBit & (flipBit - 1);
  }
  return count;
}

