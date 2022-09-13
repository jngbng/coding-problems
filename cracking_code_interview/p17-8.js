/*
위에 있는 사람은 키도, 몸무게도 작아야 한다. 최대로 쌓을 수 있는 인원 수.

일단 키 순으로 정렬해보자.

110, 130, 150, 162, ...

N(i)는 i번째 사람을 포함해서 탑을 쌓을 수 있는 최대 인원 수라고 하자.

그럼 N(i+1) = (max (j = 0 to i)  N(j) where weight_j > weight_(i+1) ) + 1

최대 인원수는 max N(i) 이다.

N 명이 주어지면 정렬하는데 N log N.

마지막에 테이블 채우는데 N^2.

시간 복잡도는 O(N^2), 공간 복잡도는 O(N)이 든다.

*/

function max(arr) {
  if (arr.length == 0) {
    return null;
  }
  let ret = arr[0];
  for (let i = 1; i < arr.length; ++i) {
    ret = Math.max(ret, arr[i]);
  }
  return ret;
}

function calcMaxHeight(people) {
  if (people == null) {
    return -1;
  }
  if (people.length <= 1) {
    return people.length;
  }
  const people = people.slice().sort(function (a,b) {
    return a.ht - b.ht;
  });
  const height = new Array(people.length).fill(0);
  height[0] = 1;
  for (let i = 1; i < people.length; ++i) {
    let subMax = 0;
    const person = people[i];
    for (let j = 0; j < i; ++j) {
      if (people[j].ht < person.ht && people[j].wt < person.wt) {
        subMax = Math.max(subMax, height[j]);
      }
    }
    height[i] = subMax + 1;
  }
  return max(height);
}
