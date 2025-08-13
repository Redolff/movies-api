import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const moviesJSON = readJSON('../movies.json')

export class MovieModel {

    static getAll = async ({ genre }) => {
        if (genre) {
            const filteredMovies = await moviesJSON.filter(
                movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            )
            return filteredMovies
        }
        return moviesJSON
    }

    static getById = async ({ id }) => {
        const movieXid = await moviesJSON.filter((movie) => movie.id === id)
        return movieXid
    }

    static update = async ({ id, input }) => {
        const movieIndex = await moviesJSON.find((movie) => movie.id === id)

        if(movieIndex === -1) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        const updateMovie = {
            ...moviesJSON[movieIndex],
            ...input
        }

        return updateMovie
    }

    static create = async ({ input }) => {
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        moviesJSON.push(newMovie)

        return newMovie
    }

    static delete = async ({ id }) => {
        const movieIndex = await moviesJSON.find((movie) => movie.id === id)
        if(movieIndex === -1){
            return res.statusCode(404).json({ message: 'Movie not found' })
        }

        moviesJSON.splice(movieIndex, 1)
        return true
    }

}