import { randomUUID } from 'node:crypto'
import { connect } from '../database/connection.js'
import { ObjectId } from 'mongodb'

export class MovieModel {

    static async getAll({ genre, year, fromYear }) {
        const db = await connect()
        const movies = db.collection('movies')

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

        if (year) {
            return movies.find({ year: Number(year) }).toArray()
        }

        if (fromYear) {
            return movies.find({ year: {$gte: Number(fromYear)} }).toArray()
        }

        return movies.find({}).toArray()
    }

    static async getById({ id }) {
        const db = await connect()
        const movies = db.collection('movies')

        const objectId = new ObjectId(id)
        return await movies.findOne({ _id: objectId })
    }

    static async update({ id, input }) {
        const db = await connect()
        const movies = db.collection('movies')

        const objectId = new ObjectId(id)
        const result = await movies.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'after' }
        )

        return result
    }
    
    static async create({ input }) {
        const db = await connect()
        const movies = db.collection('movies')

        const result = await movies.insertOne(input)

        return result
    }

    static async delete({ id }) {
        const db = await connect()
        const movies = db.collection('movies')

        const objectId = new ObjectId(id)
        const result = await movies.deleteOne({ _id: objectId })
    
        return result
    }

}