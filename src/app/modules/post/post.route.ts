import express from "express"
import auth from "../../middlewares/auth";
import { PostValidations } from "./post.validation";
import validateRequest from "../../middlewares/validateRequest";
import { PostControllers } from "./post.controller";

const router = express.Router();

router.post("/", auth('user', 'admin'), validateRequest(PostValidations.createPostValidationSchema), PostControllers.createPost);

router.get("/", PostControllers.getAllPosts);

router.get("/:postId", PostControllers.getPostByID);

router.put("/:postId", auth('user', 'admin'), validateRequest(PostValidations.updatePostValidationSchema), PostControllers.updatePost);

router.delete("/:postId", auth('user', 'admin'), PostControllers.deletePost);

router.put("/:postId/upvote", auth('user', 'admin'), PostControllers.upvotePost);

router.put("/:postId/downvote", auth('user', 'admin'), PostControllers.downvotePost);

export const PostRoutes = router;