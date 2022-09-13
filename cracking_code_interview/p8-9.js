/*
괄호 출력.
순서는 딱히 상관 없나.
일단 이건 재귀 문제로 보인다.
출력하라고 했는데, 전체를 가지는 array를 가지면 안되고 무조건 출력해야 하나.

p(n)이 n쌍 괄호로 만들 수 있는 모든 경우를 만든다고 하자.

이를 재귀적으로 사용하기 위해 앞에 붙는 문자열 prefix, 뒤에 붙는 문자열 suffix를 받자.

p(n, prefix, suffix)이 n쌍 괄호로 만들 수 있는 모든 경우를 출력 한다고 하자.

일단 로직을 생각하기 위해 p(n)을 살펴보겠다.

가장 단순하게 생각하면

p(n) = p(1) x p(n-1) + p(2) x p(n-2) + ... + p(n-1) x p(1)

다. 여기서 x는 cartproduct, + 는 join 이다.

그런데 여기서 중복이 생길 수 있다.

3, 1 ->  (1, 2), 1 
1, 3 -> 1, (2, 1)

대칭 때문에 생기는 문제인데, 어쩌면 i 를 n/2 까지만 만들면 될 것 같긴한다.


이런 assoc 문제를 해결하기 위해 정의를 살짝 바꾸겠다.

p(n)은 max-depth가 깊이가 n 인..

이거는 문제랑 달라진다.


p(n):

case1: '(' + p(n-1) + ')'
case2: '(
case3: p(n-1) + '()'


n=3 => 5

() () ()  1 1 1
() (())  1 2
(()) ()  2 1
(()())
((()))    3 


n=2 => 2
() ()
(())

n = 1 => 1
()

n-1를 이용해서 n을 만들 수는 있는데, 중복 제거가 문제다.

어떤 배열로 해도 총 6문자다. 당연하지만.

p(n, closeCount)




생각을 바꿔서 남은 괄호 수, 열린 괄호 수를 관리하면서 왼쪽부터 만들어 나가면 중복을 재거할 수 있을까?
문제가 되는 () () () 를 호출할 수 있는 유일한 방법은 열고 닫고 열고 닫고 순으로 호출하는 수 밖이다.

같은 레벨에서 같은 심볼로 여러번 호출하지 않기만 하면 된다.

p('', 3, 0)
p('(', 2, 1)
p('()', 2, 0)
..
*/


function printMatchParenAux(prefix, remainCount, openCount) {
  if (remainCount <= 0) {
    for (let i = 0; i < openCount; ++i) {
      prefix += ')';
    }
    console.log(prefix);
    return;
  }
  printMatchParenAux(prefix + '(', remainCount - 1, openCount + 1);
  if (openCount > 0) {
    printMatchParenAux(prefix + ')', remainCount, openCount - 1);
  }
}

function printMatchParen(count) {
  if (count <= 0) {
    return;
  }
  printMatchParenAux('', count, 0);
}

// printMatchParen(3);


/*

이 문제를 총 경우의 수를 새는 문제로 변경해보자.
가장 간단한거는 print호출하는 부분에서 카운트를 증가하는 방법이 있긴하다.

다시 정리해보면

p(remainOpen, remainClose): 남은 열기 횟수가 remainOpen이고, 남은 닫기 횟수가 remainClose 일 때 완료하는 경우의 수.

case remainOpen == 0:
  1
case remainClose < 0:
  0
else
  p(remainOpen - 1, remainClose + 1) + p(remainOpen, remainClose - 1)


                      p(n-2, 2)
p(n-1, 0)  p(n-1, 1)
p(n, 0)

p(n,0) = p(n-1,0) + p(n-2, 2)

*/

function countMatchParenAux(remainOpen, remainClose, memo) {
  if (remainOpen <= 0) {
    return 1;
  }
  if (remainClose < 0) {
    return 0;
  }
  if (memo[remainOpen][remainClose] >= 0) {
    return memo[remainOpen][remainClose];
  }
  let result = 
      countMatchParenAux(remainOpen - 1, remainClose + 1, memo) +
      countMatchParenAux(remainOpen, remainClose - 1, memo);
  memo[remainOpen][remainClose] = result;
  return result;
}

function createMemo(size, initValue) {
  return new Array(size).fill(null).map(_ => new Array(size).fill(initValue));
}

function countMatchParen(numParen) {
  if (numParen <= 0) {
    return 0;
  }
  const memo = createMemo(numParen + 1, -1);
  return countMatchParenAux(numParen, 0, memo); 
}

console.log(countMatchParen(4));
