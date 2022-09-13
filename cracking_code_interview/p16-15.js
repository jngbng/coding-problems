/*
R Y G B

4칸. answer, guess

정답의 색깔별 갯수

일단 hit를 모두 재거하고,
남은 정답의 색깔별 갯수와, guess의 색깔별 갯수를 비교해서 pseudo-hit를 계산한다.?

*/

function countChar(str) {
}

function decrease(map, key) {
  // delete value count down to zero.
}

function masterMind(answer, guess) {
  const answerCount = countChar(answer);
  const guessCount = countChar(guess);

  let hitCount = 0;
  for (let i = 0; i < answer.length; ++i) {
    if (answer[i] == guess[i]) {
      hitCount++;
      decrease(answerCount, answer[i]);
      decrease(guessCount, answer[i]);
    }
  }
  let pseudoHitCount = 0;
  for (let [char, count] of answerCount) {
    const remainGuessCount = guessCount.get(char) || 0;
    if (count > 0 && remainGuessCount > 0) {
      pseudoHitCount += Math.min(count, remainGuessCount);
    }
  }
  return [hitCount, pseudoHitCount];
}
