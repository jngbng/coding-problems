/*
a나 b는 empty-string에는 매칭하지 않는다고 하자. 매칭을 허용하면, 문제가 어렵지 않나?

aa 는 aab aba abba abab 요런거에 다 매칭되게 되는데.

요렇게 했을 때는 어떻게 풀 수 있을까?

T(test), M(match) 이 주어졌을 때,

무식하게 하는건, T의 prefix를 한글자에서 N글자까지 키워가며,

T나머지, M나머지 를 매칭할 수 있는지 재귀호출로 해나간다.

match(str, m, mapped)

가 주어졌으면,

m == "": str == ""?

m = m0 + m_rest 일 때

m0가 mapped에 있으면: str이 mapped[m0]로 시작하면, str[mapped[m0].length ...], m_rest로 재귀호출

없으면 m0에 str 글자를 1, ..., n 까지 키워가며 재귀호출.

요렇게 하면 empty string match도 허용해도 된다.

이러면 시간 복잡도는? T, M, 패턴 문자의 갯수 N라고 하면.

개략적으로 T^N 정도의 조합에 대해서 테스트를 수행하는데, 테스트에는 T 만큼 걸리니깐

O(T^(N+1))로 잡아볼 수 있다.

*/

function prefixMatch(test, tIdx, prefix) {
  for (let i = 0; i < prefix.length; ++i) {
    if (test[tIdx + i] != prefix[i]) {
      return false;
    }
  }
  return true;
}

function patternMatch(test, tIdx, pattern, pIdx, pmap) {
  if (pIdx == pattern.length) {
    return tIdx == test.length;
  }
  const curPChar = pattern[pIdx];
  const mapped = pmap.get(curPChar);
  if (mapped != null) {
    if (!prefixMatch(test, tIdx, mapped)) {
      return false;
    }
    return patternMatch(test, tIdx + mapped.length, pattern, pIdx + 1, pmap);
  } else {
    for (let i = tIdx; i <= test.length; ++i) {
      let prefix = test.slice(tIdx, i);
      pmap.set(curPChar, prefix);
      if (patternMatch(test, i, pattern, pIdx + 1, pmap)) {
        return true;
      }
      pmap.delete(curPChar);
    }
    return false;
  }
}

function patternMatchHelper(test, pattern) {
  if (test == null || pattern == null) {
    return false;
  }
  return patternMatch(test, 0, pattern, 0, new Map());
}

console.log(patternMatchHelper("catcatgocatgo", "aabab"));
console.log(patternMatchHelper("catcatgocatgo", "aa"));

/*
이런 무식한거 말고 더 좋은 방법이 있을까?
*/
