function getPi(pattern) {
  let size = pattern.length;
  let pi = new Array(size).fill(0);
  let j = 0;
  for (let i = 1; i < size; ++i) {
    while (j > 0 && pattern.charCodeAt(i) != pattern.charCodeAt(j)) {
      j = pi[j - 1];
    }
    if (pattern.charCodeAt(i) == pattern.charCodeAt(j)) {
      pi[i] = ++j;
    }
  }
  return pi;
}

function kmp(str, pattern) {
  const ans = [];
  const pi = getPi(pattern);
  const pSize = pattern.length;
  let j = 0;
  for (let i = 0; i < str.length; ++i) {
    while (j > 0 && str.charCodeAt(i) != pattern.charCodeAt(j)) {
      j = pi[j - 1];
    }
    if (str.charCodeAt(i) == pattern.charCodeAt(j)) {
      if (j == pSize - 1) {
        ans.push(i - j);
        j = pi[j];
      } else {
        j++;
      }
    }
  }
  return ans;
}

console.log(kmp("abcabcabvbaccababcab", "abc"));

console.log(kmp("aaaa", "aa"));
