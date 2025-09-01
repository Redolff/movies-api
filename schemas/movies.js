import z from 'zod'

// Schema de validaciones para las movies
const movieSchema = z.object({
    title: z.string(),
    year: z.preprocess((val) => Number(val), z.number().int().min(1900).max(2026)),
    director: z.string(),
    duration: z.preprocess((val) => Number(val), z.number().int().positive()),
    poster: z.string().url(),
    genre: z.enum(["Drama", "Deporte", "History", "Thriller", "Adventure", "Sci-Fi", "Action",
        "Crime", "Romance", "Animation", "Biography", "Fantasy", "Mystery", "War", "Horror"
    ]).array(),
    rate: z.preprocess((val) => Number(val), z.number().positive().max(10)),
    trailerUrl: z.string().url()
})

export const validateMovie = (object) => {
    return movieSchema.safeParse(object)
}

export const validatePartialMovie = (object) => {
    return movieSchema.partial().safeParse(object)
}