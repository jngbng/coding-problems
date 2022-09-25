/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/64062
시간: 21:57 ~ 22:20 (23m)
메모:

[2, 4, 5, 3, 2, 1, 4, 2, 5, 1]  3       3
[1, 3, 4, 2, 1, 0, 3, 1, 4, 0] - 1명.
[0, 2, 3, 1, 0, -1, 2, 0, 3, -1] - 2명.


정답이 t라고 했을 때, a[i : i+k-1] - t <= 0 인 i가 존재하는가?
이 t중 가장 큰 값은?

parametric search?

*/

class Solution {

  int[] stones;
  int k;

  boolean canPass(int t) {
    int underCount = 0;
    for (int stone : stones) {
      if (stone < t) {
        underCount++;
        if (underCount >= k) {
          return false;
        }
      } else {
        underCount = 0;
      }
    }
    return true;
  }

  int search(int from, int to) {
    if (from == to) {
      if (canPass(from)) {
        return from;
      } else {
        return from - 1;
      }
    }

    int midValue = (from + to) / 2;
    if (canPass(midValue)) {
      return search(midValue + 1, to);
    } else {
      return search(from, midValue);
    }
  }
  
  public int solution(int[] stones, int k) {
    this.stones = stones;
    this.k = k;

    return search(1, 200_000_000);
  }
}
