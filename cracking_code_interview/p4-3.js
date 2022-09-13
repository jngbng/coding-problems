/*
이진 트리는 헤드만 가진거다.
연결리스트의 순서는 왼쪽 끝부터 오른쪽 끝으로 하는거냐.
이건 원타임으로 만드면 되는거고, 추가/수정에 대해서 업데이트는 생각 안해도 되는거다.

traversal 을 변형해서 현재 depth를 가지도록 하고, depth에 맞는 연결 리스트를 뽑아서 거기다 추가해주면 될 것 같다.
in-/pre-/post-order 어느걸 써도 같은 depth에서는 왼쪽이 먼저 탐색되기 때문에 문제는 없겠댜.

또는 큐를 써서 BFS 전략으로 가도 될 것 같다.
top부터 시작해서 Queue에 <node, depth>를 넣고, 하나 꺼내서
연결 리스트를 만든 다음에, child들을 다시 큐에 넣는걸 반복하면 되겠다.
이렇게 하면 특정 depth는 한번에 만들어지고, next depth의 시작 element를 기록해두면 queue에 depth를 같이 안 넣어도 될 수 있겠다.

그리고 이게 random access를 줄일 수 있으니 나을 수도 있겠다.

가장 간단한 in-order 전략으로 짜보겠다.
*/

function buildSiblingArraysAux(root, depth, siblingArrs) {
  if (root == null) {
    return;
  }
  if (siblingArrs[depth] == null) {
    siblingArrs[depth] = [];
  }
  siblingArrs[depth].push(root);
  buildSiblingArraysAux(root.left, depth + 1, siblingArrs);
  buildSiblingArraysAux(root.right, depth + 1, siblingArrs);
}


function buildSiblingArrays(root) {
  if (root == null) {
    return null;
  }
  const siblingArrs = [];
  buildSiblingArrays(root, 0, siblingArrs);
  return siblingArrs;
}


/*
큐를 쓰는 방법을 좀 더 생각해보니, 굳이 큐로 안하고,
그냥 매 depth를 만들고, 그 결과로 다음 depth를 만들면 되겠다는걸 발견했다.
*/

function buildSilblingArrsByDepth(root) {
  if (root == null) {
    return null;
  }
  const siblingArrs = [[root]];

  let levelArrs = siblingArrs[0];
  let childArrs = [];
  while (levelArrs.length != 0) {
    for (const node of levelArrs) {
      if (node.left != null) {
        childArrs.push(node.left);
      }
      if (node.right != null) {
        childArrs.push(node.right);
      }
    }
    if (childArrs.length == 0) {
      break;
    } else {
      levelArrs = childArrs;
      childArrs = [];
    }
  }
  return siblingArrs;
}
