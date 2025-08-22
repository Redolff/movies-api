import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const seriesJSON = readJSON('../series.json')

export class SerieModel {

    static getAll = async ({ season, genre }) => {
        if(season) {
            const serieXseason = await seriesJSON.filter((serie) => serie.seasons == Number(season))
            return serieXseason
        }

        if(genre) {
            const serieXgenre = await seriesJSON.filter(
                (serie) => serie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            )
            return serieXgenre
        }

        return seriesJSON
    }

    static getById = async ({ id }) => {
        const serieXid = await seriesJSON.filter((serie) => serie.id === id)
        return serieXid
    }

}