import { Types } from "mongoose"

export type TPost = {
    author: Types.ObjectId,
    content: string,
    images: string[],
    isPremium: boolean,
    upVotes: Types.ObjectId[],
    downVotes: Types.ObjectId[],
    comments: Types.ObjectId[],
}