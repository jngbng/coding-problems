/*
LRU: Least Recently Used

last used timestamp를 같이 기록하고, evict할 때는 ts가 가장 작은 애를 골라야 한다.

보통 cache를 만들 때는 through 기능이 필요해서 function을 받는 high-order로 구성하기도 하는데,

여기서는 단순 key / value로 저장하도록 하고, 이 패어는 주어진다고 하겠다.

추가적으로 cache면 WeakReference를 써야 하는데, 지금은 무시하고 넘어가겠다.

1. 그러면 key / value 를 알고 있어야 하고, 
2. 각 entry는 사용된 마지막 시간(ts)을 알고 있어야 한다.
3. cache를 위해 key에 매핑된 value를 빠르게 알 수 있어야 한다.
4. 사용될 때 마다 entry의 사용 시간이 업데이트 되어야 한다.
5. eviction을 위해 가장 ts가 작은 애를 알 수 있어야 한다.

cache의 용도를 생각하면 당연히 cache hit이 많을 때 빠르게 동작해야 한다.
그래서 3,4가 빠르게 동작해야 하고, 5는 조금 느려도 된다.

가장 간단한건 HashMap을 써서 key/(value,ts)를 보관하고, 삭제할 때는 전체 값을 순회하며 ts가 가장 작은 애를 찾는다.

access best: O(1), access worst: O(N), insert best: O(1), insert worst: O(N)


다음으로는 insertion-order가 보장되는 map을 쓰는거다. JS/Python3에서 이건 기본이고 Java는 LinkedHashMap을 쓰면 된다. 키가 사용될 때 키를 삭제 후 다시 추가하는 핵을 쓸 수 있다. 이런 경우는 정렬된 상태로 키를 추가하거나 삭제할 수 있어야 하기 때문에 O(log N)이 든다. 정말 그런가? Java 설명은 키-value를 hashmap으로 가지고, 입력 순서를 유지하기 위한 entrie들이 double linked list로 연결 된다.

terminal entrie들을 linked list로 유지하고, 이 노드를 다시 hashmap으로 관리하면

access와 insert를 모두 O(1)으로 유지할 수 있을 것 같다.

*/

class KeyValueEntry {
  constructor(key, value) {}
}

class LinkedListNode {
  constructor(value) {}
  insertBefore(node) {}
  insertAfter(node) {}
  delete() {}
  get value() {}
}

class LinkedList {
  constructor() {}
  /* LinkedListNode */ insertLast(value) {}
  /* void */ moveToLast(node) {}
  /* value */ deleteFront() {}
  get size() {}
}

class LRUCache {
  constructor(size) {
    this.size = size;
    this.entries = new LinkedList();
    this.entryByKey = new Map();
  }

  getByKey(key) {
    const node = this.entryByKey.get(key);
    if (node == null) {
      return null;
    }
    return node.value.value;
  }

  setByKey(key, value) {
    const node = this.entryByKey.get(key);
    if (node != null) {
      node.value = new KeyValueEntry(key, value);
      this.entries.moveToLast(node);
      return;
    }
    this.evictIfNecessary();
    this.insert(key, value);
  }

  isFull() {
    return this.entries.size >= this.size;
  }

  insert(key, value) {
    const node = this.entries.insertLast(new KeyValueEntry(key, value));
    this.entryByKey.set(key, node);
  }

  evictIfNecessary() {
    // for safer design if -> while
    if (this.isFull()) {
      this.evict();
    }
  }

  evict() {
    const kvEntry = this.entries.deleteFront();
    this.entryByKey.delete(kvEntry.key);
  }
}
