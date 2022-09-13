/*
최대 부분 행렬

양의 정수, 음의 정수, NxN 행렬. 원소 합이 최대가 되는 부분 행렬.

sum[i][j]: sum(matrix[0:i,0:j]) 이라 정의하면

sum(matrix[x_from:x_to, y:from:y_to])
= sum[x_to][y_to] - sum[x_from-1][y_to] - sum[x_to][y_from - 1] + sum[x_from-1][y_from -1]

모든 경우를 다 돌면 O(N^4)가 된다. (x_from, x_to, y_from, y_to) 컴비네이션의 수.

더 빠르게 할 수 있나?? 최악의 경우는 원소 하나만 무지 큰 경우인데, 이걸 위해서 1x1을 죄다 봐야 하는데.

sum[i][j]를 만드는 방법은 row 별로 만들고 col 별로 한번 더 순회한다. O(N^2)

왜 0은 없을까?

더 빠르게 하는 방법은 잘 모르겠음.
*/

function calcSumMatrix(matrix, rows, cols) {
  const sums = [];
  // sum rows;
  for (const row of matrix) {
    let sum = 0;
    let sumRow = [];
    for (const value of row) {
      sum += value;
      sumRow.push(sum);
    }
    sums.push(sumRow);
  }
  // cum column;
  for (let i = 1; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      sums[i][j] += sums[i-1][j];
    }
  }
  return sums;
}

function matrixSum(sums, xFrom, xTo, yFrom, yTo) {
  let sum = sums[xTo][yTo];
  if (xFrom > 0) {
    sum -= sums[xFrom-1][yTo];
  }
  if (yFrom > 0) {
    sum -= sums[xTo][yFrom - 1];
  }
  if (xFrom > 0 && yFrom > 0) {
    sum += sums[xFrom - 1][yFrom - 1];
  }
  return sum;
}

function findBiggestSum(matrix, rows, cols) {
  const sums = calcSumMatrix(matrix, rows, cols);

  let max = null;
  let point = null;
  for (let xFrom = 0; xFrom < rows; ++xFrom) {
    for (let xTo = xFrom; xTo < rows; ++xTo) {
      for (let yFrom = 0; yFrom < cols; ++yFrom) {
        for (let yTo = yFrom; yTo < cols; ++yTo) {
          const sum = matrixSum(sums, xFrom, xTo, yFrom, yTo);
          if (max == null || max < sum) {
            max = sum;
            point = [[xFrom, yFrom],[xTo, yTo]];
          }
        }
      }
    }
  }
  return [max, point];
}

const INPUT = [
  [-10, -1, 9],
  [2, 3, 4],
  [-1, 4, 5],
];

console.log(findBiggestSum(INPUT, 3, 3));
