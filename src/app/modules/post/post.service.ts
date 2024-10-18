import mongoose from "mongoose";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createPostIntoDB = async (payload: TPost, author: string) => {
    const session = await mongoose.startSession();

    const postData = {
        ...payload,
        author
    }

    try {
        session.startTransaction();

        const newPost = await Post.create([postData], { session });

        const updatedUser = await User.findByIdAndUpdate(
            author,
            {
                $push: { posts: newPost[0]._id }
            },
            { session, new: true }
        )

        if (!updatedUser) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
        }

        await session.commitTransaction();
        await session.endSession();

        return newPost;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
}

export const PostServices = {
    createPostIntoDB
}