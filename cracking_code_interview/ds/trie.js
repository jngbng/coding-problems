
class Node {
  constructor() {
    this.children = new Map();
    this.terminal = false;
    this.value = "";
  }

  find(str, idx) {
    if (idx < 0 || idx >= str.length) {
      if (this.terminal) {
        return this.value;
      } else {
        return null;
      }
    }

    const nextNode = this.children.get(str[idx]);
    if (nextNode == null) {
      return null;
    }
    return nextNode.find(str, idx + 1);
  }

  getChildRoot(ch) {
    const nextNode = this.children.get(ch);
    if (nextNode == null) {
      return null;
    }
    return nextNode;
  }

  insert(str, idx, value) {
    if (idx < 0 || idx >= str.length) {
      // on collision
      this.value = value;
      this.terminal = true;
      return;
    }
    let nextNode = this.children.get(str[idx]);
    if (nextNode == null) {
      nextNode = new Node();
      this.children.set(str[idx], nextNode);
    }
    nextNode.insert(str, idx + 1, value);
  }

  *getChildren() {
    yield* this.children.values();
  }
}

exports.Node = Node;
