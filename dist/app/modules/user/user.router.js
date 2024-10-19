"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("./user.controller");
var router = express_1.default.Router();
router.get("/", user_controller_1.UserControllers.getAllUsers);
router.get("/:userId", user_controller_1.UserControllers.getUserById);
exports.UserRoutes = router;
