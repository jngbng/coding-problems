/*
대소문자 구분 있음.
공백은 일반 문자로 취급
으로 하겠다.

재일 간단한건 array 복사 후 분석인데, 당연히 이걸 원하는건 아닐꺼다.

스택을 써도 되나?

중간지점을 찾아서
중간이전까진 스택에 다 넣고
하나씩 뽑아가면서 다음 원소와 검사하면 된다.

스캔 포인트를 두개를 둬서

midIndex를 하나씩 이동할 때 마다 endIndex는 두개씩 이동하면

endIdx가 끝에 도달했는 지 여부로 midIndex를 구할 수 있다.

그 시점까지 계속 스택에 값을 넣어오다가,

midIndex 시점 부터 뽑으면서 비교하면 되겠다.

구체적으로는 길이가 홀수냐 짝수냐에 따라서 하나를 쉬프트 해야는지 여부를 알 수 있겠다.

이걸 추가 스택을 쓰지 않고 recursive call로만 구현하려면..

recursive call은 length / 2 지점까지 발생해야 하고,

i 번째 콜에서는  next call로 부터 (length - i) 번째 노드를 반환해서 비교를 할 수 있어야 하고,
(length - i + 1) 노드를 반환하면 된다.

짝수인 경우를 생각해보면

1  2  3  4
head

*/


// odd는 전체 리스트가 홀수 인가?
// midNode는 정 중앙 또는 중앙 다음 노드
function checkPalindromListAux(head, midNode, odd) {
  if (head == midNode) {
    if (odd) {
      return [true, midNode.next];
    } else {
      return [true, midNode];
    }
  }
  const [isPalindrom, nodeToCompare] = checkPalindromListAux(head.next, midNode, odd);
  if (isPalindrom == false) {
    return [isPalindrom, nodeToCompare?.next];
  } 
  return [head.data == nodeToCompare.data, nodeToCompare?.next];
}

// 정 중앙 또는 뒤쪽 리스트의 시작.
function countAndFindMidNode(head) {
  // todo:
  if (head == null) {
    return [0, head];
  }
    
  let tail = head;
  let count = 1;
  while (tail.next != null) {
    tail = tail.next;
    count++;
    if (tail.next != null) {
      tail = tail.next;
      count++;
    }
    head = head.next;
  }
  return [count, head];
}


function checkPalindromList(head) {
  const [length, midNode] = countAndFindMidNode(head);

  if (length == 0) {
    return true;
  }
  
  return checkPalindromListAux(head, midNode, length % 2 == 1)[0];
}

const ll = require('./ds/linkedList.js');

console.log(checkPalindromList(ll.fromArray([1, 2, 3, 4])));
console.log(checkPalindromList(ll.fromArray([1, 2, 2, 1])));
console.log(checkPalindromList(ll.fromArray([1, 2, 1])));
console.log(checkPalindromList(ll.fromArray([1, 1])));
console.log(checkPalindromList(ll.fromArray([1, 2])));
console.log(checkPalindromList(ll.fromArray([2])));

/*
답안 보니 더 무식하게 다 뒤집에서 비교하는 방법을 언급하는데, 그걸 빠트렸다.
*/
