/*

널판지 길이는 L, S 두 종류가 있는거 확실하나?

K개의 널빤지를 사용하는데, L, S 모두 최대 K개를 사용할 수 있는게 맞나?

가능한 보드의 길이를 모두 구한다.

일단 길이만 관심 있기 때문에, 어떻게 잇는 지는 관심이 없다.

그래서 모두 L에서 시작해서 하나씩 S로 바꿔가면서 길이들을 구해서 Set으로 만들면 된다.

최대 경우의 수는 K개고, 이를 set으로 관리하는데 O(1)이라 가정하면 O(K) 가 된다.

생각해보니 전체 갯수가 고정되어 있어서 중복이 있을 수가 없다. 중복이 있다면 모순 발생.

L > S

mL + (k-m)S = nL + (k -n)S,  n != m

(m-n)L = (m-n)S

L = S 로 모순.

*/

function possibleLengths(k, lenL, lenS) {
  const sets = [];

  if (k == 0) {
    return sets;
  }
  let total = k * lenL;
  sets.push(total);
  const diff = lenL - lenS;
  for (let i = 0; i < k; ++k) {
    total += diff;
    sets.push(total);
  }
  return sets;
}

/*

K가 길 때 더 최적화 할 수 있는 방법을 생각해보자.

L과 S의 최소공배수가 LCM(L,S)이고, 최대 공약수가 GCD(L,S)일 때

L LCM/L 개의 길이는
S LCM/S 개의 길이와 같다.


L: 15(3*5)
S: 6(2*3)
GCD: 3
LCM: 30







L과 S가 서로소 

*/
