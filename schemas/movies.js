const z = require('zod')

// Schema de validaciones para las movies
const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url(),
    genre: z.enum([ "Drama", "Adventure", "Sci-Fi", "Action", "Crime", "Romance", "Animation", "Biography", "Fantasy"]).array(),
    rate: z.number().positive().max(10)
})

const validateMovie = (object) => {
    return movieSchema.safeParse(object)
}

const validatePartialMovie = (object) => {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}