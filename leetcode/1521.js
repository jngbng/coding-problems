/*
1521. Find a Value of a Mysterious Function Closest to Target
*/

class SegmentTree {
  constructor(arr, aggFn) {
    const n = arr.length;
    let size = 1;
    while (2 * size <= n) {
      size *= 2;
    }

    this.range = n;
    this.st = new Array(size);
    this.aggFn = aggFn;
    this.constructTree(arr, 0, n - 1, 0);    
  }

  getMid(start, end) {
    return parseInt((start + end) / 2);
  }

  constructTree(arr, segStart, segEnd, segIdx) {
    if (segStart == segEnd) {
      this.st[segIdx] = arr[segStart];
      return arr[segStart];
    }
    const mid = this.getMid(segStart, segEnd);

    const leftAgg = this.constructTree(arr, segStart, mid, 2 * segIdx + 1);
    const rightAgg = this.constructTree(arr, mid + 1, segEnd, 2 * segIdx + 2);
    this.st[segIdx] = this.aggFn(leftAgg, rightAgg);
    return this.st[segIdx];
  }

  getAggUtil(qStart, qEnd, segStart, segEnd, segIndex) {
    if (qStart <= segStart && segEnd <= qEnd) {
      return this.st[segIndex];
    }
    if (qEnd < segStart || segEnd < qStart) {
      return null;
    }
    const mid = this.getMid(segStart, segEnd);
    const leftAgg = this.getAggUtil(qStart, qEnd, segStart, mid, segIndex * 2 + 1);
    const rightAgg = this.getAggUtil(qStart, qEnd, mid + 1, segEnd, segIndex * 2 + 2);
    if (leftAgg == null && rightAgg == null) {
      return null;
    } else if (leftAgg == null || rightAgg == null) {
      return leftAgg == null ? rightAgg : leftAgg;
    } else {
      return this.aggFn(leftAgg, rightAgg);
    }
  }

  getAgg(qStart, qEnd) {
    if (qStart < 0 || qEnd >= this.range || qEnd < qStart) {
      throw new Error("invalid input");
    }
    return this.getAggUtil(qStart, qEnd, 0, this.range - 1, 0);
  }
}

function binarySearchClosest(tree, begin, start, end, target) {
  if (start == end) {
    const val = tree.getAgg(begin, start);
    let diff = val - target;

    if (target > val) {
      diff = -diff;
      if (start > begin) {
        const prevVal = tree.getAgg(begin, start - 1);
        let prevDiff = Math.abs(prevVal - target);
        if (prevDiff < diff) {
          diff = prevDiff;
        }
      }
    }
    // console.log(begin, start, val, target, diff);
    return diff;
  }
  const midIdx = parseInt((start + end) / 2);
  const midValue = tree.getAgg(begin, midIdx);

  // console.log("search:", start, end, target, "mid:", midValue, "at", midIdx);

  if (midValue == target) {
    return 0;
  } else if (midValue > target) {
    return binarySearchClosest(tree, begin, midIdx + 1, end, target);
  } else {
    return binarySearchClosest(tree, begin, start, midIdx, target);
  }
}

function findClosestToTarget(arr, target) {
  const tree = new SegmentTree(arr, (a, b) => a & b);

  let min = null;

  for (let i = 0; i < arr.length; ++i) {
    const localMin = binarySearchClosest(tree, i, i, arr.length - 1, target);
    if (min == null || min > localMin) {
      min = localMin;
      if (min == 0) {
        break;
      }
    }
  }

  // for (let i = 0; i < arr.length; ++i) {
  //   for (let j = i; j < arr.length; ++j) {
  //     const localMin = Math.abs(tree.getAgg(i, j) - target);
  //     if (min == null || min > localMin) {
  //       // console.log(i, j, localMin);
  //       min = localMin;
  //       if (min == 0) {
  //         break;
  //       }
  //     }
  //   }
  // }
  
  return min;
}

// console.log(findClosestToTarget([9,12,3,7,15], 5) == 2);
// console.log(findClosestToTarget([1000000,1000000,1000000],1) == 999999);
// console.log(findClosestToTarget([1,2,4,8,16],0) == 0);
// console.log(findClosestToTarget([70,15,21,96],4) == 0);
console.log(findClosestToTarget([1023,511,255,262143,2047,524287,524287,31,16383,16383,31,63,2047,262143,511,262143,32767,2047,31,511,127,127,31,262143,32767,8191,65535,63,4095,4095,2047,511,32767,262143,2047,63,2047,63,2047,31,8191,127,31,4095,524287,65535,65535,15,1023,127,524287,4095,262143,131071,2047,127,511,15,262143,262143,65535,63,32767,32767,32767,4095,262143,16383,127,15,32767,65535,524287,2047,15,2047],890) == 133);
