const ResultStatus = {
  "DragonWin": 0,
  "TigerWin": 1,
  "TieWin": 2
}

var randomCard = () => {
  return Math.floor(Math.random() * 13) + 1;
};

const arrayScore = [];
const card = [
  { cardId: 1, name: "A", point: 1 },
  { cardId: 2, name: "2", point: 2 },
  { cardId: 3, name: "3", point: 3 },
  { cardId: 4, name: "4", point: 4 },
  { cardId: 5, name: "5", point: 5 },
  { cardId: 6, name: "6", point: 6 },
  { cardId: 7, name: "7", point: 7 },
  { cardId: 8, name: "8", point: 8 },
  { cardId: 9, name: "9", point: 9 },
  { cardId: 10, name: "10", point: 10 },
  { cardId: 11, name: "J", point: 11 },
  { cardId: 12, name: "Q", point: 12 },
  { cardId: 13, name: "K", point: 13 },
];

const dragonTigerWhoWin = (dragon, tiger) => {
  if (dragon.point > tiger.point) {
    return ResultStatus.DragonWin;
  } else if (dragon.point < tiger.point) {
    return ResultStatus.TigerWin;
  } else return ResultStatus.TieWin;


};

const dragonCard = () => {
  const cardIdRandom = randomCard();
  return getCard(true, cardIdRandom);
};

const tigerCard = () => {
  const cardIdRandom = randomCard();
  return getCard(false, cardIdRandom);
};

const getCard = (isDragonCard, cardIdRandom) => {
  let cardResult = {
    isDragonCard: true,
    name: "string",
    point: 0,
    cardId: 0
  };
  for (let i = 0; i < card.length; i++) {
    if (cardIdRandom === card[i].cardId) {
      cardResult.cardId = card[i].cardId;
      cardResult.name = card[i].name;
      cardResult.point = card[i].point;
      cardResult.isDragonCard = isDragonCard;
    }
  }
  return cardResult;
};

const addHistoryScore = (result) =>{
  arrayScore.push(result);
}

const removeHistoryScore = () =>{
  arrayScore.shift();
}

module.exports = {
  dragonCard,
  getCard,
  tigerCard,
  dragonTigerWhoWin,
  addHistoryScore,
  removeHistoryScore
};
