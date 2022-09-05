import { GameData } from "prodigy-api/lib/GameData"
import { format, utcToZonedTime } from "date-fns-tz"

export type ItemDataType = GameData["boots"][number] | GameData["follow"][number] | GameData["fossil"][number] | GameData["hat"][number] | GameData["item"][number] | GameData["key"][number] | GameData["mathTownFrame"][number] | GameData["mathTownInterior"][number] | GameData["mount"][number] | GameData["outfit"][number] | GameData["spellRelic"][number] | GameData["weapon"][number] | GameData["currency"][number]
export type ItemDataTypeArray = ItemDataType[]

export const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"]
export const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"]
export const itemsIds = ["boots", "follow", "fossil", "hat", "item", "key", "mount", "outfit", "spellRelic", "weapon", "currency"]

export const namesToIds = new Map(names.map((name, i) => [name, ids[i]]))
export const idsToNames = new Map(ids.map((id, i) => [id, names[i]]))

export const dateToText = (date: Date): string => {
    const timeZone = typeof Intl === "undefined" ? "America/New_York" : Intl.DateTimeFormat().resolvedOptions().timeZone
    const creationDate = utcToZonedTime(date, timeZone)

    return format(creationDate, "EEEE, LLLL d, yyyy 'at' h:mm:ss a z", {
        timeZone
    })
}

export const Rarity = {
    0: "very common",
    1: "common",
    2: "uncommon",
    3: "rare",
    4: "very rare"
}
