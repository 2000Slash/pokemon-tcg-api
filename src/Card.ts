import {Set} from "./Set"

export interface Card {
    id: string,
    name: string,
    supertype: string,
    subtypes: string[],
    hp: number,
    types: string[],
    evolvesFrom: string,
    abilities: [{
        name: string,
        text: string,
        type: string
    }],
    attacks: [{
        name: string,
        const: string[],
        convertedEnergyCost: number,
        damage: string,
        text: string
    }],
    weakness: [{
        type: string,
        value: string
    }],
    set: Set,
    number: string,
    artist: string,
    rarity: "Amazing Rare" | "Classic Collection" | "Common" | "LEGEND" | "Promo" | "Rare" | "Rare ACE" | "Rare BREAK" | "Rare Holo" | "Rare Holo EX" | "Rare Holo GX" | "Rare Holo LV.X" | "Rare Holo Star" | "Rare Holo V" | "Rare Holo VMAX" | "Rare Holo VSTAR" | "Rare Prime" | "Rare Prism Star" | "Rare Rainbow" | "Rare Secret" | "Rare Shining" | "Rare Shiny" | "Rare Shiny GX" | "Rare Ultra" | "Uncommon" | "V" | "VM"
    flavorText: string,
    nationalPokedexNumbers: number[],
    images: {
        small: string,
        large: string
    }
}