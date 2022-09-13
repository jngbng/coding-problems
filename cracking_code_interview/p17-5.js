/*

문자, 숫자라는게 한 글자를 의마하는거 맞나?
결국 이 문제는 true / false로 이루어져 있는 배열이라 보면 되나.

부분 배열이라는 의미가 가장 긴 이어진 원소의 길이라 보면 되나?

아니면 일부를 뽑으라는 말인가? 0, 1, 3, 4, 7, 8.

일부를 뽑으라는 말은, 
그냥 true/false count한 다음에, min(true, false)해서 앞에서 부터 스캔하면서 고르면 되니깐 아닐꺼고

이어진 인덱스 범위 (from, to)일 것 같다. 

0에서 시작해서 현재까지 길이 차이를 가지는 배열을 생각해보자.

0 1 2 3 4 5 6 7 8 9 0 1
t t t f t f f t t f f f
1 2 3 2 3 2 1 2 3 2 1 0


0에서 시작해서 가장 긴 길이는 끝에서 처음까지 0을 찾아오면 된다.
1에서 시작해서 가장 긴 길이는, 끝에서 0인 1이 최초로 등장하는 지점을 찾아오면 된다.
...
i에서 시작해서 가장 긴 길이는 끝에서 i-1이 최초로 등장하는 지점을 찾아오면 된다.

이러면 계산하는데 n, 두 페어를 검색하는데 N^2이 된다.

소소한 최적화로 i + (이전 max 길이) 까지만 봐도 된다.

*/

function calcLenArr(arr) {
  let diff = 0;
  const ret = [];
  for (const elem of arr) {
    if (elem) {
      diff++;
    } else {
      diff--;
    }
    ret.push(diff);
  }
  return ret;
}

function findLongestSubseq(arr) {
  if (arr == null || arr.length == 0) {
    return [-1, -1];
  }
  const lenArr = calcLenArr(arr);
  let startIdx = -1;
  let len = 0;

  for (let i = 0; i < lenArr.length; ++i) {
    const lookUpValue = (i == 0) ? 0 : lenArr[i - 1];
    const until = i + len;
    for (let j = lenArr.length - 1; j > until; --j) {
      if (lenArr[j] == lookUpValue) {
        if (j - i > len) {
          startIdx = i;
          len = j - i;
        }
        break;
      }
    }
  }
  return [startIdx, startIdx + len];
}

console.log(findLongestSubseq([true, true, true, false, true, false, false, true, true, false, false, false]));

/*

최악의 경우는

t t t t t t t t t
1 2 3 4 5 6 7 8 9

인데, 0번 인덱스에서 시작해서 없다고 결정이 나오면,

두번째 루프를 돌 필요가 있을까? 있겠다. 

t t t f f
1 2 3 4 3


여기서 중복되는 작업은 이전 서치의 결과에서 다음 시도는 1 증가하거나 줄었다는 사실인데, 이걸 사용 안한다.

*/
