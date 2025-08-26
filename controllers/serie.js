export class SerieController {
    constructor({ serieModel }) {
        this.serieModel = serieModel
    }

    getAll = async (req, res) => {
        const { season, genre } = req.query
        const series = await this.serieModel.getAll({ season, genre })
        res.json(series)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const serieXid = await this.serieModel.getById({ id })
        if(serieXid) return res.json(serieXid[0])

        return res.status(404).json({ message: 'Movie not found' })
    }

    delete = async (req, res) => {
        const { id } = req.params
        const serieIndex = await this.serieModel.delete({ id })
        if(serieIndex === false){
            return res.statusCode(404).json({ message: 'Serie not found' })
        }
        return res.json({ message: 'Serie deleted' })
    }

}