/*

w_i, h_i, d_i 인 박스 n개가 있다.
회전은 안된다.
다른 상자 위에 올릴 수 있는데, 크기가 더 작은 애만 올릴 수 있다. 
(각각이 모두 다 더 작아야 한다. 맞나?)
상자1을 상자2에 올리고 이걸 다시 상자3에 올릴 때는 상자2와 상자3의 크기만 비교하는거 맞나?

쌓을 수 있는 가장 높은 탑의 높이.

일단 전혀 안 쌓았을 때 가장 높은건 max(h_i) 이다.

이상적인 경우는 순차적으로 다 쌓을 수 있어서 sum(h_i)인 경우일꺼다.

상자들 끼리는 서로 올릴 수 있는 관계가 있다.

상자 a < b < c를 쌓았다고 하면, 이 전체 상자는 a 보다 큰 상자 위에만 쌓을 수 있고, 이 상자 위에는 c 보다 작은 상자만 쌓을 수 있다.


가장 간단한건 그냥 다 해보면 거다. 상자를 쌓는 경우의 수는 n! 개가 가능하다.

이 때 올릴 수 있냐 여부 계산이 무지 반복되니 이를 줄이기 위해 계산을 해둔다 하자.

n^2로 메트릭스를 만들어서 fold[i][j] = true 는 i번 상자를 j번 상자 위에 올릴 수 있다이다.

그런데 fold[i][j] == true && fold[j][k] == true 이면 fold[i][k] 인 것도 성립하고
fold[i][j] == false && fold[j][k] == true 이면 fold[i][k] == false로 자동으로 성립한다.

여튼 이 테이블을 채우는데 N^2이 든다. 실제 depth는 순서 관계가 가장 긴 길이가 M 이라고 했을 때 음... 

호출 수는 복잡한데.

여전히 반복이 아주 많다.

a->b->c->d->e

가 있다고 하면 

a->b->c->d->e 호출은 c->d->e를 부를꺼고, 이는 다른 곳에서도 무지 많이 불릴꺼다.

----

n개의 상자에 대한 답을 알 때, n+1의 답을 알 수 있나?

이전 솔루션의 답안 중간에껄 새로운 애로 갈아 치워서 더 좋은 답안을 만들 수 있다.


박스가 정렬이 되는가?

정렬이 되는 박스도 있고 아 트리로 푸는건가?

예를 들어 정렬이 되는 경우가 있는데 정렬 상태를 안 쓰는게 더 답이 좋아질 이유는 없다.

아 그런데, 명확한 높이 관계가 성립 안하는 경우에는 어떻게 정렬을 해야 할 지가 애매하다.

  a -> b -> c -> q
    \_ d /    \_ p
       |
  w----|
 
  f ->e

요런 dag 같은 그래프가 나올 것 같다.

여기서 cost의 가장 큰 값이 될 것 같다.
-----------------------------------------------------------------

부분 정렬만으로도 도움이 될까?
높이나 길이 중 아무거나 잡아서 내림차순 정렬하면, 부분 정렬이 된다.
그러면 앞에 있는 박스는 뒤에 있는 박스 위에 절대 올릴 수 없다.

이렇게 하면 검사해봐야 하는 경우의 수는 2^n개가 된다.

부분 문제로 쪼개어 보라.

cost(i)는 i번째 박스를 포함해서 만들 수 있는 최대 높이라고 하면

cost(i) = max (can_stack(i, i+i) ? cost(i+1) + h_i, 0)
가 된다.

*/

function canStack(boxes, bottom ,top) {
  const bottomBox = boxes[bottom];
  const topBox = boxes[top];
  return bottomBox.width > topBox.width &&
    bottomBox.height > topBox.height &&
    bottomBox.depth > topBox.depth;
}

function findMaxHeight(boxes) {
  boxes.sort(function (a, b) {
    return a.width - b.width;
  });

  const height = new Array(boxes.length);
  height[boxes.length - 1] = boxes[boxes.length - 1].height;

  for (let i = boxes.length - 2; i >= 0; --i) {
    let maxHeight = 0;
    for (let j = i + 1; j < boxes.length; ++j) {
      if (canStack(boxes, i, j)) {
        maxHeight = Math.max(maxHeight, height[j]);
      }
    }
    height[i] = boxes[i].height + maxHeight;
  }

  let maxHeight = 0;
  for (let i = 0; i < height.length; ++i) {
    maxHeight = Math.box(maxHeight, height[i]);
  }
  return maxHeight;
}

/*
시간 복잡도는 박스 수 n에 대해서 정렬하는데 nlogn, 테이블 채우는데 n^2 라서 O(n^2)이고
공간 복잡도는 O(n)이다.
*/
