import { readJSON } from "../utils/utils.js"
const gamesJSON = readJSON('../games.json')

export class GameModel {

    static getAll = async ({ platform }) => {
        if (platform) {
            const filteredGamesByPlatform = await gamesJSON.filter(
                (game) => game.platform.some((p) => p.toLowerCase() === platform.toLowerCase())
            )
            return filteredGamesByPlatform
        }

        return gamesJSON
    }

    static getById = async ({ id }) => {
        const gameXid = await gamesJSON.filter((game) => game.id === id)
        return gameXid
    }

} 