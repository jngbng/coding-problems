/*

track(int x)
getRankOfNumber(int x) => (x보다 같거나 작은 숫자들 갯수. 자기 자신은 재외. x는 실제로 track에 불린 적이 없어도 되는건가?)

주기적이라면 얼마나 주기적인지가 있나?
숫자 범위 정보는있나?

데이터는 어디까지 보장해야 하는거냐? 무한정 커질 수는 없는 노릇인데.

가장 간단한건 정렬된 상태로 유지되는 데이터 구조에 다 밀어 넣고
요청이오면 자기보다 작은 엘리먼트 갯수를 새야 한다.

요구사항을 정리해보면
- 일단 자기 보다 작은 애의 갯수를 빠르게 알 수 있어야 하고,
- x가 주어지면 x보다 같거나 작은 가장 큰 y를 빠르게 찾을 수 있어야 한다.


나보다 작은 애들이 다 있는 데이터 구조로는 heap이 있긴한데,
이건 가장 작은 큰 원소에 대해서만 보장하기 때문에 적합하지 않을 것 같다.

자식 노드에 대해서도 이 구조를 만족하는건 BST이다.

또는 sorted array, sorted linked list..

array는 중간 삽입이 너무 어렵다.

sorted linked list도 원하는 값 찾기가 어렵다.

그럼 tree가 되어얄 것 같은데..

bst인데, 자신을 포함한 트리의 크기를 저장하고 있는 bst를 만들면 어떨까.

또는 자신의 왼쪽 트리 크기.

둘의 차이는 크게 없는 듯 하다. 전자를 해도 후자는 쉽게 계산이 되기 때문이다.

BST에 x를 넣고는, 부모를 따라서 올라가면서 부모들의 크기도 1씩 증가하면 된다.

값을 찾을 때는 x 보다 같거나 작은 원소중 가장 큰 X를 찾은 후 왼쪽 자식 크기를 리턴하면 된다. 정말인가?

X <= x


P_l     P_r
     X
C_l     C_r


여기서 X를 찾았으면,

P_l < X
C_l <= X
X < P_r (등호는 X가 조건을 마족하는 가장 큰 x라서 발생 안함.)
X < C_r

라서 P_l, C_l 의 갯수를 새면 된다.

즉 부모 라인을 타고 가면서

왼쪽 부모일 때는 C_l + 1(P_l)을 하고
오른쪽 부모일 때는 아무 일도 안한다.


이렇게 하면 track는 평균적으론 O(log N)이나 worst case는 O(N)이 된다.
getRankOfNumber도 평균적으론 O(log N)이나 worst case는 O(N)이 된다.

둘 다 발란스 트리를 쓰면 O(log N)으로 할 수 있다.

별로 원하는 답은 아닐 것 같긴하다.


정렬 되어 있고, 자기보다 같거나 작은 갯수의 엘리멘트 갯수를 가진 데이터 구조.
정렬 상태를 유지하면서 추가하기가 쉬워야 하고


***************************************
혼란 요인
***************************************

자식을 기준으로 어떻게 부모로 타고 올라가야 하는 지 생각해서 머리가 복잡해졌는데, 루트에서 타고 내려가는걸 생각하면 훨씬 쉽다.

pre-order 순회를 해서

x 가 같으면 왼쪽 자식 크기
x 가 더 크면 왼쪽 자식 크기 + 1 + (오른쪽 재귀)
x 가 더 작으면 왼쪽 재귀.


왜 반대로 생각했지? 노드에서 시작한다는 조건을 가진 다른 문제를 최근에 풀어서 그 쪽으로 생각이 쏠린 것 같다.
*/


function track(root, x) {
  if (root == null) {
    return {
      data: x,
      left: null,
      right: null,
      size: 1,
    };
  }
  if (x <= root.data) {
    root.left = track(root.left, x);
  } else {
    root.right = track(root.right, x);
  }
  root.size++;
  return root;
}

function getRankOfNumberAux(root, x) {
  if (root == null) {
    return -1;
  }
  if (root.data == x) {
    return (root.left?.size || 0);
  } else if (root.data < x) {
    const rightRank = getRankOfNumberAux(root.right, x);
    if (rightRank == -1) {
      return -1;
    }
    return (root.left?.size || 0) + 1 + rightRank;
  } else {
    return getRankOfNumberAux(root.left);
  }
}

// 없으면 -1을 반환
function getRankOfNumber(root, x) {
  if (root == null) {
    return -1;
  }
  return getRankOfNumberAux(root, x);
}
