import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
    const result = await CommentServices.createCommentIntoDB(req.body, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment successfully created",
        data: result
    })
});

const updateComment = catchAsync(async (req, res) => {
    const result = await CommentServices.updateCommentIntoDB(req.body, req.params.commentId, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment successfully updated",
        data: result
    })
});

const deleteComment = catchAsync(async (req, res) => {
    const result = await CommentServices.deleteCommentFromDB(req.params.commentId, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Comment successfully deleted",
        data: result
    })
});

export const CommentControllers = {
    createComment,
    updateComment,
    deleteComment
}