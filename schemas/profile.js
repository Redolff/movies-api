import { z } from "zod";

const myListSchema = z.object({
  movies: z.array(z.any()).optional().default([]),
  series: z.array(z.any()).optional().default([]),
  games: z.array(z.any()).optional().default([]),
})

const profileSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    avatar: z.string().url().optional(),
    myList: myListSchema.optional().default({ movies: [], series: [], games: [] })
})

export const validateProfile = (object) => {
    return profileSchema.safeParse(object)
}

export const validatePartialProfile = (object) => {
    return profileSchema.partial().safeParse(object)
}