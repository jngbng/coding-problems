/*
이진 탐색 트리의 조건을 명확히 해야 한다.
left <= node < right 가 맞나?
node에 있는 value의 타입은 뭔가? 범위는 integer로 보면 되나?

개념적으로 생각하면 max(leftTree) <= node < min(rightTree) 를 모든 노드에서 체크하면 된다.

이러면 O(n^2) 의 시간 복잡도가 생긴다.

왼쪽 검사 결과 max를 리턴한다고 생각하고 오른쪽 검사할 때는 인자로 node값을 줘서 이 값 보다 큰지를 검사하면 되겠다.

즉 검사 함수는 minExcl(or null)을 인자로 받아서 이진 트리인지를 체크하고 이진 트리가
- 맞으면 해당 이진 트리의 max 값을 반환하고,
- 아니면 null을 반환하자.
null tree는 애초에 호출을 하지 말자.

조금 더 생각해보니 child에 대해 검색할 때 maxIncl로 내 node도 넣을 수 있겠다.

*/

function checkBstAux(root, minExcl, maxIncl) {
  if (root == null) {
    return true;
  }
  if (minExcl != null && root.value <= minExcl) {
    return false;
  }
  if (maxIncl != null && root.value > maxIncl) {
    return false;
  }
  return checkBstAux(root.left, minExcl, root.value)
    && checkBstAux(root.right, root.value, maxIncl);
}

function checkBst(root) {
  return checkBst(root, null, null);
}

/*
시간 복잡도는 매 노드를 정확히 한번만 방문하므로 O(N), N:노드 수 dlrh
공간 복잡도는 O(H), H: 노드 깊이 이다.
*/
