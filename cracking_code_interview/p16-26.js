/*
계산기 + - * / 만 있고 괄호는 없다.

부호의 우선 순위를 생각해야 한다.

a + b * c 면 b * c를 먼저 계산 해야한다.
a + b + c 면 a + b를 먼저 계산 해야한다.
a * b ? c 면 a * b를 먼저 계산 해도 된다.


a + b * c 면
a + (-b) * c 로 바꿔도 된다.

a - b + c 면
a + (-b) + c 로 바꿔도 된다.


부호를 두개씩 보면서 앞에꺼를 계산하거나, 뒤에 것을 계산해 나가면 되겠다.

*/

function isOperator(char) {
  return char == '+' || char == '-' || char == '*' || char == '/';
}

function simpleParse(expr) {
  // [num, 'op', num, 'op', num, 'op', num]
  const result = [];
  let numInProgress = null;
  for (const char of expr) {
    if (char >= '0' && char <= '9') {
      if (numInProgress == null) {
        numInProgress = Number(char);
      } else {
        numInProgress = 10 * numInProgress + Number(char);
      }
    } else if (char == ' ') {
      continue;
    } else if (isOperator(char)) {
      if (numInProgress == null) {
        throw new Error('no number preceding op:' + char);
      }
      result.push(numInProgress, char);
      numInProgress = null;
    } else {
      throw new Error('invalid input:' + char);
    }
  }
  if (numInProgress != null) {
    result.push(numInProgress);
  }
  // check if number is alternating
  
  return result;
}

function precedence(op) {
  switch (op) {
    case '*':
    case '/':
      return 1;
    case '+':
    case '-':
      return 0;
    default:
      throw new Error('unhandeld case:' + op);
  }
}

function isPreceding(op1, op2) {
  return precedence(op1) >= precedence(op2)
  // * > +
}

function fillWindowUpToFive(window, parsedList) {
  while (window.length < 5 && parsedList.length > 0) {
    window.push(parsedList.shift());
  }
  return window.length == 5;
}

function calcOneTerm(num1, op, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error('unhandled case:' + op);
  }
}

function calcLeft(window) {
  const num1 = window.shift();
  const op = window.shift();
  const num2 = window.shift();
  window.unshift(calcOneTerm(num1, op, num2));
}

function calcRight(window) {
  const num2 = window.pop();
  const op = window.pop();
  const num1 = window.pop();
  window.push(calcOneTerm(num1, op, num2));
}

function calcOneStep(window) {
  const leftOp = window[1];
  const rightOp = window[3];
  if (isPreceding(leftOp, rightOp)) {
    calcLeft(window);
  } else {
    calcRight(window);
  }
}

function calcAll(window) {
  if (window.length === 1) {
    return window.pop();
  } else if (window.length === 3) {
    calcLeft(window);
    return window.pop();
  } else {
    throw new Error('invalid state');
  }
}

function calc(expr) {
  const parsedList = simpleParse(expr);
  const window = [];

  let result = null;
  // fill up to five
  while (fillWindowUpToFive(window, parsedList)) {
    calcOneStep(window);
  }
  result = calcAll(window);
  return result;
}

console.log(calc("2*3+5/6*3+15"));


/*
생삭해보니 더 심플하게 two-phase로 만들어서
첫 페이즈에서는  *, / 를 죄다 계산하고,
다음 페이즈에서 나머지를 계산하면 됐다.
*/
