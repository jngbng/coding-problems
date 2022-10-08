
import java.util.*;

class Point {
  int row;
  int col;

  Point(int row, int col) {
    this.row = row;
    this.col = col;
  }

  static Point fromIndex(int side, int index) {
    return new Point(index / side, index % side);
  }

  int toIndex(int side) {
    return row * side + col;
  }

  int calcDistance(Point other) {
    return Math.abs(row - other.row) + Math.abs(col - other.col);
  }
}


// public class Solution {

//   public static void main(String[] args) {
//     Solution sol = new Solution();
//     //System.out.println(sol.calcMaxDistance(10, 60));
//     System.out.println(sol.calcMaxDistance(10, 30));
//   }
  
//   public int solution(int side, int users, int[][] timetable) {
//     int maxUsers = calcMaxConcurrentUsers(timetable);
//     return calcMaxDistance(side, maxUsers);
//   }

//   final int TIME_MIN = 600;
//   final int TIME_MAX = 1320;

//   int calcMaxConcurrentUsers(int[][] timetable) {
//     int[] slots = new int[TIME_MAX - TIME_MIN + 1];
//     for (int[] time : timetable) {
//       slots[time[0] - TIME_MIN]++;
//       slots[time[1] - TIME_MIN + 1]--;
//     }
//     int max = 0;
//     int runningSum = 0;
//     for (int diff : slots) {
//       runningSum += diff;
//       if (runningSum > max) {
//         max = runningSum;
//       }
//     }
//     return max;
//   }
  
//   int finalMaxDist = 1;

//   int calcMaxDistance(int side, int users) {
//     if (users < 2) {
//       return 0;
//     }

//     int totalSlot = side * side;
//     if (users > (totalSlot + 1) / 2) {
//       return 1;
//     }
    
//     this.finalMaxDist = 1;
//     calcMaxDistanceAux(side, new Stack<Point>(), Integer.MAX_VALUE, users);
//     return this.finalMaxDist;
//   }
  
//   void calcMaxDistanceAux(int side, Stack<Point> selected, int maxDist, int remainUsers) {
//     if (remainUsers == 0) {
//       this.finalMaxDist = maxDist;
//       return ;
//     }

//     int lastSelectedIndex = -1;
//     if (selected.size() > 0) {
//       lastSelectedIndex = selected.peek().toIndex(side);
//     }

//     int maxIndex = side * side - remainUsers + 1;
//     for (int i = lastSelectedIndex + 1; i < maxIndex; ++i) {
//       Point newPoint = Point.fromIndex(side, i);

//       int newDist = Math.min(maxDist, minDistance(selected, newPoint));
//       if (newDist <= this.finalMaxDist) {
//         continue;
//       }
//       selected.push(newPoint);
//       calcMaxDistanceAux(side, selected, newDist, remainUsers - 1);
//       selected.pop();
//     }
//   }

//   int minDistance(List<Point> points, Point newPoint) {
//     int minDist = Integer.MAX_VALUE;
//     for (Point p : points) {
//       int dist = p.calcDistance(newPoint);
//       if (dist < minDist) {
//         minDist = dist;
//       }
//     }
//     return minDist;
//   }
// }


// public class Solution {

//   public static void main(String[] args) {
//     Solution sol = new Solution();
//     //System.out.println(sol.calcMaxDistance(10, 3));
//     System.out.println(sol.calcMaxDistance(10, 30));
//     //System.out.println(sol.calcMaxDistance(4, 3));
//   }
  
//   public int solution(int side, int users, int[][] timetable) {
//     int maxUsers = calcMaxConcurrentUsers(timetable);
//     return calcMaxDistance(side, maxUsers);
//   }

//   final int TIME_MIN = 600;
//   final int TIME_MAX = 1320;

//   int calcMaxConcurrentUsers(int[][] timetable) {
//     int[] slots = new int[TIME_MAX - TIME_MIN + 1];
//     for (int[] time : timetable) {
//       slots[time[0] - TIME_MIN]++;
//       slots[time[1] - TIME_MIN + 1]--;
//     }
//     int max = 0;
//     int runningSum = 0;
//     for (int diff : slots) {
//       runningSum += diff;
//       if (runningSum > max) {
//         max = runningSum;
//       }
//     }
//     return max;
//   }
  
//   int finalMaxDist = 1;

//   int calcMaxDistance(int side, int users) {
//     if (users < 2) {
//       return 0;
//     }

//     int totalSlot = side * side;
//     if (users > (totalSlot + 1) / 2) {
//       return 1;
//     }

