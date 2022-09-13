/* 단어 간의 거리

리니어 스캔하면서 최소값을 추적한다.

w1  w2  w2  w1

스캔 하다가 둘 중 하나를 만나면
lastScan = w1, lookFor = w2, dist = 0
를 설정하고,

계속 찾다가 lookFor를 찾으면
minDist를 업데이트하고, lastScan <-> lookFor를 바꾼다.

lastScan을 찾으면 dist를 0으로 다시 초기화한다.

아니면 dist를 1 증가한다.

이게 되는 이유는 두 단어의 최소 길이는, 둘 사이에 w1나 w2가 있을 수 없기 때문이다.

*/

function minDist(words, word1, word2) {
  let minDist = null;
  let dist = 0;
  let lastScan, lookFor;

  for (let i = 0; i < words.length; ++i) {
    dist++;
    if (words[i] == word1 || words[i] == word2) {
      if (lastScan == null) {
        lastScan = words[i];
        lookFor = (lastScan == word1) ? word2 : word1;
        dist = 0;
        continue;
      }
      if (words[i] == lookFor) {
        if (minDist == null) {
          minDist = dist;
        } else {
          minDist = Math.min(minDist, dist);
        }
        [lastScan, lookFor] = [lookFor, lastScan];
        dist = 0;
      } else {
        dist = 0;
      }
    }
  }
}

/*
이걸 여러번 실행한다면...
단어별로 출현 index를 정렬된 상태로 기록하는 hashtable을 만들고,
두 단어가 주어지면, 두 array에서 diff가 min이 되는 쌍을 찾는 문제로 풀겠다.

책에 등장하는 단어의 수가 N, 단어 종류가 M이라 하면
lookup을 O(1)으로 잡으면 O(N/M) 시간에 풀 수 있고, 메모리는 O(N + M)만큼 사용한다.
*/
