/*
사람: [birth, die]
살았다 판단할 때 inclusive.

1900 ~ 2000 사이에 태어났다.

지금 년도가 X고, 현재 살아 있다면 die에는 X가 들어온다 가정하자.

그럼 X는 스캔으로 구할 수 있다.

그럼 모든 사람을 순회하면서 태어난 연도에 1증가하고, 죽은 다음 연도에 1을 감소시키면,

연도별로 사람의 증감을 얻을 수 있겠다. 이걸 누적해서 더해가면 해당 연도의 사람을 알 수 있다.

그래서 이거의 max를 구하면...?

전체 사람을 스캔하는데 O(N)이 걸리고,
전체 기간 구간(M)을 스캔하기 때문에 O(M)이 된다.
그런데 2000 이후로는 죽기만 할꺼기 때문에 스캔 안해도 된다. 그래서 O(M)이라서 O(1)으로 무시해도 된다.

그래서 전체는 O(N + M) = O(N)
*/

const MIN_YEAR = 1900;

function maxPopulation(people) {
  const diffs = new Array(101).fill(0);

  for (const person of people) {
    diffs[person.birth - MIN_YEAR]++;
    if (person.death < 2000)  {
      diffs[person.death - MIN_YEAR + 1]--;
    }
  }
  let max = diffs[0];
  let sum = max;
  for (let i = 1; i < diffs.length; ++i) {
    sum += diffs[i];
    max = Math.max(max, sum);
  }
  return max;
}

/*
더 나은 방법은? 사실 시간 복잡도를 더 줄일 수는 없다. 공간 복잡도도 O(1)이긴 하지만 array 100개쓰긴 한다.

사소하게 더 최적화 할 수 있는 방법은?

답안과 추가 문제를 고려해서 M을 알 수 없거나 N 보다 훨씬 크다고 해보자. 또는 M을 미리 알 수 없다.

그럴 때에는 hashtable쓸 수 있고, 저 테이블의 최대 크기는 2N개가 된다. 그래서 O(N) 으로 풀 수 있다. 

대신 hash table 을 마지막에 키로 정렬해야기 때문에  O(M log M) -> O(N log N) 가 든다. 그래서 O(N log N)으로 풀린다.

*/

