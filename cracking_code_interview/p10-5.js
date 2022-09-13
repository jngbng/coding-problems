/*
sparse search

일단 정렬이 되어 있으니 binary serach 하면 될 것 같긴한데,
sparse라서 어떻게 원소가 있는 위치를 고를거냐가 문제다.

재일 간단한건 binarySearch랑 linearSearch로 찾는다.. 라고 했을데..


재일 간단한건 그냥 linearSearch로 앞에서 부터 찾는거다.
당연히 이건 아닐꺼다.
문자열이 있다면 어느 정도 정리되어 있다는 힌트를 써야 하는데.
그렇다면 바이너리 서치일 것 같다.
가장 간단한건 중간을 찝어서 없으면 왼쪽으로 선형으로 이동해서 찾는다 라고 하자.

|-----------------------------------|
         |       -
       found    mid

찾으면 럭키
타켓이 작으면 start ~ found-1
크면 mid + 1 ~ end

*/


function findSparse(words, target, startIdx, endIdx) {
  if (startIdx > endIdx) {
    return -1;
  }
  const midIdx = (startIdx + endIdx) / 2 | 0;
  let midWordIdx = midIdx;
  while (words[midWordIdx] == "" && midWordIdx > startIdx) {
    midWordIdx--;
  }
  const midWord = words[midWordIdx];
  if (midWord == target) {
    return midWordIdx;
  } else if (midWord == "" || midWord < target) {
    return findSparse(words, target, midIdx + 1, endIdx);
  } else{
    return findSparse(words, target, startIdx, midWordIdx - 1);
  }
}

function findSparseMe(words, target) {
  return findSparse(words, target, 0, words.length - 1);
}


console.log(findSparseMe(["a", "", "b", "", "", "", "d"], "d"));
