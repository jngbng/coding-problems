/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/12971
시간: 21:50 ~ 22:10 (20m)
메모:

DP:

선택하는데, 연결되지 않은 원소를 선택해서 값이 최대가 되도록. 끝은 처음과 연결됨.
처음을 선택하면 끝은 선택 못함.
sol(n, canPickTail): n 이후의 스티커를 이용해서 만들 수 있는 sum의 최대값. tail 가용 여부.
sol(n, canPickTail): 
  max(sol(n+1), a[n] + sol(n+2))
  n == tail then canPickTail ? a[n] : 0

depth가 너무 100,000 이라서 recur로는 안되고 iter로 해야함.

*/

class Solution {
  public int solution(int sticker[]) {
    int answer = 0;
    int size = sticker.length;

    if (size == 1) {
      return sticker[0];
    }
    if (size == 2) {
      return Math.max(sticker[0], sticker[1]);
    }

    int[] sumWithTail = new int[size];
    int[] sumWOTail = new int[size];

    sumWithTail[size - 1] = sticker[size - 1];
    sumWithTail[size - 2] = Math.max(sticker[size - 2], sticker[size-1]);
    sumWOTail[size - 2] = sticker[size - 2];

    for (int i = size - 3; i >= 0; --i) {
      sumWithTail[i] = Math.max(sumWithTail[i + 1], sticker[i] + sumWithTail[i + 2]);
      sumWOTail[i] = Math.max(sumWOTail[i + 1], sticker[i] + sumWOTail[i + 2]);
    }

    return Math.max(sumWithTail[1], sumWOTail[0]);
  }
}

/*
제출 & 디버그 5분.
*/
