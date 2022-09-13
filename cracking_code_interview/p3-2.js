/*
기본적인 push/pop이 구현된 스택은 재공된다고 보면 되나?
> yes

추가적인 메모리를 써도 되나?
> 예

min이라는건 이 스택은 int같은 comparable한 오브젝트를 담는거다.

push / pop / min 이 모두 O(1)이 되도록.

heap을 병행하면 pop이 logN 이라서 안된다.
정렬된 상태로 유지되는 데이터 스트럭쳐를 병행한다면 근본적으로 logN 이라서 불가능하다.

입력되는 데이터의 범위는 알 수 있나?

그러면 minStack을 병행하면 어떨까.

min(currentMin, newValue)

stack:    4 6 3 3 10 2 3 1
minStack: 4 4 3 3  3 2 2 1 

이러면 길게 중복되는 구간이 생기는데,
이를 줄이려면 넣을 때 같거나 작을 때만 넣고,
pop 때 같을 때만 뺀다.

*/

class MinStack {
  constructor() {
    this.values = [];
    this.mins = [];
  }

  push(elem) {
    if (this.values.length == 0) {
      this.values.push(elem);
      this.mins.push(elem);
      return;
    }
    this.values.push(elem);
    const curMin = this.mins[this.mins.length - 1];
    if (elem <= curMin) {
      this.mins.push(elem);
    }
  }

  pop() {
    if (this.values.length === 0) {
      throw new Error('stack empty');
    }
    const ret = this.values.pop();
    const minPeek = this.mins[this.mins.length - 1];
    if (ret == minPeek) {
      this.mins.pop();
    }
    return ret;
  }

  min() {
    if (this.mins.length === 0) {
      throw new Error('stack empty');
    }
    return this.mins[this.mins.length - 1];
  }
}
