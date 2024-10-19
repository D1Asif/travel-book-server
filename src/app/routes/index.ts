import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { UserRoutes } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/posts",
        route: PostRoutes
    },
    {
        path: "/comments",
        route: CommentRoutes
    },
    {
        path: "/payments",
        route: PaymentRoutes
    },
    {
        path: "/users",
        route: UserRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;