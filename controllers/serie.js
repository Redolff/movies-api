export class SerieController {
    constructor({ serieModel }) {
        this.serieModel = serieModel
    }

    getAll = async (req, res) => {
        const series = await this.serieModel.getAll()
        res.json(series)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const serieXid = await this.serieModel.getById({ id })
        if(serieXid) return res.json

        return res.status(404).json({ message: 'Movie not found' })
    }

}