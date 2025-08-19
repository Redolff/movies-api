import { readJSON } from "../utils/utils.js"
const gamesJSON = readJSON('../games.json')

export class GameModel {

    static getAll = async () => {
        const games = await gamesJSON
        return games
    }

    static getByPlatform = async ({ platform }) => {
        const filteredGamesByPlatform = await gamesJSON.filter(
            (game) => game.platform.some((p) => p.toLowerCase() === platform.toLowerCase())
        )
        console.log(filteredGamesByPlatform)
        return filteredGamesByPlatform
    }

    
} 