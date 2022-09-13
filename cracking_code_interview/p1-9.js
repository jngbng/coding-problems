/*

회전되어 있는 문자열이 있고,
isSubstring이 있다.

isSubstring은 한번만 호출해라.

일단 길이가 다르면 종료.

쉬프트 된게 K라고 해보자. (0 <= K < N)

a1    a2 ... a_k ...... a_n

a_(n-k+1)    a1 ....... a_(n - k)

1 2 3 4

4 1 2 3

s2가 s1을 회전시킨 결과인지?

s2 를 이어 붙여서 s2 + s2 를 만들면 s1은 s2안에 반드시 등장하게 된다.

그런데 이러면 오탐의 위험이 있겠다. 회전시킨게 아닌데 같다고 나올...수가 있나?

없겠다.

*/

function isRotated(s1, s2) {
  if (s1 == null || s2 == null) {
    return null;
  }
  if (s1.length !== s2.length) {
    return false;
  }

  return (s2+s2).indexOf(s1) >= 0;
}
