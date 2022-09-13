
/*
양수 및 음수라고 했으니 0은 없는건가?
*/

function countPath(root, sum) {
  if (root == null) {
    return 0;
  }

  let count = 0;
  const remainSum = sum - root.data;
  if (root.data == sum) {
    count++;
  }

  return count
  // 자식에서 다시 시작하는 패스
    + countPath(root.left, sum) + countPath(root.right, sum)
  // 이어서 찾는 패스 -> 즉 내지점을 포함해서 sum이 되는 케이스.
    + countPath(root.left, remainSum) + countPath(root.left, remainSum);
}

/*
위 방식은 중복이 너무 많다...나?
root.left 로 내려갈 때 sum, remainSum 으루 두번 불리는데, 이걸 부모의 재귀 호출도 생각하면 여러 값으로 여러번 불릴 수 있다.

root에서 tail 까지 경로를

1 -> 3 -> 4 -> -2 -> 3

라고 하면 검사 해야 하는건 임의의 모든 구간인 상황이다.

즉 합이 M이 되는구간의 갯수가 몇개냐의 문제이다.


어떤 구간이 완성이 되었을때,

뒤에 3 -> -3 같은 구간이 있으면 더 생길 수도 있다.

아 그러면 내려갈 때 원하는 값 셋을 가지고 내려가면 한번의 순회로 횟수를 다 샐 수 있지 않을까?

셋이라서 여러번 새야 하는게 한번 카운트 되는 문제가 생길 수 있을까?


1 -> 3 -> 4 -> -2 -> 3 -> 1

에서 4 라고 하면

   1 -> 3 -> 4 -> -2 -> 3 -> 1

{4}
   {3,4}
        3 찾음
          {0,1,4}
             4 찾음
               {-4, -3, 0, 4}
                     {-2, -1, 2, 6, 4}
                          {-5,-4,-1,3,1,4}
                             1 찾음.

3회.

sum과 기존에 expected set이 주어지면

expected set에 내가 있으면 1 증가.

자식 호출로
expected set 각각에 내 값을 빼고, sum을 추가.

중복 되는게 있으면?

{4} -> 1 -> {3, 4} -> -1 -> {4, 5, 4?} -> 4 

2번 새야 하니깐 set 이 아니라 list 여야하네. 아니면 map 이던가.
*/


/*
내가 구현한거는 정답 예시와 코드가 다르다.

정답지에서는 이어서 찾는 패스를 countPathsWithSumFromNode로 뺐는데,
난 이 둘이 하나의 함수로 합쳐져있다.

함수의 정의를 생각해보면 root 아래에 sum이 되는 경로의 총 갯수인데,
이 정의대로라면 맞는 것 같긴한데...? 그런데 좀 이상하다.

아 내 꺼는 이게 끊고 아래에서 시작하는 경우가 재귀 호출인데,
remainSum으로 부를 때는 반드시 root에서 시작하면서 길이가 remainSum을 샐꺼라고 가정하고 있다!!

*/

function countPathFromNode(root, sum) {
  if (root == null) {
    return 0;
  }
  let count = 0;
  const remainSum = sum - root.data;
  if (remainSum == 0) {
    count++;
  }
  return count
    + countPathFromNode(root.left, remainSum)
    + countPathFromNode(root.right, remainSum);
}

function countPath(root, sum) {
  if (root == null) {
    return 0;
  }

  // 내지점에서 시작해서 sum이 되는 케이스.
  let count = countPathFromNode(root.left, sum);

  return count
  // 자식에서 다시 시작하는 패스
    + countPath(root.left, sum) + countPath(root.right, sum);
}

