import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const moviesJSON = readJSON('../movies.json')

export class MovieModel {

    static getAll = async ({ genre, year, fromYear }) => {
        if (genre) {
            const moviesGenre = await moviesJSON.filter(
                movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            )
            return moviesGenre
        }

        if(year) {
            const moviesYear = await moviesJSON.filter(
                (movie) => movie.year === Number(year)
            )
            return moviesYear
        }

        if(fromYear) {
            const moviesPremiere = await moviesJSON.filter(
                (movie) => movie.year >= Number(fromYear)
            )
            return moviesPremiere
        }

        return moviesJSON
    }

    static getById = async ({ id }) => {
        const movieXid = await moviesJSON.filter((movie) => movie.id === id)
        return movieXid
    }

    static getByYear = async ({ year }) => {
        const moviesXyear = await moviesJSON.filter((movie) => movie.year === Number(year))
        return moviesXyear
    }

    static update = async ({ id, input }) => {
        const movieIndex = await moviesJSON.findIndex((movie) => movie.id === id)

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
        const movieIndex = await moviesJSON.findIndex((movie) => movie.id === id)
        if(movieIndex === -1){
            return res.statusCode(404).json({ message: 'Movie not found' })
        }

        moviesJSON.splice(movieIndex, 1)
        return true
    }

}