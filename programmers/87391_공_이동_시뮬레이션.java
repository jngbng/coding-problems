/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/87391
시간: 08:30 ~ 09:39 (1h 9m), 13:12 ~ 14:39 (1h 27m) (2h 36m)
메모:

n행 x m열, 좌상단이 (0,0), 우하단이 (n-1, m-1)이라고 하자.

0: left
1: right
2: up
3: down

2^32 = 10^9

2^31 = 2 * 2^30  > 2 * 10^9

모든 점에 대해서 쿼리를 다 실행하는건 10^18 * 2 * 10^5 = 10^23. 너무 큰 수.

종점에서 역으로 가능한 점들을 확장해 나가면?

종점이 (x,y) 일 때, 마지막 query 가

(left, k): (x + k, y)

...

*/

import java.util.*;

class Point {
  int row;
  int col;

  Point(int row, int col) {
    this.row = row;
    this.col = col;
  }

  Point up(int diff) {
    return new Point(row - diff, col);
  }

  Point down(int diff) {
    return new Point(row + diff, col);
  }

  Point left(int diff) {
    return new Point(row, col - diff);
  }

  Point right(int diff) {
    return new Point(row, col + diff);
  }

  @Override
  public boolean equals(Object o) {
    if (o == this) {
      return true;
    }

    if (!(o instanceof Point)) {
      return false;
    }

    Point otherP = (Point)o;
    return (row == otherP.row) && (col == otherP.col);
  }

  @Override
  public int hashCode() {
    long h = ((long)row) << 32 | (long) col;
    return Long.hashCode(h);
  }
}

class SolutionFail {
  final int LEFT = 0;
  final int RIGHT = 1;
  final int UP = 2;
  final int DOWN = 3;

  int MAX_ROW;
  int MAX_COL;
  
  public long solution(int n, int m, int x, int y, int[][] queries) {
    MAX_ROW = n;
    MAX_COL = m;

    Set<Point> endPoints = new HashSet<Point>(1);
    endPoints.add(new Point(x, y));

    for (int i = queries.length - 1; i >= 0; --i) {
      endPoints = calcPrevEndPoints(endPoints, queries[i]);
    }
    
    return endPoints.size();
  }

  Set<Point> calcPrevEndPoints(Set<Point> endPoints, int[] query) {
    Set<Point> prevEndPoints = new HashSet<Point>();
    for (Point endPoint : endPoints) {
      calcReverseMove(endPoint, query, prevEndPoints);
    }
    return prevEndPoints;
  }

  void calcReverseMove(Point dest, int[] query, Set<Point> origins) {
    int move = query[1];

    switch (query[0]) {
    case LEFT:
      if (dest.col == 0) {
        for (int i = 0; i <= move; ++i) {
          origins.add(dest.right(i));
        }
      } else if (dest.col + move < MAX_COL) {
          origins.add(dest.right(move));
      }
      break;
      
    case RIGHT:
      if (dest.col == MAX_COL - 1) {
        for (int i = 0; i <= move; ++i) {
          origins.add(dest.left(i));
        }
      } else if (dest.col - move >= 0) {
        origins.add(dest.left(move));
      }
      break;      

    case UP:
      if (dest.row == 0) {
        for (int i = 0; i <= move; ++i) {
          origins.add(dest.down(i));
        }
      } else if (dest.row + move < MAX_ROW) {
        origins.add(dest.down(move));
      }
      break;      

    case DOWN:
      if (dest.row == MAX_ROW - 1) {
        for (int i = 0; i <= move; ++i) {
          origins.add(dest.up(i));
        }
      } else if (dest.row - move >= 0) {
        origins.add(dest.up(move));
      }
      break;
    }
  }
}

/*

13:12 ~ 14:39

메모리, 시간 초과 난리남.

생각해보니 x축, y축은 독립사건이다. 처음부터 range에 대해서 처리하면 될 것 같다.
*/

class Solution {
  final int LEFT = 0;
  final int RIGHT = 1;
  final int UP = 2;
  final int DOWN = 3;

  class Range {
    int start;
    int end;

    Range(int start, int end) {
      this.start = start;
      this.end = end;
    }
  }
  
  public long solution(int MAX_ROW, int MAX_COL, int row, int col, int[][] queries) {
    Range rowRange = new Range(row, row);
    Range colRange = new Range(col, col);

    for (int i = queries.length - 1; i >= 0; --i) {
      int direction = queries[i][0];
      int move = queries[i][1];

      switch (direction) {
      case LEFT:
        colRange = calcReverseMove(colRange, move, MAX_COL);
        if (colRange == null) {
          return 0;
        }
        break;
      
      case RIGHT:
        colRange = calcReverseMove(colRange, -move, MAX_COL);
        if (colRange == null) {
          return 0;
        }
        break;      

      case UP:
        rowRange = calcReverseMove(rowRange, move, MAX_ROW);
        if (rowRange == null) {
          return 0;
        }
        break;      

      case DOWN:
        rowRange = calcReverseMove(rowRange, -move, MAX_ROW);
        if (rowRange == null) {
          return 0;
        }
        break;
      }
    }
    
    return ((long)(rowRange.end - rowRange.start + 1)) * ((long)(colRange.end - colRange.start + 1));
  }

  Range calcReverseMove(Range range, int move, int maxRange) {
    if (move > 0) {
      if (range.start == 0) {
        int end = Math.min(range.end + move, maxRange - 1);
        return new Range(0, end);
      } else {
        int start = range.start + move;
        if (start >= maxRange) {
          return null;
        }
        int end = Math.min(range.end + move, maxRange - 1);
        return new Range(start, end);
      }
    } else {
      if (range.end == maxRange - 1) {
        int start = Math.max(range.start + move, 0);
        return new Range(start, range.end);
      } else {
        int end = range.end + move;
        if (end < 0) {
          return null;
        }
        int start = Math.max(range.start + move, 0);
        return new Range(start, end);
      }
    }
  }
}

/*
n = 1000,m = 1000 x=1,y=1 query = [[0(left),100001],[2(up),100001]]

1 1

*/
  

