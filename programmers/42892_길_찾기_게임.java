/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/42892
시간: 08:37 ~ 09:10 (33m)
메모:

트리를 구성하려면
일단 y축으로 정렬, x 축으로 정렬이 필요.
y축으로 partition 하면 레벨별 노드들이 나오긴한다.

y축 기준으로만 역순 정렬한 다음에 그대로 이진트리 구축하면 되지 않나?
실제 tree를 안만들고 할 수 있는 방법?

*/

import java.util.*;

class Node implements Comparable<Node> {
  int id;
  int x;
  int y;
  Node left;
  Node right;

  Node(int id, int x, int y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  @Override
  public int compareTo(Node other) {
    int diffY = other.y - y;
    if (diffY != 0) {
      return diffY;
    }
    return x - other.x;
  }
}

class Solution {

  void addNode(Node root, Node newNode) {
    boolean isLeft = newNode.x < root.x;
    if (isLeft) {
      if (root.left == null) {
        root.left = newNode;
      } else {
        addNode(root.left, newNode);
      }
    } else {
      if (root.right == null) {
        root.right = newNode;
      } else {
        addNode(root.right, newNode);
      }
    }
  }

  int[] buffer;
  int bufIdx;

  void preOrderAux(Node root) {
    if (root == null) {
      return;
    }
    buffer[bufIdx++] = root.id;
    preOrderAux(root.left);
    preOrderAux(root.right);
  }

  int[] preOrder(Node root, int size) {
    int[] ret = new int[size];
    buffer = ret;
    bufIdx = 0;
    preOrderAux(root);
    buffer = null;
    return ret;
  }

  void postOrderAux(Node root) {
    if (root == null) {
      return;
    }
    postOrderAux(root.left);
    postOrderAux(root.right);
    buffer[bufIdx++] = root.id;
  }

  int[] postOrder(Node root, int size) {
    int[] ret = new int[size];
    buffer = ret;
    bufIdx = 0;
    postOrderAux(root);
    buffer = null;
    return ret;
  }
  
  public int[][] solution(int[][] nodeinfo) {
    int size = nodeinfo.length;
    Queue<Node> pq = new PriorityQueue<Node>(size);
    for (int i = 0; i < nodeinfo.length; ++i) {
      int[] info = nodeinfo[i];
      pq.add(new Node(i + 1, info[0], info[1]));
    }

    // 일단 무식하게 tree 구성
    Node root = pq.remove();
    while (!pq.isEmpty()) {
      addNode(root, pq.remove());
    }

    int[][] answer = new int[2][];
    answer[0] = preOrder(root, size);
    answer[1] = postOrder(root, size);
    
    return answer;
  }
}
