/*
각 행과 열이 오름차순이다.
특정 원소를 찾아라.

1  1  2  4
2
3
4

각 행이나 열의 처음과 끝을 보면 해당 범위를 알 수 있다.

2차원 바이너리 서치 느낌이 난다.

일단 중앙값을 집어서 비교를 해본다.
찾으면 럭키.
찾는 값이 더 크다면 적어도 2사분면 (quadrant) 에는 없다. 1, 3, 4분면 재귀 호출.
찾는 값이 더 작다면 적어도 4사분면에는 없다. 1, 2, 3 사분면 재귀 호출.

이를 재귀적으로 호출하면 어떨까.

코너 케이스를 생각해봐야하는데 길쭉한 한 열 일 때는 어떻게 동작하는지 봐야 한다.
*/

function find(A, value, xFrom, xTo, yFrom, yTo) {
  if (xFrom > xTo || yFrom > yTo) {
    return null;
  }
  const centerX = (xFrom + xTo) >> 1;
  const centerY = (yFrom + yTo) >> 1;
  const centerValue = A[centerX][centerY];

  if (centerValue == value) {
    return [centerX, centerY];
  }
  if (centerValue < value) {
    // find 1, 2, 3
    return find(A, value, centerX + 1, xTo, yFrom, yTo)
      || find(A, value, xFrom, centerX, centerY + 1, yTo);
  } else {
    //find 1, 3, 4
    return find(A, value, xFrom, centerX - 1, yFrom, yTo)
      || find(A, value, centerX, xTo, yFrom, centerY - 1);
  }
}

function findInSortedMatrix(A, value) {
  // A is well-formed.
  return find(A, value, 0, A.length - 1, 0, A[0].length - 1);
}

console.log(findInSortedMatrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]], 7));


/*
타임 컴플랙시티는 매번 봐야 하는 노드가 3/4 개 씩으로 줄기 때문에 log_4/3 (M*N) 라고 할 수 있다.

*/

/*

가장 쉬운 방법은 각 행별로 바이너리 서치하는 방법이 있다는 걸 언급하는걸 까먹었다.

정답 보니깐 O(M+N) 인 방법이 있었다...ㅠㅠ

나의 패인은 그냥 중간값을 잡아버린 거구나.
중간 대각선 상에서도 바이너리 서치를 했어야 했다.

*/
