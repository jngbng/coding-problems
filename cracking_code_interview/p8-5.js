/*
양의 정수는 인트 범위라고 생각하고, 곱의 범위는 롱이라고 하면 되나?

A * B

case1 B = 2*b
A * 2*b = (A*2) * b

case2 B= 2*b + 1
A * (2*b + 1) = (A*2) * b + A

*/


function multManual(a, b) {
  if (b == 0) {
    return 0;
  }
  if (b % 2 == 0) {
    return multManual(a << 1, b >> 1);
  } else {
    return multManual(a << 1, b >> 1) + a;
  }
}

// O(bitlength(b)) 라서 O(1) 이다.
console.log(multManual(10, 3));

// 이거보다 짧을 수 있나?
// a, b 중 비트 길이가 짧은 숫자, 즉 작은 숫자를 기준으로 순회를 하면 된다.
