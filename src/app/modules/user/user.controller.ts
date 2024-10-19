import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully created",
        data: result
    })
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users successfully retrieved",
        data: result
    })
});

const getUserById = catchAsync(async (req, res) => {
    const result = await UserServices.getUserByIdFromDB(req.params.userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully retrieved",
        data: result
    })
});

const updateUser = catchAsync(async (req, res) => {
    const result = await UserServices.updateUserIntoDB(req.params.userId, req.user.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully updated",
        data: result
    })
});

const deleteUser = catchAsync(async (req, res) => {
    const result = await UserServices.deleteUserFromDB(req.params.userId, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully deleted",
        data: result
    })
});

const followUser = catchAsync(async (req, res) => {
    const result = await UserServices.followUser(req.params.userId, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully followed",
        data: result
    })
});

const unfollowUser = catchAsync(async (req, res) => {
    const result = await UserServices.unfollowUser(req.params.userId, req.user.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User successfully unfollowed",
        data: result
    })
});

export const UserControllers = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser
}