/*
n 이 주어지면 n! 계산 결과에서 마지막에 붙은 연속된 0의 갯수 찾는거.

n! 는 1 x ..  x n 이다.

이는 소인수 분해하면 2^i_2 x 3^? x 5^i_5 .. 

형태로 표현할 수 있다.

10은 2x5 라서 

끝의 0의 갯수는 저 소인수 분해 형태에서 min(i_2, i_5) 가 되겠다.

1 부터 n 까지 수들을 각각 소인수 분해했을 때 2와 5의 갯수를 다 더하면 된다.

각 숫자에 대해서
mod 2 == 0 인 동안 나눠가면서 숫자를 새고
이어서 mod 5 == 0 인 동아 나눠가면서 숫자를 새면 된다.

계산량이 좀 많다. 더 줄일 수 있는 방법이 있나?

N! 에서 i_2의 갯수를 새는 문제를 생각해보자.

1 ~ N 에서 

2의 배수들은 모두 하나씩 들고 있을 것이다. 2의 배수는 N/2 개가 있다.

4의 배수들은 여전히 하나씩 더 들고 있을 것이다. 4의 배수의 갯수는 N/4 개이다.

마찬가지로 8의 배수는 ...

요렇게 다 셀 수 있다. 즉 소수 X의 갯수는

X^1 부터 시작해서 X^i <= N 까지 증가시키면서 Math.floor(N / X^i) 를 더해가면 된다.
*/


function countPrimeOfFactorial(n, prime) {
  let count = 0;
  let div = prime;
  while (div <= n) {
    count += Math.floor(n / div);
    div *= prime;
  }
  return count;
}

function countTrailingZerosOfFactorial(n) {
  if (n <= 1) {
    return 0;
  }
  const twos = countPrimeOfFactorial(n, 2);
  const fives = countPrimeOfFactorial(n, 5);
  return Math.min(twos, fives);
}

console.log(countTrailingZerosOfFactorial(15));

/*
조금 더 생각해보면 N!에서 2의 갯수는 항상 5의 갯수보다 클 수 밖에 없다. 5가 하나 추가될 때 마다 2는 최소 2개 이상 씩 추가 되기 때문이다.
그래서 5의 갯수만 새도 충분하다.
*/

function countTrailingZerosOfFactorial(n) {
  if (n <= 4) {
    return 0;
  }
  return countPrimeOfFactorial(n, 5);
}

console.log(countTrailingZerosOfFactorial(92392));

/*
이 알고리즘은 5씩 나눠가면서 O(1)일을 수행하기 때문에 O(log N) 인 알고리즘이다.
만약 이게 자주 불린다면 캐시를 할 수 있을 것 같다.
N이 주어지면  N - (N mod 5) 를 계산한 다음 이를 hash table에 넣으면 될 것 같다. N의 범위가 예측 가능할 때
*/
