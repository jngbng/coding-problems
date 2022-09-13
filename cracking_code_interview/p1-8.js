/*
M x N 행렬.

무식하게 하면, 위에서 부터 훓어 가면서 0을 만나면 행 set과 열 set에 추가한다.
다 스캔 한 후에
행 set들을 0으로 설정하고, 열 set 들을 0으로 설정하면 된다.

이 두 작업을 동시에 진행할 수 있는가? 

열 먼저, 행 다음 단순히 하면 0을 0으로 덮어 쓰는 문제가 생겨서
놓칠 수 있다.

아니면 전체 배열이 아니라 절반만 읽어도 되는가? 안될 것 같은데.

이게 최선 같다.

공간 복잡도는 set의 크기가 O(M + N) 들고
시간 복잡도는 전체를 두번 순회하기 때문에 O(MN) 든다.
*/


function fillMatrix(matrix, rows, cols) {
  const fillRows = {};
  const fillCols = {};

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (matrix[i][j] == 0) {
        fillRows[i] = true;
        fillCols[j] = true;
      }
    }
  }

  for (let i = 0; i < rows; ++i) {
    if (fillRows[i] == true) {
      for (let j = 0; j < cols; ++j) {
        matrix[i][j] = 0;
      }
    } else {
      for (let j = 0; j < cols; ++j) {
        if (fillCols[j] == true) {
          matrix[i][j] = 0;
        }
      }
    }
  }
}
