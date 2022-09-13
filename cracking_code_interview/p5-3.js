/*
 특정 비트 하나를 1로 바꿨을 때, 가장 긴 1의 길이를 구하라.

가장 심플한걸 모든 비트에 대해서 1로 바꿨을 때 가장 긴 1의 길이를 구해서
max를 트래킹하는거다.

0비트가 전혀 없을 때를 고려해줘야 하고.
이러면 O(bit수^2)이 나와서 의도한건 아닌 것 같다.

이를 문제를 바꾸면

1s 3  2  4
0s  1  3  1



요런식으로 있을 때 어느 0 하나를 바꿔서 가장 커지는게 뭐냐..

일단 이미 가장 큰 1그룹을 공략해야 하나 싶지만, 2,3번째 그룹이 병합되면 더 커질 수 있다.
대신 병합되려면 두 그룹 사이에는 1이 하나만 있어야 한다.

그럼 1를 그룹을 순회하면서 왼쪽이나 오른쪽에 0비트 하나를 바꿨을 때 길이를 구해서 그 max를 유지하면 되겠다.

그룹을 순회할 때는 왼쪽부터 시작하면 오른쪽이 왼쪽에 합쳐지는건 왼쪽에 의해 고려가 될고,

병합이 안되는 경우는 오른쪽으로 늘리나 왼쪽으로 늘리나 1 늘어나는건 동일하므로 온

아 오히려 0그룹을 순회하면서 길이가 1일 경우는 좌우 숫자를 합하고,
길이가 그 이상일 경우는 좌우 그룹 중 길이가 큰거에 1을 더하면 되겠다.
이 들 중 가장 큰 값을 구하면 된다.
좌우를 비교할 때 boundary 체크를 하도록 하고.

데이터는 [{bit: 0|1, count: 2}] 로 정의하자.
*/

function calcMaxOnes(counts) {
  if (counts.length == 1) {
    if (counts[0].bit == 0) {
      return 1;
    } else {
      return counts[0].count;
    }
  }
  let maxCount = null;
  for (let i = 0; i < counts.length; ++i) {
    if (counts[i].bit == 0) {
      let leftOnes = null;
      if (i - 1 >= 0) {
        leftOnes = counts[i-1].count;
      }
      let rightOnes = null;
      if (i + 1 < counts.length) {
        rightOnes = counts[i+1].count;
      }
      let possibleMaxOnes = null;
      if (counts[i].count == 1) {
        possibleMaxOnes = (leftOnes || 0) + (rightOnes || 0) + 1;
      } else {
        possibleMaxOnes = Math.max(leftOnes || 0, rightOnes || 0) + 1;
      }
      if (maxCount == null || maxCount < possibleMaxOnes) {
        maxCount = possibleMaxOnes;
      }
    }
  }
  return maxCount;
}

function calc(number) {
  const counts = [{bit: number & 1, count: 1}];
  number = number >>> 1;
  for (let i = 1; i < 32; ++i) {
    const bit = number & 1;
    if (counts[counts.length - 1].bit == bit) {
      counts[counts.length - 1].count++;
    } else {
      counts.push({bit: bit, count: 1});
    }
    number = number >>> 1;
  }
  return calcMaxOnes(counts);
}

console.log(calc(1775));

/*
개선한다면 bit를 구분하기 위해 bit를 넣었는데, 짝수 인덱스는 0, 홀수 인덱스는 1비트라고 정하면 숫자 array로 충분할 것 같다.
1비트로 시작한다면 0번째에는 0을 채워넣으면 되겠다.
비교할 때 한번에 최대 2개씩만 알면 되기 때문에 전체를 array에 저장할 필요는 없겠다. 읽어가면서 마지막 1그룹의 갯수만 기억하면 되겠다.
*/