/*
시간 복잡도는
coutPath가 2번 재귀호출 되지만 깊이는 log_2 N 이니깐 2^(log_2 N) 이라서 N이다.

매 노드에서 하는 작업은 모든 자식을 한번씩 순회하니깐 N 이다.

root에서는 N 개의 노드가 있고

left/right child 아래에는  (N-1)/2에는 개의 노드가 있다.

N + 2 * (N-1)2 + 4((N-1)/2 -1)/2

N + (N - 1) + (N - 3) .. 

그럼 대략 Sum (N - (2^i -1)) 이고 i 는 대략 logN

N * log N - (N - log N) 이니깐 N * log N.


한 노드가 countPathFromNode에 의해 몇번 불리는지 생각해보면

깊이가 H에 있는 애는 H번 불린다. H = log N 이고, 노드가 N개 있으니 N log N.

실제로는 더 작을 수 있다.
*/


/*
여기서 계산의 중복을 생각해보면,

1 -> -1 -> 2 -> -2 -> 4 -> 5

패스가 있을 때

countPathFromNode 가 매 노드에서 시작하는데

항상 끝까지 더하면서 살펴보는 작업이 반복된다.

물론 매번 목표 값이 달라지긴 한다.

즉 한 sum(i, target) 쌍이 여러번 불릴 수 있다.

위 예제에서 countPathFromNode(node(4), X)는 3번 불린다.
(node i 일 때 node 2일 때 node 4 일 때.)

그래서 이걸 캐시하면 계산량은 줄일 수 있을 것 같다.

i ~ j 까지의 합은 sum(i) - sum(j) 이다. 이건 똥 아이디어.

매 root - tail path에서 저걸 활용하려고 하니 prefix path 쪽에 있는 결과는 반복적으로 새지는 문제가 있다.
아 그럼 i에서 시작한다는 조건을 넣으면 되는거 아닌가. 그럼 내 자식 길이만큼만 순회하면 된다..?

아 좀 더 심플하게 매 노드가 자기에서 시작해서 만들 수 있는 path 길이별 횟수를 들고 있으면 되겠다.

결국 그게 위에 거랑 같긴하다.

정리하면 


이거를 적용했을 때 시간 복잡도?

cache가 채워지면 값을 계산하는건 root에서 바로 끝난다.

그러면 cache를 채우는 시간 복잡도가 얼마냐라는 문제인데,

root에만 채우면 되고, root를 채우기 위해선 자식을 들을 각자 채운 다음 합치면 된다.

자식들 각자 채우는데 매 노드에서 합치는데 드는 코스트는 O(entries) 인데 이건 최대 O(N)인데 자식으로 가면 사이즈가 N/2씩이니깐 전체는 O(N)이 된다!

공간 복잡도는 테이블의 크기니깐 O(N)이 된다.

그런데 child로 스킵해서 호출하는 경우가 있으니 child에도 이 테이블이 필요하다.

그런데 정말 다 유지할 필요 있을까? child에서 쓰인건 root에서는 다시는 안 쓰이고,
child의 cache table을 알면 부모의 cache table은 바로 만들 수 있다.

즉 post-order 순회를 하면서 풀 수 있을 것 같다.

count(tree, target) => (count, sumCountTable) 를 반환도록 하면 되겠다.

이렇게 하면 공간/시간 복잡도는 O(N)이 된다.

*/

function inc(map, key, sum) {
  map.set(key, (map.get(key) || 0) + sum);
}

function countSmart(tree, target) {
  if (tree) {
    return [0, new Map()];
  }
  const [leftCount, leftMemo] = countSmart(tree.left, target);
  const [rightCount, rightMemo] = countSmart(tree.right, target);

  const myMemo = new Map();
  myMemo.inc(myMemo, tree.data, 1);
  for (const [sum, count] of leftMemo.entries()) {
    inc(myMemo, sum + tree.data, count);
  }
  for (const [sum, count] of rightMemo.entries()) {
    inc(myMemo, sum + tree.data, count);
  }

  const myCount = myMemo.get(target) || 0;

  return [leftCount + rightCount + myCount, myMemo];
}


/*

답안과 비교해보면 난 top에 갔을 때 불필요한 hash table을 많이 들고 있게 된다.

root 입장에서 필요한 컬럼은 target 뿐인데, 나머지도 다 계산을 해버리기 때문이다.

bottom 입장에서 

*/
