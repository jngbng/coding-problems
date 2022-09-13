/*
prefix tree로 주어진다고 하면, 숫자가 들어올 때마다 queue에 prefix tree root를 넣는 방식으로 진행해 나가겠다.
*/


function charToNum(ch) {
  if (ch < 'd') {
    return 2;
  } else if (ch < 'g') {
    return 3;
  } else if (ch < 'j') {
    return 4;
  } else if (ch < 'm') {
    return 5;
  } else if (ch < 'p') {
    return 6;
  } else if (ch < 't') {
    return 7;
  } else if (ch < 'w') {
    return 8;
  } else {
    return 9;
  }
}

function numToChars(num) {
  switch (num) {
    case 2:
      return ['a', 'b', 'c'];
    case 3:
      return ['d', 'e', 'f'];
    case 4:
      return ['g', 'h', 'i'];
    case 5:
      return ['j', 'k', 'l'];
    case 6:
      return ['m', 'n', 'o'];
    case 7:
      return ['p', 'q', 'r', 's'];
    case 8:
      return ['t', 'u', 'v'];
    case 9:
      return ['w', 'x', 'y', 'z'];
    default:
      throw new Error("invalid input");
  }
}

class Node {
  constructore() {
    this.isTerminal = false;
    this.value = null;
    this.children = {};
  }

  getChild(char) {
    if (this.isTerminal) {
      return null;
    }
    const subTree = this.children[char];
    if (subTree != null) {
      return subTree;
    }
    return null;
  }
}

function findWords(digits, trieRoot) {
  let candidate = [trieRoot];

  for (const digit of digits) {
    const chars = numToChars(Number(digit));
    const nextCandidate = [];
    for (const subRoot of candidate) {
      for (const ch of chars) {
        const nextRoot = subRoot.getChild(ch);
        if (nextRoot != null) {
          nextCandidate.push(nextRoot);
        }
      }
    }
    candidate = nextCandidate;
    if (candidate.length == 0) {
      break;
    }
  }

  const ret = candidate
        .filter(root => root.isTerminal)
        .map(leaf => leaf.value);
  return ret;
}


/*
입력길이가 N, dictionary 크기가 M이라 했을 때

O(min(4^N, N * M)) 이다.

뭔가 이상한 분석이긴한데
*/
