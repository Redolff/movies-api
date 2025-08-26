import { readJSON } from "../utils/utils.js"
const gamesJSON = readJSON('../games.json')

export class GameModel {

    static getAll = async ({ platform, fromYear }) => {
        if (platform) {
            const filteredGamesByPlatform = await gamesJSON.filter(
                (game) => game.platform.some((p) => p.toLowerCase() === platform.toLowerCase())
            )
            return filteredGamesByPlatform
        }
        
        if(fromYear) {
            const gameFromYear = await gamesJSON.filter(
                (game) => game.year >= Number(fromYear)
            )
            return gameFromYear
        }

        return gamesJSON
    }

    static getById = async ({ id }) => {
        const gameXid = await gamesJSON.filter((game) => game.id === id)
        return gameXid
    }

    static delete = async ({ id }) => {
        const gameIndex = await gamesJSON.findIndex((game) => game.id === id)
        if(gameIndex === -1){
            return false
        }
        gamesJSON.splice(gameIndex, 1)
        return true
    }

} 