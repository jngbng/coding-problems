/*
덧셈만으로 곱셈, 뺄셈, 나눗셈..

곱셈은 정의대로 하면 되긴 하는데, 부호를 조심해야 한다.

뺄셈은 어떻게 할 수 있을까.

R = A - B

bit 연산 되나? -A = !A + 1 인데...

-A를 만드는 방법은 -1을 A 번 더하면 된다. 부호 비교는 해도 되나?

덧셈 연산자 만이라고 했으니 안된다고 해보자.

부호 비교는 해도 되나?

*/

function negate(a) {
  // bitsize
  return !a + 1;

  // -1 더해가기
  let res = 0;
  let one = a > 0 ? -1 : 1;
  while (res + a != 0) {
    res += one;
  }
  //O(a)

  // overflow 이용하기
  // let res = a + 1;
  // while (res + a != 0) {
  //   res += -1;
  // }
  // O(1) 이긴 하나 2^32


  // 두 구현 모두 -INT.MIN 에서는 동작 안한다.
  // 00 0
  // 01 1
  // 10 -2
  // 11 -1

  //  
}

function minus(a, b) {
  return a + negate(b);
}

function abs(a) {
  if (a >= 0) {
    return a;
  }
  return negate(a);
}

function mult(a, b) {
  let res = 0;
  // b가 음수일 때도 동작하게 하려면?
  // 비교 연산자도 안된다는건가?
  const absB = abs(b);
  for (let i = 0; i < absB; i = i + 1) {
    res += a;
  }
  if (b < 0) {
    res = negate(res);
  }
  return res;
}

function div(a, b) {
  if (b == 0) {
    throw new Error('div/z');
  }
  let res = 0;
  let absA = abs(a);
  let absB = abs(b);
  // 부호 고려하려면
  while (absA >= absB) {
    absA = minus(absA, absB);
    res += 1;
  }
  if (a > 0 && b < 0 || a < 0 && b > 0) {
    res = negate(res);
  }
  return res;
}
