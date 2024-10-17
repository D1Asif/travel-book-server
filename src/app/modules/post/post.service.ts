import mongoose from "mongoose";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";

const createPostIntoDB = async (payload: TPost, author: string) => {
    const session = await mongoose.startSession();

    const payloadData = {
        ...payload,
        author
    }

    try {
        session.startTransaction();

        const newPost = await Post.create([payloadData], { session });

        const updatedUser = await User.findByIdAndUpdate(
            author,
            {
                $push: { posts: newPost[0]._id }
            },
            { session }
        )

        await session.commitTransaction();

        return newPost;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        await session.endSession();
    }
}

export const PostServices = {
    createPostIntoDB
}