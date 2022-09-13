/*
52! 가지의 카드 섞는 방법이 있는데, 어떤 섞는 방법도 동일한 확률로 나타나도록.
완전 랜덤 생성기는 있음.

1 ~ 52 중의 랜덤 숫자를 골라서 해당 인덱스를 뽑고, 남은 카드 중 하나를 랜덤하게 뽑고. 하면 되는거 아닌가...?

그러면 해당 카드 배열이 선택될 확률이 1/52! 되서..?
*/

function swap(arr, i , j) {
  if (i == j) {
    return;
  }
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function randomInt(fromIncl, maxExcl) {
  return fromIncl + Math.floor((Math.random() * (maxExcl - fromIncl)));
}

function shuffle(cards, index) {
  if (index < 0 || index >= cards.length - 1) {
    return cards;
  }
  
  let i = randomInt(index, cards.length);
  swap(cards, index, i);
  return shuffle(cards, index + 1);
}

console.log(shuffle([0, 1, 2], 0));
