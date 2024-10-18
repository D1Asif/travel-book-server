"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var post_validation_1 = require("./post.validation");
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var post_controller_1 = require("./post.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(post_validation_1.PostValidations.createPostValidationSchema), post_controller_1.PostControllers.createPost);
router.get("/", post_controller_1.PostControllers.getAllPosts);
router.get("/:postId", post_controller_1.PostControllers.getPostByID);
router.put("/:postId", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(post_validation_1.PostValidations.updatePostValidationSchema), post_controller_1.PostControllers.updatePost);
exports.PostRoutes = router;
