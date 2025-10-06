import { ObjectId } from "mongodb"
import { connect } from "../database/connection.js"

export class GameModel {

    static getAll = async ({ platform, fromYear }) => {
        const db = await connect()
        const games = db.collection('games')

        if(platform) {
            return await games.find({
                platform: {
                    $elemMatch: {
                        $regex: platform,
                        $options: 'i'
                    }
                }
            }).toArray()
        }

        if(fromYear) {
            return await games.find({year: {$gte: Number(fromYear)} }).toArray()
        }

        return await games.find({}).toArray()
    }

    static getById = async ({ id }) => {
        const db = await connect()
        const games = db.collection('games')

        const objectId = new ObjectId(id)
        return await games.findOne({ _id: objectId })
    }

    static update = async ({ id, input }) => {
        const db = await connect()
        const games = db.collection('games')

        const objectId = new ObjectId(id)
        const result = await games.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'after' }
        )

        return result
    }

    static create = async ({ input }) => {
        const db = await connect()
        const games = db.collection('games')

        const result = await games.insertOne({ input })

        return result
    }

    static delete = async ({ id }) => {
        const db = await connect()
        const games = db.collection('games')

        const objectId = new ObjectId(id)
        return await games.deleteOne({ _id: objectId })
    }

} 