/*
루프 찾기.

일단 node에 mark를 할 수 있다면 문제가 아주 쉽다.
마크하면서 진행해서 최초로 발견하는 이미 마크된 노드가 싸이클의 시작이다.

마크를 못하지만 set을 쓸 수 있다면, next로 진행해 나가면서 parent set에 node들을 다 집어넣으면서

첫번째로 발견하는 노드가 싸이클의 시작이다. 이건 O(노드길이) 의 시간 복잡도와 O(노드 길이)의 공간 복잡도가 든다. 셋에 넣는 시간을 O(1)로 잡았는데, 보수적으로 잡으면 O(log N)이어서 전체 시간 복잡도는 O(N long N)으로 잡을 수도 있겠다.

공간 복잡도를 O(1)으로 잡아야 한다면...

싸이클의 특성을 이용해서 빠르게 진행하는 커서와 느리게 진행하는 커서를 이용해서 빠르게 진행하는 커서와 느리게 진행하는 커서가 만나는 점을 이용해 찾을 수 있겠다.

하나는 2씩 증가하고 하나는 1씩 증가하도록 만들면

싸이클이 있다면 언젠가 이 두 커서는 만난다.

매 턴 마다 두 커서의 간격은 1씩 증가하기 때문에,

왜냐면 싸이클의 길이가 K라고 했을 때, K번 안에는 두 커서의 간격이 K가 되는 순간이 한번은 존재하게 되고 그 때 두 커서는 겹친다.

그러면 일단 싸이클 안의 포인트 하나를 찾을 수 있는데, 이제 최초의 포인트를 어떻게 찾냐를 풀면 된다.

                <-------- 찾음.
1 -> 2 -> 3 -> 4 -> |
          ^         |
          |         |
          6 <- 5 <- |


에서 4를 발견했다고 하면, 최초 시작 지점은 head와 4 사이에 존재한다.

가장 무식한 풀이법은 4 노드에서 시작해서 싸이클의 길이 K를 알아 낸다. (node.next == node 4 로 찾을 수 있다.)

그리고 head부터 시작해서 K 만큼 뒤에 있는 노드 headK를 구한다.

그리고 head == headK 가 될 때 까지 둘을 차례대로 증가 시킨다.

이러면 반드시 싸이클이 시작되는 첫번째 노드에서 멈추게 된다.

이러면 시간 복잡도는 첫번쨰 노드를 찾는데 O(N)이 걸리고..

왜냐면 N-K 스탭 뒤에, K 번 안에 반드시 겹치는 지점을 찾게 되니깐.

싸이클의 길이를 알아내는데 O(K)가 걸리고,

최초 지점을 찾는데 O(N-K) 가 걸리니깐 총 시간은 O(N)이 걸리고, 공간 복잡도는 O(1)이다.
*/

function findSomeCycleNode(head) {
  if (head == null) {
    return null;
  }
  if (head.next == null) {
    return null;
  }
  if (head.next == head) {
    return head;
  }
  let slow = head;
  let fast = head.next;
  while (slow != fast && fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (slow == fast) {
    return slow;
  }
  return null;
}


function calcCycleSize(cycleNode) {
  let size = 1;
  let node = cycleNode.next;
  while (node != cycleNode) {
    node = node.next;
    size++;
  }
  return size;
}

function skip(head, count) {
}

function findCycleHead(head) {
  if (head == null) {
    return null;
  }

  const cycleNode = findSomeCycleNode(head);
  if (cycleNode == null) {
    return null;
  }
  const cycleSize = calcCycleSize(cycleNode);

  let fast = skip(head, cycleSize);
  let slow = head;
  while (slow != fast && slow != null && fast != null) {
    slow = slow.next;
    fast = fast.next;
  }
  if (slow == null || fast == null) {
    throw new Error("never happen");
  }
  return slow;
}
