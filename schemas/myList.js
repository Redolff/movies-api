import { movieSchema } from './movies.js'
import { serieSchema } from './series.js'
import { gameSchema } from './games.js'
import z from 'zod'

export const addToMyListSchema = z.object({
    profileId: z.string(),
    category: z.enum(["movies", "series", "games"]),
    item: z.union([movieSchema, serieSchema, gameSchema])
})

export const validateMyList = (object) => {
    return addToMyListSchema.safeParse(object)
}

export const validatePartialMyList = (object) => {
    return addToMyListSchema.partial().safeParse(object)
}