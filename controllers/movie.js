import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel
    }

    getAll = async (req, res) => {
        const { genre, year, fromYear } = req.query
        const movies = await this.movieModel.getAll({ genre, year, fromYear })
        res.json(movies)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const movieXid = await this.movieModel.getById({ id })
        if (movieXid) return res.json(movieXid[0])

        return res.status(404).json({ message: 'Movie not found' })
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validatePartialMovie(req.body)
        if (result.error) {
            return res.statusCode(400).json({ message: JSON.parse(result.error.message) })
        }

        const updateMovie = await this.movieModel.update({ id, input: result.data })
        res.json(updateMovie)
    }

    create = async (req, res) => {
        const result = validateMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await this.movieModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const movieIndex = await this.movieModel.delete({ id })
        if(movieIndex === false) {
            return res.statusCode(404).json({ message: 'Movie not found' })
        }
        
        res.json({ message: 'Movie deleted' })
    }
} 