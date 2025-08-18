import { Router } from "express"
import { SerieController } from "../controllers/serie.js"

export const serieRouter = ({ serieModel }) => {
    const seriesRouter = new Router()

    const serieController = new SerieController({ serieModel })
    
    seriesRouter.get('/', serieController.getAll)
    seriesRouter.get('/:id', serieController.getById)

    return seriesRouter
}