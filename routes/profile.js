import { Router } from "express";
import { ProfileController } from "../controllers/profile.js";

export const profileRouter = ({ profileModel }) => {
    const profileRouter = new Router()

    const profileController = new ProfileController({ profileModel })

    profileRouter.post('/:userId', profileController.create)
    profileRouter.delete('/:userId/:profileId', profileController.delete)

    return profileRouter
}