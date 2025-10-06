import { connect } from '../database/connection.js'
import { ObjectId } from 'mongodb'

export class SerieModel {

    static getAll = async ({ season, genre, fromYear }) => {
        const db = await connect()
        const series = db.collection('series')

        if (season) {
            return await series.find({ seasons: Number(season) }).toArray()
        }

        if (genre) {
            return await series.find({
                genre: {
                    $elemMatch: {
                        $regex: genre,
                        $options: 'i'
                    }
                }
            }).toArray()
        }

        if (fromYear) {
            return await series.find({ year: { $gte: Number(fromYear) } }).toArray()
        }

        return await series.find({}).toArray()
    }

    static getById = async ({ id }) => {
        const db = await connect()
        const series = db.collection('series')
        
        const objectId = new ObjectId(id)
        return await series.findOne({ _id: objectId })
    }

    static update = async ({ id, input }) => {
        const db = await connect()
        const series = db.collection('series')

        const objectId = new ObjectId(id)
        const result = await series.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'after' }
        )

        return result
    }

    static create = async ({ input }) => {
        const db = await connect()
        const series = db.collection('series')

        const result = await series.insertOne(input)
        return result
    }

    static delete = async ({ id }) => {
        const db = await connect()
        const series = db.collection('series')

        const objectId = new ObjectId(id)
        const result = await series.deleteOne({ _id: objectId })

        return result
    }

}