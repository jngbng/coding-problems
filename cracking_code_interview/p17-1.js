/*
덧셈 없이 더하기..
단, +를 비롯한 어떤 연산자도 사용할 수 없다...?
산술, bitwise, ++, --??

일단 연산자 없이 값을 바꿀 수 있는 방법?

비교 연산자는 사용할 수 있나?

x가 주어졌을 때 x+1을 만드는 방법?


더하기 빼기가 없으니 어떤 형태의 loop나 재귀호출도 불가능해 보인다.
*/


/*
꼼수로 array 둘을 만들어서 합친다음 길이를 얻는다.
*/

function plus(a, b) {
  return Array(a).concat(Array(b)).length;
}


/*
그건 안되지 한다면..
힌트 보니깐 bitwise 는 되는 듯. 그럼 bit 계산을 시뮬레이션 하면 된다.
*/

function bitPlus(a, b, bitIdx, carryBit) {
  
  const aBit = (a >>> bitIdx) & 1;
  const bBit = (b >>> bitIdx) & 1;

  // two or three 1
  const newCarryBit = (aBit & bBit) | (bBit & carryBit) | (aBit & carryBit);
  // one 1 or three 1
  const finalBit = aBit ^ bBit ^ carryBit;

  return [newCarryBit, finalBit];
}



function plus2(a, b) {
  // 원래 루프로 해야겠지만 +/- 못하니깐.
  const [carryBit1, bit0] = bitPlus(a, b, 0, 0);
  const [carryBit2, bit1] = bitPlus(a, b, 1, carryBit1);
  const [carryBit3, bit2] = bitPlus(a, b, 2, carryBit2);
  const [carryBit4, bit3] = bitPlus(a, b, 3, carryBit3);
  const [carryBit5, bit4] = bitPlus(a, b, 3, carryBit4);

  // ... 너무 고통스러우니 4bit 까지만
  return (bit4 << 4) | (bit3 << 3) | (bit2 << 2) | (bit1 << 1) | bit0;
}


function uglyPlus(a, b) {

  function plusHelper(bitIdx, sumUntil) {
    const prevCarryBit = (sumUntil >>> bitIdx) & 1;
    const [newCarryBit, finalBit] = bitPlus(a, b, bitIdx, prevCarryBit);

    return ((newCarryBit << bitIdx) << 1) | (finalBit << bitIdx) | (sumUntil ^ (prevCarryBit << bitIdx));
  }

  // 32번 해야하고 그러면 newCarryBit은 자연히 없어진다.
  return plusHelper(4, plusHelper(3, plusHelper(2, plusHelper(1, plusHelper(0, 0)))));
}


// 재귀 호출 불가능 하다고 했던건 bitwize가 안될 때 이야기 였음. bitwise가 된다면 깍아가면서 재귀가 가능하다.

function addBit(a, b) {
  if (b == 0) {
    return a;
  }
  const sum = a ^ b;
  const carry = (a & b) << 1;

  return addBit(sum, carry);
}
