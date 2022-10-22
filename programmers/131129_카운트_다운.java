/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/131129
시간: 17:52 ~ 18:20, 19:20 ~ 19:46 (54m)
메모:

최선의 경우의 다트 수, 싱글 or 불 횟수.

dynamic인가?

sol(n) = n점을 획득하는 Min(총 횟수 * 100,000 - 싱/불 횟수)

sol(n) = Min [total + 1, singBool + isSingBool(x)] for [total, singBool] = sol(n - x) for x in Cases

그런데 던지는 순서는 상관 없음. 그래서 동전으로 거스름돈 만드는 문제랑 비슷.

총 횟수는 적어야니깐, 높은 점수부터 깍는게 유리.

같은 횟수일 때는 싱글/불이 많은 쪽.

PriorityQueue 써서 실제로 던지는걸 시뮬레이션 하면서 돌리면?

*/

int java.util.*;

class Solution {
  public int[] solution(int target) {
    return sol(target);
  }

  long BASE = 1_000_000;

  int[] sol(int target) {
    long[] cache = new long[target + 1];

    for (int i = 1; i <= target; ++i) {
      long ret = Long.MAX_VALUE;
      // bull
      if (i >= 50) {
        ret = cache[i - 50] + BASE - 1;
      }
      for (int point = 1; point <= 20; ++point) {
        int remainPoint = i - point;
        // single
        if (remainPoint < 0) {
          continue;
        }
        long subRet = cache[remainPoint] + BASE - 1;
        if (subRet < ret) {
          ret = subRet;
        }
        // double
        remainPoint -= point;
        if (remainPoint < 0) {
          continue;
        }
        subRet = cache[remainPoint] + BASE;
        if (subRet < ret) {
          ret = subRet;
        }
        // triple
        remainPoint -= point;
        if (remainPoint < 0) {
          continue;
        }
        subRet = cache[remainPoint] + BASE;
        if (subRet < ret) {
          ret = subRet;
        }
      }
      cache[i] = ret;
    }

    long ret = cache[target];
    int total = (int)(ret / BASE);
    int singBull = (int)(ret % BASE);

    if (singBull != 0) {
      total++;
      singBull = (int)BASE - singBull;
    }

    return new int[]{total, singBull};
  }
}

/*

결론적으로는 확신이 없어서 이것 저것 고민하다가 오래 걸렸네.

*/
