/*
공백은 ascii ' '만 한다.
문자는 ascii만.
최종 길이가 주어진다.
문자 배열로 해라.
이건 문자가 고정이기 때문에 뒤에서 부터 복사해나가면서 ' ' 일 경우 원본 대신 '%' '2' '0' 을 채우면 되겠다.
원본 배열의 끝에 채워나가면 되고, 혹시나 복사하는 애가 원본을 먼저 덮어쓰는 경우가 생길 수 있나를 살펴봐야 한다.
-> 남은 원본이 + 지금까지 변환된 애들 > 최종 길이 인 경우가 생기냐 이냐인데, 
변환 과정중에 원본이 확 짧아지거나 해야 하는데 일정하게 한글자씩만 줄어들기 때문에 상관 없다.
*/

function escapeSpaceUrl(charArr, len, finalLen) {
  if (charArr == null || len == 0 || finalLen <= len) {
    return;
  }

  let finalIdx = finalLen - 1;
  let origIdx = len - 1;
  while (finalIdx > origIdx) {
    if (charArr[origIdx] == ' ') {
      charArr[finalIdx--] = '0';
      charArr[finalIdx--] = '2';
      charArr[finalIdx--] = '%';
      origIdx--;
    } else {
      charArr[finalIdx] = charArr[origIdx];
      finalIdx--;
      origIdx--;
    }
  }
}

function escapeSpaceUrlHelper(str) {
  const charArr = Array.from(str);
  const numSpace = charArr.filter(ch => (ch == ' ')).length;
  escapeSpaceUrl(charArr, str.length, str.length + numSpace * 2);
  return charArr;
}

console.log(escapeSpaceUrlHelper(' he l lo'));
