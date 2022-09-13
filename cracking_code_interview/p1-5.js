/*
문자열의 길이는 주어지는거냐?

경우는 삽입, 삭제, 교체.

교체는 길이가 동일한 경우, 다른 부분이 하나만 있을 때.

삽입/삭제는 길이가 1만큼 차이나고, 다른 부분 하나만 있을 때만 가능하다.

둘의 공통점은 다른 부분이 하나만 있냐이다.

앞에서 스캔해나가면서 최초로 다른 부분을 발견 했을 때,

1) 삽입으로 해결 되나

a가 긴 문자열, b가 짧은 문자열.

a[i+1, ...] == b[i, ...]

2) 삭제로 해결 되나. 사실 위와 동일.

a가 긴 문자열, b가 짧은 문자열.

a[i+1, ...] == b[i, ...]

3) 교체로 해결 되나.

a[i+1, ...] == b[i+1, ...]


그럼 길이를 재서 일단 걸러내고,

같은 경우 3을 체크. 1 차이나면 1을 체크

O(MIN(A, B))
*/

function sameSince(strA, aIdx, strB, bIdx) {
  return strA.slice(aIdx) === strB.slice(bIdx);
}

function checkModifyDistanceOne(strA, strB) {
  if (strA == null || strB == null) {
    return false;
  }
  if (Math.abs(strA.length - strB.length) > 1) {
    return false;
  }
  let long = strA;
  let short = strB;
  if (strA.length < strB.length) {
    long = strB;
    short = strA;
  }
  for (let i = 0; i < short.length; ++i) {
    if (long[i] == short[i]) {
      continue;
    }
    if (long.length == short.length) {
      return sameSince(long, i + 1, short, i + 1);
    } else {
      return sameSince(long, i + 1, short, i);
    }
  }
  return true;
}

console.log(checkModifyDistanceOne("abc", "abbcc"));
