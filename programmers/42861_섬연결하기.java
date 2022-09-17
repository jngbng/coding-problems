/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/42861
시간: 08:11 ~ 08:21 (10m)
메모:

MST 만들기.
*/

import java.util.*;

class Solution {

  int find(int[] parents, int node) {
    int parent = parents[node];
    if (parent == node) {
      return parent;
    }
    parents[node] = find(parents, parent);
    return parents[node];
  }

  boolean merge(int[] parents, int from, int to) {
    int fromRoot = find(parents, from);
    int toRoot = find(parents, to);
    if (fromRoot == toRoot) {
      return false;
    }
    parents[toRoot] = fromRoot;
    return true;
  }
  
  public int solution(int n, int[][] costs) {
    int[] parents = new int[n];
    for (int i = 0; i < n; ++i) {
      parents[i] = i;
    }

    Arrays.sort(costs, (cost1, cost2) -> cost1[2] - cost2[2]);

    int answer = 0;
    int maxEdges = n - 1;
    int edges = 0;
    for (int[] edge : costs) {
      int from = edge[0];
      int to = edge[1];
      int cost = edge[2];
      if (merge(parents, from, to)) {
        answer += cost;
        edges++;
        if (edges == maxEdges) {
          break;
        }
      }
    }
        
    return answer;
  }
}

/*
후기:
다 아는 문제인데 은근 오래 걸렸네.
*/
