/*
다중 검색
s와 s보다 짧은 검색어 목록T가 주어졌을 때

각 검색어의 위치를 s에서 찾아라. 여러번 등장하면 죄다 찾아야 하나, 아무거나 하나만 찾으면 되나?

s: "A A A"
T: ["A"]

가장 단순한건 무식하게 해보는거다.

문자열 찾는건 O(s.length)이고, T의 각 요소에 대해서 다하면 되니깐 O(s * T)가 된다.

그런데 모든 match를 찾으려면 O(s * M * T) 가 된다. M은 검색 문자열 중 가장 긴 길이

이거보다는 잘해야 한다.

-------------------

S[0:], S[1:], S[2:] ... 들을 모두 prefix tree에 넣으면 이 동작은 O(s^2)가 되고,

T의 요소가 prefix로 있는지 찾는 동작은 T중 가장 긴 애 길이를 M이라 했을 때 O(M * T)가 되서

O(s^2 + M * T)가 된다.

----------------------

prefix tree는 너무 빡시니 
s문자열을 돌면서 알파벳 별로 index 목록을 만들고,
T의 각 문자열에 대해서 검사를 시작할 위치를 특정할 수 있도록 하면.

T의 각 문자열이 열치하는데 검사하는데는 O(M)인데, 위치 목록은 O(s)이다.

O(T * M * s)

위치 목록을 O(s)로 잡았기 때문에 줄어들지 않았다.

---------------------

반대로 해보면?
검색어 목록으로 prefix tree를 만들면 O(M*T)

문자열 모든 위치에 대해서 향후 문자열이 prefix tree에 match될 수 있는 지 검색을 해야하는데...

한 위치에 대해서 O(M)이 드니깐, 전체 검색은 O(s * M) 가 소요된다.

O(M * T + s * M) 이라서 O(M * (s + T)) 가 된다. 공간 복잡도는 O(M*T)가 든다.

이게 맞나?

*/

function makeTrie(words) {
  
}

function pushMap(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function findMatches(trieRoot, str, startIdx) {
  let result = [];

  if (trieRoot == null) {
    return result;
  }
  
  let node = trieRoot;
  for (let i = startIdx; i < str.length; ++i) {
    node = node.children.get(str[i]);
    if (node == null) {
      break;
    }
    if (node.isTerminal) {
      result.push(node.value);
    }
  }
  return result;
}

function findAllMatches(searchMe, keywords) {
  const trie = makeTrie(keywords);
  const indicesPerKeyword = new Map();

  for (let i = 0; i < searchMe.length; ++ i) {
    const matches = findMatches(trie, searchMe, i);
    for (const match of matches) {
      pushMap(indicesPerKeyword, match, i);
    }
  }
  return indicesPerKeyword;
}
