/*
tic-tac-toe 승자를 알아내라.

승자를 알아내라는 의미가 판이 주어지면 결과만 판정하면 되나?

아니면 판이 주어지고 다음 차례가 누구인지 주어졌을 때, 다음 차례의 행동과 상관없이 
한 쪽이 반드시 이길 수 있으면 그걸 판정해야 하나?

1 1 
0 1 
    0

예를 들면 위에는 다음 차례가 0이지만 1이 반드시 이길 수 있다. 일부러 다른 곳에 놓지 않는다면.

일단 판이 주어지면, 누가 이겼는지를 리턴하는 함수를 생각해보겠다.
판은 3x3 array로 주어지고 
- 비었으면 0,
- 플레이어1 돌이 있으면 1,
- 플레이어2 돌이 있으면 2,
로 표현하겠다.

승패가 결정되는 기준은 한 줄에 같은 돌이 있나 보면 되는데, 총 8개 경우의 수가 있다.

거기다 4개는 중앙을 가로지른다. 중앙으로 4가지를 체크하고
왼쪽 위를 기준으로 2가지
오른쪽 아래를 기존으로 2가지
경우를 체크하겠다.


*/

const EMPTY = 0;
const P1 = 1;
const P2 = 2;

function tacaTacToe(board) {
  if (board == null) {
    return -1;
  }

  // checkWellFormed(board);

  let center = board[1][1];
  if (center !== EMPTY) {
    if ((board[0][0] == center && board[2][2] == center)
        || (board[1][0] == center && board[1][2] == center)
        || (board[2][0] == center && board[0][2] == center)
        || (board[0][1] == center && board[2][2] == center)) {
      return center;
    }
  }

  const leftTop = board[0][0];
  if (leftTop !== EMPTY) {
    if ((board[1][0] == leftTop && board[2][0] == leftTop)
        || (board[0][1] == leftTop && board[0][2] == leftTop)) {
      return leftTop;
    }
  }
  const rightBottom = board[2][2];
  if (rightBottom !== EMPTY) {
    if ((board[2][0] == rightBottom && board[2][1] == rightBottom)
        || (board[0][2] == rightBottom && board[1][2] == rightBottom)) {
      return rightBottom;
    }
  }
  return -1;
}


/*
답을 보고 나니.

무엇을 질문해야 하는 지가 더 포인트였다.

가장 중요한게 성능이냐? 그러면 미리 array 기반 해시테이블에 초기화 해놓고 O(1)으로 반환한다.

이게 NxN으로 확장할 계획이 있나?

이게 매 턴마다 불리는 함수고, 마지막 움직임을 알 수 있나? 대신 이전 턴애는 끝나지 않았다는게 보장된다.
그래서 마지막 움직임에 대응되는 경우만 보면 된다.
*/
