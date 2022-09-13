/*
부분 집합 전체를 반환하는건 set이 주어지고, 전체 set의 array를 다 만들어요 메모리는 충분하다는 가정을 해도 되나?
set의 크기는 max stack depth 보다 낮다고 생각해도 되나?

set은 array로 주어진다고 가정해도 되나.

subset은 각 요소의 포함여부로 표현할 수 있어서 [0 - 2^N -1]의 숫자에 대응할 수 있다.
그래서 숫자를 증가시키면서 각 숫자의 비트 넘버별로 요소를 복사하는 식으로 구성할 수도 있다.

또는 backtrack 방식으로 중간 완성 셋을 만들어 나가면서 최종적으로 결과물을 복사할 수도 있다.
후자는 스택 깊이가 set의 길이만큼 깊어야 하고, 한번에 다 만들어야 한다는 단점이 있다.

전자는 generator 방식으로도 쉽게 변환이 가능하다.
*/

function genPowerRecurAux(elems, startIdx, output) {
  if (startIdx >= elems.length) {
    return;
  }
  genPowerRecurAux(elems, startIdx + 1, output);
  const endIdx = output.length;
  const elem = elems[startIdx];
  for (let i = 0; i < endIdx; ++i) {
    output.push([elem, ...output[i]]);
  }
}

function genPowerRecur(elems) {
  const output = [[]];
  genPowerRecurAux(elems, 0, output);
  return output;
}

console.log(genPowerRecur([1, 2]));
