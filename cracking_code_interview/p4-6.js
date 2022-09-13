/*
in-order successor

말을 정리하면 이진 탐색 트리가 주어지고,
난 그 중의 노드 하나를 아는데, 내 다음 노드를 리턴한다는거다.


     5
  2
1   3

조건은 left tree <= node < right tree 이다.

in-order 기준으로 생각해보면

내가 오른쪽 자식이 있다면, 그 트리의 가장 왼쪽 자식이고

없을 경우 부모로 올라가는데, 내가 부모의 왼쪽 자식이었다면 부모가 되고

내가 부모의 오른쪽 자식이었다면, 다시 재귀로 부모고 올라간다.

부모가 더 이상 없으면 다음 노드가 없으니 null이다.
*/

function leftMostNode(root) {
  if (root.left != null) {
    return leftMostNode(root.left);
  }
  return root;
}

function nextInOrder(node) {
  if (node == null) {
    return null;
  }
  if (node.right != null) {
    return leftMostNode(node.right);
  } else {
    let parent = node.parent;
    while (parent != null && parent.right == node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }
}

/*
그런데 이건 그냥 이진 트리에 적용되는 문제이다.
문제 조건에 이진검색트리라는 조건이 있는데, 이걸 활용할 수 있을까?

내가 left child 냐 right child 냐를 판단할 때 value로 할 수 있는가?

        41
     41
  40
    41

요런 트리가 있을 수 있는데 내가 잴 아래에 있으면 41이고.. 
내 부모 부터 시작해서 41 이상인 최초의 노드를 찾으면 된다.
딱히 성능 상 차이가 있는 지는 모르겠다.

성능은 노드의 갯수 N에 대해서 최악의 경우 전체를 한번씩 순회하므로 O(N) 이고 공간 복잡도는 O(1)이다.
*/
