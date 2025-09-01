import { Router } from "express";
import { UserController } from "../controllers/user";

export const userRouter = ({ userModel }) => {
    const userRouter = Router()

    const userController = new UserController({ userModel })

    userRouter.get('/:id', userController.getById)
    
}