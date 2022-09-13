/*
S(i) = sum(a[0 .. i]) 이라 정의하면

max j=0..(n-1) ( S(i) - min k=0..(i-1) S(k) )

이다. 그런데 min을 찾는 작업이 계속 반복된다. 그래서 min(i) = min(0, S[0...i])를 유지하면 되겠다.

S(i) 만드는데 O(N), min(i) 만드는데 O(N) 드니 전체는 O(N)이 든다.
*/

function calcSumArr(arr) {
  let sum = 0;
  let ret = []
  for (const elem of arr) {
    sum += elem;
    ret.push(sum);
  }
  return ret;
}

function calcMins(arr) {
  let min = 0;
  const ret = [0];
  for (const elem of arr) {
    min = Math.min(min, elem);
    ret.push(min);
  }
  return ret;
}

function biggestSum(arr) {
  if (arr.length == 0) {
    return null;
  }
  const sums = calcSumArr(arr);
  const mins = calcMins(sums);

  let max = sums[0];
  for (let i = 1; i < sums.length; ++i) {
    max = Math.max(max, sums[i] - mins[i]);
  }
  return max;
}

console.log(biggestSum([2,-8,3,-2,4,-10]));
