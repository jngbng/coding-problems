/*
가장 단순한건 일단 무조건 만들어보고, 길이 비교후에 짧은 애를 리턴하는거다.
만드는 방법은 array를 쓰는데 [문자1, 횟수, 문자2, 횟수, ... ]를 만들고 join하면 된다.
안 만들고 길이를 비교하려면 횟수들의 숫자를 보고 길이를 측정해서 더해 나가면 되겠다.
다행히 문자가 'a'-'z' 범위라서 int array에 가능하다.

time complexity는 배열 생성에 O(문자열 길이)가 들고 길이 예측하는데 O(문자열 길이)이 들기 때문에 전체는 O(문자열 길이) 이다.
공간 복잡도는 저 배열을 만드는데 최대 2*문자열 길이만큼 만들기 때문에 O(문자열 길이) 이다.
*/

function decimalLen(i) {
  let len = 1;
  while (i >= 10) {
    len++;
    i = (i / 10) | 0;
  }
  return len;
}

console.log(decimalLen(1));
console.log(decimalLen(10));
console.log(decimalLen(15));

function compress(str) {
  if (str == null || str.length == 0) {
    return str;
  }
  const zip = [str[0], 1];
  for (let i = 1; i < str.length; ++i) {
    if (zip[zip.length - 2] == str[i]) {
      zip[zip.length - 1]++;
    } else {
      zip.push(str[i], 1);
    }
  }
  let compLen = 0;
  for (let i = 0; i < zip.length; i+=2) {
    compLen += 1 + decimalLen(zip[i+1]);
  }
  if (compLen > str.length) {
    return str;
  }
  return zip.join('');
}

console.log(compress("aaabbc"));
console.log(compress("abcd"));


/*
더 줄일 수 있는가? 도중에 빠른 포기를 할 수 있나?
글자가 바뀔 때 마다,
compress 길이를 동시에 만들어 나가면서,
남은 문자열이 모두 같은 글자라서 최대한 압축된다 가정했을 때
그 길이가 length 보다 길면 반환하면 되겠다.
*/
