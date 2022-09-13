
function printQueenPositions(positions, remainPositions, forbiddenLeft, forbiddenRight) {
  if (remainPositions.size == 0) {
    console.log(positions);
    return;
  }
  const remainPositionsToPass = new Set(remainPositions);
  for (const position of remainPositions) {
    const asBit = 1 << position;
    if ((forbiddenLeft & asBit) == 0 && (forbiddenRight & asBit) == 0) {
      positions.push(position);
      remainPositionsToPass.delete(position);
      printQueenPositions(positions, remainPositionsToPass, ((forbiddenLeft | asBit) << 1), ((forbiddenRight | asBit) >>> 1));
      positions.pop();
      remainPositionsToPass.add(position);
    }
  }
}

function printQueenPositionsMain() {
  printQueenPositions([], new Set([0, 1, 2, 3, 4, 5, 6, 7]), 0, 0);
}

printQueenPositionsMain();
