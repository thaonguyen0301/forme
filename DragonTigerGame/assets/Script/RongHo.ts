const { ccclass, property } = cc._decorator;
import Card from '../cards/Card';
import Score from '../scoreboad/script/Score';
import Scoreboard from '../scoreboad/script/Scoreboard';
export enum ResultStatus {
    DragonWin = 0,
    TigerWin,
    TieWin
}
@ccclass
export default class RongHo extends cc.Component {

    @property(cc.Sprite)
    dragonCard: cc.Sprite = null;

    @property(cc.Sprite)
    tigerCard: cc.Sprite = null;

    @property(cc.Node)
    nodeCard: cc.Node = null;

    btnPlay: cc.Button = null;

    tigerWin: cc.Sprite = null;

    dragonWin: cc.Sprite = null;

    tieWin: cc.Sprite = null;

    @property(cc.Prefab)
    cardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    scoreBoardPrefab: cc.Prefab = null;

    public scoreBoard: Score;

    @property(cc.Node)
    scoreBoardContainer: cc.Node = null;

    historyScore: number[];

    onLoad() {
        this.tigerCard = this.node.getChildByName("tigercard").getComponent(cc.Sprite);
        this.dragonCard = this.node.getChildByName("dragoncard").getComponent(cc.Sprite);

        this.tigerWin = this.node.getChildByName("tigerwin").getComponent(cc.Sprite);
        this.tigerWin.node.active = false;

        this.dragonWin = this.node.getChildByName("dragonwin").getComponent(cc.Sprite);
        this.dragonWin.node.active = false;

        this.tieWin = this.node.getChildByName("tiewin").getComponent(cc.Sprite);
        this.tieWin.node.active = false;

        /*  let initScoreBoard = cc.instantiate(this.scoreBoardPrefab);
         this.node.getChildByName("Scoreboard").addChild(initScoreBoard); */
        this.initScoreBoard();
        let btnPlay = this.node.getChildByName("play").getComponent(cc.Button);
        btnPlay.node.on(cc.Node.EventType.TOUCH_END, this.onClickBtnPlay, this)
    }

    onClickBtnPlay() {
        this.getCardForGame().then(data => ({
            data: data
        })).then(res => {
            this.showLabelWin(res.data[2])
            for (let i = 0; i < 2; i++) {
                this.showCard(res.data[i]);
            }
            this.updateScoreBoard(res.data[2]);
        }).catch((error) => console.log(error));
    }

    private showCard(data) {
        const initCard = cc.instantiate(this.cardPrefab);
        const card = initCard.getComponent(Card).onGetCard(data.cardId)
        const cardIdRandom = this.randomCard();
        console.log(cardIdRandom);
        if (data.isDragonCard) {
            this.dragonCard.spriteFrame = card[cardIdRandom];
        } else {
            this.tigerCard.spriteFrame = card[cardIdRandom];
        }
    }

    private randomCard() {
        return Math.floor(Math.random() * 3);
    }

    private showLabelWin(result: number) {
        switch (result) {
            case ResultStatus.DragonWin:
                this.dragonWin.node.active = true;
                this.tieWin.node.active = false;
                this.tigerWin.node.active = false;
                break;
            case ResultStatus.TigerWin:
                this.tigerWin.node.active = true;
                this.tieWin.node.active = false;
                this.dragonWin.node.active = false;
                break;
            case ResultStatus.TieWin:
                this.tieWin.node.active = true;
                this.dragonWin.node.active = false;
                this.tigerWin.node.active = false;
        }
    }

    public async getCardForGame() {
        let response = await fetch("http://localhost:3000/api/dragon-tiger/result");
        let data = await response.json();
        return data;
    }

    public async getHistoryScore() {
        let response = await fetch("http://localhost:3001/api/dragon-tiger/history");
        let data = await response.json();
        return data;
    }

    private initScoreBoard() {
        if (this.scoreBoardPrefab) {
            let scoreboardNode = cc.instantiate(this.scoreBoardPrefab);
            this.scoreBoard = scoreboardNode.getComponent("Score") as Score;
            this.scoreBoardContainer.addChild(scoreboardNode);
        }
        this.getHistoryScore().then(data => ({
            data: data
        })).then(res => {
            console.log(res.data);
            this.historyScore = res.data;
            this.scoreBoard.setData(res.data);
        }).catch((error) => console.log(error)); 
    }

    private updateScoreBoard(result: number) {    
       this.historyScore.push(result);
       this.historyScore.shift();
       this.scoreBoard.setData(this.historyScore);
    }
}

