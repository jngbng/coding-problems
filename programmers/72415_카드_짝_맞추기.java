/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/72415
시간: 09:15 ~ 11:03 (1h 48m)
메모:

카드셋은 6세트니깐 지우는 순서는 6! x 2 = 1440가지
재귀로 다 순회하면 되지 않을까.

각 카드셋 별로,
- 1번 -> 2번 지우는데 드는 키 입력 수 -> 재귀
- 2번 -> 1번 지우는데 드는 키 입력 수 -> 재귀.

두 포인트를 이동하는 최소 이동 수?

        T
       x
       .
 x.....x
F

위 F에서 T로 이동하려면, x를 경유해 가는게 빠르다.

 F   
1010

*/

import java.util.*;


class TargetCard {
  int card;
  int[][] points;

  TargetCard(int card, int[] point1, int[] point2) {
    this.card = card;
    this.points = new int[][]{ point1, point2 };
  }
}

class Move implements Comparable<Move> {
  int move;
  int r;
  int c;

  Move(int move, int r, int c) {
    this.move = move;
    this.r = r;
    this.c = c;
  }

  @Override
  public int compareTo(Move other) {
    return move - other.move;
  }
}

class Solution {

  final int BOARD_SIZE = 4;

  void setBoard(int[][] board, int[] point, int card) {
    board[point[0]][point[1]] = card;
  }

  void restoreBoard(int[][] board, List<int[]> points, int card) {
    setBoard(board, points.get(0), card);
    setBoard(board, points.get(1), card);
  }

  int moves(int[][] board, int curR, int curC, int toR, int toC) throws Exception {
    if (curR == toR && curC == toC) {
      return 0;
    }
    boolean[][] visit = new boolean[BOARD_SIZE][BOARD_SIZE];
    Deque<Move> q = new ArrayDeque<Move>();
    q.add(new Move(0, curR, curC));
    while (!q.isEmpty()) {
      Move m = q.remove();
      int curMove = m.move;
      if (m.r == toR && m.c == toC) {
        return curMove;
      }
      if (visit[m.r][m.c]) {
        continue;
      }
      visit[m.r][m.c] = true;
      int nextMove = curMove + 1;
      // move
      if (m.r > 0) {
        q.add(new Move(nextMove, m.r - 1, m.c));
        //
        int r = m.r - 1;
        while (r > 0 && board[r][m.c] == 0) {
          r--;
        }
        if (r != m.r - 1) {
          q.add(new Move(nextMove, r, m.c));
        }
      }
      if (m.r < BOARD_SIZE - 1) {
        q.add(new Move(nextMove, m.r + 1, m.c));
        //
        int r = m.r + 1;
        while (r < BOARD_SIZE - 1 && board[r][m.c] == 0) {
          r++;
        }
        if (r != m.r + 1) {
          q.add(new Move(nextMove, r, m.c));
        }
      }
      if (m.c > 0) {
        q.add(new Move(nextMove, m.r, m.c - 1));
        //
        int c = m.c - 1;
        while (c > 0 && board[m.r][c] == 0) {
          c--;
        }
        if (c != m.c - 1) {
          q.add(new Move(nextMove, m.r, c));
        }
      }
      if (m.c < BOARD_SIZE - 1) {
        q.add(new Move(nextMove, m.r, m.c + 1));
        //
        int c = m.c + 1;
        while (c < BOARD_SIZE - 1 && board[m.r][c] == 0) {
          c++;
        }
        if (c != m.c + 1) {
          q.add(new Move(nextMove, m.r, c));
        }
      }
    }
    throw new Exception("NOT_FOUND");
  }
  
  int clearMoves(int[][] board, int curR, int curC, int[] point1, int[] point2) throws Exception {
    // enter keys
    int count = 2;
    count += moves(board, curR, curC, point1[0], point1[1]);
    setBoard(board, point1, 0);
    count += moves(board, point1[0], point1[1], point2[0], point2[1]);
    setBoard(board, point2, 0);
    return count;
  }

  int search(int[][] board, Map<Integer, List<int[]>> pointsByCard, int curR, int curC, int depth) throws Exception {
    if (pointsByCard.size() == 0) {
      return 0;
    }

    int minCost = Integer.MAX_VALUE;
    
    List<Integer> keys = new ArrayList(pointsByCard.keySet());
    for (Integer key : keys) {
      List<int[]> points = pointsByCard.get(key);
      int[] point0 = points.get(0);
      int[] point1 = points.get(1);
      pointsByCard.remove(key);
      // path 0 -> 1
      int cost = clearMoves(board, curR, curC, point0, point1);
      //System.out.println("depth: " + depth + ", Card:" + key + ", cost:"+cost+", move: ("+curR+","+curC+") -> ("+point0[0]+","+point0[1]+") -> (" + point1[0]+","+point1[1] + ")");
      cost += search(board, pointsByCard, point1[0], point1[1], depth + 1);
      if (cost < minCost) {
        minCost = cost;
      }
      restoreBoard(board, points, key);

      // path 1 -> 0
      cost = clearMoves(board, curR, curC, point1, point0);
      //System.out.println("depth: " + depth + ", Card:" + key + ", cost:"+cost+", move: ("+curR+","+curC+") -> ("+point1[0]+","+point1[1]+") -> (" + point0[0]+","+point0[1] + ")");
      cost += search(board, pointsByCard, point0[0], point0[1], depth + 1);
      if (cost < minCost) {
        minCost = cost;
      }
      restoreBoard(board, points, key);

      pointsByCard.put(key, points);
    }
    return minCost;
  }
  
  public int solution(int[][] board, int r, int c) throws Exception {
    Map<Integer, List<int[]>> pointsByCard = new HashMap<Integer, List<int[]>>();

    for (int rIdx = 0; rIdx < board.length; ++rIdx) {
      int[] row = board[rIdx];
      for (int cIdx = 0; cIdx < row.length; ++cIdx) {
        int card = row[cIdx];
        if (card == 0) {
          continue;
        }
        List<int[]> points = pointsByCard.get(card);
        if (points == null) {
          points = new ArrayList<int[]>(2);
          pointsByCard.put(card, points);
        }
        points.add(new int[]{rIdx, cIdx});
      }
    }

    return search(board, pointsByCard, r, c, 0);
  }
}
