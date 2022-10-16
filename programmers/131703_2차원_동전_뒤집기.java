/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/131703
시간: 09:09 ~ 09:56 (47m)
메모:

10x10 이하다. 불안한데?

flip이기 때문에 뒤집는 열이나 행의 순서는 의미가 없다.

동일한 행/열을 두번 뒤집어도 의미가 없다.

뒤집을 행들을 r[i]라고 하고, 뒤집을 열들을 c[i]라고 하면

forall i,j, begin[i][j] = target[i][j] ^ r[i] ^ c[j]

가 되는 최소 sum(r) + sum(c)은?

예시에서처럼 열 단위로 맞춰 나간다고 생각하면,

1열을 맞추는 방법은

1. 정답과 비교해서 다른 행들을 플립하거나
2. 먼저 현재 열을 플립했다고 생각하고, 정답과 비교해서 같은 행들을 플립한다.


2~나머지 열에서는 행을 플립할 수가 없다. 1열이 틀어지니깐.
나머지는 그냥 동일한가, 정반대인가만 확인하면서 진행해야 한다.
*/

import java.util.*;

class Solution {
  public int solution(int[][] beginning, int[][] target) {
    int colSize = beginning[0].length;

    int[] diff = new int[colSize];
    int diffCount = 0;
    for (int i = 0; i < colSize; ++i) {
      diff[i] = beginning[0][i] ^ target[0][i];
      if (diff[i] != 0) {
        diffCount++;
      }
    }

    // 0행 안 뒤집은 경우
    int countNoFlipFirst = diffCount;
    int remainCount = calcMatchRemain(beginning, diff, target);
    if (remainCount >= 0) {
      countNoFlipFirst += remainCount;
    } else {
      countNoFlipFirst = Integer.MAX_VALUE;
    }

    int countFlipFirst = 1 + colSize - diffCount;
    for (int i = 0; i < colSize; ++i) {
      diff[i] = diff[i] ^ 1;
    }
    remainCount = calcMatchRemain(beginning, diff, target);
    if (remainCount >= 0) {
      countFlipFirst += remainCount;
    } else {
      countFlipFirst = Integer.MAX_VALUE;
    }

    int answer = Math.min(countNoFlipFirst, countFlipFirst);
    return answer == Integer.MAX_VALUE ? -1 : answer;
  }

  int calcMatchRemain(int[][] beginning, int[] flip, int[][] target) {
    int count = 0;
    int rowSize = beginning.length;
    for (int row = 1; row < rowSize; ++row) {
      MatchStatus status = calcMatchStatus(beginning[row], flip, target[row]);
      switch (status) {
      case FLIP:
        count++;
        break;
      case UNMATCH:
        return -1;
      default:
        continue;
      }
    }
    return count;
  }

  enum MatchStatus {
    SAME,
    FLIP,
    UNMATCH
  }

  MatchStatus calcMatchStatus(int[] beginning, int[] flip, int[] target) {
    int firstDiff = (beginning[0] ^ flip[0] ^ target[0]);
    for (int i = 1; i < beginning.length; ++i) {
      if (firstDiff != (beginning[i] ^ flip[i] ^ target[i])) {
        return MatchStatus.UNMATCH;
      }
    }
    if (firstDiff == 0) {
      return MatchStatus.SAME;
    } else {
      return MatchStatus.FLIP;
    }
  }
}
