/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/12979
시간: 08:24 ~ 08:46 (22m)
메모:

greedy로 전파가 닿지 않는 매 구간을 커버하는 최소한의 수를 다 더하면 되나?

*/

class Solution {

  int minNum(int from, int to, int width) {
    if (from > to) {
      return 0;
    }
    // (to - from + 1 + width - 1) / width;
    return (to - from + width) / width;
  }
  
  public int solution(int n, int[] stations, int w) {
    int answer = 0;

    int width = 2 * w + 1;

    int prevCoverRight = 0;
    for (int station : stations) {
      int coverLeft = station - w;
      // calc to cover [prevCoverRight + 1, coverLeft - 1]
      answer += minNum(prevCoverRight + 1, coverLeft - 1, width);
      prevCoverRight = station + w;
    }
    // calc to cover [prevCoverRight + 1, n]
    answer += minNum(prevCoverRight + 1, n, width);
    
    return answer;
  }
}

/*
후기:
생각보다 오래 걸렸네.

이게 최소인 것의 증명은?
이웃한 전파가 닿지 않는 구간을 커버하기 위해 설치하는 기지국은 나의 전파가 닿지 않는 구간을 변경시키지 않는다.
   |  X  |....|  X  |
       ^^      ^^ 
왜냐면 나의 전파가 닿지 않는 구간을 변경시키리면 ^ 표시된 구간에 기지국을 설치해야 하는데, 그러면 자신의 구간을 커버할 수가 없게 된다.
따라서 개별 전파가 닿지 않는 구간을 커버하는 문제는 독립된 문제다.
개별 문제의 최적 답을 구해서 더하면 된다.
*/
