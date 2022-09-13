/*
합이 되는 원소 쌍

합이 M이 되는 모든 원소 쌍 찾기. 같은 원소가 여럿 있으면 여러번 카운트 해야 하나?

[3, 1, 1, 1] 에서 [3,1]은 3번 새야하나?

하나를 두번 뽑아도 되나?


가장 단순한건 nested-loop 로 모든 경우를 다 조사하는거다. O(N^2)

정렬을 하면 k에 대해서 M-k가 있는 지 찾으면 되기 때문에  N * log N 이 든다. 전체는 O(N * log N)

이럴 때 같은 애를 2번 찾게 되는 문제가 생기기 때문에, (M - min) 까지만 찾으면 된다.

그리고 중복이 있을 때 모든 경우를 신경써줘야 한다.


더 잘하려면? 하나씩 읽으면서 원하는 값 셋(wanted)을 만들어 나간다면,

어떤 원소가 wanted에 있으면 해당 페어를 찾은게 된다.

이건 충돌이 없다고 했을 때, 결국 Set construction 문제라서 insert/lookup의 성능이 어떻게 되냐가 된다.

원소 범위가 적다면 hashtable을 써서 O(1)으로 가정해도 되겠지만,

integer 범위라서 O(N log N)을 보는게 맞을 것 같다.

*/

function bst(arr, begin, end, value) {
  if (begin > end) {
    return -1;
  }
  if (begin == end && arr[begin] == value) {
    return begin;
  }
  const mid = (begin + end) >> 1;
  if (value <= arr[mid]) {
    return bst(arr, begin, mid, value);
  } else {
    return bst(arr, mid + 1, end, value);
  }
}

console.log(bst([1,2,3,3,3,3,3,3,7,8,10],0,10, 3) == 2);

function findPairToSum(arr, M) {
  const ret = [];
  arr.sort();
  for (let i = 0; i < arr.length; ++i) {
    const want = M - arr[i];
    let idx = bst(arr, i + 1, arr.length - 1, want);
    if (idx >= 0) {
      while (arr[idx] == want) {
        ret.push([arr[i], arr[idx]]);
        idx++;
      }
    }
  }
  return ret;
}

/*
뭔가 최적은 아닌 느낌인데, 더 잘할 수 있나?
*/
