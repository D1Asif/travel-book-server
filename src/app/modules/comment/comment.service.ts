import mongoose from "mongoose";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { Post } from "../post/post.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCommentIntoDB = async (payload: TComment, author: string) => {
    const commentData = {
        ...payload,
        author
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const newComment = await Comment.create([commentData], { session });

        const updatedPost = await Post.findByIdAndUpdate(
            payload.postId,
            {
                $push: { comments: newComment[0]._id }
            },
            { session }
        )

        if (!updatedPost) {
            throw new AppError(httpStatus.NOT_FOUND, "Post not fund!")
        }

        await session.commitTransaction();
        await session.endSession();

        return newComment;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        throw err;
    }
}

export const CommentServices = {
    createCommentIntoDB
}