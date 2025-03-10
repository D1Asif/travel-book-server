"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var comment_model_1 = require("./comment.model");
var post_model_1 = require("../post/post.model");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var http_status_1 = __importDefault(require("http-status"));
var createCommentIntoDB = function (payload, author) { return __awaiter(void 0, void 0, void 0, function () {
    var commentData, session, newComment, updatedPost, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentData = __assign(__assign({}, payload), { author: author });
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 1:
                session = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 10]);
                session.startTransaction();
                return [4 /*yield*/, comment_model_1.Comment.create([commentData], { session: session })];
            case 3:
                newComment = _a.sent();
                return [4 /*yield*/, post_model_1.Post.findByIdAndUpdate(payload.postId, {
                        $push: { comments: newComment[0]._id }
                    }, { session: session })];
            case 4:
                updatedPost = _a.sent();
                if (!updatedPost) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not fund!");
                }
                return [4 /*yield*/, session.commitTransaction()];
            case 5:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 6:
                _a.sent();
                return [2 /*return*/, newComment];
            case 7:
                err_1 = _a.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 8:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 9:
                _a.sent();
                throw err_1;
            case 10: return [2 /*return*/];
        }
    });
}); };
var updateCommentIntoDB = function (payload, commentId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, updatedComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, comment_model_1.Comment.findById(commentId)];
            case 1:
                comment = _a.sent();
                if (!comment) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
                }
                if (comment.author.toString() !== userId.toString()) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Only the comment author can update comment");
                }
                return [4 /*yield*/, comment_model_1.Comment.findByIdAndUpdate(commentId, payload, { new: true })];
            case 2:
                updatedComment = _a.sent();
                return [2 /*return*/, updatedComment];
        }
    });
}); };
var deleteCommentFromDB = function (commentId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var comment, session, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, comment_model_1.Comment.findById(commentId)];
            case 1:
                comment = _a.sent();
                if (!comment) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
                }
                if (comment.author.toString() !== userId.toString()) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Only the comment author can delete comment");
                }
                return [4 /*yield*/, mongoose_1.default.startSession()];
            case 2:
                session = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 8, , 11]);
                session.startTransaction();
                return [4 /*yield*/, post_model_1.Post.findByIdAndUpdate(comment.postId, {
                        $pull: { comments: comment._id }
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, comment_model_1.Comment.findByIdAndDelete(commentId, { session: session })];
            case 5:
                _a.sent();
                return [4 /*yield*/, session.commitTransaction()];
            case 6:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 7:
                _a.sent();
                return [3 /*break*/, 11];
            case 8:
                err_2 = _a.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 9:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 10:
                _a.sent();
                throw err_2;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.CommentServices = {
    createCommentIntoDB: createCommentIntoDB,
    updateCommentIntoDB: updateCommentIntoDB,
    deleteCommentFromDB: deleteCommentFromDB
};
