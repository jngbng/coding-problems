/*
case insensitive / unicode를 가진다고 하자.
빈칸같은 모든 글자도 일반 문자로 취급하는게 맞나?

데이터는 메모리에 다 올라오는거고, 결과를 모두 메모리에 생성해서 반환해도 되는건가?

생성되는 순열의 정렬 순서 조건 같은게 있나?

직관적으로 순열을 생성할 때 쓰는 방법으로 해보겠다.

첫번째 자리에 가능한 경우의 순서대로 하고, 나머지 문자열로 순열들을 생성하겠다.

permute(Set<char> chars, String prefix, String[] output)

for each char : chars
permute(chars - {char}, prefix + char, output)
*/

function permuteAux(chars, prefix, output) {
  if (chars.size == 0) {
    output.push(prefix);
    return;
  }
  const remainChars = new Set(chars);
  for (const ch of chars) {
    remainChars.delete(ch);
    permuteAux(remainChars, prefix + ch, output);
    remainChars.add(ch);
  }
}

function permute(str) {
  if (str == null) {
    return null;
  }
  if (str === "") {
    return [""];
  }

  const chars = new Set(str.split(''));
  const output = [];
  permuteAux(chars, "", output);
  return output;
}

console.log(permute("abc"))
