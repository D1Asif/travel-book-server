import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface"
import { User } from "./user.model"
import mongoose from "mongoose";
import { Post } from "../post/post.model";
import { Comment } from "../comment/comment.model";

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);

    return newUser;
}

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
    const usersQuery = new QueryBuilder(
        User.find(),
        query
    ).search(['name', 'username', 'email'])
        .filter()
        .sort();

    const users = await usersQuery.modelQuery;

    return users;
}

const getUserByIdFromDB = async (userId: string) => {
    const user = await User.findById(userId)
                    .populate({
                        path: 'posts',
                        populate: 'comments'
                    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user does not exist!")
    }

    return user;
}

const updateUserIntoDB = async (userId: string, loggedInUserId: string, payload: Partial<TUser>) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    if (userId.toString() !== loggedInUserId.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Only user can update own data")
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        payload,
        { new: true }
    );

    return updatedUser;
}

const deleteUserFromDB = async (userId: string, loggedInUserId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    if (userId.toString() !== loggedInUserId.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // delete user's posts
        const postIds = [...user.posts];

        await Post.deleteMany({ author: userId }, { session })

        // delete comments of the posts
        await Promise.all(
            postIds.map((postId) => Comment.deleteMany({ postId }, { session }))
        );

        // delete user's comment
        await Comment.deleteMany({ author: userId }, { session });

        // delete user
        await User.findByIdAndDelete(userId);

        await session.commitTransaction();
        await session.endSession();
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
    }
}

const followUser = async (userId: string, loggedInUserId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updatedFollowingUser = await User.findByIdAndUpdate(
            loggedInUserId,
            {
                $addToSet: { following: userId }
            },
            { new: true }
        );

        const updatedFollowedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { followers: loggedInUserId }
            },
            { new: true }
        )

        session.endSession();

        return updatedFollowingUser;
    } catch (err) {
        session.abortTransaction();
        session.endSession();

        throw err;
    }
}

const unfollowUser = async (userId: string, loggedInUserId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updatedFollowingUser = await User.findByIdAndUpdate(
            loggedInUserId,
            {
                $pull: { following: userId }
            },
            { new: true }
        );

        const updatedFollowedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { followers: loggedInUserId }
            },
            { new: true }
        )

        session.endSession();

        return updatedFollowingUser;
    } catch (err) {
        session.abortTransaction();
        session.endSession();

        throw err;
    }
}

const makeUserAdminIntoDB = async (userId: string) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role: "admin" },
        { new: true }
    )

    return updatedUser;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    followUser,
    unfollowUser,
    makeUserAdminIntoDB
}