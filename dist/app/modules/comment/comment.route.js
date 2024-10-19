"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var comment_validation_1 = require("./comment.validation");
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var comment_controller_1 = require("./comment.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(comment_validation_1.CommentValidations.createCommentValidationSchema), comment_controller_1.CommentControllers.createComment);
router.put("/:commentId", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(comment_validation_1.CommentValidations.updateCommentValidationSchema), comment_controller_1.CommentControllers.updateComment);
exports.CommentRoutes = router;
