/*
단방향 연결리스트가 주어진다. -> head가 주어진다는 말인가?
중간에 있는 노드. 처음과 끝이 아닌 어떤 노드.
삭제할 노드에만 접근할 수 있다. -> 지울 노드가 입력이라는 말이다.

여기서 문제는 prev를 알아야 prev->next = cur->next 를 할 수 있는데, prev를 모른다는 상황이다.

재일 간단한거는 안에 있는 값들을 다 땡겨와서 복사한 다음에 마지막 tail을 삭제하는 방법이다.
이러면 O(N)의 시간이 걸린다.

*/


function slideDelete(node) {
  // 끝인지 여부는 node->next == null 인가로 한다.

  let cursor = node;
  while (true) {
    // next is tail?
    if (cursor.next.next == null) {
      cursor.value = cursor.next.value;
      cursor.next = null;
      break;
    } else {
      cursor.value = cursor.next.value;
      cursor = cursor.next;
    }
  }

  // while cursor.next is cursor
  while (cursor.next.next != null) {
    cursor.value = cursor.next.value;
    cursor = cursor.next;
  }
  // prev-tail
  cursor.value = cursor.next.value;
  cursor.next = null;

  
  
  // 입력이 tail은 아니니
  // a -> b -> nil
  // 
  // c -> b -> a -> nil
  // b    a
}

/*
전체를 복사할 필요는 없었다. 한 단계만 해도 됬었다.
다음거 값을 나에게 복사하고 다음껄 지우면 된다.
*/

function deleteNode(node) {
  if (node == null || node.next == null) {
    throw new Error('invalid input');
  }

  const nextNode = node.next;
  node.value = nextNode.value;
  node.next = nextNode.next;

  // For garbage collection
  nextNode.value = 0;
  nextNode.next = null;
}
