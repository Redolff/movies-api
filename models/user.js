import 'dotenv/config'
import { ObjectId } from "mongodb"
import { connect } from "../database/connection.js"
import bcrypt from 'bcrypt'

export class UserModel {

    static getAll = async () => {
        const db = await connect()
        const users = db.collection('users')

        const usuarios = await users.find({}).toArray()
        const allUsers = usuarios.map(({ password: _, ...rest }) => rest)
        return allUsers
    }

    static getById = async ({ id }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(id)
        const user = await users.findOne({ _id: objectId })

        const { password: _, ...userId } = user
        return userId
    }

    static update = async ({ id, input }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(id)
        const result = await users.findOneAndUpdate(
            { _id: objectId },
            { $set: input },
            { returnDocument: 'after' }
        )

        return result
    }

    static create = async (input) => { // Proceso interno, crea usuarios en la DB, administrar usuarios.
        const db = await connect()
        const users = db.collection('users')

        const { password, email, ...rest } = input

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const error = new Error('El usuario ya existe')
            error.status = 409
            throw error
        }

        const SALT_ROUNDS = Number(process.env.SALT_ROUND)
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = {
            ...rest,
            email,
            password: hashedPassword
        }

        const result = await users.insertOne(newUser)
        const userCreated = await users.findOne({ _id: result.insertedId })

        const { password: _, ...user } = userCreated
        return user
    }

    static createProfile = async ({ id, profile }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(id)

        const user = await users.findOne({ _id: objectId })
        if (!user) throw new Error('User not found')

        if (user.profiles && user.profiles?.length >= 4) {
            throw new Error('Maximum number of profiles reached')
        }

        const newProfile = {
            _id: new ObjectId(),
            name: profile.name,
            avatar: profile.avatar,
            myList: { movies: [], series: [], games: [] }
        }

        const result = await users.findOneAndUpdate(
            { _id: objectId },
            { $push: { profiles: newProfile } },
            { returnDocument: 'after', projection: { password: 0 } }
        )

        return result
    }

    static delete = async ({ id }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(id)
        const result = await users.deleteOne({ _id: objectId })

        return result
    }

    static addToMyList = async ({ id, profileId, category, item }) => {
        const db = await connect()
        const users = db.collection('users')

        const objectId = new ObjectId(id)
        const profileObjectId = new ObjectId(profileId)

        const user = await users.findOne({ _id: objectId, "profiles._id": profileObjectId })
        if (!user) throw new Error('User or profile not found')

        const profile = user.profiles.find(p => p._id.toString() === profileId)

        if (!item._id) {
            console.log("Item sin _id, asignando uno nuevo temporal para pruebas");
            item._id = new ObjectId(); // esto te deja testear desde api.http
            item.isTemporary = true;   // opcional, para identificarlo
        }

        const existsItem = profile.myList[category]?.some(existing => existing._id.toString() === item._id.toString())
        if (existsItem) throw new Error(`${category.slice(0, -1)} already exists in myList`)

        const result = await users.updateOne(
            { _id: objectId, "profiles._id": profileObjectId },
            { $push: { [`profiles.$.myList.${category}`]: item } }
        )

        if (result.modifiedCount === 0) throw new Error('Failed to add item')

        return item 
    }

}