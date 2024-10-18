import { Document, Model, Types } from "mongoose";

export interface TUser extends Document {
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

export type TUserRole = TUser['role'];

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>
}