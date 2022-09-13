/*
0 1 & | ^

표현식 

0 & 1 | 1 = 1

괄호 추가해서 결과를 만들 수 있는 경우의 수.

우선 순위뢍 associativity 는 어떻게 되나?

& > ^ > \ 이고 left associative.

괄호를 치는 것과 안 치는 것은 다 같은 건가?

의미 없는 괄호는 배재한다고 하겠다. 우선순위 고려했을 때 치는 것도 안치는건 다 한가지 경우.
--------------------------------


a_0 op_0 a_1 op_1 a_2 ... = expected_expr

op_0의 왼쪽에 괄호를 치냐 오른쪽에 괄호를 치냐.

S(n, left, expected)를
op_n 이전까지의 결과가 left 일때 괄호를 추가해서 결과로 expected를 만드는 경우의 수 라고 하자.


S(i, left, expected) = 

op_i 를 감싸서 괄호를 치냐, 뒤쪽에 치냐.
op_i 오른쪽에 괄호를 치는 경우:


그러면 op_i 왼쪽에 괄호를 치는 경우:


& 일 때 bit table을 생각해보면

a_i  expected  rev(&, expected, given)
1       1       [1]
0       1       []
1       0       [0]
0       0       [0, 1]

요 테이블을 rev(op, expected, given) 이라고 하자.

S(i, left, expected) = 

S(i-1, a_(i-1) op_i left, expected)
+
foreach ex in rev(op_i, expected, given)
  S(i-1, a_(i-1), ex)

터미널 op_0 노드는 가능한 조건이면 1, 아니면 0.

*/

const rev = {
  '&': {
    '0': {
      '0': ['0', '1'],
      '1': ['0'],
    },
    '1': {
      '0': [],
      '1': ['1'],
    },
  },
  '|': {
    '0': {
      '0': ['0'],
      '1': [],
    },
    '1': {
      '0': ['1'],
      '1': ['0', '1'],
    },
  },
  '^': {
    '0': {
      '0': ['0'],
      '1': ['1'],
    },
    '1': {
      '0': ['1'],
      '1': ['0'],
    },
  }
}

function bitCalc(op, left, right) {
  switch (op) {
    case '&':
      return String(Number(left) & Number(right));
    case '|':
      return String(Number(left) | Number(right));
    case '^':
      return String(Number(left) ^ Number(right));
  }
  throw new Error("unknown case");
}

function calc(expr, opIndex, given, expected, memo) {
  const operator = expr[opIndex];
  if (opIndex == 1) {
    const allowedA0 = rev[operator][expected][given];
    for (const allowed of allowedA0) {
      if (allowed == expr[0]) {
        return 1;
      }
    }
    return 0;
  }

  const prevOpIndex = opIndex - 2;
  const memoKey = opIndex + given + expected;
  if (memo[memoKey] != null) {
    return memo[memoKey];
  }

  let result = calc(expr, prevOpIndex, bitCalc(operator, expr[opIndex-1], given), expected, memo);
  const prevExpecteds = rev[operator][expected][given];
  for (const prevExpected of prevExpecteds) {
    result += calc(expr, prevOpIndex, expr[opIndex-1], prevExpected);
  }
  memo[memoKey] = result;
  return result;
}

// expr = "1^0|0|1"
//

function calcCombi(expr, expected) {
  return calc(expr, expr.length - 2, expr[expr.length - 1], expected, {});
}

//console.log(calcCombi("1^0|0|1", "0"));


/*

완전 폭망 오답.

결국 문제를 줄여나가는 방법으로 최초 어떤 연산자를 계산할꺼냐는 문제로 나눌 수 있다.

(  expr_left  ) op_i (  expr_right  ) = expected
     left                 right


이 관계를 만족하는 left, right 조합에 대해서 
좌우에 대해서 하위 문제에 대해서 계산을 해서 곱해서 더하면 되겠다.

calcMe(expr, begin, end, expected) {
}
*/

function getPossibleCases(operator, expected) {
  switch (operator) {
    case '&':
      if (expected) {
        return [
          [true, true],
        ];
      } else {
        return [
          [false, true],
          [true, false],
          [false, false],
        ];
      }
    case '|':
      if (expected) {
        return [
          [false, true],
          [true, false],
          [true, true],
        ];
      } else {
        return [
          [false, false],
        ];
      }
    case '^':
      if (expected) {
        return [
          [false, true],
          [true, false],
        ];
      } else {
        return [
          [true, true],
          [false, false],
        ];
      }
  }
  throw new Error("invalid input");
}

function calcMe(expr, begin, end, expected, memo) {
  if (begin == end) {
    if (expected) {
      return (expr[begin] == '1') ? 1 : 0;
    } else {
      return (expr[begin] == '0') ? 1 : 0;
    }
  }
  //const memoKey = begin + '.' + end + expected;
  const memoKey = expr.substring(begin, end + 1) + expected;
  if (memo[memoKey] != null) {
    return memo[memoKey];
  }
  let result = 0;
  for (let opIdx = begin + 1; opIdx < end; opIdx += 2) {
    const op = expr[opIdx];
    const possibleCases = getPossibleCases(op, expected);
    for (const [left, right] of possibleCases) {
      result += calcMe(expr, begin, opIdx - 1, left, memo) * calcMe(expr, opIdx + 1, end, right, memo);
    }
  }
  memo[memoKey] = result;
  return result;
}

function calcMeDriver(expr, expected) {
  return calcMe(expr, 0, expr.length - 1, expected, {}); 
}

console.log(calcMeDriver("1^0|0|1", false));
console.log(calcMeDriver("0&0&0&1^1|0", true));


/*
이 알고리즘의 시간 복잡도는

채워지는 테이블을 생각해보면 (i, j, true/false)가 차는데 (i < j) 인 조건을 만족한다.

i<j 인 조건이라서 n^2 테이블의 절반인데, true/false로 나뉘니깐 총 n^2의 테이블을 채운다.

그래서 expr 길이를 n 이라고 하면 O(n^2)을 만족한다.

memoKey를 최적화 했을 때 ...?
*/
