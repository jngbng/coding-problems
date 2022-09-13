/*
입력은 x인데 정수라고 봐도 되나.
주어지는 링크트 리스트의 정보는 아는게 있나? 값의 범위라던가.
모른다고 하자.

가장 간단한건 처음부터 가면서 >=x인 값을 만나면 재일 뒤로 보내는거다.
이렇게 했을 때 끝을 미리 알 수 없다면 순환 문제에 빠지게 된다.
그래서 전체를 스캔해서 길이를 알아 낸 다음에 n만큼만 순회한다.

또 다른 까다로운 점은 head가 바뀔 수 있다는거다.

이거 newHead를 반환해도 되나?
=> no

node안의 값을 바꿔도 되나?
=> yes

이건 최초 순회할 때 head에 넣을 수 있는 값을 하나 찾아서 순서를 바꿔 해결할 수 있겠다.

요약하면 head.next에서 시작해서 값이 >= x인 값은 재일 뒤로 보내는걸 반복한다. (재일 뒤 포인터가 필요하다.)

x < 인 경우 포인터를 한칸 씩 뒤로 가는데, 최대 이동 횟수를 리스트 사이즈 n으로 재약한다.

더 좋은 방법이 있나?

재일 작은 애를 재일 처음에 가져오려고 하니 문제가 약간 복잡해지는 것 같다.

첫번째 것 다음부터 문제를 풀고, 마지막에 처음 문제를 풀면 좋겠다.

*/

function partitionAux(prev, cursor, tail, value, size) {
  if (size <= 1) {
    return tail;
  }
  if (cursor.data < value) {
    return partitionAux(cursor, cursor.next, tail, value, size - 1);
  }
  prev.next = cursor.next;
  tail.next = cursor;
  cursor.next = null;
  return partitionAux(prev, prev.next, cursor, value, size - 1);
}

function findSizeAndTail(head) {
  if (head == null) {
    return [0, head];
  }
  let tail = head;
  let size = 1;
  while (tail.next != null) {
    tail = tail.next;
    size++;
  }
  return [size, tail];
}

function partition(head, value) {
  // null or size 1
  if (head == null || head.next == null) {
    return head;
  }
  const [size, tail] = findSizeAndTail(head);
  const newTail = partitionAux(head, head.next, tail, value, size - 1);

  //console.log(head, newTail);
  
  if (head.data < value) {
    return head;
  }

  const nextNode = head.next;
  // swap head/next
  const tmp = nextNode.data;
  nextNode.data = head.data;
  head.data = tmp;

  if (nextNode != newTail) {
    head.next = nextNode.next;
    newTail.next = nextNode;
    nextNode.next = null;
  }

  return head;
}

/*
테스트 한다면
[]
[10] 5
[1] 5

[10 1] 5
[1 10] 5

[1 5 5 1] 5
*/

const ll = require('./ds/linkedList.js');
//console.log(ll.toArray(ll.fromArray([1,3,2,3])));
console.log(ll.toArray(partition(ll.fromArray([10, 3, 10, 1, 2]), 5)));
//console.log(ll.toArray((partition(ll.fromArray([1,3,2,3]), 2))));


/*
답안을 보고 난 후.

smaller, bigger 리스트 둘을 나누어 그쪽으로 다 옮긴 후 다시 합치는 작업을 한다.
이거를 생각 안했던거는 2N 만큼의 위치 이동이 생기기 때문에 코스트가 너무 크다고 무의식으로 생각한 것 같다.

그리고 head를 안 바꾸려고 했기도 하고.

*/
