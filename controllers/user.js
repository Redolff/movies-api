export class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getById = async (req, res) => {
        const { id } = req.params
        const userId = await this.userModel.getById({ id })
        if(userId) return res.json(userId[0])

        return res.status(404).json({ message: 'User not found' })
    }
}