export class GameController {
    constructor({ gameModel }) {
        this.gameModel = gameModel
    }

    getAll = async (req, res) => {
        const games = await this.gameModel.getAll()
        res.json(games)
    }

    getByPlatform = async (req, res) => {
        const { platform } = req.params
        const gamesByPlatform = await this.gameModel.getByPlatform({ platform })
        if(gamesByPlatform) return res.json(gamesByPlatform)

        return res.status(404).json({ message: 'Game by platform not found' })
    }
}