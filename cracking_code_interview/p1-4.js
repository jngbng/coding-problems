/*
문자열은 단어라고 봐도 되나?
중간에 space 같은게 있다고 해도 일반 문자로 봐도 되나? 아니면 무시해야 하나?
대소문자 구분을 해야 하나? -> no
문자열은 ascii라고 가정하겠다.

palindrome의 속성을 생각해보면 어떤 문자가 1개있거나, 짝수개 있어야 한다.
단, 1개인 문제는 최대 하나만 있어야 한다. (전체 문자열이 홀수 길이일 때).

순열의 특성은 문자 갯수는 바뀌지 않는다.
둘을 조합하면 문자 워드 카운트를 해서 결과가 1또는 짝수인지를 확인하면 되겠다.

대소문자 구분은 하지 않으니 소문자로 변환하고,
' '는 무시한다.

공백으로만 이루어져 있으면 true냐?

이건 단순 스캔이니 문자열 길이인 N에 선형으로 풀 수 있다.
물론 해시테이블 업데이트는 O(1)으로 보겠다.

1개가 아니라 홀수개 여야 한다.
*/

function isWhiteSpace(char) {
  return char == ' ';
}

function canPermuteToPalindrome(str) {
  const wc = new Map();
  for (let char of str) {
    if (isWhiteSpace(char)) {
      continue;
    }
    char = char.toLowerCase();
    wc.set(char, (wc.get(char) || 0) + 1);
  }
  let oddCharCount = 0;
  for (const [ch, count] of wc.entries()) {
    if (count % 2 == 1) {
      oddCharCount++;
      if (oddCharCount > 1) {
        return false;
      }
    }
  }
  return true;
}

/*
여기서 태스트 한다면

true
''
' '
'a'
'aA'
'a '
'a A'

false
'ab'

*/

const tap = require('tap');

function testFn(impl) {
  tap.test(`test ${impl.name}`, t => {
    t.ok(impl("Tact Coa"));
    t.ok(impl("a"));
    t.ok(impl(" "));
    t.ok(impl(""));
    t.ok(impl("aA"));
    t.ok(impl("a "));
    t.ok(impl("a A"));
    t.ok(impl("aaa"));
    t.notOk(impl("ab"));
    t.end();
  });
}

testFn(canPermuteToPalindrome);
