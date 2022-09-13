/*

두 개의 거대한 이진 트리 T1, T2.
size(T1) >> size(T2)

음 일단 하위 트리가 있다고 하면

1. 그 하위 트리의 root 노드는 (h1 - h2) 깊이에 있어야 한다. 그래야 T2를 T1에 넣을 수 있으니깐.

그 이후에 있으면 T2를 포함할 수 있고, 그 이전에 있으면.... 있을 수 있군.

그럼 정확히는 T1 트리에서 높이가 h2가 되는 자식 노드들에 대해서 검사를 해야 한다.

post-order 로 순회를 하면서 나의 높이를 측정해 나가다가

내 높이가 정확히 h2 일 때, 내가 h2와 동일한 지 검사하는 방식으로 순회를 하면 되지 않을까.

그런 찾으면 바로 리턴하도록 하고.

가장 무식하게는 그 깊이 이전에 있는 노드 중에 T2 root 노드랑 같은 애를 찾아서 순차적으로 자식인지 확인해보면 된다.

그런데 지금 크기가 무지 차이난다고 했으니 그 대싱인 노드가 무지 많은 상황이긴 하다.

지금 방식으로 하면 대상이 무려 최대 2^(h1-h2) 개이다.

다른 힌트가 더 있을까.

끝을 보면 어떨까. T2가 자식 트리로 T1에 들어가려면, T1의 끝단에 T2의 노드들이 등장해야 한다.

T1의 끝단은 2^h1 개가 있어서 탐색 대상이 더 많다.

이론적으로 더 줄일 수가 있나? 이진 트리라서 뭔가 정렬 되어 있는 특성이 있는 것도 아니고.

*/


function calcHeight(t) {
}

function isSameTree(t1, t2) {
  if (t1 == null) {
    return t2 == null;
  }
  if (t2 == null) {
    return false;
  }
  return (t1.data == t2.data)
    && isSameTree(t1.left, t2.left)
    && isSameTree(t1.right, t2.right);
}

function findSubTree(t1, t2, t2Height) {
  if (t1 == null) {
    return {
      found: false,
      depth: 0,
    };
  }
  const leftRes = findSubTree(t1.left, t2, t2Height);
  if (leftRes.found) {
    return leftRes;
  }
  const rightRes = findSubTree(t1.right, t2, t2Height);
  if (rightRes.found) {
    return rightRes;
  }
  const depth = Math.max(leftRes.depth, rightRes.depth) + 1;
  return {
    depth: depth,
    found: (depth == t2Height) && isSameTree(t1, t2),
  }
}

function isSubTree(t1, t2) {
  const t2Height = calcHeight(t2);
}
