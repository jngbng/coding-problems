/*
인식 불가능한 단어를 최소화.

가장 간단한거는 

S(N) = Min_i_(1 to n) (cost(0..i) + S(i+1))

으로 다이나믹 프로그래밍으로 푸는거다.
*/

function cost(dict, str, begin, end) {
  // can optimize using trie
  const word = str.substring(begin, end + 1);
  if (dict.has(word)) {
    return 0;
  } else {
    return word.length;
  }
}

function minCost(dict, str, begin, memo) {
  if (begin >= str.length) {
    return 0;
  }

  if (memo[begin] != null) {
    return memo[begin];
  }

  let min = null;
  for (let i = begin; i < str.length; ++i) {
    let subCost = cost(dict, str, begin, i) + minCost(dict, str, i + 1, memo);
    if (min == null) {
      min = subCost;
    } else {
      min = Math.min(min, subCost);
    }
  }
  memo[begin] = min;
  return min;
}

console.log(minCost(new Set(["looked", "just", "like", "her", "brother", "the", "brot", "other", "ok", "bro"]), "jesslookedjustliketimherbrother", 0, {}));

/*
복잡도 분석은 전체 문자 길이를 S, 사전 크기를 D, 사전에서 가장 긴 단어 길이를 M이라 하면

모든 글자에 대해 한번씩 계산을 한다.

i번째 스탭에서 prefix가 사전에 있는지 검사하는데는 trie를 쓰면 O(i) 이라고 할 수 있다.
이후에는 S-i번의 비교를 한다. O(S-i)
즉, 매스탭에서 O(S)의 연산을 한다.

그래서 O(S^2)이 된다.

더 나은 해법은?
*/
