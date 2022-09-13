/*
양수만 있다.
이건 바이너리 서치 비슷하게 하면 될 것 같다.
i번째 시도해서 못 찾으면 2i를 시도하는 식이다.

그럼 최초로 x 보다 커지면, i / 2/i 사이를 바이너리 서치 하면 된다.

elementAt 은 0부터 시작하나?
*/

// return i s.t listy.elementAt(i) <= A <= listy.elementAt(2 * i).
function findFirstUpperIndex(listy, target) {
  let fromIdx = 0;

  // if (listy.elementAt(i) == -1) {
  //   return i;
  // }
}

/*
// 없으면 -1.
// 이 구간이 존재하지 않으면? listy의 길이가 i< <= 2i 구간 이라면? i 2i 사이 바이너리 서치.
// 시그니쳐가 부족하다. 전형적인 bst 처럼 startIdx, endIdx가 필요하다.


find(listy, target, notFoundIdx, searchIdx)
notFoundIdx: 확인된 최소 idx. listy[notFoundIdx] < target 만족
searchIdx:  index. 더 확장하면서 찾아봐야 할 지, 이게 upperIdx인지 모호하다.


// step1: startIdx를 찾는다.
  -> 2배씩 증가시키면서 최초 null이 되거나 target 보다 커지는 애를 찾는다.
// step2: endIdx를 찾는다.
// step3: BST 한다.

notFoundIDx >= searchIdx:
-> -1

listy[endIdx] == null 이면
  const midIdx = (startIdx + endIdx)/2
  listy[midIdx] == null 이면
    -> recur(startIdx, midIdx)
  listy[midIdx] == target
    -> midIdx
  listy[midIdx] < target
    -> recur(midIdx, endIdx)
  listy[midIdx] > target
    -> bst(notFoundIdx + 1, midIdx - 1)

listy[endIdx] == target
  -> endIdx
listy[endIdx] < target
  -> ??
listy[endIdx] > target
  -> ??
find(listy, target, j, 2*j)
*/

function binarySearch(listy, target, startIdx, endIdx) {
  // impl
  if (startIdx > endIdx) {
    return -1;
  }
  const midIdx = ((startIdx + endIdx)/2)|0;
  const value = listy[midIdx];
  if (value == target) {
    return midIdx;
  } else if (value < target) {
    return binarySearch(listy, target, midIdx + 1, endIdx);
  } else {
    return binarySearch(listy, target, startIdx, midIdx - 1);
  }
}

function searchListy(listy, target) {
  // empty
  if (listy[0] == null) {
    return -1;
  }

  // startIdx 찾기
  let startIdx = 0;
  if (listy[startIdx] == target) {
    return startIdx;
  } else if (listy[startIdx] > target) {
    return -1;
  }
  let endIdx = 2 * startIdx + 1;
  while (listy[endIdx] != null && listy[endIdx] < target) {
    startIdx = endIdx;
    endIdx = 2 * startIdx + 1;
  }

  // endIdx == null || listy[endIdx] >= target
  while (listy[endIdx] == null) {
    const midIdx = ((startIdx + endIdx) / 2) | 0;
    if (midIdx == startIdx) {
      return -1;
    }
    if (listy[midIdx] == null) {
      endIdx = midIdx;
      continue;
    }
    if (listy[midIdx] == target) {
      return midIdx;
    } else if (listy[midIdx] < target) {
      startIdx = midIdx;
      continue;
    } else /* (listy[midIdx] > target) */ {
      endIdx = midIdx;
      break;
    }
  }
  // listy[startIdx] < target
  // listy[endIdx] >= target
  return binarySearch(listy, target, startIdx, endIdx);
}

// console.log(searchListy([1, 2, 3, 4, 5, 6, 7, 8, 9], 2));


// 코드 정리

function binarySearch(listy, target, startIdx, endIdx) {
  // impl
  if (startIdx > endIdx) {
    return -1;
  }
  const midIdx = ((startIdx + endIdx)/2)|0;
  const value = listy[midIdx];
  if (value == target) {
    return midIdx;
  } else if (value == null || value > target) {
    return binarySearch(listy, target, startIdx, midIdx - 1);
  } else {
    return binarySearch(listy, target, midIdx + 1, endIdx);
  }
}

function searchListy2(listy, target) {
  let endIdx = 1;
  while (listy[endIdx] != null && listy[endIdx] < target) {
    endIdx *= 2;
  }
  return binarySearch(listy, target, endIdx / 2 | 0, endIdx);
}

console.log(searchListy([1, 2, 3, 4, 5, 6, 7, 8, 9], 10));

/*

시간이 너무 많이 걸린 부분 반성.
아이디어는 금방 생각했는데,
손으로 완전히 해보면서 좀 더 명확히 정리 했어야 했는데,
시그니쳐로 수두코드 처럼 쓰다보니깐 생각이 꼬였다.

step1에서 의심되는 구간 확정하는 부분과
step2의 그 안에서 찾기 로직이 섞여서 생각하면서 망했다.

생각을 정확히 정리한 다음에, 시그니쳐를 생각해 나가자.
*/
