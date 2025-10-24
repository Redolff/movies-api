import { ObjectId } from "mongodb"
import { connect } from "../database/connection.js"

export class ProfileModel {

    static getAll = async ({ userId }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')

        const result = user.profiles || []
        return result
    }

    static getById = async ({ userId, profileId }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)
        const profileObjectId = new ObjectId(profileId)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')

        if (!user.profiles || !Array.isArray(user.profiles)) {
            throw new Error('User has not profiles')
        }

        const result = user.profiles.find(
            (p) => p._id.toString() === profileObjectId.toString()
        )
        if (!result) throw new Error('Profile not found')

        return result
    }

    static update = async ({ userId, profileId, category, item }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)
        const profileObjectId = new ObjectId(profileId)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')

        if (!user.profiles || !Array.isArray(user.profiles)) {
            throw new Error('User has not profiles')
        }

        const profile = user.profiles.find(p => p._id.toString() === profileObjectId.toString())
        console.log('found profile:', profile)

        const existsItem = profile.myList[category]?.some(exist => exist._id.toString() === item._id.toString())
        if (existsItem) throw new Error('Item already exists in my list')

        const result = await users.updateOne(
            { _id: objectId, "profiles._id": profileObjectId },
            { $push: { [`profiles.$.myList.${category}`]: item } }
        )

        if (result.modifiedCount === 0) throw new Error('Failed to add item')

        const updatedUser = await users.findOne({ _id: objectId })
        const updatedProfile = updatedUser.profiles.find(p => p._id.toString() === profileObjectId.toString())
        return updatedProfile
    }

    static create = async ({ userId, profile }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(userId)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')
        if (user.profiles && user.profiles?.length >= 4) throw new Error('Maximum number of profiles reached')

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
        if (!user) throw new Error('User not found')

        const result = await users.findOneAndUpdate(
            { _id: objectId },
            { $pull: { profiles: { _id: profileObjectId } } },
            { returnDocument: 'after', projection: { password: 0 } }
        )

        return result
    }

}