/*
배열은 고정크기인가?
-> 그렇다. 

크기는 3의 배수인가?
-> 아니면 1, 2 바이트는 그냥 버려도 되나?

이걸 클래스로 구현해야 하나?

스택에 들어가는 데이터 크기는 동일한가? 즉 타입은 같다고 봐도 되나?
-> 그렇다.

스택의 크기를 1/3로 한정하는건 안되나? 즉 배열을 항상 최대로 사용할 수 있어야 하나?
-> 그렇다.

간단한 경우로 2개는 쉽다. 양쪽 끝에서 자라나오면 되니깐.

셋을 하면은, 가운데에서 좌우로 번갈아 가면서 자라나오게 하면 될 것 같다.
스택1: 왼쪽끝 -> 오른쪽으로
스택2: 오른쪽 끝에서 -> 왼쪽으로
스택3: 가운데에서 좌, 우 번갈아 가면서

대신 이렇게 하면 스택1,2가 절반 이상 사용할 수 없게 되는 문제가 있다.



추가 정보를 써도 되나. prevIdx를 같이 유지하게 해서 중간에 빈 공간이 생기면 재일 마지막애를 빼서 채워 넣는 방식으로 할 수 있을 것 같다.
allLastIdx
firstStackTopIdx
secondStackTopIdx
thirdStackTopIdx


1/3 씩 메모리를 가지고 시작하는데, 순환 queue 처럼 cursor가 끝을 만나면 반대쪽 끝으로 이동하게 한다.

shiftLeft, shiftRight 오퍼레이션을 이용해서 필요할 때 가운데 스택 전체를 옮길 순 있다.
O(N)이라서 성능상 사용할 수는 없을 것 같다.

대신 circular 기능과 합치면 양 끝에 여유 공간이 있으 ㄹ때는 시간을 절약할 수 있긴 하겠다.

| 3 4 5 _ _ _ 1 2 |
   |4 5 _ _ _ 1 2 3 |

그렇지 않을 때는 shrink 기능이 있어야 한다. 이건 메모리 복사가 많이 발생한다.

가운데 stack이 사이즈를 키워야 할 때에도 메모리 복사가 많이 발생한다.

*/


/*
심플 케이스를 풀어보겠다.
*/


class FixedSizedStack {
  constructor(arrSize) {
    const numStacks = 3;
    this.buffer = new Array(arrSize);
    const stackCapacity = Math.floor(arrSize / 3);
    this.stackCapacity = stackCapacity;
    this.sizes = new Array(0).fill(0);
    this.topIndexes = [-1, stackCapacity - 1, 2 * stackCapacity - 1];
    // 0 - (stackCapacity-1)
    // stackCapacity ~ (2*stackCapacity - 1)
    // 2*stackCapacity ~ (3*stackCapacity - 1)
  }

  push(stackIndex, value) {
    if (this.sizes[stackIndex] < this.stackCapacity) {
      this.buffer[++this.topIndexes[stackIndex]] = value;
    } else {
      throw new Error('size overflow');
    }
  }

  pop(stackIndex, value) {
    if (this.sizes[stackIndex] > 0) {
      return this.buffer[this.topIndexes[stackIndex]--];
    } else {
      throw new Error('size overflow');
    }
  }
}
