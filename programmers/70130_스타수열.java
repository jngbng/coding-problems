/*
문제: https://school.programmers.co.kr/learn/courses/30/lessons/70130

메모:
같은 수의 최대 길이 아닌가? (x2)
단, 숫자는 붙어 있어서는 안된다.
반례.
X.X..XX.. => X. / X. / .X / X.

스타수열을 허용하는 범위에서는 붙어 있어도 된다.
.Y.YY.Y => 6
Y.YY => 2
.YY. => 4
뭐랄까 느슨한 alternating 이랄까.

어떤 X를 선택했을 때, X로 만들 수 있는 스타 수열의 길이 구하기는?
스캔인 것 같은데.
상태는 any 찾기. X 찾기, non-X 찾기. 이고

any 찾기:
=> X 찾음 -> non-X 찾기.
=> non-X 찾음 -> X 찾기.

X/non-X 찾기:
=> X/non-X 찾음 -> 카운트 2 증가. any 찾기.
=> else -> skip


요소로 워드카운트 했을 때, X가 Y보다 더 많을 때
Y로 만드는 스타수열이 X로 만든 것 보다 길 수 있나?
.XXXXXX..Y.Y.Y.
위 예에서는 X로 만들 수 있는 최대 길이는 4, Y로 만들 수 있는 최대 길이는 6으로
Y가 이긴다.


위 알고리즘을 여러 요소에 대해서 동시에 진행할 수 있나?
X의 index stream이 주어진다고 했을 때 online으로 길이를 구하려면?

{length=0, lastOccurIdx=-1, openX=false}가 있다고 하면

lastOccurIdx + 1 == newIdx
=> lastOccurIdx = newIdx. openX = true. 이전꺼 버리고 이걸로 선택.

lastOccurIdx + 2 <= newIdx
=> lastOccurIdx = newIdx. 
   사이에 non-X가 하나 끼어있으니 length++. 
   openX 유지. openX였으면 여전히 openX. 아니었으면 여전히 아님.

lastOccurIdx + 3 <= newIdx
=> lastOccurIdx = newIdx.
   사이에 non-X가 두개 이상 끼어있음.
   length++. openX ? length++.
   openX = false. 모든 X를 소진했으니 마지막 X는 사용됨.

final:
openX == true && lastOccurIdx < length - 1
=> length++

테스트 케이스들:
.XX.
.X.
X..
..X
X.X

*/

import java.util.*;

class Track {
    int length;
    int lastOccurIdx;
    boolean isOpen;
    
    Track() {
        length = 0;
        lastOccurIdx = -1;
        isOpen = false;
    }
    
    void feed(int newIdx) {
        if (lastOccurIdx + 1 == newIdx) {
            isOpen = true;
        } else if (lastOccurIdx + 2 == newIdx) {
            length += 2;
        } else {
            if (isOpen) {
                length += 2;
            }
            length += 2;
            isOpen = false;
        }
        lastOccurIdx = newIdx;
    }
    
    int finalize(int lastIdx) {
        if (isOpen && lastOccurIdx < lastIdx) {
            length += 2;
        }
        return length;
    }
}

class Solution {
    public int solution(int[] a) {
        int length = a.length;
        Map<Integer, Track> tracks = new HashMap<Integer, Track>();
        for (int i = 0; i < length; ++i) {
            int key = a[i];
            Track track = tracks.get(key);
            if (track == null) {
                track = new Track();
                tracks.put(key, track);
            }
            track.feed(i);
        }
        int lastIdx = length - 1;
        int answer = 0;
        for (Track track : tracks.values()) {
            int curLength = track.finalize(lastIdx);
            if (curLength > answer) {
                answer = curLength;
            }
        }
        return answer;
    }
}
