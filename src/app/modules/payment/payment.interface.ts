import { Types } from "mongoose"

export type TPayment = {
    user: Types.ObjectId,
    amount: number,
    paymentStatus: 'pending' | 'paid' | 'canceled'
}