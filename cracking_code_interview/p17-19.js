/*
빠진 숫자 하나 찾기.

나머지는 정확히 하나씩 등장하기 때문에 
sum을 가지고 있고, 빼나가면 되지 않을까? 그러면 O(N)에 O(1)이다.
sum은 N(N+1)/2 이므로 해당 숫자를 표현할 수 있는 자료형이 필요하겠다.


만약 빠진 숫자가 2개라면?
위 방법이라면 남은 숫자가 K 일 때 가능한 조합이, (N - K/2)개 존재하게된다.
그걸 특정하려면?

일단 SUM을 구한 다음 Sigma(N)에서 뺀다.

그럼 K를 얻을 수 있는데, k는 (i + j)로 i <  j <= N 관계를 만족한다.

i 가 존재할 수 있는 최대 범위는 k/2 < N 이다.

그래서 전체를 다시 순회하면서 

Sigma(K/2)에서 빼나간다. 단 i <= K/2 일 때만.
*/

function shuffle(arr) {
  for (let i = 1; i < arr.length; ++i) {
    const j = (Math.random() * (i + 1)) | 0;
    if (i != j) {
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
}

function withoutK(n, k) {
  if (n <= 1 || k <= 0 || k > n) {
    throw new Error('invalid input');
  }
  const ret = [];
  for (let i = 1; i <= n; ++i) {
    if (i != k) {
      ret.push(i);
    }
  }
  shuffle(ret);
  return ret;
}

//console.log(withoutK(10, 3));

function findMissingOne(arr) {
  if (arr == null) {
    return null;
  }
  const n = arr.length + 1;

  let sum = (n * (n + 1))>>1;
  for (const elem of arr) {
    sum -= elem;
  }
  return sum;
}

//console.log(findMissingOne(withoutK(10, 3)));

function withoutTwo(n) {
  const ret = new Array(n);
  for (let i = 0; i < n; ++i) {
    ret[i] = i + 1;
  }
  shuffle(ret);

  return {
    missed: ret.slice(0, 2).sort((a,b) => a - b),
    rest: ret.slice(2),
  }
}

console.log(withoutTwo(10));

function findMissingTwo(arr) {
  if (arr == null) {
    return null;
  }
  const n = arr.length + 2;

  const sum = (n * (n + 1))>>1;
  let missingSum = sum;
  for (const elem of arr) {
    missingSum -= elem;
  }

  let smallerRange = missingSum >> 1;
  let smaller = (smallerRange * (smallerRange + 1)) >> 1;
  for (const elem of arr) {
    if (elem <= smallerRange) {
      smaller -= elem;
    }
  }

  return [smaller, missingSum - smaller];
}

(function () {
  const test = withoutTwo(20);
  const found = findMissingTwo(test.rest);
  console.log(test.missed, found);
})();
