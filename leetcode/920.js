/*
920. Number of Music Playlists
*/

/** failed try */

/*
goal - n 개를 중복되게 n개로 채운다.

어떤 곡 i가 등장할 수 있는 최대 횟수는?
1 + Math.ceil((goal - n)/(k+1))

sol(goal, distSinceLastPlay)
 = Sum i=[0 to n] sol(goal - 1, distSinceLastPlay') where distSinceLastPlay[i] >= k, 

요렇게 무식하게 brute force를 돌 수는 있다. 당연히 답은 아니겠지.

중복되는 연산은 선두에 만들어진 prefix에 대해서 동일한 뒤의 케이스들이 많을 것 같은데.

뒤의 케이스의 재약 사항은 아래 조건.

어떤 k개 구간을 잡더라도 무조건 다른 애들이 오도록 배치해야 한다.

선택된 k개들의 상태는 2^k < 2^100 으로 무지 많다.

sol(n, goal, i, k): 최근 k개에 i가 등장하지 않으면서 goal 개를 뽑는 솔루션 경우의 수.

case goal == n: (n-1)!

case goal > n:

---------------------------


sol(n, goal, k): n개의 곡으로 goal개를 k-distance를 유지하며 만들 수 있는 리스트의 수.
*/

// const MOD = 10 ** 9 + 7;

// function choose(places, pick, dist, memo) {
//   if (places <= 0) {
//     return 0;
//   }
//   if (pick == 1) {
//     return places;
//   }
//   const memoKey = places * 101 + pick;
//   if (memo[memoKey] != null) {
//     return memo[memoKey];
//   }
//   let total = 0;
//   const max = places - (pick - 1) * dist;
//   for (let i = 0; i < max; ++i) {
//     total += choose(places - i - dist, pick - 1, dist, memo) % MOD;
//   }
  
//   memo[memoKey] = total;
//   return total;
// }

// function sol(n, goal, k, memo, chooseMemo) {
//   if (n == 1) {
//    if (goal == 1) {
//      return 1;
//    } else if (k == 0) {
//      return 1;
//    } else {
//      return 0;
//    }
//   }
//   const memoKey = goal * 100 + n;
//   if (memo[memoKey] != null) {
//     return memo[memoKey];
//   }

//   let total = 0;
//   for (let i = 1; i <= goal - n + 1; ++i) {
//     const nextGoal = goal - i;
//     total += (choose(nextGoal + 1, i, k, chooseMemo) * sol(n - 1, nextGoal, k, memo, chooseMemo)) % MOD;
//   }

//   memo[memoKey] = total;
//   return total;
// }

// var numMusicPlaylists = function(n, goal, k) {
//   const memo = new Array(100*100).fill(null);
//   const chooseMemo = new Array(101*100).fill(null);
//   return sol(n, goal, k, memo, chooseMemo);
// };


/*
위의 경우는 terminal 에서 sol(1, 2, 1) 같은걸 처리하지 못한다.
*/


/*
답안을 보고:
https://leetcode.com/problems/number-of-music-playlists/discuss/2347859/Crystal-clear-commented-recursive-solution-that-reveals-the-intuition-behind-itself

"어떤 k개 구간을 잡더라도 무조건 다른 애들이 오도록 배치해야 한다."
=> 요 조건을 어떻게 활용해야 할까 몰랐는데, 요렇게 쓸 수 있었다.

sol(n, unusedSongs): uniqUsed개의 곡을 이용해서 n개의 리스트를 만드는 방법. (각 곡 간의 거리는 k)

기존에 사용된 곡을 이용해 한곡을 더 뽑거나,

((songs - unusedUniq) - k) * sol(n-1, unusedSongs)

지금까지 사용 안한 새로운 곡을 사용하는 방법

unusedSongs * sol(n-1, unusedSongs - 1)

terminal:
n = 0: unusedSongs == 0 ? 1 : 0

중복 카운트 문제는 발생하지 않나?
*/


const MOD = 10 ** 9 + 7;

var numMusicPlaylists = function(n, goal, k) {
  const memo = new Array(100*100).fill(null);

  const songs = n;
  const sol = function (remainList, unusedSongs) {
    if (remainList == 0) {
      return (unusedSongs == 0) ? 1 : 0;
    };
    if (unusedSongs < 0) {
      return 0;
    }
    const memoKey = remainList * 100 + unusedSongs;
    if (memo[memoKey] != null) {
      return memo[memoKey];
    }
    let count = 0;

    // 기존 곡 사용해서 한곡 더 뽑음.
    const availableUsedSongs = songs - unusedSongs - k;
    if (availableUsedSongs > 0) {
      count = (count + availableUsedSongs * sol(remainList - 1, unusedSongs)) % MOD
    }
    // 새로운 곡 사용
    if (unusedSongs > 0) {
      count = (count + unusedSongs * sol(remainList - 1, unusedSongs - 1)) % MOD;
    }

    memo[memoKey] = count;
    return count;
  };
  
  return sol(goal, songs);
};
