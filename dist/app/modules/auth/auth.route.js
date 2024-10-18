"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var user_validation_1 = require("../user/user.validation");
var user_controller_1 = require("../user/user.controller");
var auth_validation_1 = require("./auth.validation");
var auth_controller_1 = require("./auth.controller");
var router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;
