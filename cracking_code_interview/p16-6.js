/*
차이의 최소.

물론 가장 단순한건 모든 경우를 다 해보는거다.

그럼 O (M * N) 번이다.

여기서 중복은 뭐가 있을까.

10   30   60   80

일때 36가 주어지면 최소 차이는 30 과 60 사이 둘 중의 하나일 수 밖에 없다.

정렬 되어 있으니 binarysearch로 찾을 수 있겠다.


또 다른 중복은 뭐가 있을까.

반대 쪽 array에 90, 100, 110 이 있으면 90 이상은 사실 볼 필요가 없다.


그럼 각각을 정리하면 불필요한 작업을 어떻게 줄일 수 있을까.

a0  a1          a2   a3    a4

       b0 b1 b2    b3    b4    b5  b6 b7


1. 요렇게 되면 모퉁이에 있는 a0, b6, b7 은 볼 필요가 없다.
2. b1은 볼 필요가 없다.

그리고 나머지는 하나하나 봐야 한다. 그러면 b를 정렬할 필요는 있었던걸까?

그냥 보면서 a0 보다 작은 것 중에는 가장 큰 것.

a4 보다 큰 것 중에는 가장 작은 것 트래킹해서 짤라내고.

나머지는 해보면 되지 않을까?

이 방법은 O(M * log N + N log N) = O(((M + N) * log N) 이다.

더 짧은 array를 N으로 한다.
*/

function findBiggestSmallerThen(arr, fromIdx, toIdx, elem) {
  // arr 중에서 arr[i] <= elem 인 가장 큰 인덱스 i 리턴. arr은 정렬 되어 있음.
}

function findMinDiff(a, b) {
  // TODO: implement here
  let short = a;
  let long = b;

  short.sort();

  let min = Math.abs(a[0] - b[0]);

  for (const i of long) {
    const idx = findBiggestSmallerThen(short, 0, short.length - 1, i);
    min = Math.min(min, Math.abs(short[idx] - i));
    if (idx + 1 < short.length) {
      min = Math.min(min, Math.abs(short[idx + 1] - i));
    }
    if (min == 0) {
      return 0;
    }
  }
  return min;
}

/*

complexity 자체는 같을 수 있지만 더 최적화된 경우를 생각해보면.


a0 ... a_j <=               a_(j+1) ....

              b_k ... b_w


a_j <= b_k < a_(j+1)

요렇게 있으면 비교 해봐야 하는건 a_j - b_k, b_w - a_(j+1) 밖이다.


1. a에서 b_k 보다 크지 않은 가장 큰 j를 찾을 때 까지 스킵한다.
2. a_j와 b_k 크기를 비교한다.
3. a와 b를 바꿔서 진행한다.
4. a가 끝에 도달하면 종료.
*/

function findMinDiffSimple(a, b) {
  if (a == null || a.length == 0 || b == null || b.length == 0) {
    return -1;
  }

  let withMin = (a[0] <= b[0]) ? a : b;
  let target = withMin == a ? b : a;
  let min = target[0] - withMin[0];

  let targetIdx = 0;
  let withMinIdx = 0;
  // 사실 앞의 조건은 필요 없음.
  while (withMinIdx < withMin.length && targetIdx < target.length) {
    withMinIdx = findBiggestSmallerThen(withMin, withMinIdx, withMin.length - 1, target[targetIdx]);
    min = Math.min(min, target[targetIdx] - withMin[withMinIdx]);
    if (min == 0) {
      break;
    }
    
    [withMin, target] = [target, withMin];
    [withMinIdx, targetIdx] = [targetIdx, withMinIdx + 1];
  }

  return min;
}

/*
이거의 시간 복잡도는 각각 정렬하는데 O(N log N + M log M)
뒤에 차이를 찾는데, 최악의 경우는 alternating 으로 모든 차이를 다 보는거라서 O(N + M)이다.

그래서 O(N log N + M log M)이 걸린다.
*/
