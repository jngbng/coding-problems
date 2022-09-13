/*
메모리 공간에 대한 제한을 구현해야 하나? 전체 스택 사이즈를 정해야 하나?

input stack: 1 2 3 4
output stack 4 3 2 1

enqueue는 무조건 input으로 푸쉬하고

dequeue는 output에서 팝을 하는데, 비었을 경우, input을 팝해서 채워 넣는다.

1. 비었을 때 deq()
2. enq(1), enq(2), deq(), deq()

input: [3]
ouput: []

3. enq(1), enq(2), deq(), enq(3), deq()
*/




class MyQueue {
  constructor(size) {
    this.capacity = size;
    this.input = [];
    this.output = [];
  }

  enqueue(elem) {
    if (this.input.size + this.ouput.size < this.capacity) {
      this.input.push(elem);
    } else {
      throw new Error('size overflow');
    }
  }

  dequeue(elem) {
    this.moveInputIfRequried();
    if (this.output.length === 0) {
      throw new Error('queue empty');
    }
    return this.output.pop();
  }

  moveInputIfRequired() {
    if (this.output.length !== 0) {
      return;
    }
    while (this.input.length > 0) {
      this.output.push(this.input.pop());
    }
  }
}

