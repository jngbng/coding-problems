/*
가장 단순한건 손으로 하듯이 순회를 하면서 계산을 하면서 리스트를 만들어 내는거다.
여기서 주의할 포인트는 carry 를 적절히 관리하는 거고, 마지막에 carry만 남았을 때 잊지않고 1 노드를 만들어 주는거다.

빈 리스트는 0으로 처리하는거냐? 에러인거냐? 에러로 처리하겠다.

base는 10으로 가정하면 되고, 데이터는 모두 올바르게 들어온다 가정하겠다.

음수는 없다고 가정하겠다. 사인 부호가 있진 않다.

O(MAX(리스트 길이))의 시간이 들고 공간 복잡도는 결과물에 소모되는 용량인 O(리스트 길이) 이다.

이건 재귀 호출 문재로 볼 수 있는데

*/

function sumReverted(listA, listB, carry) {
  if (listA == null && listB == null && carry == 0) {
    return null;
  }
  const sum = (listA?.data || 0) + (listB?.data || 0) + carry;
  const digit = sum % 10;
  const nextCarry = Math.floor(sum / 10);

  return {
    data: digit,
    next: sumReverted(listA?.next, listB?.next, nextCarry),
  };
}

function sumRevertedHelper(listA, listB, hasCarry) {
  return sumReverted(listA, listB, 0);
}


/*
sumReverted 에서 한쪽에 null이 판명 되었을 때는 좀 더 최적화해서 빠르게 만들 수 있겠다.
*/

const ll = require('./ds/linkedList.js');

//console.log(ll.toArray(sumRevertedHelper(ll.fromArray([1, 2, 3]), ll.fromArray([9, 9, 8]))));


/*

자릿수가 정상적이다.
그럼 일단 앞에서 부터 더할 수 있는지를 생각해보면... 그건 불가능하다.
뒤에 캐리비트가 생기면 그 결과로 앞의 결과들을 다 바꿔야 할 수 있기 때문에,
최악의 경우 n^2 가 나올 수 있다.

결국 뒤에서부터 더해와야 할 것 같은데..

가장 쉬운건 숫자를 다 배열로 옮기고 더해서 다시 리스트로 만드는거다.

이러면 공간 시간 모두 O(max(리스트 길이))로 나온다.

스택을 둘 만들어서 각각의 스택에다 다 집어 넣고.

하나씩 뽑으면서 위에 로직과 동일하게 할 수 있다.

구현은 생략하겠다.

aaaaaaaaaaaaaa
bbbbbbbb


스택은 하나만 만들고, 하나는 recursive call을 이용해서 callstack을 이용해서 풀 수도 있겠지만,
코드가 쉽지도 않고, callstack은 메모리를 더 많이 소모하기 때문에 별로 좋진 않은 것 같다.
stackoverflow 문제도 예측하기 힘들고.

스택 자체를 안 쓰고 recursive call로 굳이 풀라고 한다면...

일단 문자열 길이가 다르면 구현이 복잡해지는 단점이 있다.

일단 앞에 0을 채워넣어서 길이를 맞추고 recursive call로 리스트 끝에서 합쳐 나오는 방식으로 풀 수 있겠다.

각각의 길이를 잰다.
차이 만큼 짧은 함수에 0 패딩을 붙인다.
길이가 같은 두 리스트를 합한다.
*/


function sumEqual(listA, listB) {
  if (listA == null) {
    return [0, null];
  }
  if (listB == null) {
    throw new Error("length mismatch.");
  }
  const [carry, nextNode] = sumEqual(listA.next, listB.next);
  const sum = carry + listA.data + listB.data;
  const nextCarry= Math.floor(sum / 10);
  const digit = sum % 10;
  return [nextCarry, {data: digit, next: nextNode}];
}

function sumEqualHelper(listA, listB) {
  // TODO: add padding and make sure that both of list has the same length.
  
  const [carry, head] = sumEqual(listA, listB);
  if (carry == 0) {
    return head;
  }
  return {data: carry, next: head};
}
