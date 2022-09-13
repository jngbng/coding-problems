/*
이것도 그냥 n개 있으면 무작위로 하나 뽑고, 남은 것 중에 무작위로 하나 뽑고, m번 반복하면 끝.
확률 계산해보면 첫번째 선택된 원소는 1/n,
두번째 선택된 원소는 (n-1) / n * 1/(n-2) = 1/n.
*/

function shuffle(arr, maxDepth) {
}

function choose(arr, n) {
  if (arr == null || arr.length > n) {
    return null;
  }

  const arrCopy = arr.slice();
  shuffle(arrCopy, n);
  return arrCopy.slice(0, n);
}

// or

function randomInt(fromIncl, maxExcl) {
  return fromIncl + Math.floor((Math.random() * (maxExcl - fromIncl)));
}

function choose(arr, n) {
  if (arr == null || arr.length < n) {
    return null;
  }

  const arrCopy = arr.slice();
  const selected = [];
  for (let i = 0; i < n; ++i) {
    let chosenIdx = randomInt(i, arrCopy.length);
    selected.push(arrCopy[chosenIdx]);
    arrCopy[chosenIdx] = arrCopy[i];
  }
  return selected;
}

console.log(choose([1,2,3,4,5], 3));
