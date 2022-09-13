/*
최대 검은색 정방행렬 n by n

가장자리가 꼭지점 말하는거냐 선분 말하는거냐?
*/

/*
꼭지점일 때.

먼저 2차원에 대해서 생각해보자.

가장 긴 선분은 (왼쪽에서 첫번째, 오른쪽에서 첫번째)이다.
그 다음 작은 선분은? 
- (왼쪽에서 두번 째, 오른쪽에서 첫번 째)
- (왼쪽에서 첫번 째, 오른쪽에서 두번 째)
둘 중 하나인데, 그건 (왼쪽 두번째 - 왼쪽 첫번째), (오른쪽 첫번째, 오른쪽 두번째) 중 짧은 쪽이다.

둘이 같다면? 둘 다 해봐야 함.
그래서 모든 경우를 스캔하려면 최악으로는 O(N^2). 사실 경우의 수가 O(N^2)이라서 줄일 수는 없다.


이걸 단순히 2차원으로 확장한다면?
0행에서 가장 긴 두점에서 가장 작은 두 점으로 순회하면서, 정방행렬이 되는 최초 N을 찾고,
1행에서 이어서 다시 시작.

모든 행에 대해서 이걸 하니깐 O(N^3).

그런데 가장 큰 것을 찾는게 목표니깐
한 변의 길이 N에서 시작해서 모든 경우를 조사하고,
모든 N-i 길이를 찾는 식으로 나가면 된다.

O(N^3) 이상은 모르겠네.

size N -> (n-(n-1))^2
size N-1 -> (n-(N-2))^2
...
size 1 -> (n-1)^2
----------------
Sigma_n n^2 < O(n^3)

*/

/*
선분일 때, 같은 방법으로 해나가면 
size N -> 4n * (n-(n-1))^2 -> n * 1^2
size N-1 -> 4(n-1) * (n-(N-2))^2 -> (n-1) * 2^2
...
size 1 -> (n-1)^2
--------------------

Sigma_i i * (n-i)^2 -> Sigma_i O(i^3) <= O(n^4)

선분에서 (i,j)가 꽉 차 있는지는 그 사이 점의 갯수를 새서 확인할 수 있다.

P(i): 0~i 사이 점의 갯수 를 캐시하면 costant 시간안에 풀 수 있다.

그러면 이건 다시 점 4개 찾는 문제로 변환된다. 더 줄일 수 있는 방법은 점을 몰라서 모름..
*/


const WHITE = 0;
const BLACK = 1;

// function calcDotSumAux(row) {
//   let result = [];
//   let sum = 0;
//   for (let i = 0; i < row.length; ++i) {
//     if (row[i] == BLACK) {
//       sum++;
//     }
//     result.push(sum);
//   }
//   return result;
// }

function calcDotSumAux(iterator) {
  let result = [];
  let sum = 0;
  for (const dot of iterator) {
    if (dot == BLACK) {
      sum++;
    }
    result.push(sum);
  }
  return result;
}

function calcDotSum(dotMatrix) {
  const matrixSize = dotMatrix.length;
  const dotSumByRow = dotMatrix.map(row => calcDotSumAux(row.values()));
  const dotSumByCol = [];
  for (let i = 0; i < matrixSize; ++i) {
    dotSumByCol.push(calcDotSumAux((function *(i) {
      for (let j = 0; j < matrixSize; ++j) {
        yield dotMatrix[j][i];
      }
    })(i)));
  }
  return [dotSumByRow, dotSumByCol];
}

const INPUT = [
  [0, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 1, 0],
];

function isFilled(dotSum, from, to) {
  return (dotSum[from] - dotSum[to]) == (from - to);
}

function findMinSquare(dotMatrix) {
  const [dotSumByRow, dotSumByCol] = calcDotSum(dotMatrix);

  const matrixSize = dotMatrix.length;

  for (let size = matrixSize - 1; size >= 0; --size) {
    for (let i = 0; i < matrixSize - size; ++i) {
      for (let j = 0; j < matrixSize - size; ++j) {
        if (isFilled(dotSumByRow[i], j, j + size) &&
            isFilled(dotSumByRow[i + size], j, j + size) &&
            isFilled(dotSumByCol[j], i, i + size) &&
            isFilled(dotSumByCol[j + size], i, i + size)) {
          return [size, [i, j]];
        }
      }
    }
  }
  return null;
}

console.log(findMinSquare(INPUT));
