/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/68646

메모:
과정은 중요치 않다. 찬스를 쓰지 않으면 남는건 가장 작은 애다.

(pre) X (post)

가 있을 때 X를 남기는 방법을 고민해보자.

(post) 를 죄다 없애서 min_post만 남기고
(pre)를 죄다 없애서 min_pre만 남긴다.

X > min_pre, min_post
인 상황이라면 X를 남길 수가 없다.

min_pre < X < min_post 또는 반대
인 상황이라면 찬스를 한번 써서 남길 수 있다.

X < min_pre, min_post
인 상황이라면 찬스도 필요 없다.

X > min_pre, min_post
인 X를 재외하면서 새면 된다.
*/

import java.util.*;

class Solution {
    public int solution(int[] a) {
        int size = a.length;
        
        // 길이가 1, 2 일 때는 무조건 가능.
        if (size < 3) {
            return size;
        }
        
        int[] postMin = new int[size];
        int[] preMin = new int[size];
        
        int curMin = Integer.MAX_VALUE;
        for (int i = 0; i < size; ++i) {
            if (a[i] < curMin) {
                curMin = a[i];
            }
            preMin[i] = curMin;
        }
        
        curMin = Integer.MAX_VALUE;
        for (int i = size - 1; i > -1; --i) {
            if (a[i] < curMin) {
                curMin = a[i];
            }
            postMin[i] = curMin;
        }
        
        // 시작과 끝은 무조건 가능.
        int answer = 2;
        int endI = size - 1;
        for (int i = 1; i < endI; ++i) {
            int cur = a[i];
            if (cur > preMin[i-1] && cur > postMin[i+1]) {
                continue;
            }
            answer++;
        }
        
        return answer;
    }
}
