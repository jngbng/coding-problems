/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/12987
시간: 08:29 ~ 08:36 (7m)
메모:

A팀, B팀을 정렬하고
B팀원이 최대효율로 이기도록 하는 경우의 수를 새면 된다.

*/

import java.util.*;

class Solution {
    public int solution(int[] aTeam, int[] bTeam) {
        int answer = 0;

        Arrays.sort(aTeam);
        Arrays.sort(bTeam);

        int aIdx = aTeam.length - 1;
        int bIdx = bTeam.length - 1;

        while (bIdx >= 0 && aIdx >= 0) {
          if (bTeam[bIdx] > aTeam[aIdx]) {
            answer++;
            bIdx--;
            aIdx--;
          } else {
            aIdx--;
          }
        }
        
        return answer;
    }
}