//     int maxDist = (side - 1) * 2;
    

//     fillDistMap(side, totalSlot);
    
//     this.finalMaxDist = 1;
//     calcMaxDistanceAux(side, totalSlot, new Stack<Integer>(), Integer.MAX_VALUE, users);
//     return this.finalMaxDist;
//   }

//   int[][] distMap;

//   void fillDistMap(int side, int slots) {
//     distMap = new int[slots][slots];
//     for (int i = 0; i < slots; ++i) {
//       int i_row = i / side;
//       int i_col = i % side;
//       for (int j = i + 1; j < slots; ++j) {
//         int j_row = j / side;
//         int j_col = j % side;
//         int dist = Math.abs(i_row - j_row) + Math.abs(i_col - j_col);
//         distMap[i][j] = dist;
//         distMap[j][i] = dist;
//       }
//     }
//   }

//   class Task implements Comparable<Task> {
//     int point;
//     int dist;
//     Task(int point, int dist) {
//       this.point = point;
//       this.dist = dist;
//     }

//     @Override
//     public int compareTo(Task other) {
//       if (other.dist == dist) {
//         return point - other.point;
//       }
//       return other.dist - dist;
//     }
//   }
                        
  
//   void calcMaxDistanceAux(int side, int slots, Stack<Integer> selected, int maxDist, int remainUsers) {
//     if (remainUsers == 0) {
//       System.out.println("---------------------------- Found:" + maxDist);
//       this.finalMaxDist = maxDist;
//       return ;
//     }

//     int lastSelectedIndex = -1;
//     if (selected.size() > 0) {
//       lastSelectedIndex = selected.peek();
//     }

//     int fromIndex = lastSelectedIndex + 1;
//     int maxIndex = slots - remainUsers + 1;
//     Queue<Task> pq = new PriorityQueue<Task>(maxIndex - fromIndex);
//     for (int i = fromIndex; i < maxIndex; ++i) {
//       int newDist = Math.min(maxDist, minDistance(selected, i));
//       pq.add(new Task(i, newDist));
//     }

//     while (!pq.isEmpty()) {
//       Task t = pq.remove();
//       int newDist = t.dist;
//       if (newDist <= this.finalMaxDist) {
//         return;
//       }
//       System.out.println("Depth:" + selected.size() + " Pick " + t.point + " Dist: " + t.dist);
//       selected.push(t.point);
//       calcMaxDistanceAux(side, slots, selected, newDist, remainUsers - 1);
//       selected.pop();
//     }
//   }

//   int minDistance(List<Integer> points, int newPoint) {
//     int minDist = Integer.MAX_VALUE;
//     for (int p : points) {
//       int dist = distMap[p][newPoint];
//       if (dist < minDist) {
//         minDist = dist;
//       }
//     }
//     return minDist;
//   }
// }


// public class Solution {

//   public static void main(String[] args) {
//     Solution sol = new Solution();
//     //System.out.println(sol.calcMaxDistance(10, 3));
//     //System.out.println(sol.calcMaxDistance(10, 30));
//     System.out.println(sol.calcMaxDistance(4, 3));
//     System.out.println(sol.calcMaxDistance(3, 2) + " = 4");
//     System.out.println(sol.calcMaxDistance(2, 2) + " = 2");
//     System.out.println(sol.calcMaxDistance(4, 3) + " = 4");
//   }
  
//   public int solution(int side, int users, int[][] timetable) {
//     int maxUsers = calcMaxConcurrentUsers(timetable);
//     return calcMaxDistance(side, maxUsers);
//   }

//   final int TIME_MIN = 600;
//   final int TIME_MAX = 1320;

//   int calcMaxConcurrentUsers(int[][] timetable) {
//     int[] slots = new int[TIME_MAX - TIME_MIN + 1];
//     for (int[] time : timetable) {
//       slots[time[0] - TIME_MIN]++;
//       slots[time[1] - TIME_MIN + 1]--;
//     }
//     int max = 0;
//     int runningSum = 0;
//     for (int diff : slots) {
//       runningSum += diff;
//       if (runningSum > max) {
//         max = runningSum;
//       }
//     }
//     return max;
//   }

//   int calcMaxDistance(int side, int users) {
//     if (users < 2) {
//       return 0;
//     }

//     int totalSlot = side * side;
//     if (users > (totalSlot + 1) / 2) {
//       return 1;
//     }

//     int maxDist = (side - 1) * 2;

