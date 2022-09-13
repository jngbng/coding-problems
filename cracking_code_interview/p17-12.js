/*
BiNode

as BST: node1 = left, node2 = right
as double linked list: node1 = prev, node2 = next

BST -> Double linked list로 변환. 값은 유지하고, in-place로 처리.

BST를 (left|right)-skewed BST로 변경한 후에 right|left -> root로 바꾸면 될 것 같긴하다.

in-place로 바꿀 때 주의할 점은

1. 특정 노드의 값이 다시 사용되기 전에 덮어쓰면 안된다.
2. 이미 변경이 완료된 부분과 변경 중인 부분을 구분할 수 있어야 한다.

left-skew로 만든다고 하면 그림을 그리면서 생각해보면

left를 left-skew로 만들고, 그 root를 root의 왼쪽 자식으로 만든다.
right를 left-skew로 만들고, 그 재일 왼쪽 자식에 root를 이어 붙이면 된다.

toLeftSkew(root) => (newRoot, leftTail)

[leftTail, leftRoot] = toLeftSkew(root.left)
[rightTail, rightRoot] = toLeftSkew(root.right)

*/

class BiNode {
  // Binode node1, node2;
  // int data;
}

function toLeftSkew(root) {
  if (root == null) {
    return null;
  }

  let leftRoot, leftTail;
  if (root.node1 != null) {
    [leftRoot, leftTail] = toLeftSkew(root.node1);
  }
  let rightRoot, rightTail;
  if (root.node2 != null) {
    [rightRoot, rightTail] = toLeftSkew(root.node2);
  }

  root.node2 = null;

  let newTail, newRoot;

  if (leftTail != null) {
    newTail = leftTail;
  } else {
    newTail = root;
  }
  if (leftRoot != null) {
    root.node1 = leftRoot;
  }

  if (rightTail != null) {
    rightTail.node1 = root;
  }
  if (rightRoot != null) {
    newRoot = rightRoot;
  } else {
    newRoot = root;
  }

  return [newRoot, newTail];
}

function toDoubleLinkedList(root) {
  if (root.node1 == null) {
    return root;
  }
  root.node1.node2 = root;
  return toDoubleLinkedList(root.node1);
}

/*
시간 복잡도는 toLeftSkew 가 모든 노드를 단 한번 방문하고, O(1)일을 수행하므로 O(N),
공간복잡도는 6 * depth 만큼의 메모리를 쓰므로 O(log N) 또는 O(N) 가 든다.

toDoubleLinkedList는 O(N)만큼의 일을 한다.

toLeftSkew는 안전한가?
주어진 root이하의 데이터만 접근한다.
sub root의 일이 끝날 때 까지 root는 변경되지 않는다.
최종 호출 후에 같은 sub-tree 데이터는 더 이상 순회에 사용되지 않는다. 
tail만 링크 업데이트이트에 사용되기는 함.
*/
