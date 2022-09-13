class LinkedListNode {
  // LinkedListNode next, prev, last;
  // int data;

  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = null;
    this.prev = null;
    if (next != null) {
      this.setNext(next);
    }
    if (prev != null) {
      this.setPrevious(prev);
    }
  }

  setNext(next) {
    this.next = next;
    if (this == this.last) {
      
    }
  }
}


function fromArray(arr) {
  if (arr.length == 0) {
    return null;
  }
  let head = {
    data: arr[arr.length - 1],
    next: null,
  };
  let i = arr.length - 2;
  while (i >= 0) {
    head = {
      data: arr[i],
      next: head,
    };
    i--;
  }
  return head;
}

function toArray(head) {
  if (head == null) {
    return [];
  }
  const ret = [];
  while (head != null) {
    ret.push(head.data);
    head = head.next;
  }
  return ret;
}

module.exports = {
  fromArray,
  toArray,
};
