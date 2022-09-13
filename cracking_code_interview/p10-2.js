/*
anagram은 같은 문자로 취급해서 정렬하면 된다는 뜻으로 보면 되나?
anagram이 아닌 애들 끼리의 정렬 순서는 아무렇게나 해도 되나?
이 문자열 배열의 크기는 얼마나 되나?
들어있는 문자열의 최대 길이는 어느정도 되나?
문자열셋은 ascii라고 보면 되나?
빈칸은 단순문자로 취급해도 되나? 여러 단어로 이루어져 있으면 anagram은 개별이 anagram이어야 하나?
최종적으로 셋에 anagram이 아닌 문자열은 어느정도 들어있나?


가장 무식한 방법은 개별 단어들을 normalize 한 다음에,
normalize한 결과를 기준으로 간접 정렬하는 방법이다. normalize는 워드 카운트로 글자x횟수 로 표현하는 방법이다.
또는 생성하면서 해시 테이블을 써서 버킷 정렬을 하면 되다.

이 방법의 코스트를 분석해보면
가장 긴 단어의 길이를 S라고 했을 때 개별 문자를 normalize하는데는 O(S)가 들고 (charset은 작으면 상수 취급)
문자열들이 N개 있다고 하면 O(S*N) 가 든다.
이를 버킷 정렬하는데는 평균 M개씩의 아나그램이 있다면 전체 버킷은 N/M 개이므로  O(N log N/M)

*/

function normalizeWord(word) {
  // 워드카운트 후 알파셋 순서로 문자+횟수를 합친 문자열.
  // 일단 돌아가게 하기 위해 정렬방법 이용.
  return Array.from(word).sort().join('');
}

function sortAnagram(words) {
  let dict = new Map();
  for (const word of words) {
    const normalized = normalizeWord(word);
    if (!dict.has(normalized)) {
      dict.set(normalized, []);
    }
    dict.get(normalized).push(word);
  }
  return Array.from(dict.values()).flat();
}

console.log(sortAnagram(["abc", "def", "cba", "bca"]));
