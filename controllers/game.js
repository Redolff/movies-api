export class GameController {
    constructor({ gameModel }) {
        this.gameModel = gameModel
    }

    getAll = async (req, res) => {
        const { platform } = req.query
        const games = await this.gameModel.getAll({ platform })
        res.json(games)
    }

    getById = async (req, res) => {
        const { id } = req.params 
        const gameXid = await this.gameModel.getById({ id })
        if(gameXid) return res.json(gameXid[0])

        return res.status(404).json({ message: 'Game not found' })
    }

}