import { getGameData } from "prodigy-api"
import { GameData } from "prodigy-api/lib/GameData"

// @ts-expect-error
let gameData: GameData = {}
let previousTime = 0

export const getCachedGameData = async (): Promise<GameData> => {
    if (Object.keys(gameData).length === 0 || Date.now() - previousTime > 1000 * 60 * 10) {
        gameData = await getGameData()
        previousTime = Date.now()
    }
    return gameData
}
