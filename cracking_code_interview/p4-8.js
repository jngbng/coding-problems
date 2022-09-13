/*
이진트리의 첫 번째 공통 조상.
자료 구조내에 추가로 노드 저장해 두면 안된다는 말은

각각의 노드에 대해서 각각 부모로 타고 올라가면서 부모 리스트를 만든 다음에
공통 요소를 찾는건 안된다는 말로 이해하겠다.

그럼 노드에 마크해두는건 되는가?
만약 이게 된다면 각각에 대해서 부모로 차근차근 올라가면서 마크해서
처음으로 두번 마크되는 노드가 있으면 그게 공통 조상이다.

물론 이것도 안된다고 해보자.

그럼 가장 간단한건 한 노드에 대해서, 다른 노드를 부모로 타고 올라가면서 그 노드가 나오는지 본다.
안 나오면 한 노드의 부모에 대해서 재귀로 동일한 시도를 한다.

그러면 이 시간 복잡도는 O(H1 * H2) 으로 H1, H2는 각 노드의 높이이다. 공간 복잡도는 O(1)이다.

아 노드의 부모는 알 수 있는건가?

아니면 root, node1, node2가 주어지는 건가? 
*/

// 부모를 아는 경우.
function findFirstCommonAncestor(nodeA, nodeB) {
  if (nodeA == null || nodeB == null) {
    return null;
  }

  let parentB = nodeB;
  while (parentB != null) {
    if (nodeA == parentB) {
      return nodeA;
    }
    parentB = parentB.parent;
  }
  return findFirstCommonAncestor(nodeA.parent, nodeB);
}

/* 
시간 복잡도를 더 줄일 수 있는가.
공통 조상의 특성을 생각하면

r
|
c
| \
a  \
    b

요런식으로 prefix가 공통으로 있을 수 밖에 없다.
a, b에 대해서 높이를 구한 다음에
높으를 같은 높으로 맞춰서 root로 차근차근 올라가면서 같은 root가 나올 때 리턴하면 되겠다.
*/

function calcHeight(node) {
  if (node == null) {
    return 0;
  }
  let height = 0;
  while (node != null) {
    node = node.parent;
    height++;
  }
  return height;
}

function moveUp(node, count) {
  while (count > 0 && node != null) {
    node = node.parent;
    count--;
  }
  return node;
}

function findFirstCommonAncestor2(nodeA, nodeB) {
  const heightA = calcHeight(nodeA);
  const heightB = calcHeight(nodeB);

  if (heightA > heightB) {
    nodeA = moveUp(nodeA, heightA - heightB);
  } else if (heightB > heightA) {
    nodeB = moveUp(nodeB, heightB - heightA);
  }

  while (nodeA != nodeB && nodeA != null && nodeB != null) {
    nodeA = nodeA.parent;
    nodeB = nodeB.parent;
  }
  if (nodeA == nodeB) {
    return nodeA;
  }
  return null;
}

/*
다른 방법은 parent를 알기 때문에 tree 순회를 하면 될 것 같다.
A를 기준으로 잡고, A를 포함한 트리에 B가 있는 지를 본다.

없으면 A의 부모에 대해서 부모가 B인지를 보고 아니면 sibiling에 대해서 검색을 한다.
sibling에서 발견하면 부모가 공통 조상.
아니면 이 과정을 순차적으로 올라간다.
*/


/*
노드가 부모를 모르는 경우는..

case1: 경우의 수는 공통 부모가 존재하는 경우

  x   
a  b

case2: 둘 중 하나가 공통 부모일 때

  b    a       a = b
a        b

case3: 공통 부모가 존재 안 할 때.



 둘 중 하나가 root 의 자식에 없는 경우.

인데

in-order로 순회하면서 recursive call로 호출하는데 반환 데이터가
{commonParent: null
 foundA: true/false
 foundB: true/false}

를 반환하게 한다.

left 호출해서 결과를 얻어서 commonParent != null 이면 그대로 리턴하고
foundA/foundB 면
   내가 B/A 인지 보고, 맞으면 리턴
   아니면 right 호출해서 결과 보고, foundB/foundA 면 내가 공통 조상
이것도 아니면
right에 대해서 재귀호출 후 결과 그대로 리턴.

*/

function findFCAAux(root, nodeA, nodeB) {
  if (root == null) {
    return {
      commonParent: null,
      foundA: false,
      foundB: false,
    };
  }
  const leftRes = findFCAAux(root.left, nodeA, nodeB);
  if (leftRes.commonParent != null) {
    return leftRes;
  }
  if (leftRes.foundA || leftRes.foundB) {
    if (root == nodeA || root == nodeB) {
      return {
        commonParent: root,
        foundA: true,
        foundB: true,
      };
    }
    const rightRes = findFCAAux(root.right, nodeA, nodeB);
    if (rightRes.foundA || rightRes.foundB) {
      return {
        commonParent: root,
        foundA: true,
        foundB: true,
      };
    }
    return leftRes;
  }
  const rightRes = findFCAAux(root.right, nodeA, nodeB);
  if (rightRes.commonParent != null) {
    return rightRes;
  }
  rightRes.foundA = rightRes.foundA || (root == nodeA);
  rightRes.foundB = rightRes.foundB || (root == nodeB);
  return rightRes;
}

function findFCA(root, nodeA, nodeB) {
  if (root == null) {
    return null;
  }
  if (nodeA == nodeB) {
    return nodeA;
  }
  if (nodeA == null || nodeB == null) {
    return null;
  }
  return findFCAAux(root, nodeA, nodeB);
}

// 코드를 좀 보기 좋게 정리하면

function findFCAAux(root, nodeA, nodeB) {
  if (root == null) {
    return {
      commonParent: null,
      foundA: false,
      foundB: false,
    };
  }
  const leftRes = findFCAAux(root.left, nodeA, nodeB);
  if (leftRes.commonParent != null) {
    return leftRes;
  }
  const rightRes = findFCAAux(root.right, nodeA, nodeB);
  if (rightRes.commonParent != null) {
    return rightRes;
  }

  // nodeA == nodeB 인 경우도 처리 가능.
  const foundA = leftRes.foundA || rightRes.foundA || (root == nodeA);
  const foundB = leftRes.foundB || rightRes.foundB || (root == nodeB);
  return {
    commonParent: (foundA && foundB) ? root : null,
    foundA: foundA,
    foundB: foundB,
  };
}

// 시간 복잡도는 노드 갯수 만큼 단 한번 순회하니깐, O(노드 수)이다.
// 공간 복잡도는 스택이 노드 깊이 만큼 내려갈 수 있으니 O(트리 높이)가 된다.
