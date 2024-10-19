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

const updateCommentIntoDB = async (payload: Partial<TComment>, commentId: string, userId: string) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    if (comment.author.toString() !== userId.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Only the comment author can update comment");
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        payload,
        { new: true }
    );

    return updatedComment;
}

const deleteCommentFromDB = async (commentId: string, userId: string) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    if (comment.author.toString() !== userId.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Only the comment author can delete comment");
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await Post.findByIdAndUpdate(
            comment.postId,
            {
                $pull: { comments: comment._id }
            }
        )

        await Comment.findByIdAndDelete(commentId, { session });

        await session.commitTransaction();
        await session.endSession();
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export const CommentServices = {
    createCommentIntoDB,
    updateCommentIntoDB,
    deleteCommentFromDB
}