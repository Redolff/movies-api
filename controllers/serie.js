import { validatePartialSerie, validateSerie } from "../schemas/series.js"

export class SerieController {
    constructor({ serieModel }) {
        this.serieModel = serieModel
    }

    getAll = async (req, res) => {
        const { season, genre, fromYear } = req.query
        const series = await this.serieModel.getAll({ season, genre, fromYear })
        res.json(series)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const serieXid = await this.serieModel.getById({ id })
        if(serieXid) return res.json(serieXid[0])

        return res.status(404).json({ message: 'Movie not found' })
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validatePartialSerie(req.body)
        if(result.error){
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const updateSerie = await this.serieModel.update({ id, input: result.data })
        if(!updateSerie) {
            return res.status(404).json({ message: "Serie not found" })
        }

        res.json(updateSerie)
    }

    create = async (req, res) => {
        const result = validateSerie(req.body)
        if(result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const newSerie = await this.serieModel.create({ input: result.data })
        res.status(201).json(newSerie)
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