const CHARCODE_A = 'a'.charCodeAt(0);
const CHARCODE_Z = 'z'.charCodeAt(0);
const ALPHA_COUNT = CHARCODE_Z - CHARCODE_A + 1;

const MOD = Math.pow(10, 9) + 7;

// function mid(n, s1, s2) {
//   let count = 0;
//   let i = 0;
//   while (i < n && s1.charCodeAt(i) == s2.charCodeAt(i)) {
//     ++i;
//   }
//   if (i == n) {
//     return count;
//   }
//   count = s2.charCodeAt(i) - s1.charCodeAt(i) - 1;
//   ++i;
//   while (i < n) {
//     const s1After = CHARCODE_Z - s1.charCodeAt(i);
//     const s2Before = s2.charCodeAt(i) - CHARCODE_A;
//     count = (count * ALPHA_COUNT + s1After + s2Before) % MOD;
//     ++i;
//   }
//   return count;
// }

// function allCount(n, s1, s2) {
//   const border = (s1 == s2) ? 1 : 2;
//   return mid(n, s1, s2) + border;
// }

// function countAll(n, s1, s2) {
//   let counts = [];
//   let total = 0;
//   for (let i = 0; i < n; ++i) {
//     let asBase26Num = (s2.charCodeAt(i) - CHARCODE_A) - (s1.charCodeAt(i) - CHARCODE_A);
//     if (asBase26Num < 0) {
//       total = (total - 1 + MOD) % MOD;
//       asBase26Num += 26;
//     }
//     total = (total * 26 + asBase26Num) % MOD;
//     counts.push(total + 1);
//   }
//   return counts;
// }

// console.log(allCount(3, "abc", "bef"), countAll(3, "abc", "bef"));


/*
https://leetcode.com/problems/find-all-good-strings/discuss/2445811/Clean-and-well-structured-Javascript-implementation-(Top-99.2)

sol(i, pi): 0 ~ i-1 번째까지가 evil[0:pi-1]의 suffix가 주어졌을때, 만들 수 있는 good string의 수

left / rigth: i 번째 글짜를 참조할 때 left(s1 boundary)냐 right (s2 boundary)냐.

    c  - abc = s1
  b x  <- left: true / right : false
a
b   x  <- left: false / right : false
d a x  <- left: false / right : true
  b 
    b  - dbb = s2

*/


function getPi(pat) {
  const pi = new Array(pat.length).fill(0);
  let j = 0;
  for (let i = 1; i < pat.length; ++i) {
    while (j > 0 && pat.charCodeAt(i) != pat.charCodeAt(j)) {
      j = pi[j - 1];
    }
    if (pat.charCodeAt(i) == pat.charCodeAt(j)) {
      pi[i] = ++j;
    }
  }
  return pi;
}

function getMemoKey(goodLen, evilPrefixLen, isLeftBoundary, isRightBoundary) {
  return goodLen << 8 | evilPrefixLen << 2 | (isLeftBoundary ? 1 : 0) << 1 | (isRightBoundary ? 1 : 0);
}

function dfs(goodLen, evilPrefixLen, n, s1, s2, evil, isLeftBoundary, isRightBoundary, memo, pi) {
  if (evilPrefixLen == evil.length) {
    return 0;
  }
  if (goodLen == n) {
    return 1;
  }
  const memoKey = getMemoKey(goodLen, evilPrefixLen, isLeftBoundary, isRightBoundary);
  if (memo[memoKey] !== -1) {
    return memo[memoKey];
  }
  let count = 0;

  const start = isLeftBoundary ? s1.charCodeAt(goodLen) : CHARCODE_A;
  const end = isRightBoundary ? s2.charCodeAt(goodLen) : CHARCODE_Z;

  const nextEvilChar = evil.charCodeAt(evilPrefixLen);
  for (let ch = start; ch <= end; ++ch) {
    let nextEvilPrefixLen = evilPrefixLen;

    while (nextEvilPrefixLen > 0 && ch != evil.charCodeAt(nextEvilPrefixLen)) {
      nextEvilPrefixLen = pi[nextEvilPrefixLen - 1];
    }
    if (ch == evil.charCodeAt(nextEvilPrefixLen)) {
      nextEvilPrefixLen++;
    }
    const nextIsLeftBoundary = isLeftBoundary && (ch == start);
    const nextIsRightBoundary = isRightBoundary && (ch == end);
    count += dfs(goodLen + 1, nextEvilPrefixLen, n, s1, s2, evil, nextIsLeftBoundary, nextIsRightBoundary, memo, pi);
    count %= MOD;
  }

  memo[memoKey] = count;
  return count;
}

function solution(n, s1, s2, evil) {
  const pi = getPi(evil);
  /**
   * 17 bits
    * - 9 bit: 2 ** 9 > 500 by evil
    * - 6 bit: 2 ** 6 > 50 by evil
    * - 1 bit left (bound)
    * - 1 bit right (bound)
    */
  const memo = new Array(1<<17).fill(-1);
  return dfs(0, 0, n, s1, s2, evil, true, true, memo, pi);
}



console.log(solution(2, "aa", "da", "b"));
