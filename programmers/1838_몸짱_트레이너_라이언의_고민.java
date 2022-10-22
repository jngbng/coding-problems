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

public class Solution {

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
  
  int calcMaxDistance(int side, int users) {
    if (users < 2) {
      return 0;
    }

    int totalSlot = side * side;
    if (users > (totalSlot + 1) / 2) {
      return 1;
    }
    
    fillDistMap(side, totalSlot);
    
    int maxDist = (side - 1) * 2;
    for (int dist = maxDist; dist > 1; --dist) {
      if (canPick(side, totalSlot, users, dist)) {
        return dist;
      }
    }

    return 1;
  }

  int[][] distMap;

  void fillDistMap(int side, int slots) {
    distMap = new int[slots][slots];
    for (int i = 0; i < slots; ++i) {
      int i_row = i / side;
      int i_col = i % side;
      for (int j = i + 1; j < slots; ++j) {
        int j_row = j / side;
        int j_col = j % side;
        int dist = Math.abs(i_row - j_row) + Math.abs(i_col - j_col);
        distMap[i][j] = dist;
        distMap[j][i] = dist;
      }
    }
  }

  boolean canPick(int side, int totalSlot, int users, int distBetween) {
    for (int firstUser = 0; firstUser < distBetween; ++firstUser) {
      Stack<Integer> selected = new Stack<Integer>();
      selected.push(firstUser);
      int remainUsers = users - 1;
      for (int nextUser = firstUser + 1; nextUser < totalSlot; ++nextUser) {
        if (lessThanAny(selected, nextUser, distBetween)) {
          continue;
        }
        selected.push(nextUser);
        remainUsers--;
        if (remainUsers == 0) {
          return true;
        }
      }
    }
    return false;
  }
  
  boolean lessThanAny(List<Integer> points, int newPoint, int distBetween) {
    for (int p : points) {
      if (distMap[p][newPoint] < distBetween) {
        return true;
      }
    }
    return false;
  }
}


/*

후기.

N x N 정사각형 grid에서 dist N (맨해튼 거리)를 유지하면서 선택할 수 있는 최대 점의 갯수 구하기인데

첫 행에서 시작점 i를 하나 잡고 (index 0과 N 사이의 점), 이후로는 column, row순으로 순회하며 greedy하게

가능한 점을 고른다인데, 이게 max를 보장하는 이유를 모르겠음.

1차원일 때는 너무나 당연하고. 2차원일 때는, 판의 크기가 고정되어 있으니 반례가 있을 것 같았는데 없나?

모든 고르는 경우를 해봐얄 것 같았는데. 왜 그럴까?

반례가 있다고 가정하면... 순차적으로 검사했을 때 만나는 최초의 점인 X가 아닌 그 다음 어딘가 점을 골랐을 때일꺼다.

그리고 X를 안골랐기 때문에 원래는 1점만 가능했을 껄 2점을 더 고를 수 있다...?
*/
