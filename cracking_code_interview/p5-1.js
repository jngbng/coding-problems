/*
N, M: 32bit num

i, j. M -> N

            | M |
N ------------------
            j   i

j - i > M을 담기에 충분. 즉 음수는 없다.
*/

// j=0 i=0
// j=2 i=1


function inject(N, M, j, i) {
  const mask = ~((1<<(j - i + 1) - 1)<<i);
  return (N & mask) | (M << i);
}
