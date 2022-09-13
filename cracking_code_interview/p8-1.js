/*
동적 계획법으로 풀 수 있을 것 같다.

p(n): n개의 계단을 오르는 방법의 수라고 하자.

마지막 스탭은 1단, 또는 2단, 3단이어야 한다.
p(n) = p(n-1) + p(n-2) + p(n-3)

p(0) = 0
p(1) = 1
p(2) = 2
p(3) = 4
--------
p(4) = 7

1 2 3
4 0 0 => 1
2 1 0 => 3
0 2 0 => 1
1 0 1 => 2
*/

function tripleStepAux(stairs, memo) {
  if (stairs < 0) {
    return 0;
  } else if (stairs == 1) {
    return 1;
  } else if (stairs == 2) {
    return 2;
  } else if (stairs == 3) {
    return 4;
  } else if (memo[stairs] != null) {
    return memo[stairs];
  } else {
    const result = tripleStepAux(stairs - 1, memo)
      + tripleStepAux(stairs - 2, memo)
          + tripleStepAux(stairs - 3, memo);
    memo[stairs] = result;
    return result;
  }
}
