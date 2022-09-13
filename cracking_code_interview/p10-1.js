/*
둘다 메모리로 주어지고, integer라 생각하면 되나. 숫자의 범위는 알 수 있나?

A끝에 여유 공간이 있다는 말은 A가 고정된 배열이고, 새로운 배열을 써서는 안된다는 말인가?

머지소트인데, 끝에서 부터 차례대로 해오는식으로 구현하면 되겠다.

A를 먼저 다 쓰거나, B를 먼저 다 쓸 수 있을텐데,

A를 먼저 다 쓰면 B를 계속 복사해야 하지만

B를 먼저 다 쓰면 A는 원래 거기에 있었기 때문에 그냥 종료하면 되겠다.
*/


function mergeSortedInto(intoArr, fromArr) {
  let intoArrEndIdx = intoArr.length - 1;
  let fromArrEndIdx = fromArr.length - 1;

  let targetEndIdx = intoArr.length + fromArr.length - 1;
  while (intoArrEndIdx >= 0 && fromArrEndIdx >= 0) {
    if (intoArr[intoArrEndIdx] < fromArr[fromArrEndIdx]) {
      intoArr[targetEndIdx--] = fromArr[fromArrEndIdx--];
    } else {
      intoArr[targetEndIdx--] = intoArr[intoArrEndIdx--];
    }
  }
  while (fromArrEndIdx >= 0) {
    intoArr[targetEndIdx--] = fromArr[fromArrEndIdx--];
  }
  return intoArr;
}

console.log(mergeSortedInto([1, 3], [2, 10, 42]));
console.log(mergeSortedInto([1, 3, 4], [2, 10, 42]));
console.log(mergeSortedInto([1, 3, 4], [-1, 2, 10, 42]));
