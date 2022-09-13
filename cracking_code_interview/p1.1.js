const tap = require('tap');

// ascii, unicode?
// 문자열 길이는 얼마나 긴가? 인 메모리인가 스트림인가?
// 자료구조를 추가로 사용하지 않는다는 의미는 공간 복잡도가 O(1)을 써야 한다는건가? 아니면 추가적으로 메모리를 사용하지 않아야 한다는 의미인가? 그럴 때는 문자열을 정렬해도 되는가?

// 스트림으로 바뀌고 아주아주 길다면 어떻게 해야 하나?
// map reduce로 여러 노드로 나눠서 실행한다. 대신 {성공, chars} 를 리턴하게 해서
// reduce 단계에서 chars를 머지할 때 같은 원소가 있으면 성공으로 끝내도록 한다.

function testFn(impl) {
  tap.test(`test ${impl.name}`, t => {
    t.ok(impl(""));
    t.ok(impl("a"));
    t.notOk(impl("aabb"));
    t.equal(impl("abcdef"), true);
    t.end();
  });
}

function isDistinct(sentence) {
  if (sentence == null) {
    return true;
  }
  let known = new Set();
  for (let i = 0; i < sentence.length; ++i) {
    if (known.has(sentence[i])) {
      return false;
    }
    known.add(sentence[i]);
  }
  return true;
}

testFn(isDistinct);

function isDistinctSort(str) {
  // TODO: sanity
  if (str == null || str.length < 2) {
    return true;
  }
  const chars = str.split('').sort();
  for (let i = 1; i < chars.length; ++i) {
    if (chars[i] == chars[i - 1]) {
      return false;
    }
  }
  return true;
}

testFn(isDistinctSort);
