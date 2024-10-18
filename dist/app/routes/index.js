"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = require("../modules/auth/auth.route");
var post_route_1 = require("../modules/post/post.route");
var comment_route_1 = require("../modules/comment/comment.route");
var payment_route_1 = require("../modules/payment/payment.route");
var router = express_1.default.Router();
var moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/posts",
        route: post_route_1.PostRoutes
    },
    {
        path: "/comments",
        route: comment_route_1.CommentRoutes
    },
    {
        path: "/payments",
        route: payment_route_1.PaymentRoutes
    },
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
