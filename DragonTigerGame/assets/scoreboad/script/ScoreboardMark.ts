const { ccclass, property } = cc._decorator;

export enum ResultStatus {
    DragonWin = 0,
    TigerWin,
    TieWin
}
@ccclass
export default class ScoreboardMark extends cc.Component {

    @property(cc.Node)
    dragon: cc.Node = null;

    @property(cc.Node)
    tiger: cc.Node = null;

    @property(cc.Node)
    draw: cc.Node = null;

    setDot(result: number): cc.Node {
        this.resetDot();
        console.log('ahihi');
        switch (result) {
            case ResultStatus.DragonWin:
                this.dragon.active = true;
                this.tiger.active = false;
                this.draw.active = false;
                break;
            case ResultStatus.TigerWin:
                this.dragon.active = false;
                this.tiger.active = true;
                this.draw.active = false;
                break;
            case ResultStatus.TieWin:
                this.dragon.active = false;
                this.tiger.active = false;
                this.draw.active = true;
        }
        return this.node;
    }

    public setDrawDot(result: number) {
        this.draw.active = result > 0;
      }

    public getDot(): cc.Node {
        return this.node;
      }
    
      public activeTiger() {
        this.tiger.active = true;
      }
    
      public activeDragon() {
        this.dragon.active = true;
      }
    
      public activeDraw() {
        this.draw.active = true;
      }
    
      public activeNextDot(): cc.Node {
        this.resetDot();
        return this.node;
      }

    resetDot() {
        this.tiger.active = this.dragon.active = this.draw.active = false;
    }
}
