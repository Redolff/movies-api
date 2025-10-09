import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const userRouter = ({ userModel }) => {
    const userRouter = Router()

    const userController = new UserController({ userModel })

    userRouter.get('/', userController.getAll)
    userRouter.get('/:id', userController.getById)
    userRouter.post('/', userController.create)

    return userRouter
}
