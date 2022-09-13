/*

1 ~ 32,000의 범위

비트수로 따지면 4000 byte에 저장 가능.

메모리가 4KB 허용.

즉 32000 크기의 bitarray를 만들어서, 숫자를 만나면 해당 위치에 비트를 셋하고,

비트가 0인 위치만 출력하면 된다.

아 중복된 애를 출력해야 하는구나. 2번 이상 나왔는가 여부.

아 그럼 true인데 또 나오면 무조껀 출력하면 되는구나.

여러번 출력되도 괜찮은가?

*/

class FakeBitArray {
  constructor(n) {
    this.arr = new Array(n);
    this.size = n;
  }
}

function findMissed(arr) {
  const fakeBitArray = new Array(32000);

  for (const i of arr) {
    if (fakeBitArray[i - 1] === true) {
      console.log(i + 1);
    } else {
      fakeBitArray[i - 1] = true;
    }
  }
}


class BitSet {
  // 32-bit
  constructor(size) {
    this.size = size;
    this.bits = new Array((size >>> 5) + 1).fill(0);
  }

  get(pos) {
    const wordIdx = pos >>> 5;
    const bitIdx = pos & 0x1f
    return (this.bits[wordIdx] >> bitIdx) & 1;
  }

  set (pos) {
    const wordIdx = pos >>> 5;
    const bitIdx = pos & 0x1f
    this.bits[wordIdx] |= (1 << bitIdx);
  }
}

/*
time complexsity is O(N) where N is size of the array.
*/
