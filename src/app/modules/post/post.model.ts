import mongoose, { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
}, {
    timestamps: true
});

export const Post = model<TPost>('Post', postSchema);
