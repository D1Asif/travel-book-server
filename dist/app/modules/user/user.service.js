"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
var http_status_1 = __importDefault(require("http-status"));
var QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var user_model_1 = require("./user.model");
var mongoose_1 = __importDefault(require("mongoose"));
var post_model_1 = require("../post/post.model");
var comment_model_1 = require("../comment/comment.model");
var createUserIntoDB = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.create(payload)];
            case 1:
                newUser = _a.sent();
                return [2 /*return*/, newUser];
        }
    });
}); };
var getAllUsersFromDB = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var usersQuery, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersQuery = new QueryBuilder_1.default(user_model_1.User.find(), query).search(['name', 'username', 'email'])
                    .filter()
                    .sort();
                return [4 /*yield*/, usersQuery.modelQuery];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
var getUserByIdFromDB = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var updateUserIntoDB = function (userId, loggedInUserId, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
                }
                if (userId.toString() !== loggedInUserId.toString()) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Only user can update own data");
                }
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(userId, payload, { new: true })];
            case 2:
                updatedUser = _a.sent();
                return [2 /*return*/, updatedUser];
        }
    });
}); };
var deleteUserFromDB = function (userId, loggedInUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, session, postIds, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
                }
                if (userId.toString() !== loggedInUserId.toString()) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
                }
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 2:
                session = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 10, , 13]);
                session.startTransaction();
                postIds = __spreadArray([], user.posts, true);
                return [4 /*yield*/, post_model_1.Post.deleteMany({ author: userId }, { session: session })
                    // delete comments of the posts
                ];
            case 4:
                _a.sent();
                // delete comments of the posts
                return [4 /*yield*/, Promise.all(postIds.map(function (postId) { return comment_model_1.Comment.deleteMany({ postId: postId }, { session: session }); }))];
            case 5:
                // delete comments of the posts
                _a.sent();
                // delete user's comment
                return [4 /*yield*/, comment_model_1.Comment.deleteMany({ author: userId }, { session: session })];
            case 6:
                // delete user's comment
                _a.sent();
                // delete user
                return [4 /*yield*/, user_model_1.User.findByIdAndDelete(userId)];
            case 7:
                // delete user
                _a.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 8:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 9:
                _a.sent();
                return [3 /*break*/, 13];
            case 10:
                err_1 = _a.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 11:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 12:
                _a.sent();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var followUser = function (userId, loggedInUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var session, updatedFollowingUser, updatedFollowedUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.startSession()];
            case 1:
                session = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                session.startTransaction();
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(loggedInUserId, {
                        $addToSet: { following: userId }
                    }, { new: true })];
            case 3:
                updatedFollowingUser = _a.sent();
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(userId, {
                        $addToSet: { followers: loggedInUserId }
                    }, { new: true })];
            case 4:
                updatedFollowedUser = _a.sent();
                session.endSession();
                return [2 /*return*/, updatedFollowingUser];
            case 5:
                err_2 = _a.sent();
                session.abortTransaction();
                session.endSession();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.UserServices = {
    createUserIntoDB: createUserIntoDB,
    getAllUsersFromDB: getAllUsersFromDB,
    getUserByIdFromDB: getUserByIdFromDB,
    updateUserIntoDB: updateUserIntoDB,
    deleteUserFromDB: deleteUserFromDB,
    followUser: followUser
};
