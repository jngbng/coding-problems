/*

A[0 ... n-1] dptj A[i] == i 면 i는 magic index

정렬된 배열이 주어졌다. 크기는 알려졌는가?
-> ㅇㅇ

원소에 중복은 없다.

여러개라면 다 리턴해야 하나?
-> 죄다 리턴한다 해보자.

가장 간단한건 스캔이겠고, 이 경우는 O(N) 이겠다.

정렬 특성과 다 다르다는 특성도 안 썼으니 더 최적화가 가능하겠다.

들어 있는 값은 integer? double?
-> integer

A[i] > i 인 경우 i 뒤쪽에는 magic index가 있을 수 없다.
A[i] < i 인 경우 i 앞쪽에는 magic index가 있을 수 없다.

그래서 시작지점 startIdx를 [0, N) 구간에서 바이너리 서치로 찾으면 되겠다.
종료 지점 endIdx는 [startIdx + 1, N) 구간에서 바이너리 서치로 찾으면 되겠다.

바이너리 서치 전략은 첫번째 magicIndex를 찾는거다.
*/

// [fromIdxIncl, toIdxIncl] 구간에서 첫번째 매직 인덱스/또는 비메직 인덱스를 리턴. 없으면 -1 리턴.
function findFirstIdx(A, fromIdxIncl, toIdxIncl, isMagic) {
  if (toIdxIncl < fromIdxIncl) {
    return -1;
  } else if (toIdxIncl === fromIdxIncl) {
    if ((A[fromIdxIncl] === fromIdxIncl) === isMagic) {
      return fromIdxIncl;
    } else {
      return - 1;
    }
  } else {
    const centerIdx = Math.floor((fromIdxIncl + toIdxIncl) / 2);
    const found = findFirstIdx(A, fromIdxIncl, centerIdx, isMagic);
    if (found >= 0) {
      return found;
    } else {
      return findFirstIdx(A, centerIdx + 1, toIdxIncl, isMagic);
    }
  }
}

function findMagicIndices(A) {
  const startIdx = findFirstIdx(A, 0, A.length - 1, true);
  if (startIdx < 0) {
    console.log('Magic index not found.');
    return;
  }
  const endIdxExcl = findFirstIdx(A, startIdx + 1, A.length - 1, false);
  if (endIdxExcl < 0) {
    endIdxExcl = A.length - 1;
  }
  console.log('Magic index found from indexces %d to %d', startIdx, endIdxExcl - 1);
}

// 있는 경우
findMagicIndices([-3, -2, 2, 3, 5, 8]);


// 없는 경우 1
findMagicIndices([]);

// 없는 경우 2: 모두 안 맞는 경우. 작다가 커지는 경우.
// 지금 보니 있을 수 있다 없다 정보를 활용하지 않아서, 전체 순환을 하고 있다.
findMagicIndices([-1, 0, 3, 7]);



/*
[i, j]를 가지고 범위를 줄여나가자.

 0  1  2
-3  1  8

시작 지점의 경우:
A[i] < i: i 뒤에 시작점이 있다.
A[i] == i: i 점이 시작점이다.
A[i] > i: 이 범위에 존재할 수 없다.

종료 지점의 경우
A[j] < j: j 앞에 종료점이 있다.
A[j] == j: j 점이 종료점이다.
A[j] > j: 이 범위에 존재할 수 없다.


findMagicRange(i, j) => 존재하면 범위 (x, y)를 반환하고, 없으면 null을 반환.

findMagicRange(i, j)

중간점값 < 인덱스: findMagicRange(중간점 + 1, j)
중간점값 > 인덱스: findMagicRange(i, 중간점 - 1)
중간점값 = 인덱스: [findMagicRange(i, 중간점 - 1).from, findMagicRange(중간점 + 1, j).to]
*/


function findMagicRange(A, fromIdxIncl, toIdxIncl) {
  if (toIdxIncl < fromIdxIncl) {
    return null;
  } else if (fromIdxIncl === toIdxIncl) {
    if (A[fromIdxIncl] === fromIdxIncl) {
      return [fromIdxIncl, toIdxIncl];
    } else {
      return null;
    }
  } else {
    const centerIdx = Math.floor((fromIdxIncl + toIdxIncl) / 2);
    const centerValue = A[centerIdx];
    if (centerValue < centerIdx) {
      return findMagicRange(A, centerIdx + 1, toIdxIncl);
    } else if (centerValue > centerIdx) {
      return findMagicRange(A, fromIdxIncl, centerIdx - 1);
    } else {
      const startResult = findMagicRange(A, fromIdxIncl, centerIdx - 1);
      const startIdx = (startResult == null) ? centerIdx : startResult[0];
      const endResult = findMagicRange(A, centerIdx + 1, toIdxIncl);
      const toIdx = (endResult == null) ? centerIdx : endResult[1];
      return [startIdx, toIdx];
    }
  }
}

function findMagicIndicesFix(A) {
  const range = findMagicRange(A, 0, A.length - 1);
  if (range == null) {
    console.log('Magic index not found.');
    return;
  }
  console.log('Magic index found from indexces %d to %d', range[0], range[1]);
}

findMagicIndicesFix([-3, -2, 2, 3, 5, 8]);

// 없는 경우 1
findMagicIndicesFix([]);

// 없는 경우 2: 모두 안 맞는 경우. 작다가 커지는 경우.
// 지금 보니 있을 수 있다 없다 정보를 활용하지 않아서, 전체 순환을 하고 있다.
findMagicIndicesFix([-1, 0, 3, 7]);


/*
중복된 값을 허용하고 하나만 찾으면 된다.

   0  1  2  3  4  5  6
  -1  1  3  3  3  5  8
      _     _     _
         4  4  4

중간 지점을 봤는데
A[j] == j: 찾았다.
A[j] < j: 
- j 앞에 있다면 그 값은 A[j] 보다 같거나 작다.
- j 뒤에 있다면 그 값은  j + 1 보다 같거다 크다.
A[j] > j:
- j 앞에 있다면 그 값은 j - 1 보다 같거나 작다.
- j 뒤에 있다면 그 값은 A[j] 보다 같거나 크다. 즉 A[j] 인덱스 에서부터 있을 수 있다.

최악의 케이스는 O(N) 인데.

0 1 2 3 4 5 6
1 2 3 4 5 6 7
*/

function findMagicIndexDup(A, startIncl, endIncl) {
  if (startIncl > endIncl) {
    return null;
  } else if (startIncl == endIncl) {
    if (A[startIncl] == startIncl) {
      return startIncl;
    } else {
      return -1;
    }
  } else {
    // startIncl < endIncl
    const centerIncl = Math.floor((startIncl + endIncl) / 2);
    const centerValue = A[centerIncl];

    if (centerValue == centerIncl) {
      return centerIncl;
    }
    const leftIndex = Math.min(centerIncl - 1, centerValue);
    const findLeft = findMagicIndexDup(A, startIncl, leftIndex);
    if (findLeft >= 0) {
      return findLeft;
    }
    const rightIndex = Math.min(centerIncl + 1, centerValue);
    const findRight = findMagicIndexDup(A, rightIndex, endIncl);
    if (findRight >= 0) {
      return findRight;
    }

    return -1;
  }
}
