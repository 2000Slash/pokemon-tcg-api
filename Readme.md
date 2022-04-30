# Pokemon TCG Api

This is a simple [Pokemon Trading Card Game](https://pokemontcg.io/) api with an integrated pack builder

## Example use:
```typescript
import {PackBuilder, Set} from "pokemon-tcg-api"

Set.all().then((sets) => {
    sets.forEach((set) => {
        console.log(`${set.name} -- ${set.id}`)
    })
})

async function openPacks() {
    let set = await Set.fromId("swsh9");
    let openDefaultPack = set.getPack().open();

    console.log("------------------ Default pack ------------------")
    for (const card of openDefaultPack) {
        console.log(card.name)
    }
    console.log("--------------------------------------------------")

    let openCustomPack = PackBuilder.fromSet(set).withStage("Common", 1).withStage("Rare", 10).build().open()

    console.log("------------------ Custom pack -------------------")
    for (const card of openCustomPack) {
        console.log(card.name)
    }
    console.log("--------------------------------------------------")
}

openPacks();
```