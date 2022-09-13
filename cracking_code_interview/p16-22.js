/*
랭턴 개미

black/white 니깐 boolean 2-dim array..?
초기 입력은 어떻게 되는건가? chess 판처럼 규칙적인 격자로 무한한 너비의 체크판을 가정하는건가?
그럼에도 불구하고 시작 포인트가 검정인지 화이트인지는 알아야지.


초기 입력으로 M x N array와 초기 위치, 방향이 입력이 주어진다고 하자.
*/

const DIR_UP = 0;
const DIR_RIGHT = 1;
const DIR_DOWN = 2;
const DIR_LEFT = 3;

function turnRight(dir) {
  return (dir + 1) % 4;
}

function turnLeft(dir) {
  return (dir + 3) % 4;
}

function nexPosition(row, col, dir) {
  switch (dir) {
    case DIR_UP:
      return [row - 1, col];
    case DIR_RIGHT:
      return [row, col + 1];
    case DIR_DOWN:
      return [row + 1, col];
    case DIR_LEFT:
      return [row, col -1];
    default:
      throw new Error('invalid input');
  }
}

function isValidRange(minIncl, maxExcl, value) {
  return minIncl <= value && value < maxExcl;
}

function isValidPosition(rows, cols, row, col) {
  return isValidRange(0, rows, row) && isValidRange(0, cols, col);
}

const COLOR_BLACK = false;
const COLOR_WHITE = true;

function flipColor(color) {
  return (color == COLOR_BLACK) ? COLOR_WHITE : COLOR_BLACK;
}

function turnByColor(color, dir) {
  return (color == COLOR_BLACK) ? turnLeft(dir) : turnRight(dir);
}

class LangArray {
  constructor(board, initX, initY, dir) {
    // TODO: assume well-formed.
    this.board = board;
    this.rows = board.length;
    this.cols = board[0].length;
    this.x = initX;
    this.y = initY;
    this.dir = dir;
  }

  move() {
    const curColor = this.board[this.x][this.y];
    const nextDir = turnByColor(curColor, this.dir);
    let [newX, newY] = nexPosition(this.x, this.y, nextDir);
    if (!isValidPosition(this.rows, this.cols, newX, newY)) {
      throw new Error("out-of-range");
    }
    this.board[this.x][this.y] = flipColor(curColor);
    this.x = newX;
    this.y = newY;
    this.dir = nextDir;
  }

  moveK(k) {
    for (let i = 0; i < k; ++i) {
      this.move();
    }
  }

  printBoard() {
    //
  }

  printKMoves(k) {
    this.moveK(k);
    this.printBoard();
  }
}

/*
*/
