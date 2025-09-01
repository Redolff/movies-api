import { validatePartialGame } from "../schemas/games.js"

export class GameController {
    constructor({ gameModel }) {
        this.gameModel = gameModel
    }

    getAll = async (req, res) => {
        const { platform, fromYear } = req.query
        const games = await this.gameModel.getAll({ platform, fromYear })
        res.json(games)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const gameXid = await this.gameModel.getById({ id })
        if (gameXid) return res.json(gameXid[0])

        return res.status(404).json({ message: 'Game not found' })
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validatePartialGame(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const udpateGame = await this.gameModel.update({ id, input: result.data })
        if (!udpateGame) {
            return res.status(404).json({ message: "Game not found" })
        }

        res.json(udpateGame)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const gameIndex = await this.gameModel.delete({ id })
        if (gameIndex === false) {
            return res.status(404).json({ message: 'Game not found' })
        }
        return res.json({ message: 'Game deleted' })
    }

}