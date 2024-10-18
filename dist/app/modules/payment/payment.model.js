"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Ensuring the amount is not negative
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'canceled'],
        default: 'pending',
        required: true,
    }
}, {
    timestamps: true
});
var Payment = (0, mongoose_1.model)('Payment', paymentSchema);
