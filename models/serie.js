import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const seriesJSON = readJSON('../series.json')

export class SerieModel {

    static getAll = async ({ season, genre, fromYear }) => {
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

        if(fromYear){
            const serieFromYear = await seriesJSON.filter(
                (serie) => serie.year >= Number(fromYear)
            )
            return serieFromYear
        }

        return seriesJSON
    }

    static getById = async ({ id }) => {
        const serieXid = await seriesJSON.filter((serie) => serie.id === id)
        return serieXid
    }

    static update = async ({ id, input }) => {
        const serieIndex = await seriesJSON.findIndex((serie) => serie.id === id)
        if(serieIndex === -1) return false

        const updateSerie = {
            ...seriesJSON[serieIndex],
            ...input
        }

        seriesJSON[serieIndex] = updateSerie
        return updateSerie
    }

    static delete = async ({ id }) => {
        const serieIndex = await seriesJSON.findIndex((serie) => serie.id === id)
        if(serieIndex === -1) {
            return false
        }
        seriesJSON.splice(serieIndex, 1)
        return true
    }

}