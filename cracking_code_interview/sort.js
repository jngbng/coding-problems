const tap = require('tap');

function genRandomArray(size) {
  const ret = new Array(size);
  for (let i = 0; i < size; ++i) {
    ret[i] = Math.floor(Math.random() * 100000000);
  }
  return ret;
}

function testFn(impl) {
  tap.test(`test ${impl.name}`, t => {
    for (let i = 0; i < 10; i++) {
      const arr = genRandomArray(100);
      const sorted = arr.slice().sort();
      t.same(impl(arr), sorted);
    }
    t.end();
  });
}

function swap(arr, i, j) {
  const val = arr[i];
  arr[i] = arr[j];
  arr[j] = val;
}

function bubbleSort(arr) {
  for (let endIdx = arr.length - 1; endIdx > 0; --endIdx) {
    for (let i = 0; i < endIdx; ++i) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
  }
  return arr;
}

// testFn(bubbleSort);

// function partition(arr, startIncl, endIncl) {
//   const pivot = arr[startIncl];
//   let leftIdx = startIncl + 1;
//   let rightIdx = endIncl;

//   while (leftIdx < rightIdx) {
//     while (leftIdx < rightIdx && arr[leftIdx] < pivot) {
//       leftIdx++;
//     }
//     while (rightIdx > leftIdx && arr[rightIdx] >= pivot) {
//       rightIdx--;
//     }
//     if (leftIdx < rightIdx) {
//       swap(arr, leftIdx, rightIdx);
//     }
//   }
//   if (arr[leftIdx] >= pivot) {
//     leftIdx--;
//   }
//   if (startIncl < leftIdx) {
//     swap(arr, startIncl, leftIdx);
//   } else {
//     leftIdx = startIncl;
//   }

//   return leftIdx;
// }

// function quickSortAux(arr, startIncl, endIncl) {
//   if (startIncl >= endIncl) {
//     return;
//   }
// //  console.log('before partition:', arr);
//   const pivotIdx = partition(arr, startIncl, endIncl);
// //  console.log('after partition:', arr, pivotIdx);
//   quickSortAux(arr, startIncl, pivotIdx - 1);
//   quickSortAux(arr, pivotIdx + 1, endIncl);
// }
                      
// function quickSort(arr) {
//   if (arr == null || arr.length <= 0) {
//     return arr;
//   }
//   quickSortAux(arr, 0, arr.length - 1);
//   return arr;
// }

// //console.log(quickSort([4, 3, 2]));
// testFn(quickSort);


function partitionBook(arr, startIncl, endIncl) {
  const midIdx = ((startIncl + endIncl) / 2) | 0;
  const pivot = arr[midIdx];

  let leftIdx = startIncl;
  let rightIdx = endIncl;

  while (leftIdx < rightIdx) {
    while (arr[leftIdx] < pivot) {
      leftIdx++;
    }
    while (arr[rightIdx] > pivot) {
      rightIdx--;
    }
    if (leftIdx <= rightIdx) {
      swap(arr, leftIdx, rightIdx);
      leftIdx++;
      rightIdx--;
    }
  }
  while (arr[leftIdx] < pivot) {
    leftIdx++;
  }
  return leftIdx;
}

function quickSortBookAux(arr, startIncl, endIncl) {
  const pivotIdx = partitionBook(arr, startIncl, endIncl);
  if (startIncl < pivotIdx - 1) {
    quickSortBookAux(arr, startIncl, pivotIdx - 1);
  }
  if (pivotIdx < endIncl) {
    quickSortBookAux(arr, pivotIdx, endIncl);
  }
}
                      
function quickSortBook(arr) {
  if (arr == null || arr.length <= 0) {
    return arr;
  }
  quickSortBookAux(arr, 0, arr.length - 1);
  return arr;
}

// testFn(quickSortBook);


// 32bit 정수라 가정하고 정렬.
function radixSort(arr) {
  
}
