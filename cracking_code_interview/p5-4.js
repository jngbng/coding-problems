/*
양의 정수가 주어진다. 31bit를 가정하겠다.

1비트의 갯수가 같은 숫자 중에 가장 작은 수와 큰 수.

가장 작다 크다 기준은 당연히 양수 기준일 것 같다.

1비트 수를 알면 가장 작은 수는 모두 다 왼쪽에 1이 채우진 경우, 가장 큰 경우는 모두 다 오른쪽에 1이 채워진 경우.

*/

function countOnes(num) {
  if (num <= 0) {
    return 0;
  }
  let count = 0;
  while (num > 0) {
    count += num & 1;
    num >>>= 1;
  }
  return count;
}

function printMinMax(num) {
  if (num <= 0) {
    console.log("invalid input");
    return;
  }
  const ones = countOnes(num);
  const zeros = 31 - ones;

  const min = ((1 << ones) - 1) & 0x7FFFFFFF;
  const max = min << zeros;

  console.log('min:', min);
  console.log('max:', max);
}

printMinMax(10);

/*
시간 복잡도는 비트수 b의 O(b)이고
공간 복잡도는 O(1)이다.
*/
