/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/43163
시간: 08:41 ~ 09:06 (25m)
메모:

leetcode (cracking coding interview)에서 풀었었던 문제.
각 단어를 node로 보고, 
글자가 하나만 차이나는 경우에 간선이 있다 생각.
시작지점에서 끝 지점으로 가는 최소 거리는 BFS/DFS로 구할 수 있다.
*/

import java.util.*;

class Job implements Comparable<Job> {
  int node;
  int cost;

  Job(int node, int cost) {
    this.node = node;
    this.cost = cost;
  }

  @Override
  public int compareTo(Job other) {
    return cost - other.cost;
  }
}
  

class Solution {

  boolean isAdjacent(String from, String to) {
    int size = from.length();
    int diff = 0;
    for (int i = 0; i < size; ++i) {
      if (from.charAt(i) != to.charAt(i)) {
        diff++;
        if (diff > 1) {
          return false;
        }
      }
    }
    return diff == 1;
  }
  
  
  public int solution(String begin, String target, String[] words) {
    int nodeSize = words.length + 2;
    //
    List<String> nodes = new ArrayList<String>(nodeSize);
    nodes.add(begin);
    for (String word : words) {
      nodes.add(word);
    }
    nodes.add(target);
    //
    List<Integer>[] adj = new List[nodeSize];
    for (int i = 0; i < nodeSize; ++i) {
      adj[i] = new ArrayList<Integer>();
    }
    //
    for (int i = 0; i < nodeSize; ++i) {
      for (int j = i + 1; j < nodeSize; ++j) {
        if (isAdjacent(nodes.get(i), nodes.get(j))) {
          adj[i].add(j);
          adj[j].add(i);
        }
      }
    }
    // bfs
    int[] visit = new int[nodeSize];
    Arrays.fill(visit, Integer.MAX_VALUE);
    Queue<Job> pq = new PriorityQueue<Job>();
    pq.add(new Job(0, 0));
    while (!pq.isEmpty()) {
      Job job = pq.remove();
      if (visit[job.node] <= job.cost) {
        continue;
      }
      visit[job.node] = job.cost;
      
      List<Integer> neighbors = adj[job.node];
      int nextCost = job.cost + 1;
      for (int neighbor : neighbors) {
        pq.add(new Job(neighbor, nextCost));
      }
    }
    
    int answer = visit[nodeSize - 1];
    
    return (answer == Integer.MAX_VALUE) ? 0 : answer;
  }
}

/*
후기:
아는 문제인데, 단순 그래프 코딩량이 많아서인지 오래 걸렸다.
*/
