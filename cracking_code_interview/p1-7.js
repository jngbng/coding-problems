/*
그림을 그려서 확인해보면 회전으로 인해서 4개의 포인트가 서로 rorate되는걸 알 수 있다.

(i, j) -> (j, N-1 - i) 로 이동한다.

그래서 2사분면의 포인트에 대해서 4점 rotate를 완료하면 되겠다.

*/

function rotatePoint(matrix, x, y) {
  const size = matrix.length - 1;
  const firstPoint = matrix[x][y];
  let nextX, nextY;
  for (let i = 0; i < 3; ++i) {
    [nextX, nextY] = [y, size - x];
    matrix[x][y] = matrix[nextX][nextY];
    [x, y] = [nextX, nextY];
  }
  matrix[x][y] = firstPoint;
}

function rotateRight(matrix) {
  const iMid = Math.ceil(matrix.length / 2);
  const jMid = Math.floor(matrix.length / 2);
  for (let i = 0; i < iMid; ++i) {
    for (let j = 0; j < jMid; ++j) {
      rotatePoint(matrix, i, j);
    }
  }
  return matrix;
}

console.log(rotateRight([[1,2,3],[4,5,6],[7,8,9]]));


/*
홀수 일 때 겹는 홀수 행이 두번 돌게 되는 걸 놓침.
그림을 그린 후 좀 더 꼼꼼히 계획을 새워야겠다.

이건 time complexity는 메트릭스의 요소수를 M이라 했을 때 모든 요소를 한번씩 변경하므로 O(M)이다.
공간복잡도는 별도로 공간을 안 쓰니 O(1)이다.
*/
