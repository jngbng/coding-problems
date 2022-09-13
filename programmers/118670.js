// function rotate(rc, rows, cols) {
//     let rightBottom = rc[rows - 1][cols - 1];
//     // right
//     for (let r = rows - 1; r > 0; --r) {
//         rc[r][cols - 1] = rc[r - 1][cols - 1];
//     }
//     // top
//     rc[0].pop();
//     // dummy
//     rc[0].unshift(0);
//     // left
//     for (let r = 1; r < rows; ++r) {
//         rc[r-1][0] = rc[r][0];
//     }
//     // bottom
//     const bottom = rc[rows-1];
//     console.log(rc, rows, bottom);
//     bottom.shift();
//     const tmpRightBottom = bottom.pop();
//     bottom.push(rightBottom, tmpRightBottom);
// }

// function shiftRow(rc) {
//     rc.unshift(rc.pop());
// }

// function solution(rc, operations) {
//     const answer = rc;
//     const rows = rc.length;
//     const cols = rc[0].length;
//     for (const op of operations) {
//         if (op == "ShiftRow") {
//             shiftRow(answer);
//         } else {
//             rotate(answer, rows, cols);
//         }
//     }
//     return answer;
// }


// function shiftRow(rc, rows, count) {
//   if (count == 0) {
//     return rc;
//   }

//   const ret = new Array(rows);
//   for (let r = 0; r < rows; r++) {
//     ret[r] = rc[(rows + r - count) % rows];
//   }
//   return ret;
// }

// function rotateMe(rc, rows, cols, count) {
//   const roundTotal = (rows + cols - 4);
//   let rightBottom = rc[rows - 1][cols - 1];
//   // right
//   for (let r = rows - 1; r > 0; --r) {
//     rc[r][cols - 1] = rc[r - 1][cols - 1];
//   }
//   // top
//   rc[0].pop();
//   // dummy
//   rc[0].unshift(0);
//   // left
//   for (let r = 1; r < rows; ++r) {
//     rc[r-1][0] = rc[r][0];
//   }
//   // bottom
//   const bottom = rc[rows-1];
//   bottom.shift();
//   const tmpRightBottom = bottom.pop();
//   bottom.push(rightBottom, tmpRightBottom);
// }


// function rotate(rc, rows, cols, roundTotal, count) {
//   if (count == 0) {
//     return rc;
//   }
//   let round = new Array(roundTotal);
//   let i = 0;
//   // up
//   for (let c = 0; c < cols; ++c) {
//     round[i++] = rc[0][c];
//   }
//   // right
//   for (let r = 1; r < rows; ++r) {
//     round[i++] = rc[r][cols - 1];   
//   }
//   // bottom
//   for (let c = cols - 2; c >= 0; --c) {
//     round[i++] = rc[rows - 1][c];
//   }
//   // left
//   for (let r = rows - 2; r > 0; --r) {
//     round[i++] = rc[r][0];
//   }
//   round = shiftRow(round, roundTotal, count);
  
//   // write back
//   i = 0;
//   // up
//   for (let c = 0; c < cols; ++c) {
//     rc[0][c] = round[i++];
//   }
//   // right
//   for (let r = 1; r < rows; ++r) {
//     rc[r][cols - 1] = round[i++];
//   }
//   // bottom
//   for (let c = cols - 2; c >= 0; --c) {
//     rc[rows - 1][c] = round[i++];
//   }
//   // left
//   for (let r = rows - 2; r > 0; --r) {
//     rc[r][0] = round[i++];
//   }
//   return rc;
// }


// function getGcd(a, b) {
//   if (a > b) {
//     return getGcd(b, a);
//   }
//   if (a == 0) {
//     return b;
//   }
//   return getGcd(b % a, a);
// }

// function shiftRow(arr, rows, count) {
//   count = count % rows;
//   if (count == 0) {
//     return arr;
//   }
//   const gcd = getGcd(rows, count);
//   for (let i = 0; i < gcd; ++i) {
//     let tmp = arr[i];
//     let j = i;
//     let k;
//     while (true) {
//       k = j - count;
//       if (k < 0) {
//         k += rows;
//       }
//       if (k == i) {
//         break;
//       }
//       arr[j] = arr[k];
//       j = k;
//     }
//     arr[j] = tmp;
//   }
//   return arr;
// }

// const rIndex = new Array(200000);
// const cIndex = new Array(200000);

// function initRCIndex(rows, cols) {
//   let i = 0;
//   // up
//   for (let c = 0; c < cols; ++c) {
//     rIndex[i] = 0;
//     cIndex[i] = c;
//     i++;
//   }
//   // right
//   for (let r = 1; r < rows; ++r) {
//     rIndex[i] = r;
//     cIndex[i] = cols - 1;
//     i++;
//   }
//   // bottom
//   for (let c = cols - 2; c >= 0; --c) {
//     rIndex[i] = rows - 1;
//     cIndex[i] = c;
//     i++;
//   }
//   // left
//   for (let r = rows - 2; r > 0; --r) {
//     rIndex[i] = r;
//     cIndex[i] = 0;
//     i++;
//   }
// }

