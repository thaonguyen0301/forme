
const { ccclass, property } = cc._decorator;
import ScoreboardMark from "./ScoreboardMark";

@ccclass
export default class Score extends cc.Component {
  @property(cc.Label)
  dragonValue: cc.Label = null;

  @property(cc.Label)
  tigerValue: cc.Label = null;

  @property(cc.Label)
  tieValue: cc.Label = null;

  @property(cc.Prefab)
  dotPrefab: cc.Prefab = null;

  @property(cc.Node)
  content: cc.Node = null;

  @property(cc.Size)
  dotSize: cc.Size = new cc.Size(10, 10);

  @property(cc.Size)
  dotPadding: cc.Size = new cc.Size(2, 2);

  @property({
    type: cc.Integer,
  })
  RowMax = 6;

  @property(cc.ScrollView)
  view: cc.ScrollView = null;

  private scoreBoardDot: ScoreboardMark;
  private dots: cc.Node[] = [];
  private nextMark: cc.Node = null;
  private checkShowNext = () => false;

  private firstGame: boolean = true;

  onLoad() {
    this.initDot();
  }

  public init(condition: () => boolean) {
    this.checkShowNext = condition;

  }

  start() {

  }

  // update (dt) {}

  /* public setStatistic(dragonCount: number, tieCount: number, total: number) {
    let dragonStats = Math.floor((dragonCount * 100) / total);
    let drawStats = Math.floor((tieCount * 100) / total);
    let tigerStats = 100 - (dragonStats + drawStats);

    this.dragonValue.string = `${dragonStats}%`;
    this.tigerValue.string = `${tigerStats}%`;
    this.tieValue.string = `${drawStats}%`;
  } */

  private initDot() {
    let dotNode = cc.instantiate(this.dotPrefab);
    this.scoreBoardDot = dotNode.getComponent(ScoreboardMark);
  }

  public setData(results: number[]) {
    this.dots.forEach((dot) => {
      dot.removeFromParent();
      dot.destroy();
    });
    this.dots = [];

    let col = 0,
      row = 0;
    let maxX = 0;
    let nextCol = 1;
    let previousResult = undefined;
    let rowMax = {};
    let colMax = 0;
    let start = cc.v2(-this.dotSize.width / 2, -this.dotSize.height / 2 - this.dotPadding.height);

    results.forEach((result, i) => {
      if (result == previousResult) {
        console.log('dot', rowMax.hasOwnProperty(col));
        let max = rowMax.hasOwnProperty(col) ? rowMax[col] : this.RowMax;
        if (row < max - 1) {
          row++;
        } else if (row == 0 && max == 1) {
          col = nextCol;
          nextCol++;
        } else {
          col++;
          rowMax[col] = row;
        }
      } else {
        row = 0;
        col = nextCol;
        nextCol++;
      }

      if (col > colMax) {
        colMax = col;
      }

      previousResult = result;

      let activeDot = this.scoreBoardDot.setDot(result);
      let dot = cc.instantiate(activeDot);

      dot.position = cc.v2(start.x + col * this.dotSize.width, start.y - row * this.dotSize.height);

      
      maxX = Math.max(maxX, dot.position.x);
      this.content.addChild(dot);
      this.dots.push(dot);
    });

    this.addNextMark(rowMax, row, col, colMax, nextCol, start);

    maxX = Math.max(maxX, this.nextMark.position.x);

    this.content.width = Math.max(maxX + this.dotSize.width / 2, this.node.width) + 2 * this.dotPadding.width;

    this.content.position = cc.v2(-this.content.width, this.content.position.y);

    if (this.firstGame == true) {
      this.view.scrollTo(cc.v2(1, 0), 0.1);

      this.firstGame = false;
    }
    //
  }

  public setDrawData(result: number[]) {
    let items = this.content.getComponentsInChildren(ScoreboardMark);

    items.forEach((item, index) => {
      item.setDrawDot(result[index]);
    });
  }

  private addNextMark(rowMax, row, col, colMax, nextCol, start) {
    let max = rowMax.hasOwnProperty(col) ? rowMax[col] : this.RowMax;
    if (row < max - 1) {
      row++;
    } else {
      row = 0;
      col = nextCol;
      if (col > colMax) {
        colMax = col;
      }
    }

    let nextDot = this.scoreBoardDot.activeNextDot();
    let dot = cc.instantiate(nextDot);
    dot.active = false;

    dot.position = cc.v2(start.x + col * this.dotSize.width, start.y - row * this.dotSize.height); 
    this.content.addChild(dot);
    this.nextMark = dot;
    this.dots.push(dot);
  }

  update() {
    if (this.nextMark && this.nextMark.isValid) {
      this.nextMark.active = this.checkShowNext();
    }
  }
}
