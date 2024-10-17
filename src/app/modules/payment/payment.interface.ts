import { Types } from "mongoose"

export type TPayment = {
    userId: Types.ObjectId,
    amount: number,
    paymentStatus: 'pending' | 'paid' | 'canceled'
}