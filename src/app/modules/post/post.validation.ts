import { z } from "zod";

const createPostValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, { message: "Content is required" }),
        images: z.array(z.string().url()).default([]),
        tags: z.array(z.string()).default([]),
        isPremium: z.boolean()
    })
});

const updatePostValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, { message: "Content is required" }).optional(),
        images: z.array(z.string().url()).optional(),
        tags: z.array(z.string()).optional(),
        isPremium: z.boolean().optional()
    })
});

export const PostValidations = {
    createPostValidationSchema,
    updatePostValidationSchema
}