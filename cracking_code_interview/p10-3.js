/*
n개의 정수로 구성되어있다. k만큼 회전되어 있다. 회전이 없을 수도 있나?
오름차순으로 되어 있다.
값은 모두 다른가?

회전은 되어 있지만 일단 정렬되어 있기 때문에, 특정 원소를 찾는건 바이너리 서치를 쓰면 되겠다.

일단 회전이 되는 지점을 먼저 찾으면 2개의 리스트로 볼 수 있고, 그럼 바이너리 서치를 2번 하면 되겠다.
물론 인덱스를 이용해서 circular array 처럼 봐서 하나의 배열로 볼 수도 있겠지만, 면접에서는 실수를 줄이기 위해 무식하지만 두개로 나누겠다.

그럼 문제는 일단 배열이 나뉘는 지점을 찾는 문제와, 바이너리 서치 문제로 나뉜다.

배열이 나뉘는 지점을 찾는 것도 바이너리 서치로 할 수 있을 것 같다. 조건은 x[i] > x[i+1] 인 지점을 찾는거다.

운이 좋은건 이 지점이 딱 하나 존재한다는 점이다.

search(A, i, j) 
if (i >= j) {
 return -1;
}
mid = (i+j)/2

if (A[mid] > A[mid + 1]) {
  return mid ;
}

if (A[i] > A[mid]) {
  search(A, i, mid)
} else {
  search(A, mid + 1, j)
}

*/


// 1 2 3
// 0 2
// mid: 1

function searchStartAux(A, i, j) {
  if (i >= j) {
    return -1;
  }
  const mid = (i+j)/2 | 0;

  if (A[mid] > A[mid + 1]) {
    return mid + 1;
  }

  if (A[i] < A[mid]) {
    // left ordered. search right
    return searchStartAux(A, mid + 1, j);
  } else if (A[mid] < A[j]) {
    // right orderd. search left
    return searchStartAux(A, i, mid);
  } else {
    // A[i] >= A[mid] && A[mid] >= A[j]
    if (A[i] == A[mid] && A[mid] == A[j]) {
      // search both
      const found = searchStartAux(A, i, mid);
      if (found == -1) {
        return searchStartAux(A, mid + 1, j);
      } else {
        return found;
      }
    } else if (A[i] > A[mid]) {
      // search left
      return searchStartAux(A, i, mid);
    } else /* if (A[mid] > A[j]) */ {
      // search right
      return searchStartAux(A, mid + 1, j);
    }
  }
}

function searchStart(A) {
  if (A.length == 0) {
    return -1;
  }
  if (A.length == 1) {
    return 0;
  }
  const startIdx = searchStartAux(A, 0, A.length - 1);
  return startIdx === -1 ? 0 : startIdx;
}

console.log(searchStart([1, 2, 1, 1, 1]));

// 나머지는 BST로
function binarySearch(A, startIdx, endIdx, target) {
  //
}

function findFromRotatedSortedArray(A, target) {
  if (A.length === 0) {
    return null;
  }
  const startIdx = searchStart(A);

  let found = binarySearch(A, 0, startIdx, target);
  if (found) {
    return found;
  }
  if (startIdx + 1 < A.length) {
    return binarySearch(A, startIdx + 1, A.length - 1, target);
  }
  return null;
}

/*

이게 아니라 한번에 풀어야 하는건가. 이것도 바이너리 서치로 해볼 수 있다.
같으면 아무 idx나 리턴해도 되나?

*/

function findDirectly(A, target, startIdx, endIdx) {
  if (startIdx > endIdx) {
    return -1;
  }
  const midIdx = ((startIdx + endIdx) / 2) | 0;

  if (A[midIdx] == target) {
    return midIdx;
  }

  // 어느 구간이 정상인가?
  if (A[startIdx] < A[midIdx]) {
    // 왼쪽 정상
    // 왼쪽에 있음.
    if (A[startIdx] <= target && target < A[midIdx]) {
      return findDirectly(A, target, startIdx, midIdx - 1);
    } else {
      return findDirectly(A, target, midIdx + 1, endIdx);
    }
  } else if (A[midIdx] < A[endIdx]) {
    // 오른쪽 정상
    // 왼쪽에 있음.
    if (A[midIdx] < target && target <= A[endIdx]) {
      return findDirectly(A, target, midIdx + 1, endIdx);
    } else {
      return findDirectly(A, target, startIdx, midIdx - 1);
    }
  } else if (A[midIdx] == A[endIdx] && A[midIdx] == A[endIdx]) {
    // => 양쪽 모두 찾기
    let found = findDirectly(A, target, startIdx, midIdx - 1);
    if (found == -1) {
      return findDirectly(A, target, midIdx + 1, endIdx);
    } else {
      return found;
    }
  } else if (A[startIdx] > A[midIdx]) {
    // 오른쪽 볼 필요 없음. 왼쪽만 보면 되는데 target > A[startIdx]  || target < A[midIdx] 일 때만 찾음.
    if (target >= A[startIdx] || target < A[midIdx]) {
      return findDirectly(A, target, startIdx, midIdx - 1);
    } else {
      return -1;
    }
  } else if ( A[midIdx] > A[endIdx]) {
    // 왼쪽은 모두 A[midIdx]랑 동일해야 하니 없다. 오른쪽만 보면 되는데 target > A[midIdx]  || target < A[endIdx] 일 때만 찾음.
    if (target > A[midIdx] || target <= A[endIdx]) {
      return findDirectly(A, target, midIdx + 1, endIdx);
    } else {
      return -1;
    }
  } else {
    throw new Error("never happen");
    return -1;
  }
}

        
// function search(a, left, right, x) {
//   const mid = ((left + right) / 2) | 0;
//   if (x == a[mid]) { // Found element
//     return mid;
//   }
//   if (right < left) {
//     return -1;
//   }
  
//   /* While there may be an inflection point due to the rotation, either the left or 
//    * right half must be normally ordered.  We can look at the normally ordered half
//    * to make a determination as to which half we should search. 
//    */
//   if (a[left] < a[mid]) { // Left is normally ordered.
//     if (x >= a[left] && x < a[mid]) { 
//       return search(a, left, mid - 1, x);
//     } else {
//       return search(a, mid + 1, right, x);
//     }
//   } else if (a[mid] < a[right]) { // Right is normally ordered.
//     if (x > a[mid] && x <= a[right]) {
//       return search(a, mid + 1, right, x);
//     } else {
//       return search(a, left, mid - 1, x);
//     }                           
//   } else if (a[left] == a[mid]) { // Left is either all repeats OR loops around (with the right half being all dups)
//     if (a[mid] != a[right]) { // If right half is different, search there
//       return search(a, mid + 1, right, x);
//     } else { // Else, we have to search both halves
//       const result = search(a, left, mid - 1, x); 
//       if (result == -1) {
//         return search(a, mid + 1, right, x); 
//       } else {
//         return result;
//       }
//     }
//   }
//   return -1;
// }

// function searchBook(a, x) {
//   return search(a, 0, a.length - 1, x);
// }

// console.log(searchBook([50, 20, 20], 50));
