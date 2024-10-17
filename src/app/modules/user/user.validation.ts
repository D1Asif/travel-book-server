import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        username: z.string().min(1, "Username is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        profilePicture: z.string().optional(),
        role: z.enum(['user', 'admin']),
    })
});

export const UserValidations = {
    createUserValidationSchema
}