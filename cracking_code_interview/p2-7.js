/*
교집합.

reference가 동일하다면 짧은 쪽인 애가 긴 쪽의 suffix 가 될 수 밖에 없다.

그럼 간단하게 생각하면

두 리스트의 길이를 재서,

짧은 쪽 리스트의 head가 긴쪽의 (긴 리스트 길이 - 짧은 리스트 길이) 번째 노드 인지를 채크하면 된다.

시간 복잡도는 next 오퍼레이션의 갯수를 생각하면 O(N + M) 이다.

다른 방법으로는

aHead, bHead를 관리하면서

둘 중 하나가 끝에 도달할 때 까지 next해 나가다가 한쪽이 끝나면,

안 끝난 쪽 head와 안 끝난 쪽 cursur 쌍을 가지고 다시 끝가지 가게 해서 대상 노드를 찾는다.

그리고 먼저 끝난 쪽 해드와 대상 노드를 비교한다.
*/

/*
아 짧은 노드 전체가 긴 노드에 들어가는 상황은 아님.

만약 답이 있다면

b1 -> b2 -> ...         ->  b_j -> ... 
                            ^
                            |
a1 -> a2 -> ... -> a_(i-1) -|

인 상황이다.


가장 간단한건 a1의 재일 끝과 b2의 재일 끝 노드에서 순차적으로 비교하면서 앞으로 돌아오는건데

단방향 연결리스트라서 그런 못한다.

*/

function len(head) {
  // fill
}

function skip(head, count) {
  // fill
}

function findCommonNodeAux(head1, head2) {
  if (head1 == null || head2 == null) {
    return null;
  }
  if (head1 == head2) {
    return head1;
  } else {
    return findCommonNodeAux(head1.next, head2.next);
  }
}

function findCommonNode(head1, head2) {
  const [len1, tail1] = len(head1);
  const [len2, tail2] = len(head2);

  const diff = len1 - len2;
  const longHead = (diff > 0) ? head1 : head2;
  const shortHead = (longHead == head1)? head2 : head1;

  if (tail1 != tail2) {
    return null;
  }
  
  const candidate = skip(longHead, Math.abs(diff));

  return findCommonNodeAux(candidate, shortHead);
}
