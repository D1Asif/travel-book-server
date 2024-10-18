"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidations = void 0;
var zod_1 = require("zod");
var createPaymentValidation = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().min(0, "Amount must be a non-negative number"),
        paymentStatus: zod_1.z.enum(['pending', 'paid', 'canceled'])
    })
});
exports.PaymentValidations = {
    createPaymentValidation: createPaymentValidation
};
