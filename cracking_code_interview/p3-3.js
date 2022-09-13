/*
내부에 StackOfStack을 가지고 peek로 마지막 스택을 꺼내서 거기서 pop을 수행하도록 하면 될 것 같다.
빈 스택은 빼버려서 항상 채워진 stack만 있도록 하자.
*/

class Stack {
  peek() {}
  push(a) {}
  pop(a) {}
  shift() {}
  size() {}
}

class SetOfStacks {
  constructor(capacity) {
    this.capacity = capacity;
    this.stacks = new Stack();
  }

  peek() {
    const topStack = this.stacks.peek();
    if (topStack == null) {
      return null;
    }
    return topStack.peek();
  }

  push(a) {
    let topStack = this.stacks.peek();
    if (topStack == null || topStack.size() == this.capacity) {
      topStack = new Stack();
      this.stacks.push(topStack);
    }
    topStack.push(a);
  }

  pop() {
    let topStack = this.stacks.peek();
    if (topStack == null) {
      return null;
    }
    let ret = topStack.pop();
    if (topStack.length == 0) {
      this.stacks.pop();
    }
    return ret;
  }
}

/*
좀 더 물어봤어야 하는건 peek, pop, push 오퍼레이션으로 충분하냐였다.
왜냐면 이것만 있으면 이 구조체를 만드는 의미가 없기 때문이다.
번치로 빼내는 오퍼레이션이 필요한거냐 같은거.

popAt(int index) 함수다.

아래에서부터 index i라고 봐야 하나?

저 index는 스택의 index냐? element의 index냐?

유저 입장에서 봤을 때는 이건 그냥 하나의 스택이다.

해당 스택이 비었으면 그 전 스택의 값을 리턴하는거냐? 이름을 봐선 아니겠다.

해당스택이 비게되도 여전히 유지해야 하나? 아니면 빼야 하는거냐?

이걸 뺐을 때, 다음 스택에서 값을 빼와서 채워 넣어도 되는거냐?

정답코너에서 봤을때, 상황 중 하나는 i번째 스택에서 뽑고, 채워 넣어두는거였다.

그리고 꼼수라 바닥에서 뽑는 메서드도 추가했다.

이런식으로 유연하게 메서드를 추가해도 되는지 상의하자.
*/


class SetOfStacks {
  constructor(capacity) {
    this.capacity = capacity;
    this.stacks = [];
  }

  getTopStack() {
    if (this.stacks.length == 0) {
      return null;
    }
    return this.stacks[this.stacks.length - 1];
  }

  peek() {
    const topStack = this.getTopStack();
    if (topStack == null) {
      return null;
    }
    return topStack.peek();
  }

  push(a) {
    let topStack = this.getTopStack();
    if (topStack == null || topStack.size() == this.capacity) {
      topStack = new Stack();
      this.stacks.push(topStack);
    }
    topStack.push(a);
  }

  pop() {
    let topStack = this.getTopStack();
    if (topStack == null) {
      return null;
    }
    let ret = topStack.pop();
    if (topStack.length == 0) {
      this.stacks.pop();
    }
    return ret;
  }

  // fill idx-th stack by taking one elem from (idx+1)-th stack.
  rollOver(idx) {
    if (idx < 0 || idx == this.stacks.length - 1) {
      return;
    }
    const nextStack = this.stacks[idx + 1];
    const thisStack = this.stacks[idx];
    thisStack.push(nextStack.shift());
    if (nextStack.length == 0) {
      // assert idx + 1 == this.stacks.length - 1
      // 이런 방식은 안 좋긴 하다.
      this.stacks.pop();
    }
    // nextStack may can be empty.
    this.rollOver(idx + 1);
  }

  popAt(idx) {
    if (idx < 0 || idx >= this.stacks.length) {
      return null;
    }
    if (idx == this.stacks.length - 1) {
      return this.pop();
    }
    const ret = this.stacks[idx].pop();
    this.rollOver(idx);
    return ret;
  }
}
