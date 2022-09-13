/*
peak: 인접보다 크거다 같다.
valley: 인접보다 작거나 같다.

같다가 들어간다.

같은 숫자면 peak / valley 다 되는건가?

1 - 1 - 1

이면 모든 원소가 peak 이자 valley가 된다.

peak / valley가 번갈아 등장하도록 정렬해라.

정렬이 불가능한 경우가 있을까?

1 2 3 -> 1 3 2

선택을 잘못 하면

1 2 를 미리 선택하면 선택지가 없어서 실패한다.

일단 숫자들이 주어지면, 정렬을 해보자.

1 2 3 4 4 5 6

정렬된 데이터가 있다고 했을 때, 이걸 만들 순 있는가?

a <= b <= c <= d ...

여기서 a b를 바꾸면

b >= a <= c <= d ...

b는 peak고 a 는 valley가 됐다.


c 이후로는 어떻게 순서를 바꾸더라도 a가 valley 라는 사실은 변함이 없다.

그래서 c 부터 재귀적으로 문제를 풀면 된다.

이걸 보면 가장 작은 값들을 순차적으로 2개 읽어서 역순으로 배치만 하면 된다.

그래서 전체 정렬을 안하더라도 min heap을 써서 하나씩 뽑아서 해도 되겠다.

그런데 min heap을 써서 하나씩 뽑는건 결국 전체 정렬과 다를 바가 없다.

그래서 그냥 정렬하도록 하겠다.

시간 복잡도는 O (n log n) 이다.

*/

function swap(arr, i, j) {
  // impl
}

function peakValleySort(arr) {
  arr.sort();

  for (let i = 0; i + 1 < arr.length; i+= 2) {
    swap(arr, i, i+1);
  }
}

/*
다 정렬 후 swap 하는걸 개선 하려면 min heap을 써서 2개씩 뽑으며 바꿔서 붙여 나가면 조금 더 개선할 수 있겠다.

더 좋은 방법이 있을까?

O (N log N) 보다 줄이려면 N을 log N 으로 줄이거나 log N을 log log N으로 줄여야 한다.

여기서 중요한건 상대적 크기만 중요하다인데, 앞에서 부터 읽어 나가면서 lazy하게 접근해보자.

그러 지금 커서 왼쪽은 올바르게 정렬된 상태여야 한다.

다르게 말하면 올바르게 정렬된 애가 주어졌을 때 원소 하나를 임의로 추가할 수 있겠나?

A <= B >= C <= D

C <= D  valley를 뽑아야는 경우.

요기서 a가 주어졌는데

D >= a 라면 그냥 추가하고 끝내면 된다.

C <= D >= a

D < a 라면 D 전에 a를 추가한다면

C <= D < a => C < a 라서

C < a > D

가 된다.

반대 경우

C >= D peak을 뽑아야는 경우.

D <= a 라면 추가하고 끝내면 된다.

D > a 라면?

C >= D > a 인 상황.

C >= a < D 마찬가지로 뒤집어서 추가하면 된다.


정리하면 

C <= D  valley를 뽑아야는 경우.
  D >= a 라면 그냥 추가하고 끝내면 된다.
  D < a 라면 D 전에 a를 추가한다면

C >= D peak을 뽑아야는 경우.
  D <= a 라면 추가하고 끝내면 된다.
  D > a 라면 D 전에 a 추가한다.

배열을 재일 처음 두 원소를 보고 3번째 부터 시작하는데 valley냐 peak이냐를 정한 후 저 조건대로 수행해 나가면 된다.
*/

function peakValleySort2(arr) {
  if (arr == null || arr.length < 3) {
    return arr;
  }
  let isValleyTurn = (arr[0] <= arr[1]);

  for (let i = 2; i < arr.length; ++i) {
    const last = arr[i - 1];
    const cur = arr[i];
    if (isValleyTurn) {
      if (last < cur) {
        swap(arr, i - 1, i);
      }
    } else {
      if (last > cur) {
        swap(arr, i - 1, i);
      }
    }
    isValleyTurn = !isValleyTurn;
  }
  return arr;
}

/*
저기서 swap 하는 부분을 좀 더 최적화 할 수 있겠다. last 라는 공간이 어짜피 있으므로, 거기다 저장하고 continue 하는 부분에서 채워 넣자.
즉 마지막 2개를 보고 하나를 추가하고 하나를 남기는 방식으로 가면 되겠다.
*/

function peakValleySort2(arr) {
  if (arr == null || arr.length < 3) {
    return arr;
  }
  let isValleyTurn = (arr[0] <= arr[1]);

  let last = arr[1];
  for (let i = 2; i < arr.length; ++i) {
    const cur = arr[i];
    if (isValleyTurn) {
      if (last >= cur) {
        arr[i-1] = last;
        last = cur;
      } else {
        arr[i-1] = cur;
      }
    } else {
      if (last <= cur) {
        arr[i-1] = cur;
      } else {
        arr[i-1] = last;
        last = cur;
      }
    }
    isValleyTurn = !isValleyTurn;
  }
  return arr;
}
