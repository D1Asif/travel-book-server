import { z } from "zod";

const createCommentValidationSchema = z.object({
    body: z.object({
        postId: z.string().length(24, "Invalid post ID format"),
        content: z.string().min(1, "Content cannot be empty")
    })
})

const updateCommentValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content cannot be empty")
    })
})

export const CommentValidations = {
    createCommentValidationSchema,
    updateCommentValidationSchema
}