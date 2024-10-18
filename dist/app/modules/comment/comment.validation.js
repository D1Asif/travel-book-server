"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidations = void 0;
var zod_1 = require("zod");
var createCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string().length(24, "Invalid post ID format"),
        content: zod_1.z.string().min(1, "Content cannot be empty")
    })
});
exports.CommentValidations = {
    createCommentValidationSchema: createCommentValidationSchema
};
