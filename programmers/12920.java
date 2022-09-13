import java.util.*;


class Core implements Comparable<Core> {
    int id;
    int throughput;
    int startTime;
    
    Core(int id, int throughput, int startTime) {
        this.id = id;
        this.throughput = throughput;
        this.startTime = startTime;
    }
    
    void updateStartTime() {
        startTime += throughput;
    }
    
    @Override
    public int compareTo(Core other) {
        if (startTime == other.startTime) {
            return id - other.id;
        }
        return startTime - other.startTime;
    }
}

class Solution {
  int min(int[] cores) {
    int min = Integer.MAX_VALUE;
    for (int core : cores) {
      if (core < min) {
        min = core;
      }
    }
    return min;
  }
    
  public int solution(int n, int[] cores) {
    if (cores.length >= n) {
      return n - 1;
    }
    int minCore = min(cores);
    int maxTime = n * minCore;
    int minTime = maxTime / cores.length;
    Result result = findTime(n, cores, minTime, maxTime);
    //System.out.println("actualTime: " + actualTime);

    int overWork = result.started - n;
    int actualTime = result.time;

    int i = cores.length - 1;
    for (; i >= 0; --i) {
      int core = cores[i];
      if (actualTime % core == 0) {
        if (overWork == 0) {
          break;
        } else {
          overWork--;
        }
      }
    }
    return i + 1;
    

    // //int prevFinishTime = actualTime - 1;
    // Queue<Core> pq = new PriorityQueue<Core>();
    // for (int i = 0; i < cores.length; ++i) {
    //   int core = cores[i];
    //   int doneJobCount = actualTime / core;
    //   int startTime = core * doneJobCount;
    //   n -= doneJobCount;
    //   pq.add(new Core(i + 1, core, startTime));
    // }
        
    // Core core = pq.peek();
    // while (n > 0) {
    //   core = pq.remove();
    //   n--;
    //   //System.out.println("Done by core: " + core.id);
    //   //core.updateStartTime();
    //   //pq.add(core);
    // }
        
    // return core.id;
  }

  // int findTime(int tasks, int[] cores, int fromTime, int toTime) {
  //   while (fromTime != toTime) {
  //       int midTime = (fromTime + toTime) / 2;
  //       if (canSolve(tasks, cores, midTime)) {
  //           toTime = midTime;
  //       } else {
  //           fromTime = midTime + 1;
  //       }
  //   }
  //   return fromTime;  
  // }


  // boolean canSolve(int tasks, int[] cores, int time) {
  //   int remainTasks = tasks - cores.length;
  //   for (int core : cores) {
  //     remainTasks -= time / core;
  //     if (remainTasks <= 0) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  class Result {
    int time;
    int started;

    Result(int time, int started) {
      this.time = time;
      this.started = started;
    }
  }

  Result findTime(int tasks, int[] cores, int fromTime, int toTime) {
    int startedTasks = -1;
    int time = -1;
    while (fromTime != toTime) {
      int midTime = (fromTime + toTime) / 2;
      startedTasks = calcStartedTasks(cores, midTime);
      time = midTime;
      if (startedTasks >= tasks) {
        toTime = midTime;
      } else {
        fromTime = midTime + 1;
      }
    }
    if (fromTime != time) {
      startedTasks = calcStartedTasks(cores, fromTime);
    }
    return new Result(fromTime, startedTasks);
  }

  int calcStartedTasks(int[] cores, int time) {
    int startedTasks = cores.length;
    for (int core : cores) {
      startedTasks += time / core;
    }
    return startedTasks;
  }
}
