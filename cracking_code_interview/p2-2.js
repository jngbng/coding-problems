/*
내 길이 N은 주어지나?
> 안 주어진다.

길이 N을 구할 수 있을 만큼 메모리에 존재하나?
> 이러면 할 수 있나? K가 매모리에 올릴만큼은 된다면, K만큼 끊어서 DISK에 저장해 나가다가, 끝을 만나면 값을 역산할 수 있다. 운 좋으면 마지막에 있을꺼고, 아니면 직전 청크에 있을꺼다.

k가 주어진 길이보다 짧다는건 보장이 되나?
> 알아서 체크


가장 간단한건
일단 전체 길이 N을 스캔해서 구하고, 다시 N-K개를 스킵해서 값을 리턴한다.
이러면 O(N)이다.
*/

function count(head) {
  let count = 0;
  if (head == null) {
    return count;
  }
  while (head != null) {
    count++;
    head = head.next;
  }
  return count;
}

function skip(head, skipCount) {
  while (head != null && skipCount > 0) {
    head = head.next;
    skipCount--;
  }
  return head;
}

function lastKth(head, k) {
  let totalLength = count(head);
  const skipCount = totalLength - k;
  if (skipCount < 0) {
    return null;
  }
  return skip(head, skipCount).value;
}

/*
전체를 스캔하지 않고 재귀로 푼다면.

- - - - - -, k

  - - - - -, k
*/

function revLength(head) {
  if (head == null) {
    return 0;
  } else {
    return 1 + revLength(head.next);
  }
}

// {found: true, value: value},
// {found: false, remainCount: k}
function lastKthAux(head, k) {
  if (head == null) {
    return {found: false, remainCount: k};
  }
  const result = lastKthAux(head.next, k);
  if (result.found) {
    return result;
  } else{ 
    result.remainCount--;
  }
  if (result.remainCount > 0) {
    return result;
  }
  return {
    found: true,
    value: head.value,
  };
}
  
function lastKth(head, k) {
  let result = lastKthAux(head, k);
  if (result.found) {
    return result.value;
  } else {
    return null;
  }
}


/*
k 길이만큼 떨어져서 뒤따라오는 포인터를 하나 더 관리하면 된다.
*/

function lastKthTwoPointer(head, k) {
  if (head == null) {
    return null;
  }
  let endCur = head;
  let targetCur;

  // skip k
  for (let i = 0; i < k; ++i) {
    endCur = endCur.next;
    if (endCur == null) {
      return null;
    }
  }
  targetCur = head;
  // proceed to end
  while (endCur != null) {
    endCur = endCur.next;
    targetCur = targetCur.next;
  }

  return targetCur.value;
}
