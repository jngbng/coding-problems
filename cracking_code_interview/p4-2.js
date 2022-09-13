/*
1 2 3 4
distinct
높이가 최소 이진 탐색.

높이가 최소가 되려면 완전 이진 트리가 되어야 할 것 같다.

이진 트리 조건은 같은건 왼쪽 <= 노트 < 오른쪽 이 맞다고 보면 되냐.

가장 간단한건 중간값을 잡아서 루트로 잡고,
왼쪽은 재귀적으로 트리를 만들어서 왼쪽 자식으로
오른쪽은 재귀적으로 트리를 만들어서 오른쪽 자식으로 만들면 된다.

배열은 크기가 미리 안다고 해도 되나?

배열은 인메모리로 주어지나?

그렇다면 배열의 크기로 complete binary tree를 만든 다음에
in-order로 순회하면서 값을 순차적으로 초기화 하는 방법도 있겠다.

어느 방법으로 해도 중복이 없다는 조건 때문에 이진 트리 조건을 만족할 수 있다.

O(N)으로 가능. N은 배열 크기

*/

class Node {
  // int value;
  // Node left;
  // Node right;
  constructor(value = null, left = null, right = null) {
    this.value = value;
  }
}

function toBSTAux(arr, fromIdxIncl, toIdxIncl) {
  if (fromIdxIncl > toIdxIncl) {
    return null;
  } else if (fromIdxIncl == toIdxIncl) {
    return new Node(arr[fromIdxIncl]);
  }
  const size = toIdxIncl - fromIdxIncl;
  const midIdx = Math.floor((fromIdxIncl + toIdxIncl) / 2);
  const root = new Node();
  root.value = arr[midIdx];
  root.left = toBSTAux(arr, toIdxIncl, midIdx - 1);
  root.right = toBSTAux(arr, midIdx + 1, toIdxIncl);
  return root;
}

function toBST(sortedArr) {
  return toBSTAux(sortedArr, 0, sortedArr.length - 1);
}

function createCompleteBst(size) {
  // 짜투리 추가하기가 어렵다. 하려면 b-tree 처럼 같은 level의 sibiling link가 있어야 한다.
}

function inOrder(root, visitFn) {
  if (root == null) {
    return;
  }
  visitFn(root);
  inOrder(root.left, visitFn);
  inOrder(root.right, visitFn);
}

function toBST2(sortedArr) {
  const root = createCompleteBst(sortedArr.length);
  //let i = 0;
  // const it = sortedArr.entries();
  inOrder(root, function (node) {
    //node.value = sortedArr[i++];
    //node.value = it.next().value[1];
  });
  return root;
}
