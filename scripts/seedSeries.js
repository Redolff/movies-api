import { readJSON } from "../utils/utils.js";
import { connect } from "../database/connection.js";

async function seedSeries() {
    try {
        const db = await connect()
        const seriesCollection = db.collection('series')

        const series = readJSON('../series.json')
        const seriesToInsert = series.map(({ id, ...rest }) => rest)

        const result = await seriesCollection.insertMany(seriesToInsert)

        console.log(`Se insertaron ${Object.keys(result.insertedIds).length} series correctamente`)

    } catch(error) {
        console.error('Error al importar las series ', error)
    }
}

seedSeries()