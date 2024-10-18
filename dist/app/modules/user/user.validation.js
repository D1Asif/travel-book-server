"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
var zod_1 = require("zod");
var createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        username: zod_1.z.string().min(1, "Username is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
        profilePicture: zod_1.z.string().optional(),
        role: zod_1.z.enum(['user', 'admin']),
    })
});
exports.UserValidations = {
    createUserValidationSchema: createUserValidationSchema
};
