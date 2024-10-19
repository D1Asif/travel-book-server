import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface"
import { User } from "./user.model"

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
    const user = await User.findById(userId);

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

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserIntoDB
}