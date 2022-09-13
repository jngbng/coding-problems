/*
다른 단어를 조합해서 만들 수 있는 가장 긴 단어.

prefix tree를 만들어서, 각 단어마다 다른 단어의 조합으로 만들어 질 수 있는 지 체크.

한 단어 트리를 따라 내려가면서 terminal이 있는 노드마다, 이후 단어가 조합으로 만들어 질 수 있는지 재귀로 체크해서 그중 가장 긴 길이를 반환.

이러면 같은 suffix가 여러번 중복되서 검사될 수 있다.

do, do-do, a-do-do-do, b-do-do-do, do-do-do-do

위 예제에서는 do-do-do가 여러번 검색된다.

결과를 캐시할 수 있으면 좋겠는데, 어떻게 할 수 있을까? hashtable? 양이 너무 많지 않나?

일단 있다면 prefix tree에서 분기가 되는 애가 있어야 한다.

*/

class Node {
  constructor() {
    this.children = new Map();
    this.terminal = false;
    this.value = "";
  }

  find(str, idx) {}
  insert(str, idx, value) {}
}


// function findLongestComposite(triRoot, curNode) {
//   let longest = -1;
//   for (const [key, subRoot] of triRoot.children) {
//     longest = Math.max(longest, findLongestComposite(triRoot, subRoot));
//   }

//   if (longest > 0) {
//     longest++;
//   }

//   if (curNode.isTerminal) {
//     longest = Math.max(longest, 1);
//     // find longest composite word 
//     return 
//   } else {
//     return longest;
//   }
// }

/*
가장 긴 단어를 찾는 작업과 substring이 조합으로 만들어 질 수 있냐를 합치니 복잡해졌다.
*/

function isComposable(word, wordIdx, triRoot, curNode) {
  if (wordIdx == word.length) {
    if (curNode.isTerminal) {
      return 1;
    }
    return -1;
  }
  const subRoot = curNode.children.get(word[wordIdx]);
  if (subRoot.isTerminal) {
    const compCount = isComposable(word, wordIdx + 1, triRoot, triRoot);
    if (compCount > 0) {
      return compCount + 1;
    }
  }
  return isComposable(word, wordIdx + 1, triRoot, subRoot);
}

function findLongestComposite(words, triRoot) {
  words.sort();
  for (let i = words.length - 1; i >= 0; --i) {
    if (isComposable(words[i], 0, triRoot, triRoot) > 1) {
      return words[i];
    }
  }
  return null;
}

/*
너무 무식한 것 같긴하다. 전체 words가 N, 가장 긴 단어 길이가 M 일 때, O(N * M^2) 걸린다.
*/

/*
어떤 trie의 어떤 노드 이후가 그 자체로 단어가 있는 지를 비교하는건
두 trie의 common path가 있냐를 검사하는 문제이기도 하다.
그 중 가장 긴 common path 길이를 찾을 수 있다면,

이건 trie의 모든 terminal node를 돌면서 

max(depth + max(longestCommonPath(child, root)))를 풀면 된다.

아 아니다. 저 longestCommonPath가 composible로 바껴야 한다.

*/
