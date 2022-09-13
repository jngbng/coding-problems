/*
소인수가 3, 5, 7 로만 구성된 숫자들 중 k 번째.

1 3 5 7 9, 15, 21, ....

 3 5 7
(0,0,0) = 1

소인수의 총 합이 1일 때.

(1,0,0) = 3
(0,1,0) = 5
(0,0,1) = 7

소인수의 총 합이 2일 때.

(2,0,0) = 9
(1,1,0) = 15
(1,0,1) = 21
(0,2,0) = 25
--------------   (3,0,0) = 27
(0,1,1) = 35
--------------   (2,1,0) = 45
(0,0,2) = 49

소인수 합이 3인 애가 2인 애보다 작을 수 있다.


소인수의 총 합이 n인 수 중 가장 큰 수는 7^n, 가장 작은 수는 3^n.

7^n > 3^(n+1)

(7/3)^n > 3 인 n도 존재할 수 있음.

3^3 < 7^2

즉 3을 3번 곱하는게, 5를 2번 곱하는 것 보다 작다.


k 번째 숫자의 특징은 뭘까?


(0,2,0) = 25 에서 다음 숫자를 찾을 때

7/5 를 곱하는 것보다 => 5를 하나 빼고, 7을 추가.
27/25 곱하는게 낫다. -> 5를 둘 빼고, 3을 셋 추가.

가장 무식한 방법은 뭘까?

필요한 소수의 최대 개수는 log_3 K 개 이하,
최소 갯수는 log_7 K 개 이상일 것 같다... 맞나?


그런데 어쨋다고? 다 만들어 봐야 아는거 아닌가...?

음 min heap을 써서, 최소를 하나 뽑아서, 3곱한거, 5 곱한거, 7곱한거를 집어넣고, min을 뽑는걸 k번 반복하면?
*/


function newMinHeap() {
  return [];
}

function popMin(minHeap) {
  if (minHeap.length == 0) {
    throw new Error("Empty");
  }
  if (minHeap.length == 1) {
    return minHeap.shift();
  }
  let min = minHeap[0];
  minHeap[0] = minHeap.pop();
  let maxIdx = minHeap.length - 1;
  // push down
  let idx = 0;
  while (idx < maxIdx) {
    let minChildIdx = 2 * idx + 1;
    if (minChildIdx > maxIdx) {
      break;
    }
    if (minChildIdx + 1 <= maxIdx) {
      if (minHeap[minChildIdx] > minHeap[minChildIdx+1]) {
        minChildIdx++;
      }
    }
    if (minHeap[idx] < minHeap[minChildIdx]) {
      break;
    }
    swap(minHeap, idx, minChildIdx);
    idx = minChildIdx;

  }
  return min;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function addMinHeap(minHeap, elem) {
  minHeap.push(elem);
  let idx = minHeap.length - 1;
  let parentIdx = (idx - 1) >> 1;
  while (parentIdx >= 0 && minHeap[parentIdx] > minHeap[idx]) {
    swap(minHeap, parentIdx, idx);
    idx = parentIdx;
    parentIdx = (idx - 1) >> 1;
  }
}

function addIfNoExists(known, minHeap, elem) {
  if (!known.has(elem)) {
    addMinHeap(minHeap, elem);
    known.add(elem);
  }
}

function popMinAndDeleteKnown(known, minHeap) {
  const ret = popMin(minHeap);
  known.delete(ret);
  return ret;
}

function getMinNth(n) {
  if (n <= 0) {
    return -1;
  }
  const minHeap = newMinHeap();
  const known = new Set();
  let curMin = 1;
  n--;
  while (n > 0) {
    addIfNoExists(known, minHeap, curMin * 3);
    addIfNoExists(known, minHeap, curMin * 5);
    addIfNoExists(known, minHeap, curMin * 7);
    // console.log(minHeap);
    // 중복이 생길 수 있다. 3에서 15를 넣고 5에서 15를 넣는다.
    // 이 중복을 없앨 수 있는 방법은?
    curMin = popMinAndDeleteKnown(known, minHeap);
    n--;
  }
  return curMin;
}

for (let i = 1; i < 13; ++i) {
  console.log(getMinNth(i));
}

/*

생각 잘못해서 바보같이 min heap 썼는데, BST 써서, min 뽑고, 중복 없이 넣는 걸 하면 가장 무식하게는 될 듯.

그런데 이거의 시간 복잡도는 매 단계에서 하나 뽑고, 3번 입력을 반복한다.

삭제는 log N, 입력은 log N 시간이 걸린다. 이러면.. O(N log N) 인가?

그런데 공간 복잡도는 중복을 생각 안하면 매 단계에 3개씩 늘어나므로, O(3N)이라서 O(N)인가...?

*/

/*

정답을 보고.

저기서 3, 5, 7을 곱한 애를 모두 한 곳에다 넣어서 문제인데,

다음에 3을 곱할 애, 다음에 5를 곱할애, 다음에 7을 곱할 애로 나누면 중목을 피할 수 있다.

x에 대해서
Q3은 지금까지 나온 수들에 3을 곱해서 나올 수 있는 다음 숫자들
Q5는 지금까지 나온 수들에 5를 곱해서 나올 수 있는 다음 숫자들
Q7는 지금까지 나온 수들에 7를 곱해서 나올 수 있는 다음 숫자들

Q3에서 뽑은 애는 3x -> Q3, 5x - > Q5, 7x -> Q7에 넣고
Q5에서 뽑은 애는 5x - > Q5, 7x -> Q7에 넣고
Q7에서 뽑은 애는 7x -> Q7에 넣는 식.

*/
