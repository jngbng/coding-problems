/*
프로젝트 순서와 종속관계.
이건 topology sort로 정렬하고 뒤에서 부터 수행해나가면 된다.
loop가 있으면 당연히 정렬이 안될거다.

위상 정렬을 생각해보면

a -> b---\
 \-> c -> d
          \
d--------/


일단 DAG가 되어야 한다.

의존성을 그래프로 만들고 bfs를 하면 된다.

b 가 a 노드에 의존성이 있으면 b -> a 로 엣지가 생긴다. [a,b]

순회 중에 cycle을 만나면 에러를 내면된다.

의존성 엣지를 뒤집으면 dfs, 지금으로 두면 bfs.

단 여기서 bfs를 시작하는 노드는 incoming edge가 없는 node에서 시작해야 한다.

여기서 싸이클은 어떻게 찾나?

싸이클은 각 노드별로 접근 가능한 노드셋을 관리하면서 계속 확장해 나가는데, 그 노드셋에 자기가 발생하는 지 본다.

*/


function toposort(nodes, edges) {
  
}
