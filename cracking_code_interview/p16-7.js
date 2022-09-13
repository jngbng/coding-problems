/*
두 숫자의 최댓값.

if-else나 비교 연산자 불가.

3항 연산자도 (? :)도 if-else로 친다고 해보자.

남는건 비트 연산자, 산술 연산자 밖인데.. 어떤 연산을 했을 때 항상 큰 값이 나오도록 하려면.

두 숫자는 양의 정수로 한정해도 되나?

(x | y)


max(01 10) -> 10

01 & 10 -> 00
   |    -> 11
   ^    -> 11

01 + 10 -> 11
01 - 10 ->
01 * 10 -> 
01 mod 10 -> 01


비트 관점에서 보면 가장 앞 비트가 먼저 1이 되는 숫자가 큰 숫자인데.


아 mod를 써보면.

Big Small

Big mod Small = X   Big = t * Small + X.  0 <= X < Small

Small mod Big = Small

Big / Small = t

Small / Big = 0

우리에게 주어진건 (X, t) 가 쌍이란걸 알고 (Small, 0)이 쌍이란걸 안다.

원하는건 t * Small + X 를 항상 얻고 싶다.

x*y 교차로 곱해서 더할 때.

t * Small + X * 0 = t * Small을 항상 얻을 수 있다.

txSmall = t * Small + X * Zero


TxSmall = XorSmall1 * TorZero2 + XorSmall2 * TorZero1;


t는 항상 알 수 있다. y끼리 더하면 됨.

따라서 Small도 항상 알 수 있다.

!!!!!! 이제 X를 항상 얻고 싶다. !!!!!!!

x * x끼리 곱해서 더하면

X * Small 을 항상 얻을 수 있다.

Small을 항상 알기 때문에 X도 항상 알 수 있다.


그런데 이거 음수랑 0에서 동작 하나?
0 들어오면 죽음

*/

function big(a, b) {
  const X = a % b;
  const T = (a / b) | 0;

  const Small = b % a;
  const Zero = (b / a) | 0;

  const RealTxSmall = T * Small + X * Zero;

  const RealT = T + Zero;
  const RealSmall = RealTxSmall / RealT;

  const RealXxSmall = X*Small + T*Zero;
  const RealX = RealXxSmall / RealSmall;

  const RealBig = RealT * RealSmall + RealX;

  return RealBig;
}


/*

답안 보고 난 후.

더 단순한 것부터 좀 더 팠어야 했다.

비교하는게 a - b < 0 여부를 살피는거고 이는 부호 비트만 보면 알 수 있다.

b - a < 0 일 때 k = 1, q = !k = 0 이라고 해보자.

k = (b - a) >>> 31
q = 1 ^ q

b - a >= 0 일 때는 k = 0, q = 1 이 되게 된다.

그럼 b * q + a * k 

하면 큰 값이 나온다.

그런데 b - a 가 integer underflow 나는 경우는?

b가 -10이고 a가 max_integer-2 면 둘을 빼면 양수가 나오다. b - a > 0

이런 경우기 생기는 경우는 최소한 둘의 부호가 다른 경우이다.
그리고 빼거나 더해도 부호가 같게 나오면 이런 문제가 생길거라 보면 되겠다.
확실한지는 경우를 더 해봐야겠다.
*/
