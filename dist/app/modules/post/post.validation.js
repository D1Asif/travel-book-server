"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidations = void 0;
var zod_1 = require("zod");
var createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, { message: "Content is required" }),
        images: zod_1.z.array(zod_1.z.string().url()).default([]),
        tags: zod_1.z.array(zod_1.z.string()).default([]),
        isPremium: zod_1.z.boolean()
    })
});
var updatePostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, { message: "Content is required" }).optional(),
        images: zod_1.z.array(zod_1.z.string().url()).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        isPremium: zod_1.z.boolean().optional()
    })
});
exports.PostValidations = {
    createPostValidationSchema: createPostValidationSchema,
    updatePostValidationSchema: updatePostValidationSchema
};
