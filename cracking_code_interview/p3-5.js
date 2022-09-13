const tap = require('tap');

/*
가장 작은 값이 위로 온다는게, 스택 중간에 있는 애를 스택 위로 올린다는 의미인가?
=> ㅇㅇ 

가장 작은 값이 여럿 있으면 가장 위에서 가까운 애만 가장 위로 올려도 되나?
=> ㅇㅇ

3.2의 minStack을 사용해서 min을 구한 다음에, 
min이 나올 때까지 팝해서 보조 스택에 옮긴다음에
min을 재외하고 다시 보조 스택에서 원래 스택으로 옮기고, (pop -> push)
마지막에 min을 원래 스택에 넣는다.


그게 아니었다. 작은 값이 위로 오도록 전체 값을 정렬하라는 의미였다.

스택은 하나만 더 쓸 수 있다. 배열이나 다른 자료 구조는 금지.


[ 1 1 2 3 2 ]

cur: 4

[5]

cur

[1 2 4 5]


*/


function testImpl(impl) {
  tap.test(`test ${impl.name}`, t => {
    // edge
    t.same([],impl([]));
    t.same([1],impl([1]));
    // ok
    t.same(impl([1, 3, 2]), [3, 2, 1]);
    t.same(impl([1, 3, 1, 2, 2]), [3, 2, 2, 1, 1]);

    t.end();
  });
}

// input [1, 3, 2]
// stack: [3]
// sortedStack: [2, 1]
// top: 1
// sortedStackTop: 3


function sortStack(stack) {
  const sortedStack = [];

  while (stack.length > 0) {
    const top = stack.pop();
    while (sortedStack.length > 0) {
      const sortedStackTop = sortedStack[sortedStack.length - 1];
      if (sortedStackTop <= top) {
        break;
      }
      stack.push(sortedStack.pop());
    }
    sortedStack.push(top);
  }

  while (sortedStack.length > 0) {
    stack.push(sortedStack.pop())
  }
  return stack;
}

testImpl(sortStack);
