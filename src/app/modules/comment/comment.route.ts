import express from "express";
import auth from "../../middlewares/auth";
import { CommentValidations } from "./comment.validation";
import validateRequest from "../../middlewares/validateRequest";
import { CommentControllers } from "./comment.controller";

const router = express.Router();

router.post("/", auth('user', 'admin'), validateRequest(CommentValidations.createCommentValidationSchema), CommentControllers.createComment);

export const CommentRoutes = router;