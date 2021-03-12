const { ccclass, property } = cc._decorator;

@ccclass
export default class Card extends cc.Component {

    @property(cc.SpriteFrame)
    card1: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card2: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card3: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card4: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card5: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card6: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card7: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card8: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card9: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card10: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card11: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card12: cc.SpriteFrame[] = [null, null, null, null];

    @property(cc.SpriteFrame)
    card13: cc.SpriteFrame[] = [null, null, null, null];

    onGetCard(cardId: number) {
        switch (cardId) {
            case 1:
                return this.card1;
            case 2:
                return this.card2;
            case 3:
                return this.card3;
            case 4:
                return this.card4;
            case 5:
                return this.card5;
            case 6:
                return this.card6;
            case 7:
                return this.card7;
            case 8:
                return this.card8;
            case 9:
                return this.card9;
            case 10:
                return this.card10;
            case 11:
                return this.card11;
            case 12:
                return this.card12;
            case 13:
                return this.card13;
        }
    }

    // update (dt) {}
}
