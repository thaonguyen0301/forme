const express = require("express");
const getCard = require("./calculateCard");
const cors = require("cors");
const app = express();
const app1 = express();
const port = 3000;
const port1 = 3001;

app.use(cors());
app1.use(cors())
app.get("/api/dragon-tiger/result", (req, res) => {
  const dragon = getCard.dragonCard();
  const tiger = getCard.tigerCard();

  const dataResult = [dragon, tiger, getCard.dragonTigerWhoWin(dragon, tiger)];
  res.status(200).json(dataResult);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/api/dragon-tiger/result`
  );
});


app1.get("/api/dragon-tiger/history", (req, res) => {
  const history = [0,1,1,1,0, 0,1,0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,1,1,0];
  res.status(200).json(history);
});

app1.listen(port1, () => {
  console.log(
    `Example app listening at http://localhost:${port1}/api/dragon-tiger/history`
  );
});
