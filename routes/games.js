import { Router } from "express"
import { GameController } from "../controllers/game.js"

export const gameRouter = ({ gameModel }) => {
    const gamesRouter = Router()

    const gameController = new GameController({ gameModel })

    gamesRouter.get('/', gameController.getAll)
    gamesRouter.get('/:platform', gameController.getByPlatform)

    return gamesRouter
}