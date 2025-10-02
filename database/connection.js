import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const URI = process.env.MONGODB_URL

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const connect = async() => {
    try {
        await client.connect()
        const database = client.db('Cluster0')
        return database
    } catch(error) {
        console.error('Error connecting to the database')
        console.error(error)
        throw error
    }
}