import { validateMyList, validatePartialMyList } from "../schemas/myList.js"
import { validatePartialProfile, validateProfile } from "../schemas/profile.js"

export class ProfileController {
    constructor({ profileModel }){
        this.profileModel = profileModel
    }

    getAll = async (req, res) => {
        const { userId } = req.params

        try {
            const result = await this.profileModel.getAll({ userId })
            return res.status(200).json(result)
        } catch(error) {
            return res.status(400).json({ message: error.message })
        }
    }

    getById = async (req, res) => {
        const { userId, profileId } = req.params

        try {
            const result = await this.profileModel.getById({ userId, profileId })
            if(!result) return res.status(404).json({ message: 'Profile not found' })
            return res.status(200).json(result)
        } catch(error){
            return res.status(400).json({ message: error.message })
        }
    }

    update = async (req, res) => {
        const { userId } = req.params
        const result = validatePartialMyList(req.body)

        if(!result.success) {
            return res.status(400).json({ error: result.error.errors })
        }

        const { profileId, category, item } = result.data

        try {
            const updatedProfile = await this.profileModel.update({ userId, profileId, category, item })
            return res.status(200).json(updatedProfile)
        } catch(error){
            return res.status(404).json({ message: error.message })
        }
    }

    create = async (req, res) => {
        const { userId } = req.params
        const result = validateProfile(req.body)

        try {
            const newProfile = await this.profileModel.create({ userId, profile: result.data })
            return res.status(201).json(newProfile)
        } catch(error){
            return res.status(400).json({ message: error.message })
        }
    } 

    delete = async (req, res) => {
        const { userId, profileId } = req.params

        try {
            const deletedUser = await this.profileModel.delete({ userId, profileId })
            if(!deletedUser) return res.status(404).json({ message: 'Profile not found' })
            return res.status(200).json(deletedUser)
        } catch(error) {
            return res.status(400).json({ message: error.message })
        }
    }

}