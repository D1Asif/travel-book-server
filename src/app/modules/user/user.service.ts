import QueryBuilder from "../../builder/QueryBuilder";
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

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB
}