/*
정수 배열이 주어졌을 때, 정렬되지 않은 가장 짧은 구간 m ~ n을 찾아라.

최악의 경우는 0 ~ length - 1,
최선의 경우는 0 ~ 0.

음 손으로 한다고 생각해보면

시작 점에서 정렬되어 있는 구간을 파악하고,
끝 점에서 정렬되어 있는 구간을 파악하고.

         <=             <
1 2 ... k k  k-1 ..  q+1 q ... q + 1
-----------              -----------
  정렬     ^              ^   정렬
          m              n

여기서 n은 m은 먼저 찾고, m+1 ... EOF 중에서 찾는다.


그 다음에는 arr[m] <= arr[n]을 만족시키는 가장 큰 m과 가장 작은 n을 구해야 한다.

m / n를 움직여야 하는데,

가장 무식한건 가능한 m과 n에 대해서 다 해보는거. arr[m] <= arr[n]


m랑 n를 찾았는데 처음부터 m = n 이면 끝이다. 정렬되어 있음. 더 짧아 질 수가 없다.

k > q 라면
- k를 감소(뒤로)하거나 q를 증가(앞으로)해야 한다.

k == 

정렬은 오름차순만 고려하는건가? 아니면 내림차순 또는 오름차순 중에 골라야 하나?


첫번째 peak을 찾고
마지막 vally를 찾아서,

그 구간 사이 max, min 을 찾은 다음.

0 ~ peak 중 min이 위치해야 하는 인덱스를 찾고 => m
vally ~ end 중 max가 위치해야 하는 인덱스를 찾으면. => n

이게 최소아닐까?
*/

function findFirstPeak(arr) {
  for (let i = 0; i < arr.length - 1; ++i) {
    if (arr[i] > arr[i + 1]) {
      return i;
    }
  }
  return arr.length - 1;
}

function findLastVally(arr, minIdx) {
  for (let i = arr.length - 1; i > minIdx; --i) {
    if (arr[i - 1] > arr[i]) {
      return i;
    }
  }
  throw new Error('should not happen');
  return minIdx + 1;
  return -1;
}

function findMinAndMax(arr, from, to) {
  let min = arr[from];
  let max = arr[from];
  for (let i = from + 1; i <= to; ++i) {
    min = Math.min(min, arr[i]);
    max = Math.max(max, arr[i]);
  }
  return [min, max];
}

function findProperIdx(arr, from, to, elem) {
  for (let i = from; i <= to; ++i) {
    if (elem < arr[i]) {
      return i - 1;
    }
  }
  return to;
}

function findUnsortedRange(arr) {
  if (arr == null || arr.length <= 1) {
    return null;
  }
  const firstPeakIdx = findFirstPeak(arr);
  if (firstPeakIdx == arr.length - 1) {
    return null;
  }
  const lastVallyIdx = findLastVally(arr, firstPeakIdx);
  const [min, max] = findMinAndMax(arr, firstPeakIdx, lastVallyIdx);
  const m = findProperIdx(arr, 0, firstPeakIdx, min) + 1;
  const n = findProperIdx(arr, lastVallyIdx, arr.length - 1, max);

  return [m, n];
}

console.log(findUnsortedRange([1,2,4,7,10,11,7,12,6,7,16,18,19]));
