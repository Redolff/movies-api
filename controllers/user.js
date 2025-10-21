import { validateMyList } from "../schemas/myList.js"
import { validatePartialUser, validateProfile, validateUser } from "../schemas/users.js"

export class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getAll = async (req, res) => {
        const users = await this.userModel.getAll()
        if (users.length < 1) return res.status(200).json({ message: 'Solicitud correcta, sin datos' })
        return res.json(users)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const userXid = await this.userModel.getById({ id })
        if (userXid) return res.json(userXid)

        return res.status(404).json({ message: 'User not found' })
    }

    update = async (req, res) => {
        const { id } = req.params
        const result = validatePartialUser(req.body)
        if (result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })

        const updatedUser = await this.userModel.update({ id, input: result.data })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.json(updatedUser)
    }

    create = async (req, res) => {
        const result = validateUser(req.body)
        try {
            const newUser = await this.userModel.create(result.data)
            return res.status(201).json(newUser)
        } catch (error) {
            if (result.error) {
                return res.status(400).json({ message: JSON.parse(result.error.message) })
            }
            if (error.status === 409) {
                return res.status(409).json({ message: error.message })
            }
            console.error(error)
            return res.status(500).json({ message: 'Error interno del servidor' })
        }
    }

    createProfile = async (req, res) => {
        const { id } = req.params
        const result = validateProfile(req.body)
        try {
            const newProfile = await this.userModel.createProfile({ id, profile: result.data })
            return res.status(201).json(newProfile)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    delete = async (req, res) => {
        const { id } = req.params
        const userIndex = await this.userModel.delete({ id })
        if (userIndex === false) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ message: 'User deleted' })
    }

    deleteProfile = async (req, res) => {
        const { id, profileId } = req.params
        try {
            const deletedProfile = await this.userModel.deleteProfile({ id, profileId })
            return res.status(200).json(deletedProfile)
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    addToMyList = async (req, res) => {
        const { id } = req.params
        const result = validateMyList(req.body)

        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues })
        }

        const { profileId, category, item } = result.data

        try {
            const addItem = await this.userModel.addToMyList({ id, profileId, category, item })
            return res.status(201).json(addItem)
        } catch (error) {
            console.error(error)
            return res.status(400).json({ message: error.message })
        }
    }

}