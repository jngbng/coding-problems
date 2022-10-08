/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/1838
시간: 10:13 ~ ()
메모:

0 < side <= 10
0 < users <= 1000

입력이 그렇게 크지 않은걸로봐서 전체 탐색 같긴한데.

가장 많은 사람수가 되는 시각의 최소 거리를 계산하면 되는거 아닐까.

시간에 따라 사람이 바뀌는건 그 배치에서 빈 자리를 주면 되니깐.

-----------

가장 많은 사람 수 계산은 시간 범위가 고정이니 (600 <= t <= 1320)
배열 만들어서 증가/감소를 기록하고, 앞에서 sum 해가면서 max를 구한다.

-----------

최대 거리는.. 죄다 해본다면? 죄다 하려면 어떻게 해야 할까.

2차원 점에서 m개 뽑기 문제인데. 단, 순서는 고려하지 않고.

m개 점이 주어지면, 최대 거리 재는 문제는 모든 쌍에 대해서 하면 되니깐 2중 loop.

2차원 점들 row 순, col 순으로 1차원으로 샐 수 있으니깐,

이 배열에 대해서 m개 선택을 하면.

기존에 선택된 점들이 있고, 최소 거리 T가 있으면

새로운 점을 추가하면, min(T, ...(dist(새로운 점, 기존 점) for 기존 점들)) 가 새로운 T.


*/

import java.util.*;

class Point {
  int row;
  int col;

  Point(int row, int col) {
    this.row = row;
    this.col = col;
  }

  static Point fromIndex(int side, int index) {
    return new Point(index / side, index % side);
  }

  int toIndex(int side) {
    return row * side + col;
  }

  int calcDistance(Point other) {
    return Math.abs(row - other.row) + Math.abs(col - other.col);
  }
}

class Solution {
  public int solution(int side, int users, int[][] timetable) {
    int maxUsers = calcMaxConcurrentUsers(timetable);
    return calcMaxDistance(side, maxUsers);
  }

  final int TIME_MIN = 600;
  final int TIME_MAX = 1320;

  int calcMaxConcurrentUsers(int[][] timetable) {
    int[] slots = new int[TIME_MAX - TIME_MIN + 1];
    for (int[] time : timetable) {
      slots[time[0] - TIME_MIN]++;
      slots[time[1] - TIME_MIN + 1]--;
    }
    int max = 0;
    int runningSum = 0;
    for (int diff : slots) {
      runningSum += diff;
      if (runningSum > max) {
        max = runningSum;
      }
    }
    return max;
  }
  
  int finalMaxDist = -1;

  int calcMaxDistance(int side, int users) {
    if (users < 2) {
      return 0;
    }
    int MAX_DIST = 0;
    this.finalMaxDist = -1;
    calcMaxDistanceAux(side, new Stack<Point>(), Integer.MAX_VALUE, users);
    return this.finalMaxDist;
  }
  
  void calcMaxDistanceAux(int side, Stack<Point> selected, int maxDist, int remainUsers) {
    if (remainUsers == 0) {
      this.finalMaxDist = maxDist;
      return ;
    }

    int lastSelectedIndex = -1;
    if (selected.size() > 0) {
      lastSelectedIndex = selected.peek().toIndex(side);
    }

    int maxIndex = side * side - remainUsers + 1;
    for (int i = lastSelectedIndex + 1; i < maxIndex; ++i) {
      Point newPoint = Point.fromIndex(side, i);

      int newDist = Math.min(maxDist, minDistance(selected, newPoint));
      if (newDist <= this.finalMaxDist) {
        continue;
      }
      selected.push(newPoint);
      calcMaxDistanceAux(side, selected, newDist, remainUsers - 1);
      selected.pop();
    }
  }

  int minDistance(List<Point> points, Point newPoint) {
    int minDist = Integer.MAX_VALUE;
    for (Point p : points) {
      int dist = p.calcDistance(newPoint);
      if (dist < minDist) {
        minDist = dist;
      }
    }
    return minDist;
  }
}
