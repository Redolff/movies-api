import { validateUser } from "../schemas/users.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getAll = async (req, res) => {
        const users = await this.userModel.getAll()
        if(users.length < 1) return res.status(200).json({ message: 'Solicitud correcta, sin datos' })
        return res.json(users)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const userXid = await this.userModel.getById({ id })
        if(userXid) return res.json(userXid)

        return res.status(404).json({ message: 'User not found' })
    }

    create = async (req, res) => {
        const result = validateUser(req.body)
        try {
            const newUser = await this.userModel.create({ input: result.data })
            return res.status(201).json(newUser)
        } catch(error){
            if(result.error) {
                return res.status(400).json({ message: JSON.parse(result.error.message) })
            }
            if(error.status === 409) {
                return res.status(409).json({ message: error.message })
            }
            console.error(error)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

}