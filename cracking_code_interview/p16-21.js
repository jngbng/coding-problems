/*
각 배열을 각각 합해서 sum을 구한다.

11 - 15 = -4

1 <-> 3

차이가 2가 나는 두 요소를 바꾸면 된다.

즉 차이가 2나 나는 요소를 찾을 수 있나?

각각이 정렬되어 있으면

a1 a2 a3 a4 ..

b1 b2 b3 b4 ..

이고 목표 수가 T일 때 

(a1-b1) < T면. a1을 고정한 상황에서 b1 이상은 볼 필요가 없다. a1 증가.
(a1-b1) > T면. b1을 고정한 상황에서 a1이상은 볼 필요가 없다. b1 증가

*/

function sum(arr) {
  return arr.reduce((a,b) => a + b, 0)
}

function findDiffElem(arrA, arrB, expectedDiff) {
  let idxA = 0, idxB = 0;
  while (idxA < arrA.length && idxB < arrB.length) {
    const diff = arrA[idxA] - arrB[idxB];
    if (diff == expectedDiff) {
      return [arrA[idxA], arrB[idxB]];
    } else if (diff > expectedDiff) {
      idxB++;
    } else {
      idxA++;
    }
  }
  return null;
}

function findSwapForSameSum(arrA, arrB) {
  if (arrA == null || arrA.length == 0 || arrB == null || arrB.length == 0) {
    return null;
  }
  arrA.sort();
  arrB.sort();
  const sumA = sum(arrA);
  const sumB = sum(arrB);
  const diffNeed = sumA - sumB;
  if (diffNeed % 2 != 0) {
    return null;
  }
  let expectedDiff = diffNeed >> 1;
  return findDiffElem(arrA, arrB, expectedDiff)
    || findDiffElem(arrB, arrA, -expectedDiff);
}

console.log(findSwapForSameSum([4,1,2,1,1,2], [3,6,3,3]));

/*
정렬하는데 O(N log N + M log M) 들고, 스캔하는데 O(min(M, N)) 이 든다.
그래서 전체적으로 O(N log N + M log M)가 든다.

더 빠르게?
*/
