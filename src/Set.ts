import axios from "axios";
import {Card} from "./Card";
import { Pack, PackBuilder } from "./Pack";

interface SetType {
    id: string,
    name: string,
    series: string,
    printedTotal: number,
    total: number,
    releaseDate: string,
    updatedAt: string,
    images: {
        symbol: string,
        logo: string
    }
}

interface SetsResponse {
    data: Set
}

interface AllSetsResponse {
    data: Set[]
}

interface AllCardsResponse {
    data: Card[]
}

export class Set implements SetType {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string,
        logo: string
    }

    private cards: Card[];
    private pack: Pack;

    private constructor(set: Set, cards: Card[]) {
        this.id=set.id;
        this.name=set.name;
        this.series=set.series;
        this.printedTotal=set.printedTotal;
        this.total=set.total;
        this.releaseDate=set.releaseDate;
        this.updatedAt=set.updatedAt;
        this.images=set.images;
        this.cards = cards;
    }

    static async fromId(id: string): Promise<Set> {
        let setsResponse = await axios.get<SetsResponse>(`https://api.pokemontcg.io/v2/sets/${id}`);
        let set = setsResponse.data.data;

        let cardsResponse = await axios.get<AllCardsResponse>(`https://api.pokemontcg.io/v2/cards?q=set.id:${id}`)
        return new Set(set, cardsResponse.data.data);
    }

    static async all(): Promise<Set[]> {
        const sets = await axios.get<AllSetsResponse>("https://api.pokemontcg.io/v2/sets");
        return sets.data.data;
    }

    getCards(): Card[] {
        return this.cards;
    }

    getPack(): Pack {
        if (this.pack == null) {
            this.pack = PackBuilder.fromSet(this).withStage("Common", 6).withStage("Uncommon", 3).withStage("Rare", 1).build();
        }
        return this.pack;
    }
}