/*
초수열

작은 크기 set과 배열이 주어졌을 때, set을 모두 포함하는 가장 짧은 길이의 sub-array 를 찾으라.

가장 무식하게 하는 방법은

일단 arr의 모든 요소에 대해서 set에 포함되는지 여부를 계산해서 둔다고 하자. O(N)

arr를 순차적으로 진행하면서 set에 포함되는 인덱스 i 를 찾고,

i+1부터 나머지 요소(set - arr[i])를 모두 포함할 수 있는 가장 작은 인덱스 j를 찾는다.

이걸 모든 i에 대해서 수행하면 되는데, 순회에는 O(N^2)이 든다.

많은 중복이 있는데, 어떤 구간에 대해서 어떤 요소들을 다 포함하는 지 테스트 하는 부분이다.


작은 크기의 set 요소별로 등장하는 index의 [min, max]를 구하면

전체 범위는 [max(mins), min(max)]가 되는거 아닐까.

이게 discrete 하기 때문에 저렇게는 안된다.

대신 min(min) 이상은 되어야 하고 max(max) 이하는 되어야 한다는 당연한 결과.


각 요소를 포함하는 여부를 상태로 나타내려면 2^s 개의 상태가 필요.

개별로 생각하면? S x N 배열을 쓸 수 있으면, a[s][n]은 n 이후로 S[s] 등장하는 최초의 인덱스라고 하면.

나머지 요소를 모두 포함할 수 있는 가장 작은 인덱스는 max(a[*][n+1]) 가 된다.

어래이를 채우는데 O(M*N)이 들고, min을 찾기 위해 다시 순회할때 매 순회마다 O(M)계산을 하므로 O(N*M)이 된다. 전체 O(N*M)

이걸 생각해보면 i 인덱스를 계산할 때 a[*][i+1] 밖에 안보므로 전체를 관리할 필요는 없다.

정리하면 요소 하나 a를 정하고, 나머지 요소들 rs을 정한 다음,

끝에서 앞으로 오면서 rs별로로 last index를 관리하고,

a를 만날 때 마다 min(max(rs.values()) - index)를 구하면 된다.

set의 요소를 index로 바꾸는데 hashtable 코스트를 O(1)이라 잡으면

매 스탭 O(M) 계산을 하므로 시간은 O(N*M), 공간은 O(M)을 쓴다.

*/

function getMaxIndex(map) {
  let max = null;
  for (const [_, value] of map) {
    if (value == -1) {
      return null;
    }
    if (max == null || value > max) {
      max = value;
    }
  }
  return max;
}

function findMinSubset(setElems, arr) {
  if (setElems == null || arr == null) {
    return null;
  }
  if (setElems.length == 0) {
    return null;
  }
  if (setElems.length == 1) {
    // simple scan and return;
    const firstIndex = arr.indexOf(setElems[0]);
    if (firstIndex >= 0) {
      return [firstIndex, firstIndex];
    }
    return null;
  }

  let lastIndexPerElem = new Map();
  let base = setElems[0];
  for (let i = 1; i < setElems.length; ++i) {
    lastIndexPerElem.set(setElems[i], -1);
  }
  let minLength = null;
  let start, end;
  for (let i = arr.length - 1; i >= 0; --i) {
    const elem = arr[i];
    if (elem == base) {
      const maxIndex = getMaxIndex(lastIndexPerElem);
      if (maxIndex != null) {
        const length = maxIndex - i;
        if (minLength == null || length < minLength) {
          minLength = length;
          start = i;
          end = maxIndex;
        }
      }
    } else {
      if (lastIndexPerElem.has(elem)) {
        lastIndexPerElem.set(elem, i);
      }
    }
  }
  return {
    len: minLength,
    range: [start, end],
  }
}

// console.log(findMinSubset([1,5,9],[7,5,9,0,2,1,3,5,7,9,1,1,5,8,8,9,7]))

/*
틀렸는데, set[0]로 시작하는 수열만 고려하게 되는 문제가 있다. 처음 생각대로
min(min(rs.values()), max(rs.values()))를 구하는게 맞다.
*/

function getMinMaxIndex(map) {
  let max = null;
  let min = null;
  for (const [_, value] of map) {
    if (value == -1) {
      return [null, null];
    }
    if (max == null || value > max) {
      max = value;
    }
    if (min == null || value < min) {
      min = value;
    }
  }
  return [min, max];
}

function findMinSubsetFix(setElems, arr) {
  if (setElems == null || arr == null) {
    return null;
  }
  if (setElems.length == 0) {
    return null;
  }
  if (setElems.length == 1) {
    // simple scan and return;
    const firstIndex = arr.indexOf(setElems[0]);
    if (firstIndex >= 0) {
      return [firstIndex, firstIndex];
    }
    return null;
  }

  let lastIndexPerElem = new Map();
  for (const elem of setElems) {
    lastIndexPerElem.set(elem, -1);
  }
  let minLength = null;
  let start, end;
  for (let i = arr.length - 1; i >= 0; --i) {
    const elem = arr[i];
    if (lastIndexPerElem.has(elem)) {
      lastIndexPerElem.set(elem, i);
      const [minIndex, maxIndex] = getMinMaxIndex(lastIndexPerElem);
      if (maxIndex != null) {
        const length = maxIndex - minIndex + 1;
        if (minLength == null || length < minLength) {
          minLength = length;
          start = minIndex;
          end = maxIndex;
        }
      }
    }
  }
  return {
    len: minLength,
    range: [start, end],
  }
}

console.log(findMinSubsetFix([1,5,9],[7,5,9,0,2,1,3,5,7,9,1,1,5,8,8,9,7]))
