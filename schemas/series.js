import z from 'zod'

// Schema de validaciones para las series
export const serieSchema = z.object({
    title: z.string(),
    year: z.preprocess((val) => Number(val), z.number().int().min(1900).max(2026)),
    director: z.string(),
    seasons: z.preprocess((val) => Number(val), z.number().int().positive()),
    episodes: z.preprocess((val) => Number(val), z.number().int().positive()),
    poster: z.string().url(),
    genre: z.enum(["Action", "Drama", "History", "Sci-Fi", "Thriller", "Fantasy", "Mystery", 
        "Crime", "Horror", "Adventure", "Comedy", "Romance", "Biography"
    ]).array(),
    rate: z.preprocess((val) => Number(val), z.number().positive().max(10)),
    trailerUrl: z.string().url(),
}) 

export const validateSerie = (object) => {
    return serieSchema.safeParse(object)
}

export const validatePartialSerie = (object) => {
    return serieSchema.partial().safeParse(object)
}