/*

트럼프 카드를 말하는게 맞나?
조커는 두장 포함되어야 하나?

최소 정보는: 문자(A, 2-9, J, Q, K)와 문양(suite)


그러면 6하 원칙에 따라 요구사항을 조금 더 파악해보자.

누가: 온라인으로 정보가 오가야 하는지, 한 프로그램에서만 쓰이는건지
언제: 
어디서: GUI 프로그램인지, 단순 서버 로직인지
무엇을: 
어떻게: 일반적인 게임에 사용된다.
- 플레이어에게 일정 분량씩 나눠 주거나,
- 일정 부분을 가운데 쌓아 두거나
- 섞거나,
- 펼쳐두거나 뒤집어 두거나

왜:

어떤 게임은 카드를 여러벌 가지고 플레이 하는 경우도 있는데, 그럴 땐 이게 어느 카드벌에 들어가는 지 알 필요가 있다.
=> 한 벌만 가지고 하는 게임이라고 하자.

카드셋을 들고 있으면 특정 조건을 만족하는 지 체크해야 한다.
- 이들이 연소된 기호인지,
- 같은 문양인지
- 같은 기호인지

Step2: 핵심 객체의 설계

PlayingCard: 각각의 카드 한장. 서버/클라이언트 구조라면 뒤집어져 있을 때는 모르는 카드일 수도 있다.

GameRoom: 이 게임이 진행되는 공간이라고 하자. 

GameSession: 한 게임을 나타낸다고 하자.

GameBoard: 공개적으로 펼쳐져 잇는 카드 덱이 있기도 하고, 가려진 덱이 있기도 하다.

OpenCardDeck: 가운데 쌓여있는 카드들. 매번 새로 만들 수도 있고, 재사용할 수도 있다.
-> Card를 많이 가진다.

HiddenCardDeck:

Player: 한명의 플레이어가 여러 댁을 동시에 플레이 하기도 하니깐.
-> PlayerDeck: 지금까지 받은 카드들. 최대 카드 수
  -> Card를 많이 가진다.

PlayerList: 전체 플레이어를 가지고 있고, 턴이 돌아가는 순서를 관리한다.

Dealer: 플레이어일 때도 있고, 아닐 때도 있다.

Step3: 관계 분석

위에 기술

Step4: 행동 분석

Dealer가 CardDeck을 초기화 한다.

Dealer가 순서대로 돌아가며 초기화 작업을 한다.

Dealer가 순서대로 돌아가며 플레이어와 소통을 한다. 어떤 게임은 딜러가 없는 경우도 있는데, 이 때에는 단순히 중개를 한다고 하자.

순서가 돌아감에 따라 먼저 이기고 끝내는 플레이어가 생기는데, 계속 진행될 수도 있고, 끝날 수도 있다. 이 판단은 Dealer가 한다고 하자.

Dealer는 체점함수를 가지고 점수를 매길 수 있어야 한다. 또한 배팅 금액에 대해서 딴 금액이 얼마인지 계산해야 한다.

Player는 매 턴에 맞는 행동을 할 수 있다. 특정 카드를 공개하거나, 순서를 바꾸거나, 배팅을 올리거나, 포기하거나, 승리를 선언하거나.

Dealer는 이 요청을 받아서 확인하는 역할을 한다.

만약 유저가 계산을 잘못해서 더 불리한 선택을 해도, Dealer가 이를 정정하진 않는다.

이렇게 보면 Dealer가 서버 역할, Player가 클라이언트 역할을 한다고 볼 수 있다.

종합해서 카드에만 집중하면

enum Suite { Club, Heart, Diamond, Spade }

class PlayingCard {
  int order;
  boolean isJocker
  Suite suite;
  char symbol;
  //
  String foregroundImage;
  String backgroundImage;
}

class PlayingCardDeck {
  PlayingCard[] cards;

  void insertCardAt(PlayingCard card, int index);
  void removeCardAt(int index);
}

class ScoreChecker<Score> {
  static Score calcScore(PlayingCard[] cards);
}


점수 체점:
카드셋과 룰셋이 있을 때, 가장 점수가 높은 조합과 점수를 알아내야 한다.


class CardHolder

*/
