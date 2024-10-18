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
exports.PostValidations = {
    createPostValidationSchema: createPostValidationSchema
};
