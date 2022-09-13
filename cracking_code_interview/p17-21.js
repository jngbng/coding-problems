/*
히스토그램의 부피.

어떤 지점을 i라고 했을 때, 물 수위는

max(min(prevMax(i), nextMax(i)) - value(i), 0)

prevMax는 0..i 까지 중 가장 큰 값.
nextMax는 i..N 중 가장 큰 값.

prevMax를 계산하는데 O(N), nextMax를 계산하는데 O(N), 물 계산하는데 O(N). 총 O(N)
메모리도 총 O(N) 사용.

*/

function calcPrevMax(hist) {
  let max = 0;
  let res = new Array(hist.length);
  for (let i = 0; i < hist.length; ++i) {
    max = Math.max(max, hist[i]);
    res[i] = max;
  }
  return res;
}

function calcNextMax(hist) {
  let max = 0;
  let res = new Array(hist.length);
  for (let i = hist.length - 1; i >= 0; --i) {
    max = Math.max(max, hist[i]);
    res[i] = max;
  }
  return res;
}

function calcWater(hist) {
  if (hist == null || hist.length == 0) {
    return 0;
  }
  const prevMax = calcPrevMax(hist);
  const nextMax = calcNextMax(hist);

  let total = 0;
  for (let i = 0; i < hist.length; ++i) {
    const water = Math.max(Math.min(prevMax[i], nextMax[i]) - hist[i], 0)
    total += water;
  }
  return total;
}

console.log(calcWater([0,0,4,0,0,6,0,0,3,0,5,0,1,0,0,0]));

/*
메모리를 더 줄일 수 있나?
prevMax를 계산한 다음, nextMax은 뒤에서 부터 계산해 오면서 바로 소모하면 저장은 안해도 되겠다.
그러면 prevMax만 저장해두면 된다.
*/
