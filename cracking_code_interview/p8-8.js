/*
조건들은 다 이전과 같다고 하자.

문제는 중복이 있을 수 있다는 점이다.
그리고 결과에서 중복은 없어야 한다는 점이다.

중복이 생기는 경우를 좀 더 생각해보겠다.


a, b, b, c

case1 두번째 호출에서 첫번째 b를 선택하고 그 후 호출에서 나머지 b를 선택
case2 두번째 호출에서 세번째 b를 선택하고 그 후 호출에서 이전 b를 선택.

그러면 case2를 없애야 할 것 같다. 가장 단순하게 생각하면 두번째 스탭에서 b로 호출은 한번만 하면 될 것 같다.

즉 b가 여럿이 있을 때, b에 순서가 있다고 생각해서, 반드시 b는 순서대로만 쓰인다고 하면 중복을 없앨 수 있겠다.

이를 위해 charCount = { 'c': occurance } ( occurance > 0) 맵을 사용하겠다.
*/

function permuteAux(charCount, prefix, output) {
  if (charCount.size == 0) {
    output.push(prefix);
    return;
  }
  const remainCharCount = new Map(charCount);
  for (const [ch, count] of charCount.entries()) {
    if (count == 1) {
      remainCharCount.delete(ch);
    } else {
      remainCharCount.set(ch, count - 1);
    }
    permuteAux(remainCharCount, prefix + ch, output);
    remainCharCount.set(ch, count);
  }
}

function countChar(str) {
  if (str == null) {
    return null;
  }
  const ret = new Map();
  for (const ch of str) {
    ret.set(ch, (ret.get(ch) || 0) + 1);
  }
  return ret;
}

function permute(str) {
  if (str == null) {
    return null;
  }
  if (str === "") {
    return [""];
  }

  const charCount = countChar(str);
  const output = [];
  permuteAux(charCount, "", output);
  return output;
}

console.log(permute("abc"))
console.log(permute("aab"))
console.log(permute("aabb"))
