/*
dynamic 처럼 느껴진다.
*/

function makeMatrix(n, m) {
  let ret = new Array(n);
  for (let i = 0; i < n; ++i) {
    ret[i] = new Array(m);
  }
  return ret;  
}

function palindromLen(str) {
  let ret = makeMatrix(str.length, str.length);
  for (let i = 0; i < str.length; ++i) {
    ret[i][i] = 1;
  }
  let prevChar = str.charCodeAt(0);
  for (let i = 1; i < str.length; ++i) {
    const char = str.charCodeAt(i);
    if (prevChar == char) {
      ret[i-1][i] = 2;
    } else {
      ret[i-1][i] = 1;
    }
    prevChar = char;
  }
  for (let d = 2; d < str.length; ++d) {
    for (let i = 0; i + d < str.length; ++i) {
      let j = i + d;
      let max = Math.max(ret[i+1][j], ret[i][j-1]);
      if (str.charCodeAt(i) == str.charCodeAt(j)) {
        max = Math.max(max, ret[i+1][j-1] + 2);
      }
      ret[i][j] = max;
    } 
  }
  return ret;
}

const ALL_CHARS = 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1;

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var longestPalindrome = function(word1, word2) {
  const total = word1 + word2;
  const parLen = palindromLen(total);
  const firstIdxOfChar = new Map();
  const lastIdxOfChar = new Map();

  let chars = 0;
  for (let i = 0; i < word1.length; ++i) {
    const char = word1.charCodeAt(i);
    if (!firstIdxOfChar.has(char)) {
      firstIdxOfChar.set(char, i);
      chars++;
      if (chars >= ALL_CHARS) {
        break;
      }
    }
  }

  chars = 0;
  for (let i = word2.length - 1; i >= 0; --i) {
    const char = word2.charCodeAt(i);
    if (!lastIdxOfChar.has(char)) {
      lastIdxOfChar.set(char, word1.length + i);
      chars++;
      if (chars >= ALL_CHARS) {
        break;
      }
    }
  }
  
  let max = 0;
  for (const [charCode, idx] of firstIdxOfChar) {
    const lastIdx = lastIdxOfChar.get(charCode);
    if (lastIdx == null) {
      continue;
    }
    let len = 2;
    if (idx + 1 <= lastIdx - 1) {
      len += parLen[idx + 1][lastIdx - 1];
    }
    if (len > max) {
      max = len;
    }
  }

  return max;
};


// afaaadacb ca
// a aaa a    a
console.log(longestPalindrome("aazzlizfmn", "nppqb"));
