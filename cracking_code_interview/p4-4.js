/*
balanced check
모든 노드에 대해서 높이 차이가 최대 하나.
이건 트리를 재귀적으로 순회하면서 왼쪽과 오른쪽의 높이를 구해서 차이가 1 이하면 max(depth) 아니면 -1을 반환하는 순회를 하면 될 것 같다.

        1
      1   1
    1  2    1
   1

요거 되는건데 저기서 2가 빠지면 안된다.
*/


function isBalanced(root) {
  if (root == null) {
    return 0;
  }
  const leftDepth = isBalanced(root.left);
  if (leftDepth == -1) {
    return -1;
  }
  const rightDepth = isBalanced(root.right);
  if (rightDepth == -1) {
    return -1;
  }
  if (Math.abs(leftDepth - rightDepth) > 1) {
    return -1;
  }
  return Math.max(leftDepth, rightDepth) + 1;
}

function isBalancedMain(root) {
  return isBalancedMain(root) >= 0;
}

/*
이건 전체 노드에 대해서 다 도는 알고리즘이라, 노드 수가 N이라고 했을 때
시간 복잡도 O(N)의 알고리즘이다.
공간 복잡도는 높이를 H라고 했을 때 O(H)이다. H는 입력에 따라 다른데 worst는 O(N)이고 average는 O(log N)이다.
*/
