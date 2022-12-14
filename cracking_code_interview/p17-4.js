/*
A: 0 ~ n 중 i 빼고 다 들어있다.

상수 시간은 A[i]의 j번째 비트 읽기 뿐.

O(n)에 할 수 있을까?

A에는 최소 n개가 있다.

중복해서는 없는건가?

중복으로 없다면, A의 모든 비트를 하나씩 읽어서 (32bit씩 조합한 후에) 죄다 더한다.
그러면 n(n + 1) / 2 - i가 된다. 그럼 n(n+1)/2 와 빼면 i를 알 수 있다.
모든 비트를 한번씩 읽기 때문에 O(n)이 된다.
또는 값을 읽어서 (32bit씩 묶어서) XOR한 후에 0~N을 XOR한 값과 XOR 하면 빠진 값을 알 수 있다.

A에 n개 이상의 원소가 있어서 중복되는 t값이 있다면, 모든 값을 트래킹 해야 한다.
n-bit BitMap을 만들어서 
A[i] 값을 읽어서 해당하는 비트를 1로 세팅하면 된다.

이것도 모든 비트를 죄다 읽어야 한다.

그런데 이게 의도가 맞나? 한 비트만 읽을 수 있다고 굳이 제한한 이유가..

모든 비트를 읽지 않고 풀 수 있는 방법은?

0비트는, 모든 숫자의 비트를 읽어서 0과 1의 갯수를 샌다.

그러면 n이 짝수면 0이 1보다 하나 더 많아야 한다.
n이 홀수면 0과 1의 갯수가 같아야 한다.

그래서 마지막 비트를 확정할 수 있다. 그 전 비트는 어떻게 알 수 있는가?

홀수나 짝수를 알았다면,

그 다음으로 읽어야 하는 비트를 필터링 하기 위해 홀수였던 index들 또는 짝수였던 index들을 모두 기억하고 있어야 한다.

*/
