import express from "express"
import auth from "../../middlewares/auth";
import { PostValidations } from "./post.validation";
import validateRequest from "../../middlewares/validateRequest";
import { PostControllers } from "./post.controller";

const router = express.Router();

router.post("/", auth('user', 'admin'), validateRequest(PostValidations.createPostValidationSchema), PostControllers.createPost);

router.get("/", PostControllers.getAllPosts);

router.get("/:postId", PostControllers.getPostByID);

export const PostRoutes = router;