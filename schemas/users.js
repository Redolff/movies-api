import z from 'zod'
import { object } from 'zod/v4'

const profileSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    avatar: z.string().url().optional(),
})

const userSchema = z.object({
    firstName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.string().email(),
    password: z.string()
        .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
        .regex(/[a-z]/, 'Debe contener al menos una letra minuscula'),
    role: z.enum(['user', 'admin']).default('user'),
    profiles: z.array(profileSchema).optional()
})

export const validateUser = (object) => {
    return userSchema.safeParse(object)
}

export const validatePartialUser = (object) => {
    return userSchema.partial().safeParse(object)
}

export const validateProfile = (object) => {
    return profileSchema.safeParse(object)
}