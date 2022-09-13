const tap = require('tap');

/*
동일한 지는 == 로 비교할 수 있다고 생각하면 되나?
길이는 미리 알 수 있나?
길이가 메모리에 들어갈 정도로 큰가?

인터페이스는 data, next 가 있다고 보면 되나?

가장 쉬운건 앞에서부터 순회하면서 등장하는 원소들을 set으로 넣으면서, 중복이 발견되면,
그 노드를 제거해 나가는 방식으로 하면 되겠다.
*/

// function dedupLinkAux(head, knownSet) {
//   if (head == null) {
//     return head;
//   }
//   if (knownSet.has(head.value)) {
//     return dedupLinkAux(head.next, knownSet);
//   }
// }

// function dedupLink(head) {
//   return dedupLinkAux(head, new Set());
// }

function dedupLink(head) {
  if (head == null) {
    return null;
  }
  const knownSet = new Set([head.value]);

  let prevNode = head;
  let node = head.next;
  while (node != null) {
    if (knownSet.has(node.value)) {
      // delete node
      prevNode.next = node.next;
      node = node.next;
    } else {
      knownSet.add(node.value);
      prevNode = node;
      node = node.next;
    }
  }
  return head;
}

/*
임시 버퍼를 사용할 수 없다면? 
정렬을 할 수 없다는 의미일 것 같고. 모든 원소에 대해서 나머지를 다 봐야 하니깐 O(n^2) 를 해야지 않을까?
*/


function removeAll(head, value) {
  // returns head of linked list all occurance of value removed.
  if (head == null) {
    return head;
  }
  if (head.value == value) {
    return removeAll(head.next, value);
  } else {
    head.next = removeAll(head.next, value);
    return head;
  }
}

function dedupLinkSpaceOne(head) {
  if (head == null) {
    return null;
  }
  head.next = dedupLinkSpaceOne(head.next);
  removeAll(head.next, head.value);
  return head;
}

function dedupSpaceOneIter(head) {
  if (head == null) {
    return head;
  }
  let scanCur = head;
  while (scanCur != null) {
    const dedupValue = scanCur.value;
    let dedupPrev = scanCur;
    while (dedupPrev.next != null) {
      if (dedupPrev.next.value === dedupValue) {
        dedupPrev.next = dedupPrev.next.next;
      } else {
        dedupPrev = dedupPrev.next;
      }
    }
    scanCur = scanCur.next;
  }
  return head;
}
