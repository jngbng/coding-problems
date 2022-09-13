// https://school.programmers.co.kr/learn/courses/30/lessons/12983

/*
단어 퍼즐
문제 설명
단어 퍼즐은 주어진 단어 조각들을 이용해서 주어진 문장을 완성하는 퍼즐입니다. 이때, 주어진 각 단어 조각들은 각각 무한개씩 있다고 가정합니다. 예를 들어 주어진 단어 조각이 [“ba”, “na”, “n”, “a”]인 경우 "ba", "na", "n", "a" 단어 조각이 각각 무한개씩 있습니다. 이때, 만들어야 하는 문장이 “banana”라면 “ba”, “na”, “n”, “a”의 4개를 사용하여 문장을 완성할 수 있지만, “ba”, “na”, “na”의 3개만을 사용해도 “banana”를 완성할 수 있습니다. 사용 가능한 단어 조각들을 담고 있는 배열 strs와 완성해야 하는 문자열 t가 매개변수로 주어질 때, 주어진 문장을 완성하기 위해 사용해야 하는 단어조각 개수의 최솟값을 return 하도록 solution 함수를 완성해 주세요. 만약 주어진 문장을 완성하는 것이 불가능하면 -1을 return 하세요.

제한사항
strs는 사용 가능한 단어 조각들이 들어있는 배열로, 길이는 1 이상 100 이하입니다.
strs의 각 원소는 사용 가능한 단어조각들이 중복 없이 들어있습니다.
사용 가능한 단어 조각들은 문자열 형태이며, 모든 단어 조각의 길이는 1 이상 5 이하입니다.
t는 완성해야 하는 문자열이며 길이는 1 이상 20,000 이하입니다.
모든 문자열은 알파벳 소문자로만 이루어져 있습니다.
입출력 예
strs    t       result
["ba","na","n","a"]     "banana"        3
["app","ap","p","l","e","ple","pp"]     "apple" 2
["ba","an","nan","ban","n"]     "banana"        -1
입출력 예 설명
입출력 예 #1
문제의 예시와 같습니다.

입출력 예 #2
"ap" 1개, "ple" 1개의 총 2개로 "apple"을 만들 수 있으므로 필요한 단어 개수의 최솟값은 2를 return 합니다.

입출력 예 #3
주어진 단어로는 "banana"를 만들 수 없으므로 -1을 return 합니다.
*/

class TrieNode {
  constructor() {
    this.children = new Map();
    this.terminal = false;
  }

  add(str, idx) {
    const char = str.charCodeAt(idx);
    let child = this.children.get(char);
    if (child == null) {
      child = new TrieNode();
      this.children.set(char, child);
    }
    if (idx == str.length - 1) {
      child.terminal = true;
    } else {
      child.add(str, idx + 1);
    }
  }

  get(ch) {
    return this.children.get(ch) || null;
  }
}

/*
dynamic인가? prefix를 찾아가면서 나머지에 재귀. 호출 하면?
*/

function solutionRecur(strs, t) {
  const trieRoot = new TrieNode();
  for (const str of strs) {
    trieRoot.add(str, 0);
  }

  const memo = new Array(t.length);
  const sol = function (startIdx) {
    if (startIdx == t.length) {
      return 0;
    }
    if (memo[startIdx] != null) {
      return memo[startIdx];
    }
    let min = -1;
    let trieNode = trieRoot;
    let idx = startIdx;
    while (idx < t.length) {
      trieNode = trieNode.get(t.charCodeAt(idx++));
      if (trieNode == null) {
        break;
      }
      if (trieNode.terminal) {
        let subTotal = sol(idx);
        if (subTotal != -1) {
          subTotal++;
          if (min == -1 || min > subTotal) {
            min = subTotal;
          }
        }
      }
    }
    memo[startIdx] = min;
    return min;
  };


  return sol(0);
}

function solutionForward(strs, t) {
  const trieRoot = new TrieNode();
  let maxLen = 0;
  for (const str of strs) {
    trieRoot.add(str, 0);
    if (maxLen < str.length) {
      maxLen = str.length;
    }
  }

  const memo = new Array(t.length).fill(Infinity);

  // i => 0...i 까지 만드는 최소한의 횟수.
  let notFoundStrike = 0;
  for (let i = 0; i < t.length; ++i) {
    if (i == 0 || memo[i - 1] != Infinity) {
      notFoundStrike = 0;
      let trieNode = trieRoot;
      let idx = i;
      while (idx < t.length) {
        trieNode = trieNode.get(t.charCodeAt(idx));
        if (trieNode == null) {
          break;
        }
        if (trieNode.terminal) {
          memo[idx] = Math.min(memo[idx], (i == 0 ? 0 : memo[i - 1]) + 1);
        }
        idx++;
      }
    } else {
      notFoundStrike++;
      if (notFoundStrike > maxLen + 5) {
        break;
      }
    }
  }

  const ret = memo[t.length - 1];
  return ret == Infinity ? -1 : ret;
}


console.log(solutionForward(["ab", "na", "n", "a", "bn"], "nabnabn") == 4);

// ["ab", "na", "n", "a", "bn"], "nabnabn"
// na b na bn

// console.log(solutionForward(["a"], new Array(20000).fill("a").join('')));
