import { Router } from "express"
import { SerieController } from "../controllers/serie.js"

export const serieRouter = ({ serieModel }) => {
    const seriesRouter = Router()

    const serieController = new SerieController({ serieModel })
    
    seriesRouter.get('/', serieController.getAll)
    seriesRouter.post('/', serieController.create)
    seriesRouter.get('/:id', serieController.getById)
    seriesRouter.patch('/:id', serieController.update)
    seriesRouter.delete('/:id', serieController.delete)

    return seriesRouter
}