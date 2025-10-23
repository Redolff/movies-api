import { validateProfile } from "../schemas/profile.js"

export class ProfileController {
    constructor({ profileModel }){
        this.profileModel = profileModel
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