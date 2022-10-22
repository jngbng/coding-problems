/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/131702
시간: 21:52 ~ 23:35 (tue), 16:00 ~ 17:00
메모:

돌리는 순서는 상관이 없다.
최대 3번까지만 돌려도 된다.
모든 2 <= size <=8.

모든 경우는 수는 4^(size^2) 이다.

4^64 = 2^128 = 2^(10 * 12) ~= 10^(3*12)

일단 무식하게 다 검사하는건 안될 것 같다.

어떤 점을 잡았을 때, 현재 상태가 t, 그 점을 기준으로 자신/위/아래/좌/우 의 회전수를

T/T/D/L/R 라고 하면 (t + T + L + R + U + D) % 4 == 0 이어야 한다.

일단 이차원만 생각해보자.

왼쪽 끝에서 부터 진행해 나가면 회전수를 [0-3]중 하나로 선택했을 때, 그 다음 칸 부터는 선택지가 고정된다.

이차원으로 확장해보자.

첫 줄의 각 행별로 회전수를 골랐다고 하자. 그 다음 줄은 첫 줄을 모두 0으로 만들기 위해 선택지가 고정된다.

마찬가지 이유로 그 다음 줄도 모두 고정된다. 물론 해결 불가능할 수도 있다.

따라서 4^N의 경우를 고려하면 풀 수 있다. 4^8 = 2^16 ~= 64,000 정도의 경우의 수.

*/

import java.util.*;

class Solution {
  public int solution(int[][] clockHands) {
    int size = clockHands.length;
    int min = Integer.MAX_VALUE;

    int[] choice = new int[size];
    int maxSize = pow(4, size);
    for (int i = 0; i < maxSize; ++i) {
      int count = solveCount(size, choice, clockHands);
      if (count < min) {
        min = count;
      }
      nextChoice(choice);
    }

    return min;
  }

  int pow(int base, int exp) {
    int ret = 1;
    for (int i = 0; i < exp; ++i) {
      ret *= base;
    }
    return ret;
  }

  void nextChoice(int[] choice) {
    for (int i = 0; i < choice.length; ++i) {
      choice[i]++;
      if (choice[i] == 4) {
        choice[i] = 0;
      } else {
        break;
      }
    }
  }

  int solveCount(int size, int[] firstChoice, int[][] puzzle) {
    int count = 0;

    int[] prevChoice = new int[size];
    int[] curChoice = new int[size];
    int[] curRow = new int[size];

    copy(curChoice, firstChoice);

    for (int i = 0; i < size; ++i) {
      for (int choice : curChoice) {
        count += choice;
      }
      calcRow(size, curRow, puzzle[i], prevChoice, curChoice);

      int[] tmp = prevChoice;
      prevChoice = curChoice;
      curChoice = tmp;

      complement(size, curChoice, curRow);
    }
    for (int elem : curRow) {
      if (elem != 0) {
        return Integer.MAX_VALUE;
      }
    }
    return count;
  }

  void calcRow(int size, int[] out, int[] row, int[] prevChoice, int[] curChoice) {
    int endIdx = size - 1;
    out[0] = (row[0] + prevChoice[0] + curChoice[0] + curChoice[1]) % 4;
    for (int i = 1; i < endIdx; ++i) {
      out[i] = (row[i] + prevChoice[i] + curChoice[i - 1] + curChoice[i] + curChoice[i + 1]) % 4;
    }
    out[endIdx] = (row[endIdx] + prevChoice[endIdx] + curChoice[endIdx - 1] + curChoice[endIdx]) % 4;
  }

  void copy(int[] toArray, int[] fromArray) {
    System.arraycopy(fromArray, 0, toArray, 0, toArray.length);
  }

  void complement(int size, int[] out, int[] row) {
    for (int i = 0; i < size; ++i) {
      out[i] = (4 - row[i]) % 4;
    }
  }

  int[] calcNextChoice(int[] row, int[] choice) {
    int size = row.length;
    int[] next = new int[size];
    for (int i = 0; i < size; ++i) {
      next[i] = (8 - row[i] - choice[i]) % 4;
    }
    return next;
  }
}
