import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,  // Ensuring the amount is not negative
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'canceled'],
        default: 'pending',  // Default to 'pending' if not specified
        required: true,
    }
}, {
    timestamps: true
});

const Payment = model<TPayment>('Payment', paymentSchema)