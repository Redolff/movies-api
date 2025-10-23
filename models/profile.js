import { ObjectId } from "mongodb"
import { connect } from "../database/connection.js"

export class ProfileModel {

    static create = async ({ userId, profile }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')
        if(user.profiles && user.profiles?.length >= 4) throw new Error('Maximum number of profiles reached')

        const result = {
            _id: new ObjectId(),
            name: profile.name,
            avatar: profile.avatar,
            myList: { movies: [], series: [], games: [] }
        }

        await users.updateOne(
            { _id: objectId },
            { $push: { profiles: result } },
        )

        return result
    }

    static delete = async ({ userId, profileId }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)
        const profileObjectId = new ObjectId(profileId)

        const user = await users.findOne({ _id: objectId })
        if(!user) throw new Error('User not found')

        const result = await users.findOneAndUpdate(
            { _id: objectId },
            { $pull: {profiles: { _id: profileObjectId }} },
            { returnDocument: 'after', projection: { password: 0 } }
        )

        return result
    }

}