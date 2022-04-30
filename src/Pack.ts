import {Card} from "./Card";
import {Set} from "./Set";

interface Stage {
    rarity: Rarity,
    count: number
}

export type Rarity = 'Common' | 'Uncommon' | 'Rare'

export class Pack {
    private set: Set;
    private setCards: Map<Rarity, Card[]>;
    private stages: Stage[];

    protected constructor(set: Set, stages: Stage[]) {
        this.set = set;
        let setCards = new Map<Rarity, Card[]>();
        setCards.set("Common", new Array());
        setCards.set("Uncommon", new Array());
        setCards.set("Rare", new Array());

        set.getCards().forEach((card) => {
            if (card.rarity === "Common") {
                setCards.get("Common").push(card);
            } else if (card.rarity != null && card.rarity.toLowerCase().includes("rare")) {
                setCards.get("Rare").push(card);
            } else if (card.rarity === "Uncommon") {
                setCards.get("Uncommon").push(card);
            }
        });
        this.setCards = setCards;
        this.stages = stages;
    }
    
    private getCards(stage: Stage): Card[] {
        let cards = new Array<Card>();
        let cardNumbers = new Array<number>();
        let rarityCards = this.setCards.get(stage.rarity);

        if (rarityCards == null || rarityCards.length < stage.count)
            return cards;

        while(cardNumbers.length < stage.count) {
            let randomI = Math.floor(Math.random() * rarityCards.length);
            if (!cardNumbers.includes(randomI))
                cardNumbers.push(randomI);
        }

        cardNumbers.forEach((num) => {
            cards.push(rarityCards[num]);
        })
        return cards;
    }

    open(): Card[] {
        let cards = new Array<Card>();
        for (let stage of this.stages) {
            cards = cards.concat(this.getCards(stage));
        }
        return cards;
    }
}

class PackAccessor extends Pack {
    constructor(set: Set, stages: Stage[]) {
        super(set, stages);
    }
}

export class PackBuilder {
    private set: Set;
    private stages: Stage[];

    private constructor(set: Set) {
        this.set = set;
        this.stages = new Array();
    }

    static fromSet(set: Set): PackBuilder {
        return new PackBuilder(set);
    }

    withStage(rarity: Rarity, count: number): PackBuilder {
        this.stages.push({rarity: rarity, count: count});
        return this;
    }

    build(): Pack {
        return new PackAccessor(this.set, this.stages);
    }
} 