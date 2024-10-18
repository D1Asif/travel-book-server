import { z } from "zod";

const createPaymentValidation = z.object({
    body: z.object({
        amount: z.number().min(0, "Amount must be a non-negative number"),
        paymentStatus: z.enum(['pending', 'paid', 'canceled'])
    })
});

export const PaymentValidations = {
    createPaymentValidation
}