import { readJSON } from "../utils/utils.js";
import { connect } from "../database/connection.js";

async function seedGames() {
    try {
        const db = await connect()
        const gamesCollection = db.collection('games')

        const games = readJSON('../games.json')

        const gamesToInsert = games.map(({ id, ...rest}) => rest)

        const result = await gamesCollection.insertMany(gamesToInsert)

        console.log(`Se insertaron ${Object.keys(result.insertedIds).length} juegos correctamente`)

    } catch(error) {
        console.error('Error al importar los juegos ', error)
    }
}

seedGames()