"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("./user.controller");
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var user_validation_1 = require("./user.validation");
var router = express_1.default.Router();
router.get("/", user_controller_1.UserControllers.getAllUsers);
router.get("/:userId", user_controller_1.UserControllers.getUserById);
router.put("/:userId", (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(user_validation_1.UserValidations.updateUserValidationSchema), user_controller_1.UserControllers.updateUser);
router.delete("/:userId", (0, auth_1.default)('user', 'admin'), user_controller_1.UserControllers.deleteUser);
// follow a user
// unfollow a user
// make user admin
exports.UserRoutes = router;
