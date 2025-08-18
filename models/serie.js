import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const seriesJSON = readJSON('../series.json')

export class SerieModel {

    static getAll = async () => {
        return seriesJSON
    }

    static getById = async ({ id }) => {
        const serieXid = await seriesJSON.filter((serie) => serie.id === id)
        return serieXid
    }

}