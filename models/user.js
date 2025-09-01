import { readJSON } from "../utils/utils";
const userJSON = readJSON('../users.json')

export class UserModel {

    static getById = async ({ id }) => {
        const userXid = await userJSON.filter((user) => user.id === id)
        return userXid
    }
}