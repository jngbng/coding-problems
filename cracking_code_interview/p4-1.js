/*
그래프는 어떤 모양으로 주어지나? list? matrix?
> matrix

그래프는 전체가 인메모리에 있다고 봐도 되나?
> yes

추가 자료형은 써도 되나?
> ㅇㅇ

재일 간단한거는 DFS/BFS 탐색인데, 아무래도 BFS 탐색이 유리할 것 같다.

adj matrix 라면 backref를 알 수 있기 때문에 bidirectional search 로 더 빠르게 할 수 있겠다.

adj list라면 backref를 계산하는 작업을 추가로 해줘야 한다.

adj list / bfs로 해보겠다.
*/


class Graph {
  // Node[] nodes; // all nodes
}

class Node {
  // String name;
  // boolean marked;
  // boolean visited;
  // Node[] children;
}

function bfs(startNode, visitFn) {
  // visitFn(node)가 truthy면 해당 값을 반환하며 종료.
  const queue = [];
  let node = startNode;
  node.marked = true;
  queue.push(node);
  while (queue.length > 0) {
    node = queue.shift();
    const ret = visitFn(node);
    if (ret != null) {
      return ret;
    }
    // visit
    for (const child of node.children) {
      if (!child.marked) {
        child.marked = true;
        queue.push(child);
      }
    }
  }
  return undefined;
}

function isReachable(graph, fromNode, toNode) {

  // TODO: check fromNode, toNode in graph.nodes
  if (graph.nodes.indexOf(fromNode) < 0 ||
      graph.nodes.indexOf(toNode) < 0) {
    return false;
  }

  // initMarked(graph);
  // let found = bfn(fromNode, function (node) {
  //   return (node == toNode) ?  true : null;
  // });
  const queue = [];
  let node = fromNode;
  node.marked = true;
  queue.push(node);
  while (queue.length > 0) {
    node = queue.shift();
    if (node === toNode) {
      return true;
    }
    // visit
    for (const child of node.children) {
      if (!child.marked) {
        child.marked = true;
        queue.push(child);
      }
    }
  }
  return false;
}
