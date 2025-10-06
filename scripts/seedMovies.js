import { readJSON } from "../utils/utils.js"
import { connect } from '../database/connection.js'

async function seedMovies() {
    try {
        const db = await connect()
        const moviesCollection = db.collection('movies')

        const movies = readJSON('../movies.json')

        const moviesToInsert = movies.map(({ id, ...rest }) => rest)

        const result = await moviesCollection.insertMany(moviesToInsert)

        console.log(`Se insertaron ${Object.keys(result.insertedIds).length} películas correctamente`)

    } catch(error) {
        console.error('Error al importar peliculas ', error)
    }
}

seedMovies()