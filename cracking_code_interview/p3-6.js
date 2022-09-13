/*

개큐랑 고양이 큐를 관리하면된다.
그런데 any 요청일 때는 둘 중 오래된 걸 뽑아야 한다.

가장 무식한건 개큐, 고양이큐, 전체 큐를 가지고 있고

요청이 들어오면 개/고양이큐랑 전체 큐 두곳에 다 집어 넣고,

any 요청은 전체 큐에서 뽑고, 요소가 개면 개큐에서도 뽑고, 고양이면 고양이 큐에서도 뽑으면 된다.

개나 고양이 간의 순서는 보장되기 때문에 항상 해당 큐 처음에 위치하게 된다.

개 요청이 오면 개 큐에서 뽑은 다음에 해당 개를 전체 큐에서 찾아서 삭제 해주면 된다.
큐가 중간 접근이 안되면 새로운 큐를 이용해서 전체를 한 바뀌 돌면서 해당 개만 뽑아주면 된다.

이러면 개/고양이 뽑는 연산이 O(동물 수)가 되기 때문에 느리게 된다.

--------------------------------------------------------

그래서 큐를 링크드 리스트로 만들어서

전체 동물 리스트: 머리 -> 개1 -> 개2 -> 고양이1 -> ...  -> 개n 
                                                     |<- 꼬리.

으로 만들고

개 노드 리스트: 개1 노드 -> 개2 노드 -> ...
고양이 노드 리스트:  고양이1 prev 노드 -> 고양이2 prev 노드 -> ...

를 관리하면

새로운 개/고양이 추가할 때는 꼬리에다 추가하고, 이전 꼬리를 ...

개 노드 리스트에서 노드를 뽑아서 전체 동물 리스트에서 삭제하려고 하면 개 노드의 전 노드를 알아야 해서 망함..

은 망했고,

----------------------------------------------------------

전체 동물 큐는 없애고, 개/고양이 큐에 요양원에 들어온 기수를 같이 저장하고 있으면 될 것 같다.

그래서 any를 하면 개 head, 고양이 head 중 기수가 작은 애를 뽑으면 된다.

이 때 integer overflow 가 생길 수 있는데, 한번에 동물 큐에 저장되는 동물 수가 integer 범위 안인건 보장 된다면 숫자 비교할 때 circular 비교 하면 될 것 같다.

circular 비교는 한바뀌 까진 되는데 두바뀌는 못하기 때문에, 무한정은 안된다.

그러면 한 쪽이 integer max에 도달하면 reindex 작업을 해줘야겠다. 이 작업은 O(N)이나 거의 발생하지 않겠다.

대신 큐에 integer 범위 까지만 넣을 수 있게 되는 한계가 생긴다.

------------------------------------------------------------

자료 구조를 설계하라고 했으니 전체 동물 리스트는 double linked list로 만들어서

개 노드에서 뽑으면 전체 동물 리스트에서 뽑을 수 있도록 한다.

------------------------------------------------------------

*/

/*

답안 보니 overflow 문제는 생각하지 않았다.

그리고 Dog / Cat이 Animal 을 상속받게 만들었는데 확장성 면에서 좋은 것 같지는 않다.

이미 만들어진 클래스나 내가 건드릴 수 없는 클래스를 다룰려면 항상 wrapper class를 만들어 줘야 하기 때문이다.

*/


class AnimalQueue {

  constructor() {
    this.age = 0;
    this.cats = [];
    this.dogs = [];
  }

  enqueue(dogOrCat) {
    const elem = {
      age: this.age++,
      animal: dogOrCat,
    };
    if (dogOrCat.type === 'dog') {
      this.dogs.push(elem);
    } else {
      this.cats.push(elem);
    }
  }

  dequeueAny() {
    if (this.dogs.length === 0) {
      return this.dequeueCat();
    }
    if (this.cats.length === 0) {
      return this.dequeueDog();
    }
    if (this.dogs[0].age < this.cats[0].age) {
      return this.dequeueDog();
    } else {
      return this.dequeueDog();
    }
  }

  dequeueDog() {
    if (this.dogs.length === 0) {
      return null;
    }
    return this.dogs.shift().animal;
  }

  dequeueCat() {
    if (this.cats.length === 0) {
      return null;
    }
    return this.cats.shift().animal;
  }
}
