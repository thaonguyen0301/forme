const {ccclass, property} = cc._decorator;
import ScoreboardMark from './ScoreboardMark';

@ccclass
export default class Scoreboard extends cc.Component {

    @property(cc.Label)
    dragonValue: cc.Label = null;

    @property(cc.Label)
    tigerValue: cc.Label = null;

    @property(cc.Label)
    tieValue: cc.Label = null;

    @property(cc.Prefab)
    scoreMarkPrefab: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    rowMax: number = 6;

    mark: cc.Node[] = [];

    scoreBoardMark: ScoreboardMark;

    onLoad(){
       /*  let markNote = cc.instantiate(this.scoreMarkPrefab);
        this.scoreBoardMark = markNote.getComponent(ScoreboardMark);
        this.node.getChildByName("test").addChild(this.scoreBoardMark.setDot(1));
        markNote.x = 213;
        markNote.y = 50;    
        console.log(this.scoreBoardMark.setDot(1)); */
        this.markRow(1);
        this.markRow1(0);
    }

    start() {
      
         
    }

    private markRow(result: number){
        let markNote = cc.instantiate(this.scoreMarkPrefab);
        this.scoreBoardMark = markNote.getComponent(ScoreboardMark);
        this.node.getChildByName("test").addChild(this.scoreBoardMark.setDot(result));
        markNote.x = 215;
        markNote.y = 50; 
    }

    private markRow1(result: number){
        let markNote = cc.instantiate(this.scoreMarkPrefab);
        this.scoreBoardMark = markNote.getComponent(ScoreboardMark);
        this.node.getChildByName("test").addChild(this.scoreBoardMark.setDot(result));
        markNote.x = 195;
        markNote.y = 50; 
    }
}
