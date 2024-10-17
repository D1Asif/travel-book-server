import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long")
    })
});

export const AuthValidations = {
    loginValidationSchema
}