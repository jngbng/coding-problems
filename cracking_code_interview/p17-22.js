/*
단어 변환.

한번에 한 글자씩만 바꿔서 A를 B로 바꾸는 방법.

DAMP -> LAMP -> LIMP -> LIME -> LIKE
        ^        ^         ^      ^

모든 경우의 수는? 단순히 글자 순서 고르기 경우의 수로 풀 수 있나?


ABC -> DBC -> DBD -> CBD
       ^        ^    ^

로 A가 D를 거쳐가야 할 수도 있다. 즉 한 위치를 여러번 선택해야 할 수도 있다.

그래프로 치면 각 노드가 단어이고, 한 글자만 다른 단어끼리 edge가 있다고 할 때,

한 노드에서 다른 노드로 가는 길을 찾는 문제이므로, 

출발 지점에서 끝 지점을 만날 때 까지 BFS를 해나가면 된다. 또는 양쪽에서 Bidirectional BFS.

복잡도는 노드수가 N, 가장 긴 길이를 D, 평균 간선의 수가 E라고 할 때 O(E^D).

또는 최대 모든 노드를 한번씩 방문해야 하므로 O(N*E)

이 그래프를 만들기 위해서는 모든 단어간을 비교해야 하므로 O(D^2*L)이 걸린다.
D은 사전의 단어 수, L은 입력 문자의 길이.

이를 backtrack으로 풀려면, 
한글자만 단어들에 대해 사전을 순회하면서,
사전에서 해당 단어를 제거하고, 재귀로 호출하면 된다.
재귀 호출 결과 없으면 다시 단어를 추가하고, 다음 단어에 대해서 시도하면 된다.
제거해도 되는 이유는, 나중에 이 단어를 돌아와야 하는 경우는 그 동안의 싸이클이 없어도 된다는 뜻이기 때문이다.
이걸로 찾는 최초의 경로는 최단 경로는 아닐 수 있다.
복잡도는 매번 남은 사전의 단어를 모두 순회하며 O(L)의 연산을 하고, => O(D * L)
한 단어를 재거하고 재귀를 하므로, O((D*L)^D) 이라고 할 수 있겠다.

대신 한 글자 차이나는 관계 edge를 모두 만들어 놨으면 O(D^2*L)
위 그래프 알고리즘과 큰 차이가 없게된다. 사실 DFS일 뿐 같은 접근이다.
*/

function setPush(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function isOneCharDiff(word1, word2) {
  let diffCount = 0;
  for (let i = 0; i < word1.length; ++i) {
    if (word1[i] !== word2[i]) {
      diffCount++;
    }
    if (diffCount > 1) {
      break;
    }
  }
  return diffCount == 1;
}

function makeAdjMap(dict) {
  // map: word -> [word]
  const adjMap = new Map();
  for (let i = 0; i < dict.length - 1; ++i) {
    for (let j = i + 1; j < dict.length; ++j) {
      const word1 = dict[i];
      const word2 = dict[j];
      if (isOneCharDiff(word1, word2)) {
        // assume that all words are distinct
        setPush(adjMap, word1, word2);
        setPush(adjMap, word2, word1);
      }
    }
  }
  return adjMap;
}

const NOT_YEY = 0;
const VISITED = 1;
const VISITING = 2;

function calcPath(backRef, from, to) {
  const path = [to];
  let  elem = to;
  while (elem != from && elem != null) {
    elem = backRef.get(elem);
    path.unshift(elem);
  }
  return path;
}

function bfs(adjMap, from, to) {
  const backRef = new Map();
  const visitState = new Map();
  const queue = [];

  let curNode = from;
  visitState.set(curNode, VISITING);
  queue.push(curNode);
  
  while (queue.length > 0) {
    curNode = queue.shift();
    if (curNode == to) {
      break;
    }
    visitState.set(curNode, VISITED);
    const adjs = adjMap.get(curNode) || [];
    for (const adj of adjs) {
      const adjVisitState = visitState.get(adj);
      if (adjVisitState == VISITED || adjVisitState == VISITING) {
        continue;
      }
      backRef.set(adj, curNode);
      visitState.set(adj, VISITING);
      queue.push(adj);
    }
  }
  if (visitState.get(to) == null) {
    return null;
  }
  return calcPath(backRef, from, to);
}

function dfsHelper(adjMap, from, to, visitPath) {
  if (from == to) {
    return visitPath;
  }
  const adjs = adjMap.get(from) || [];
  for (const adj of adjs) {
    if (visitPath.has(adj)) {
      continue;
    }
    visitPath.add(adj);
    const path = dfsHelper(adjMap, adj, to, visitPath);
    if (path != null) {
      return path;
    }
    visitPath.delete(adj);
  }
  return null;
}

function dfs(adjMap, from, to) {
  const visitPath = dfsHelper(adjMap, from, to, new Set([from]));
  if (visitPath != null) {
    return Array.from(visitPath);
  }
  return null;
}

function findTransformPathBfs(dict, from, to) {
  if (from == null || to == null || dict == null) {
    return null;
  }
  if (from == to) {
    return [from];
  }
  const adjMap = makeAdjMap(dict);
  return bfs(adjMap, from, to);
}

function findTransformPathDfs(dict, from, to) {
  if (from == null || to == null || dict == null) {
    return null;
  }
  if (from == to) {
    return [from];
  }
  const adjMap = makeAdjMap(dict);
  return dfs(adjMap, from, to);
}

const dict = ["ABC", "DBC", "DBD", "DBQ", "DQQ", "CQQ", "CBQ", "CBD"];
console.log(findTransformPathBfs(dict, "ABC", "CBD"));
console.log(findTransformPathBfs(dict, "CBD", "ABC"));

console.log(findTransformPathDfs(dict, "ABC", "CBD"));
console.log(findTransformPathDfs(dict, "CBD", "ABC"));
