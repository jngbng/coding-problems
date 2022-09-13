/*
중간값 트레킹.
본문에 있었던 것. maxHeap, minHeap 동시에 쓰는거.

큰 절반은 minHeap에 넣고, 작은 절반은 maxHeap 에 넣으면
중간 값 둘을 알 수 있다.
새로운 값이 들어오면 maxHeap max 보다 크면 minHeap에 넣고, 아니면 maxHeap에.

크기가 2이상 차이나게 되면, 하나 팝해서 다른 쪽으로 옮긴다.

하나 추가할 때 cost는 O(log N)이고, 중간 값을 아는데는 O(1)이 든다. 공간은 O(N)

*/

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function heapifyDown(arr, compare, i) {
  if (i >= arr.length) {
    return;
  }
  const leftChild = 2 * i + 1;
  const rightChild = 2 * i + 2;

  if (leftChild >= arr.length) {
    return;
  }
  
  let child = leftChild;
  if (rightChild < arr.length && compare(arr[rightChild], arr[leftChild]) < 0) {
    child = rightChild;
  }
  if (compare(arr[child], arr[i]) < 0) {
    swap(arr, i, child);
    heapifyDown(arr, compare, child);
  }
}

function heapifyUp(arr, compare, i) {
  if (i <= 0) {
    return;
  }
  const parent = (i - 1) >> 1;
  if (compare(arr[i], arr[parent]) < 0) {
    swap(arr, parent, i);
    heapifyUp(arr, compare, parent);
  }
}

class Heap {
  constructor(compare) {
    this.compare = compare;
    this.data = [];
  }

  peek() {
    if (this.data.length == 0) {
      return null;
    }
    return this.data[0];
  }

  pop() {
    if (this.data.length == 0) {
      return null;
    }
    let ret = this.data[0];
    if (this.data.length == 1) {
      this.data.pop();
      return ret;
    }
    this.data[0] = this.data.pop();
    heapifyDown(this.data, this.compare, 0);
    return ret;
  }

  add(elem) {
    this.data.push(elem);
    heapifyUp(this.data, this.compare, this.data.length - 1);
  }

  get size() {
    return this.data.length;
  }
}

class MedianTracker {
  constructor() {
    this.smallHalf = new Heap((a,b) => b - a);
    this.bigHalf = new Heap((a,b) => a - b);
  }

  add(elem) {
    const mid = this.smallHalf.peek();
    if (mid == null) {
      this.smallHalf.add(elem);
      return;
    }
    if (mid < elem) {
      this.bigHalf.add(elem);
    } else {
      this.smallHalf.add(elem);
    }
    this.checkBalance();
  }

  get median() {
    return this.smallHalf.peek();
  }

  checkBalance() {
    const diff = this.smallHalf.size - this.bigHalf.size;
    if (diff == 0) {
      return;
    }
    if (diff == -1) {
      this.smallHalf.add(this.bigHalf.pop());
    }
    if (diff == 2) {
      this.bigHalf.add(this.smallHalf.pop());
    }
  }
}

function test() {
  const medianTracker = new MedianTracker();

  const stream = [1, 10, 3, 7, 5, 3, 6, 2, 1, 9, 8, 5];
  //              1   1  3  3  5  3  5  3  3  3  5  5
  for (const elem of stream) {
    medianTracker.add(elem);
    console.log(medianTracker.median);
  }
}

test();
