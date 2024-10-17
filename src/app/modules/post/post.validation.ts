import { z } from "zod";

const createPostValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, { message: "Content is required" }),
        images: z.array(z.string().url()).default([]),
        isPremium: z.boolean(),
    })
})

export const PostValidations = {
    createPostValidationSchema
}