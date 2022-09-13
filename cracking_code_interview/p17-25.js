/*
100만개 단어 목록.

단어 직사각형. 최대 크기라 함은 가로길이 x 새로 길이인가.

손으로 한다면? 일단 transpose 한 경우를 고려할 필요가 없기 때문에

N x M (M <= N) 만 해도 된다.

첫 행의 단어를 정하고, 각 열별로 단어를 뽑은다음, 나머지 행이 다 단어가 되는지 검사한다.
찾으면 끝 못 찾으면 그 다음으로 큰 array를 해야 하는데, 
이건 rQueue, cQueue를 유지하면 순차적으로 뽑을 수 있다.

일단 첫 행에 넣을 단어를 순회해야 하는데, trie를 post-order로 순회하면 긴 문자열 부터 순차적으로 순회할 수 있다.
n길이 이하의 단어도 post-order면 가능하긴 하다.

그런데 어떻게 더 최적화 할 수 있을까?

첫번째 행을 뽑고, 열들을 뽑아 나갈 때, 각 나머지 행별로 커서를 가지고 진행해 나가면서 안되는 경우는 바로 멈출 수 있다.
-- 그리고 이 과정을 살펴보면 N x M을 검색할 때 이미 N x [1..M-1] 은 검색이 된다. 대신 prefix 일 때만.

그래서 이 방법의 복잡도는?

가장 긴 단어의 길이가 M, 사전의 크기가 D라고 하면

테스트 해야하는 matrix 크기의 경우의 수는 O(M^2) 개이고

하나를 검사할 때는 첫 행을 뽑는 수가 O(D)

나머지를 채우는건 O(D^(M-1)).. 실제로는 더 작긴 하겠지만

그래서 O(D^M * M^2)

음.... 이건 아닐 것 같은데..

일단 간소화를 위해 글자 길이별 trie를 따로 만든다 하면 만드는 코스트는 O(D*M)
*/

const trie = require('./ds/trie.js');

function buildTriePerLength(words) {
  const dict = new Map();
  for (const word of words) {
    if (!dict.has(word.length)) {
      dict.set(word.length, new trie.Node());
    }
    dict.get(word.length).insert(word, 0, word);
  }
  return dict;
}

function *nextMatrixSize(maxSize) {
  const rQueue = [[maxSize, maxSize]];
  const cQueue = [];

  while (rQueue.length > 0 || cQueue.length > 0) {
    const rPeek = rQueue[0];
    const cPeek = cQueue[0];

    const rPeekSize = (rPeek != null) ? (rPeek[0] * rPeek[1]) : 0;
    const cPeekSize = (cPeek != null) ? (cPeek[0] * cPeek[1]) : 0;

    if (rPeekSize >= cPeekSize) {
      rQueue.shift();
      if (rPeek[0] - 1 > 0) {
        rQueue.push([rPeek[0] - 1, rPeek[0] - 1]);
        cQueue.push([rPeek[0], rPeek[0] - 1]);
      }
      yield rPeek;
    } else {
      cQueue.shift();
      if (cPeek[1] - 1 > 0) {
        cQueue.push([cPeek[0], cPeek[1] - 1]);
      }
      yield cPeek;
    }
  }
}

// for (const [x,y] of nextMatrixSize(3)) {
//   console.log(x*y, [x, y]);
// }

function *traverseTrie(trie) {
  if (trie == null) {
    return;
  }
  for (const child of trie.getChildren()) {
    yield* traverseTrie(child);
  }
  if (trie.terminal) {
    yield trie.value;
  }
}

function precede(remainRowTries, word) {
  const newTries = [];
  for (let i = 1; i < word.length; ++i) {
    const child = remainRowTries[i-1].getChildRoot(word[i]);
    if (child != null) {
      newTries.push(child);
    } else {
      return null;
    }
  }
  return newTries;
}

function findMatrixAux(rowWord, rowWordIdx, remainRowTries, yTrie, cols) {
  if (rowWordIdx >= rowWord.length) {
    return cols;
  }
  const ch = rowWord[rowWordIdx];
  for (const colWord of traverseTrie(yTrie.getChildRoot(ch))) {
    const newRowTries = precede(remainRowTries, colWord);
    if (newRowTries != null) {
      cols.push(colWord);
      const ret = findMatrixAux(rowWord, rowWordIdx + 1, newRowTries, yTrie, cols);
      if (ret != null) {
        return ret;
      }
      cols.pop();
    }
  }
  return null;
}

function findMatrix(xSize, ySize, xTrie, yTrie) {
  if (xTrie == null || yTrie == null) {
    return null;
  }
  const remainRowTries = new Array(xSize - 1).fill(xTrie);
  for (const word of traverseTrie(xTrie)) {
    const cols = findMatrixAux(word, 0, remainRowTries, yTrie, [])
    if (cols != null) {
      return cols;
    }
  }
  return null;
}

function getMax(iter) {
  let max = null;
  for (const value of iter) {
    if (max == null || max < value) {
      max = value;
    }
  }
  return max;
}

function findBiggestMatrix(words) {
  const triePerLength = buildTriePerLength(words);
  const maxWordLength = getMax(triePerLength.keys());

  for (const [xSize, ySize] of nextMatrixSize(maxWordLength)) {
    const matrix = findMatrix(xSize, ySize, triePerLength.get(xSize), triePerLength.get(ySize));
    if (matrix != null) {
      return matrix;
    }
  }
  return null;
}

console.log(findBiggestMatrix(["abc", "bbb", "cba", "abcd", "aaaa", "abab", "baba", "b"]));