// function rotate(rc, roundTotal, count) {
//   count = count % roundTotal;
//   if (count == 0) {
//     return rc;
//   }
//   const gcd = getGcd(roundTotal, count);
//   for (let i = 0; i < gcd; ++i) {
//     let tmp = rc[rIndex[i]][cIndex[i]];
//     let j = i;
//     let k;
//     while (true) {
//       k = j - count;
//       if (k < 0) {
//         k += roundTotal;
//       }
//       if (k == i) {
//         break;
//       }
//       rc[rIndex[j]][cIndex[j]] = rc[rIndex[k]][cIndex[k]];
//       j = k;
//     }
//     rc[rIndex[j]][cIndex[j]] = tmp;
//   }
//   return rc;
// }

// function solution(rc, operations) {
//   let answer = rc;
//   const rows = rc.length;
//   const cols = rc[0].length;
//   const bunchOp = [[operations[0], 1]];
//   for (let i = 1; i < operations.length; ++i) {
//     if (bunchOp[bunchOp.length - 1][0].charCodeAt(0) == operations[i].charCodeAt(0)) {
//       bunchOp[bunchOp.length - 1][1]++;
//     } else {
//       bunchOp.push([operations[i], 1]);
//     }
//   }
//   const roundTotal = (rows + cols) * 2 - 4;
//   initRCIndex(rows, cols);
//   const CHARCODE_S = "S".charCodeAt(0);
//   for (const [op, count] of bunchOp) {
//     if (op.charCodeAt(0) == CHARCODE_S) {
//       answer = shiftRow(answer, rows, count);
//     } else {
//       answer = rotate(answer, roundTotal, count);
//     }
//   }
//   return answer;
// }

function Item (data, prev, next) {
  this.next = next
  if (next) next.prev = this
  this.prev = prev
  if (prev) prev.next = this
  this.data = data
}

function FastList () {
  if (!(this instanceof FastList)) return new FastList
  this._head = null
  this._tail = null
  this.length = 0
}

FastList.prototype = {
  push: function (data) {
    this._tail = new Item(data, this._tail, null)
    if (!this._head) this._head = this._tail
    this.length ++
  }

, pop: function () {
    if (this.length === 0) return undefined
    var t = this._tail
    this._tail = t.prev
    if (t.prev) {
      t.prev = this._tail.next = null
    }
    this.length --
    if (this.length === 1) this._head = this._tail
    else if (this.length === 0) this._head = this._tail = null
    return t.data
}

  , tailVal: function () {
    if (this.length === 0) return undefined
    return this._tail.data;
  }

  , headVal: function () {
    if (this.length === 0) return undefined
    return this._head.data;
  }

, unshift: function (data) {
    this._head = new Item(data, null, this._head)
    if (!this._tail) this._tail = this._head
    this.length ++
  }

, shift: function () {
    if (this.length === 0) return undefined
    var h = this._head
    this._head = h.next
    if (h.next) {
      h.next = this._head.prev = null
    }
    this.length --
    if (this.length === 1) this._tail = this._head
    else if (this.length === 0) this._head = this._tail = null
    return h.data
  }

, item: function (n) {
    if (n < 0) n = this.length + n
    var h = this._head
    while (n-- > 0 && h) h = h.next
    return h ? h.data : undefined
  }

, slice: function (n, m) {
    if (!n) n = 0
    if (!m) m = this.length
    if (m < 0) m = this.length + m
    if (n < 0) n = this.length + n

    if (m === n) {
      return []
    }

    if (m < n) {
      throw new Error("invalid offset: "+n+","+m+" (length="+this.length+")")
    }

    var len = m - n
      , ret = new Array(len)
      , i = 0
      , h = this._head
    while (n-- > 0 && h) h = h.next
    while (i < len && h) {
      ret[i++] = h.data
      h = h.next
    }
    return ret
  }

, drop: function () {
    FastList.call(this)
  }
}

function toFastList(arr, start, end) {
  const ret = new FastList();
  for (let i = start; i <= end; ++i) {
    ret.push(arr[i]);
  }
  return ret;
}

class Matrix {
  constructor(rc) {
    const left = new FastList();
    const right = new FastList();
    const centers = new FastList();
    for (const row of rc) {
      left.push(row[0])
      right.push(row[row.length - 1]);
      centers.push(toFastList(row, 1, row.length - 2));
    }
    this.left = left;
    this.centers = centers;
    this.right = right;
  }

  rotateAux(arr) {
    arr.unshift(arr.pop());
  }

  shiftRow() {
    this.rotateAux(this.left);
    this.rotateAux(this.right);
    this.rotateAux(this.centers);
  }

  rotate() {
    this.centers.tailVal().push(this.right.pop());
    this.left.push(this.centers.tailVal().shift());
    this.centers.headVal().unshift(this.left.shift());
    this.right.unshift(this.centers.headVal().pop());
  }

  toArray() {
    const left = this.left.slice();
    const right = this.right.slice();
    const centers = this.centers.slice();
    const ret = [];
    for (let i = 0; i < centers.length; ++i) {
      centers[i].unshift(left[i]);
      centers[i].push(right[i]);
      ret.push(centers[i].slice());
    }
    return ret;
  }
}


function solution(rc, operations) {
  let answer = rc;
  let matrix = new Matrix(rc);
  for (const op of operations) {
    if (op == "ShiftRow") {
      matrix.shiftRow();
    } else {
      matrix.rotate();
    }
  }
  return matrix.toArray();
}
