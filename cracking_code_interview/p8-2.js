/*
행 r
열 c

경로라는게 최단 경로인가?
최단 경로가 여럿이면 그중 아무거나 선택해도 되나?

데이터는 2차 array로 주어진다고 생각해도 되나? 메모리에 들어간다.


dir(r, c): (r,c)에서 오른쪽 끝으로 가기 위한 최단 방향과 길이.

case1: dir(r+1,c).cost == infinite 
  => sub-case dir(r, c+1).cost == infinite
      (null, infinite)

  => sub-case dir(r, c+1).cost != infinite
      (right, dir(r, c+1).cost + 1)

case2: dir(r, c+1).cost == infinite
  => sub-case dir(r+1, c).cost == infinite
      (null, infinite)

  => sub-case dir(r+1, c).cost != infinite
      (right, dir(r+1, c).cost + 1)

case3:
  => sub-case: dir(r+1, c).cost < dir(r, c+1).cost
    (down, dir(r+1, c).cost)

  => else
    (right, dir(r, c+1).cost)

그런데 cost 를 보면 방향은 바로 알 수 있기 때문에 그냥 cost만 유지해도 되겠다.

dir(r, c): (r,c)에서 오른쪽 끝으로 가기 위한 최단 길이.

case1: dir(r+1,c).cost == infinite 
  => sub-case dir(r, c+1).cost == infinite
      infinite

  => sub-case dir(r, c+1).cost != infinite
      dir(r, c+1).cost + 1

case2: dir(r, c+1).cost == infinite
  => sub-case dir(r+1, c).cost == infinite
      infinite

  => sub-case dir(r+1, c).cost != infinite
      dir(r+1, c).cost + 1

case3:
  => sub-case: dir(r+1, c).cost < dir(r, c+1).cost
     min(dir(r+1, c).cost, dir(r, c+1).cost) + 1
*/

const DIR_RIGHT = 'r';
const DIR_DOWN = 'd';

class Selection {
  // char direction;  'r' | 'd'
}

function initMap(rows, cols) {
  return new Array(rows).fill(null).map(() => new Array(cols).fill(null));
}

function printPath(costMap, rows, cols) {
  if (costMap[0][0] === -1) {
    console.log('No route');
    return;
  }
  let rIndex = 0, cIndex = 0, curCost = costMap[0][0];
  while (rIndex != rows - 1 || cIndex != cols - 1) {
    if (rIndex + 1 < rows && costMap[rIndex + 1][cIndex] === curCost - 1) {
      rIndex++;
      console.log('Down');
    } else {
      cIndex++;
      console.log('Right');
    }
  }
}

function calcReachCost(allowMap, rows, cols) {
  const costMap = initMap(rows, cols);

  if (rows < 1 || cols < 1) {
    return -1;
  }
  
  if (!allowMap[rows-1][cols-1]) {
    return -1;
  }

  let rIndex, cIndex;
  // fill corner: rIndex == rows - 1, cIndex == cols - 1
  //
  cIndex = cols - 1;
  costMap[rows - 1][cols-1] = 0;
  for (rIndex = rows - 2; rIndex >= 0; --rIndex) {
    if (allowMap[rIndex][cIndex]) {
      costMap[rIndex][cIndex] = costMap[rIndex + 1][cIndex] + 1;
    } else {
      break;
    }
  }
  //
  rIndex = rows - 1;
  for (cIndex = cols - 2; cIndex >= 0; --cIndex) {
    if (allowMap[rIndex][cIndex]) {
      costMap[rIndex][cIndex] = costMap[rIndex][cIndex + 1] + 1;
    } else {
      break;
    }
  }

  // fill center
  for (rIndex = rows - 2; rIndex >= 0; --rIndex) {
    for (cIndex = cols - 2; cIndex >=0; --cIndex) {
      if (allowMap[rIndex][cIndex]) {
        const rightCost = costMap[rIndex][cIndex + 1];
        const downCost = costMap[rIndex + 1][cIndex];
        let cost = -1;
        if (rightCost == -1) {
          if (downCost == -1) {
            //
          } else {
            cost = downCost + 1;
          }
        } else {
          if (downCost == -1) {
            cost = rightCost + 1;
          } else {
            cost = Math.min(rightCost, downCost) + 1;
          }
        }
        costMap[rIndex][cIndex] = cost;
      }
    }
  }
  printPath(costMap, rows, cols);
  return costMap[0][0];
}

calcReachCost([[1, 1, 1], [1, 0, 1]], 2, 3);
