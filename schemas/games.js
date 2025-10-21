import z from 'zod'

export const gameSchema = z.object({
    title: z.string(),
    year: z.preprocess((val) => Number(val), z.number().int().min(1900).max(2026)),
    developer: z.string(),
    publisher: z.string(),
    platform: z.enum(["PS4", "PS5", "PC", "Xbox One", "Nintendo Switch", "Mobile", "Nintendo 64",
        "3DS", "Xbox", "Switch", "PlayStation", "Xbox Series X", "PS2", "GameCube", "Wii", "SNES", "Arcade",
        "Genesis", "Xbox 360"
    ]).array(),
    genre: z.enum(["Action", "RPG", "Fantasy", "Metroidvania", "Platformer", "Fantasy", "Shooter",
        "MMO", "Fighting", "Adventure", "Sci-Fi", "Puzzle", "Simulation", "Racing", "Strategy", "RTS", 
        "Horror", "Open world", "Battle Royale", "Hack and Slash", "Survival", "Sandbox"
    ]).array(),
    rating: z.preprocess((val) => Number(val), z.number().positive().max(10)),
    multiplayer: z.boolean(),
    poster: z.string().url()
})

export const validateGame = (object) => {
    return gameSchema.safeParse(object)
}

export const validatePartialGame = (object) => {
    return gameSchema.partial().safeParse(object)
}