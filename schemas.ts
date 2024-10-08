import * as z from 'zod'


export const LoginSchema = z.object({
    email:z.string(),
    password:z.string()
})
export const SignupSchema = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string(),
})