const tap = require('tap');

/*
ascii, unicode?
=> unicode라 하자.

case sensitivity?
=> case-sesitive

공백이나 줄바뀜 같은 것도 단순 문자로 취급해도 되나?
=> yes

문자열 길이는 얼마나 긴가? 인 메모리인가 스트림인가?
=> 인 메모리라 하자.

null 체크 해야 하나?

BCR은 O(N). N이 str length

가장 무식하게 풀어보면 워드카운팅을 한다음에 결과를 비교해보면 될 것 같다.
이 경우 카운팅하는게 O(N)이고 결과물 비교가 O(MIN(C,N))이다. 결과적으로 O(N)
hashtable 생성과 lookup은 O(1)이라고 가정했다.

그런데 C가 매우 크다면 hashtable 의 성능은 O(log N) 으로 봐야해서 O(N log N) 이 될 것 같다.

다른 방법으로는 두 스트링을 정렬한 다음에, 비교해보면 될 것 같다. 이 경우 정렬에 O(N log N) 비교에 O(N)이 들기 때문에 전체는 O(N log N).

다른 최적화로는 길이가 다르면 순열 관계일 수 없으므로 빨리 리턴하면 좋겠다.

*/

function testImpl(impl) {
  tap.test(`test ${impl.name}`, t => {
    // edge
    t.notOk(impl("", "123"));
    // ok
    t.ok(impl("abc", "cba"));
    t.ok(impl("aabcc", "bcaca"));
    // dup values
    t.notOk(impl("abbb"), impl("aaab"));
    t.end();
  });
}

function countWord(str) {
  const wcMap = new Map();
  for (const ch of str) {
    const count = (wcMap.get(ch) || 0);
    wcMap.set(ch, count + 1);
  }
  return wcMap;
}

function isEqualWc(wcA, wcB) {
  if (wcA.size !== wcB.size) {
    return false;
  }
  for (const [ch, count] of wcA.entries()) {
    if (wcB.get(ch) !== count) {
      return false;
    }
  }
  return true;
}

function isPermuteWc(strA, strB) {
  if (strA == null || strB == null) {
    return false;
  }
  if (strA.length !== strB.length) {
    return false;
  }
  const wcA = countWord(strA);
  const wcB = countWord(strB);
  return isEqualWc(wcA, wcB);
}

testImpl(isPermuteWc);
