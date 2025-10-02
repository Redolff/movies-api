import { randomUUID } from 'node:crypto'
import { connect } from '../database/connection.js'

export class MovieModel {
    /* MODELO CON CONSULTAS NOSQL PARA MONGODB */

    static async getAll({ genre, year, fromYear }) {
        const db = await connect()
        const movies = db.collection('movies')

        // me falta agregar los casos de YEAR y FROMYEAR

        if (genre) {
            return movies.find({
                genre: {
                    $elemMatch: {
                        $regex: genre,
                        $options: 'i'
                    }
                }
            }).toArray()
        }

        return movies.find({}).toArray()
    }

}