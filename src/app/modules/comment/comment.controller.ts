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

export const CommentControllers = {
    createComment
}