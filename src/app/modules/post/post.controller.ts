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
    const result = await PostServices.getAllPostsFromDB(req.query, req?.user?.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Posts successfully retrieved",
        data: result
    })
})

const getPostByID = catchAsync(async (req, res) => {
    const result = await PostServices.getPostByIdFromDB(req.params.postId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post successfully retrieved",
        data: result
    })
})

const updatePost = catchAsync(async (req, res) => {
    const result = await PostServices.updatePostIntoDB(
        req.params.postId,
        req.user.id,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post successfully updated",
        data: result
    });
})

const deletePost = catchAsync(async (req, res) => {
    const result = await PostServices.deletePostFromDB(
        req.params.postId,
        req.user.id,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post successfully deleted",
        data: result
    });
})

const upvotePost = catchAsync(async (req, res) => {
    const result = await PostServices.upvotePostIntoDB(
        req.params.postId,
        req.user.id
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result?.message,
        data: result?.updatedPost
    });
})

const downvotePost = catchAsync(async (req, res) => {
    const result = await PostServices.downvotePostIntoDB(
        req.params.postId,
        req.user.id
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result?.message,
        data: result?.updatedPost
    });
})

export const PostControllers = {
    createPost,
    getAllPosts,
    getPostByID,
    updatePost,
    deletePost,
    upvotePost,
    downvotePost
}