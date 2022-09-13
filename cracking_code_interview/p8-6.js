/*
스택을 사용하라는 의미가 한 타워를 스택으로 쓰라는 말인가?
-> ㅇㅇ
스택에 있는건 각 디스크의 크기를 정수로 표현했다고 해도 되나? [3, 2, 1] 요렇게.
-> ㅇㅇ


step:
moveDisks(stacks, nDisk, i, j, throughIdx)
=>
moveDisks(stacks, nDisk - 1, i, throughIdx, j)
moveDisk(stacks, i, j)
moveDisks(stacks, nDisk - 1, throughIdx, j, i)
*/

function moveDisk(stacks, startIdx, endIdx) {
  stacks[endIdx].push(stacks[startIdx].pop());
}

function moveDisks(stacks, nDisk, startIdx, endIdx, throughIdx) {
  let k = 0;

  if (nDisk <= 0) {
    return;
  }
  moveDisks(stacks, nDisk - 1, startIdx, throughIdx, endIdx);
  moveDisk(stacks, startIdx, endIdx);
  moveDisks(stacks, nDisk - 1, throughIdx, endIdx, startIdx);
}

function main(nDisk) {
  const stacks = [[], [], []];
  for (let i = nDisk - 1; i >= 0; --i) {
    stacks[0].push(i);
  }
  moveDisks(stacks, nDisk, 0, 1, 2);
  console.log(stacks);
}

main(3);
