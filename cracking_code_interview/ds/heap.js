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