//     for (int dist = maxDist; dist > 1; --dist) {
//       if (canPick(side, users, dist)) {
//         return dist;
//       }
//     }

//     return 1;
//   }

//   boolean canPick(int side, int users, int distBetween) {
//     int step = (distBetween + 1) / 2;
//     int maxDiagIndex = (side - 1) * 2;
//     for (int start = 0; start < distBetween; ++start) {
//       int picked = 0;
//       for (int diagIndex = start; diagIndex <= maxDiagIndex; diagIndex += distBetween) {
//         picked += possiblePositions(diagIndex, side, step);
//         if (picked >= users) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   int possiblePositions(int diagIndex, int side, int step) {
//     int row = Math.min(diagIndex, side - 1);
//     int col = diagIndex - row;
//     int positions = (row - col) + 1; // 대각선의 갯수
//     return (1 + (positions / step));
//   }
// }



public class Solution {

  public static void main(String[] args) {
    Solution sol = new Solution();
    System.out.println(sol.calcMaxDistance(3, 2) + " = 4");
    System.out.println(sol.calcMaxDistance(2, 2) + " = 2");
    System.out.println(sol.calcMaxDistance(4, 3) + " = 4");
    System.out.println(sol.calcMaxDistance(10, 30));
  }
  
  public int solution(int side, int users, int[][] timetable) {
    int maxUsers = calcMaxConcurrentUsers(timetable);
    return calcMaxDistance(side, maxUsers);
  }

  final int TIME_MIN = 600;
  final int TIME_MAX = 1320;

  int calcMaxConcurrentUsers(int[][] timetable) {
    int[] slots = new int[TIME_MAX - TIME_MIN + 1];
    for (int[] time : timetable) {
      slots[time[0] - TIME_MIN]++;
      slots[time[1] - TIME_MIN + 1]--;
    }
    int max = 0;
    int runningSum = 0;
    for (int diff : slots) {
      runningSum += diff;
      if (runningSum > max) {
        max = runningSum;
      }
    }
    return max;
  }
  
  int calcMaxDistance(int side, int users) {
    if (users < 2) {
      return 0;
    }

    int totalSlot = side * side;
    if (users > (totalSlot + 1) / 2) {
      return 1;
    }
    
    fillDistMap(side, totalSlot);
    
    int maxDist = (side - 1) * 2;
    for (int dist = maxDist; dist > 1; --dist) {
      System.out.println("try dist " + dist);
      if (canPick(side, totalSlot, users, dist)) {
        return dist;
      }
    }

    return 1;
  }

  int[][] distMap;

  void fillDistMap(int side, int slots) {
    distMap = new int[slots][slots];
    for (int i = 0; i < slots; ++i) {
      int i_row = i / side;
      int i_col = i % side;
      for (int j = i + 1; j < slots; ++j) {
        int j_row = j / side;
        int j_col = j % side;
        int dist = Math.abs(i_row - j_row) + Math.abs(i_col - j_col);
        distMap[i][j] = dist;
        distMap[j][i] = dist;
      }
    }
  }

  boolean canPick(int side, int totalSlot, int users, int distBetween) {
    return canPickAux(side, totalSlot, new Stack<Integer>(), distBetween, users);
  }

  boolean canPickAux(int side, int slots, Stack<Integer> selected, int distBetween, int remainUsers) {
    if (remainUsers == 0) {
      return true;
    }

    int lastSelectedIndex = -1;
    if (selected.size() > 0) {
      lastSelectedIndex = selected.peek();
    }

    int fromIndex = lastSelectedIndex + 1;
    int maxIndex = slots - remainUsers + 1;

    for (int i = fromIndex; i < maxIndex; ++i) {
      if (lessThanAny(selected, i, distBetween)) {
        continue;
      }
      // System.out.println("Depth:" + selected.size() + " Pick " + t.point + " Dist: " + t.dist);
      selected.push(i);
      if (canPickAux(side, slots, selected, distBetween, remainUsers - 1)) {
        return true;
      }
      selected.pop();
    }

    return false;
  }

  boolean lessThanAny(List<Integer> points, int newPoint, int distBetween) {
    for (int p : points) {
      if (distMap[p][newPoint] < distBetween) {
        return true;
      }
    }
    return false;
  }
}

/*
시간 초과. 다 해보는건 너무 오래 걸린다.

답변 중에 하나를 참고해 보면 답이 X인지를 채크하는데 N^4으로 검사할 수 있어야 하는데,

지금은 N^2! 이다.

*/
