/*
BST가 주어지고 중복된 요소가 없을 때, 이 트리를 만들 수 있는 모든 가능한 배열.

반대로 뽑을 수 있는 방법의 수랑 같은 말일 것 같다.

  2
1   3

2 1 3
2 3 1

left 먼저 뽑고, right 뽑고, center를 뽑꺼나,

right 먼저 뽑고, left 뽑고, center를 뽑는다.

그런데 left를 다 뽑아야만 right를 뽑을 수 있는가?

그렇지는 않다.

그럼 생성을 기준으로 생각해보자.

1. 위 트리에서 반드시 최초에 넣어야 하는건 2이다.

2. 그 다음에는 1의 자식들과 3의 자식들이 배치되면 되는데
   1의 자식들과 3의 자식들 간의 순서 차이는 전혀 상관이 없다.


     4
  2    6
1  3  5  7

예제로 생각해보면 

4 는 무조건 고정이고
    3 1
  2 1 3
4 
  6 5 7
    7 5

4 2 1 6 3 5 7


그런데 왜 출력하라고 했을까?
이건 뭔가 어떤 특별한 방법으로 순회를 하면서 순회를 끝나는 시점에 출력할 수 있기 때문일 것 같다.

아하 prefix 랑 subtree list를 배열로 만들어서 넘기면 되겠다.
*/

function printBSTseqRecur(prefix, trees) {
  if (trees.length === 0) {
    console.log(JSON.stringify(prefix));
    return;
  }
  for (let i = 0; i < trees.length; ++i) {
    const tree = trees.shift();
    prefix.push(tree.data);

    if (tree.left != null) {
      trees.push(tree.left);
    }
    if (tree.right != null) {
      trees.push(tree.right);
    }
    printBSTseqRecur(prefix, trees);
    if (tree.right != null) {
      trees.pop();
    }
    if (tree.left != null) {
      trees.pop();
    }
    prefix.pop();
    trees.push(tree);
  }
}

function printBSTseq(tree) {
  printBSTseqRecur([], [tree]);
}

printBSTseq({
  data:2,
  left: { data: 1 },
  right: { data: 3 },
});


printBSTseq({
  data: 4,
  left: {
    data: 2,
    left: { data: 1 },
    right: { data: 3 },
  },
  right: {
    data: 6,
    left: { data: 5 },
    right: { data: 7 },
  }
});
