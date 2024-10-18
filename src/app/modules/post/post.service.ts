import mongoose from "mongoose";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

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

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
    const postsQuery = new QueryBuilder(
        Post.find(),
        query
    ).search(['content'])
        .filter()
        .sort()

    const posts = await postsQuery.modelQuery
                    .populate({
                        path: 'author',
                        select: '_id name username profilePicture isVerifiedUser'
                    })
                    .populate({
                        path: 'comments',
                        select: '_id author content',
                        populate: {
                            path: 'author',
                            select: '_id name username profilePicture isVerifiedUser'
                        }
                    });

    return posts;
}

export const PostServices = {
    createPostIntoDB,
    getAllPostsFromDB
}