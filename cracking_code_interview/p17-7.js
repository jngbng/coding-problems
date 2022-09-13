/*
이름-빈도수 N개
이름-동의이름 M개

가장 흔한 이름 10,000명의 이름별 빈도수. 최종리스트에서 동일하면 어무거나.

가장 무식한 방법은, 이름을 normalize 하는 함수를 만들고,

이름-빈도수를 순회하면서 norm이름-빈도수 맵으로 바꾼 후,

value 기준으로 정렬해서 sum이 10,000이 될 때까지 고르면 된다.

이름 normalize 하는 함수는 사전 순으로 뒷쪽 이름이 키가되고, 앞쪽 이름이 value가 되도록해서
이름-동의이름 목록을 다 넣고,
조회할 때는 더 이상 value가 나오지 않을 때까지 look-up을 반복하면 된다.

normalize 를 조금 더 효율적으로 만드는 방법은 [이름-동의이름]을 정렬해서

이름과 동의이름을 사전순으로 역순 정렬하고,
두번째 이름을 기준으로 사전순으로 역순 정렬하면 된다.

그러면 한 키를 넣을 때 이름 - (동의이름 lookup)을 넣어나가면

한번에 이름 -> norm이름으로 곧바로 넣을 수 있다.

그러면 이름을 조회해서 없으면 바로 norm이름이고, 있으면 해당 이름이 norm 이름이 된다.

이 테이블을 만드는데 O (M log M)가 든다.

마지막이 이름-빈도수를 normalize 하는데 O(N) 이 들고, 빈도 순으로 정렬하는데 O(N log N)가 된다.

빈도순 10,000을 뽑을 필요가 없으면 정렬은 필요 없으니 O(N)이 된다.

O(M log M + N) 이다.

더 나은 방법은 뭐가 있을까?

저 테이블을 만들기 위해 무조건 정렬된 상태가 필요할까?

before -> after만 정렬된 상태로 들어가 있다면,

map[after] == null 일 때까지 재귀를 돌면 되기 때문에,

재귀를 돌 때 마다 캐시를 하면  어떤 M개의 이름 군에 대해서는 총 M-1번의 호출을 하니깐

시간 복잡도는 O(M), 공간 복잡도는 O(M)이 된다.

그러면 전체 복잡도는 O(M + N) 이 된다.

*/

// sort 버전
//
// function buildNormalizeMap(nameTuples) {
//   let nameMap = new Map();
//   let sortedTuples = nameTuples.map((nameTuple) => {
//     if (nameTuple[0] < nameTuple[1]) {
//       return [nameTuple[1], nameTuple[0]];
//     } else {
//       return nameTuple;
//     }
//   });
//   sortedTuples.sort(function (tuple1, tuple2) {
//     if (tuple1[1] < tuple2[1]) {
//       return 1;
//     } else if (tuple1[1] == tuple2[1]) {
//       return 0;
//     } else {
//       return -1;
//     }
//   });
//   for (const tuple of sortedTuples) {
//     const normName = nameMap.get(tuple[1]) || tuple[1];
//     nameMap.set(tuple[0], normName);
//   }
//   return nameMap;
// }

// function getNormName(nameMap, name) {
//   return nameMap.get(name) || name;
// }


function buildNormalizeMap(nameTuples) {
  let nameMap = new Map();
  for (const tuple of nameTuples) {
    if (tuple[0] == tuple[1]) {
      continue;
    }
    const nonNorm = (tuple[0] > tuple[1]) ? tuple[1] : tuple[0];
    const normName = (nonNorm == tuple[0]) ? tuple[1] : tuple[0];
    nameMap.set(nonNorm, normName);
  }
  return nameMap;
}

function getNormName(nameMap, name) {
  let normName = nameMap.get(name);
  if (normName == null) {
    return name;
  }
  let finalNormName = getNormName(nameMap, normName);
  if (finalNormName != normName) {
    nameMap.set(name, finalNormName);
  }
  return finalNormName;
}

function mapInc(map, key, amount) {
  map.set(key, (map.get(key) || 0) + amount);
}

function normalizeNameCount(nameFreqs, nameTuples) {
  const nameMap = buildNormalizeMap(nameTuples);
  const nameFreqMap = new Map();

  for (const nameFreq of nameFreqs) {
    const normName = getNormName(nameMap, nameFreq[0]);
    mapInc(nameFreqMap, normName, nameFreq[1]);
  }

  return nameFreqMap.entries();
}
