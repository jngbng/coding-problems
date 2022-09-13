/*
1개는? 그냥 스캔 O(N)

k개를 정렬 상태로 유지하면서 전체 스캔. O(K*N). 메모리 O(K)

min-heap 만들고 k개 팝. heap 생성은 O(N). k개 팝은 O(K log N). 
전체 시간은 O(N + K logN). 메모리 O(N)

전체 정렬하고 앞에 k개 선택. O(N log N). 메모리는 O(N) 원본 유지한다 가정.
*/

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function heapify(arr, i) {
  if (i >= arr.length) {
    return;
  }
  const leftChild = 2 * i + 1;
  const rightChild = 2 * i + 2;

  if (leftChild >= arr.length) {
    return;
  }

  let smallest = leftChild;
  if (rightChild < arr.length && arr[rightChild] < arr[leftChild]) {
    smallest = rightChild;
  }

  if (arr[i] > arr[smallest]) {
    swap(arr, i, smallest);
    heapify(arr, smallest);
  }
}

function buildHeap(arr) {
  for (let i = (arr.length >> 1) - 1; i >=0; --i) {
    heapify(arr, i);
  }
  return arr;
}

// console.log(buildHeap([6, 5, 3, 1, 2, 3, 4]));
// console.log(popMin(buildHeap([6, 5, 3, 1, 2, 3, 4])));

function popMin(arr) {
  if (arr.length == 0) {
    throw new Error("Pop empty");
  }
  const ret = arr[0];
  if (arr.length == 1) {
    arr.pop();
    return ret;
  }
  arr[0] = arr.pop();
  heapify(arr, 0);
  return ret;
}

function findKMins(arr, k) {
  if (arr == null || arr.length < k) {
    return null;
  }
  const ret = [];
  buildHeap(arr);
  for (let i = 0; i < k; ++i) {
    ret.push(popMin(arr));
  }
  return ret;
}

console.log(findKMins([6, 5, 3, 1, 2, 3, 4], 3));
