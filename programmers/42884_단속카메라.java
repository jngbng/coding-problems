/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/42884
시간: 08:06 ~ 08:19 (13m)
메모:

지점: ~30K - 30K
차량: 10K
모든 구간을 포함하도록하는 점의 최소 갯수.

구간 끝점 기준으로 정렬해서 뽑으면서,
- 구간이 마지막 설치 지점과 겹치면 패스
- 아니면 해당 지점의 마지막에 설치.

이게 최소가 될 수 있나?
카메라를 설치하기 위해 선택한 구간들은 서로 겹치지 않는 구간들이다.
따라서 최소 이 구간들 갯수 이상은 설치해야만 이 구간들을 커버할 수 있다.
즉, 카메라 수가 더 적을 순 없다.

*/

import java.util.*;

class Span implements Comparable<Span> {
  int start;
  int end;

  Span(int start, int end) {
    this.start = start;
    this.end = end;
  }

  @Override
  public int compareTo(Span other) {
    return end - other.end;
  }
}

class Solution {
    public int solution(int[][] routes) {
        int answer = 0;

        Queue<Span> pq = new PriorityQueue<Span>(routes.length);
        for (int[] route : routes) {
          pq.add(new Span(route[0], route[1]));
        }

        int lastPoint = Integer.MIN_VALUE;
        while (!pq.isEmpty()) {
          Span route = pq.remove();
          if (route.start <= lastPoint) {
            continue;
          }
          lastPoint = route.end;
          answer++;
        }
        
        return answer;
    }
}
