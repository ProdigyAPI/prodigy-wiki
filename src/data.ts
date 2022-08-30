export const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"]
export const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"]

export const namesToIds = new Map(names.map((name, i) => [name, ids[i]]))
export const idsToNames = new Map(ids.map((id, i) => [id, names[i]]))
