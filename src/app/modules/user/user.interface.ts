import { Model, Types } from "mongoose";

export type TUser = {
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    profilePicture?: string,
    isVerifiedUser: boolean,
    role: 'user' | 'admin',
    posts: Types.ObjectId[],
    following: Types.ObjectId[],
    followers: Types.ObjectId[]
}

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
}