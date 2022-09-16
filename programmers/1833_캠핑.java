/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/1833
소요시간: 8:40 ~ 10:00 (1h 20m)

메모:
x축 기준으로 정렬하고, 한점을 선택하고, 오른쪽에 있는걸 고르면 중복은 피할 수 있겠다.
한 점 (x,y) 을 선택하면 가능한 점은 (x+1) 이후의 점들인데, y축은 안되고.
(x2, y2) 를 고르면
- y2 > y 일 경우, (x2+, y2+1) 이후의 점들은 안됨.
- y2 < y 일 경우, (x2+, y2-1) 점들은 안됨.
요렇게 가능한 y범위를 줄여 나가면서 스캔해 나가면?

한 점에 대해서 이후 점들을 다 봐야 하니깐 O(N^2)인데..

x순으로 정렬되고, y순으로 정렬해둘 필요가 있는데
*/

import java.util.*;

class Solution {
    public int solution(int n, int[][] data) {
        if (n == 0) {
            return 0;
        }
        // x축, y축 순으로 정렬
        Arrays.sort(data, new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                int compareByX = a[0] - b[0];
                if (compareByX == 0) {
                    return a[1] - b[1];
                }
                return compareByX;
            }
        });
        // x축 값 기준으로 split
        List<List<Integer>> points = new ArrayList();
        int curX = -1;
        List<Integer> curList = null;
        for (int[] point : data) {
            int x = point[0];
            if (x != curX) {
                curX = x;
                curList = new ArrayList<Integer>();
                points.add(curList);
            }
            curList.add(point[1]);
        }

        int answer = 0;

        int listSize = points.size();
        for (int i = 0; i < listSize - 1; ++i) {
            List<Integer> curPoints = points.get(i);
            for (int y1 : curPoints) {
                int maxY = Integer.MAX_VALUE; // y1 + 1 ~ maxY 까지 가능
                int minY = -1; // minY ~ y1 - 1 까지 가능
                for (int j = i + 1; j < listSize; ++j) {
                    List<Integer> nextPoints = points.get(j);
                    int nextPointsSize = nextPoints.size();
                    // 일단 무식하게
                    // minY ~ y1-1 갯수 확인 및 minY 업데이트
                    for (int k = 0; k < nextPointsSize; ++k) {
                        int y2 = nextPoints.get(k);
                        if (y2 >= y1) {
                            break;
                        }
                        if (y2 >= minY) {
                            answer++;
                            minY = y2;
                        }
                    }
                    // y1+1 ~ maxY 갯수 확인 및 maxY 업데이트
                    for (int k = nextPointsSize - 1; k >= 0; --k) {
                        int y2 = nextPoints.get(k);
                        if (y2 <= y1) {
                            break;
                        }
                        if (y2 <= maxY) {
                            answer++;
                            maxY = y2;
                        }
                    }
                }
            }
        }
        return answer;
    }
}

/*
후기:
방법이 맞나 자신이 없어서 고민하는데 시간 소비. - 더 효율적인 데이터 구조가 뭐가 있을까?
순회 도는 부분에서 minY, y1, maxY 찾는 부분을 binarySearch로 최적화해서 구현하려다가 시간을 많이 낭비.
*/
