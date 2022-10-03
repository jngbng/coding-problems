/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/87694
시간: 07:54 ~ 09:00 (1h 6m)
메모:

태두리를 타고 시계방향으로 도냐, 반시계 방향으로 도냐인데.

1. 일단 현재 점을 기준으로 어느 변에 있는 지 알아야 한다.
1. 변 위에 아이템이 있는 지를 본다.
1. 변의 끝으로 이동한다.

문제는 변의 끝은 어떻게 알 수 있을까?

가로변일 경우,
- 사각형 들을 x축으로 정렬후,
- 현재 y좌표에서 겹치는 목록을 뽑아낸 후,
- 양쪽 끝 2개가 태두리일 수 밖에 없는거 아닐까?

내 점에서 이동할 수 있는건, 위/아래/좌/우 이다.
이중 어떤 사각형 안에도 뚫고 들어가지 않는 두 점이 이동할 수 있는 점 이다.

어떤 점에 대해서 사각형에 포함되느냐 여부를 빠르게 판단할 수 있는가?
입력 자체가 별로 없으니 그냥 로프 돌면?

*/

import java.util.*;

class Point {
  int x;
  int y;

  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  Point up() {
    return new Point(x, y + 1);
  }

  Point down() {
    return new Point(x, y - 1);
  }

  Point left() {
    return new Point(x - 1, y);
  }

  Point right() {
    return new Point(x + 1, y);
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
    return (x == otherP.x) && (y == otherP.y);
  }

  @Override
  public int hashCode() {
    long h = ((long)x) << 32 | (long) y;
    return Long.hashCode(h);
  }
}

class Rect {
  Point leftDown;
  Point rightUp;

  Rect(int[] rect) {
    leftDown = new Point(rect[0], rect[1]);
    rightUp = new Point(rect[2], rect[3]);
  }
}

enum PointPosition {
  ON_BOARD,
  INSIDE,
  OUTSIDE
}

class Job {
  Point point;
  int distance;

  Job(Point point, int distance) {
    this.point = point;
    this.distance = distance;
  }
}

class Solution {

  public int solution(int[][] rectangle, int characterX, int characterY, int itemX, int itemY) {
    int answer = 0;

    // 폭이 1인 사각형은 뚫고 지나가버리기 때문에, 0.5씩 이동해야 한다.
    // 실수를 취급하는건 까다로우니 전체를 2배 스캐일로 하고, 리턴할 때 2로 나눈다.
    List<Rect> rects = new ArrayList<Rect>(rectangle.length);
    for (int[] rect : rectangle) {
      for (int i = 0; i < rect.length; ++i) {
        rect[i] *= 2;
      }
      rects.add(new Rect(rect));
    }
    Point character = new Point(characterX * 2, characterY * 2);
    Point item = new Point(itemX * 2, itemY * 2);

    Set<Point> visited = new HashSet<Point>();
    Deque<Job> dq = new ArrayDeque<Job>();
    dq.add(new Job(character, 0));
    while (!dq.isEmpty()) {
      Job job = dq.remove();
      Point curPoint = job.point;
      if (visited.contains(curPoint)) {
        continue;
      }
      visited.add(curPoint);

      if (curPoint.equals(item)) {
        return job.distance / 2;
      }

      Point[] nextPoints = new Point[]{curPoint.up(), curPoint.down(), curPoint.left(), curPoint.right()};
      int nextDistance = job.distance + 1;
      for (Point nextPoint : nextPoints) {
        if (isPointOnBoard(rects, nextPoint)) {
          dq.add(new Job(nextPoint, nextDistance));
        }
      }
    }
    
    return answer;
  }

  boolean isPointOnBoard(List<Rect> rects, Point p) {
    boolean isOnBoard = false;
    for (Rect rect : rects) {
      PointPosition pp = getPointPosition(rect, p);
      if (pp == PointPosition.INSIDE) {
        return false;
      }
      if (pp == PointPosition.ON_BOARD) {
        isOnBoard = true;
      }
    }
    return isOnBoard;
  }

  PointPosition getPointPosition(Rect rect, Point p) {
    if (rect.leftDown.x < p.x && p.x < rect.rightUp.x &&
        rect.leftDown.y < p.y && p.y < rect.rightUp.y) {
      return PointPosition.INSIDE;
    }

    if (((p.x == rect.leftDown.x) || (p.x == rect.rightUp.x)) &&
        (rect.leftDown.y <= p.y && p.y <= rect.rightUp.y)) {
      return PointPosition.ON_BOARD;
    }
    if (((p.y == rect.leftDown.y) || (p.y == rect.rightUp.y)) &&
        (rect.leftDown.x <= p.x && p.x <= rect.rightUp.x)) {
      return PointPosition.ON_BOARD;
    }

    return PointPosition.OUTSIDE;
  }
}

/*
후기:

여러가지 방법이 있었는데 고민하다가 시간을 많이 쏟았고, 그냥 코딩량이 많았다.

생각했던건 입력 자체가 별로 많지 않으니, 모든 사각형을 돌면서 맵에 색칠을 해서 태두리를 구하면 되지 않을까란 생각. 변은 1을 더하고, 내부면은 2를 더한다.
최종적으로 1또는 2인 지점이 태두리.

*/
