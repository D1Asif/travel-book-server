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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostControllers = void 0;
var http_status_1 = __importDefault(require("http-status"));
var catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
var sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
var post_service_1 = require("./post.service");
var createPost = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.createPostIntoDB(req.body, req.user.id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Post successfully created",
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
var getAllPosts = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.getAllPostsFromDB(req.query, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id)];
            case 1:
                result = _b.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Posts successfully retrieved",
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
var getPostByID = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.getPostByIdFromDB(req.params.postId)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Post successfully retrieved",
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
var updatePost = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.updatePostIntoDB(req.params.postId, req.user.id, req.body)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Post successfully updated",
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
var deletePost = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.deletePostFromDB(req.params.postId, req.user.id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Post successfully deleted",
                    data: result
                });
                return [2 /*return*/];
        }
    });
}); });
var upvotePost = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.upvotePostIntoDB(req.params.postId, req.user.id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: result === null || result === void 0 ? void 0 : result.message,
                    data: result === null || result === void 0 ? void 0 : result.updatedPost
                });
                return [2 /*return*/];
        }
    });
}); });
var downvotePost = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, post_service_1.PostServices.downvotePostIntoDB(req.params.postId, req.user.id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: result === null || result === void 0 ? void 0 : result.message,
                    data: result === null || result === void 0 ? void 0 : result.updatedPost
                });
                return [2 /*return*/];
        }
    });
}); });
exports.PostControllers = {
    createPost: createPost,
    getAllPosts: getAllPosts,
    getPostByID: getPostByID,
    updatePost: updatePost,
    deletePost: deletePost,
    upvotePost: upvotePost,
    downvotePost: downvotePost
};
