/*
연못 크기.
0인 영역 리스트.
값을 바꿔도 된다면, 0을 죄다 1로 바꾸면서 색칠된 너비를 구하고, 다시 남은 영역을 스캔해 나가는 식으로 하면

영역 전체를 M, 가장 큰 연못을 N이라고, O(M * N) 이 된다.

마크한 지점을 다시 방문하기 때문인데,

마크 한 지점을 다시 방문하지 않을 수 있는 방법은?
*/

const WATER = 0;
const LAND = 1;

function deletePond(arr, rows, cols, row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return 0;
  }
  if (arr[row][col] != WATER) {
    return 0;
  }
  arr[row][col] = LAND;
  let ret = 1;
  for (let i = -1; i < 2; ++i) {
    for (let j = -1; j < 2; ++j) {
      if (i == 0 && j == 0) {
        continue;
      }
      ret += deletePond(arr, rows, cols, row + i, col + j);
    }
  }
  return ret;
}

function findPondSizes(arr, rows, cols) {
  const ret = [];
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (arr[i][j] == WATER) {
        ret.push(deletePond(arr, rows, cols, i, j));
      }
    }
  }
  return ret;
}

console.log(findPondSizes([[0,2,1,0],[0,1,0,1],[1,1,0,1],[0,1,0,1]],4,4));
