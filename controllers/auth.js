import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/user.js"
import { validateUser } from "../schemas/users.js"
import { connect } from '../database/connection.js'

export class AuthController {

    static login = async (req, res) => {
        const { email, password } = req.body
        const db = await connect()
        const users = db.collection('users')

        try {

            const user = await users.findOne({ email })
            if (!user) return res.status(401).json({ message: 'User not found' })
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) return res.status(401).json({ message: 'Password incorrect' })

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.SECRET_JWT_KEY,
                { expiresIn: '1h' }
            )

            const { password: _, ...safeUser } = user

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }).send({ safeUser, token })

            return res.json({ message: 'Login successful', user: safeUser })
        } catch (error) {
            console.error('Error en el login: ', error)
            return res.status(500).json({ message: 'Error interno en el servidor' })
        }
    }

    static register = async (req, res) => {
        const result = validateUser(req.body)
        if (result.error) return res.status(400).json({ message: result.error })
        try {
            const newUser = await UserModel.create({
                ...result.data,
                role: 'user'
            })
            // Genero token automaticamente despues de loguearse
            const token = jwt.sign(
                { id: newUser._id, username: newUser.username },
                process.env.SECRET_JWT_KEY,
                { expiresIn: '1h' }
            )
            return res.status(201).json({ message: 'Registro exitoso', user: newUser, token })
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar usuario', error: error.message })
        }
    }

    static logout = async (req, res) => {
        res.clearCookie('access_token').json({ message: 'Logout successful' })
    }

}