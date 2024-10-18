import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req, res) => {
    const result = await PostServices.createPostIntoDB(req.body, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post successfully created",
        data: result
    })
});

const getAllPosts = catchAsync(async (req, res) => {
    const result = await PostServices.getAllPostsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Posts successfully retrieved",
        data: result
    })
})

export const PostControllers = {
    createPost,
    getAllPosts
}