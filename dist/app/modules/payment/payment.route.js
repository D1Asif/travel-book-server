"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var payment_validation_1 = require("./payment.validation");
var payment_controller_1 = require("./payment.controller");
var router = express_1.default.Router();
router.post("/", (0, auth_1.default)('user'), (0, validateRequest_1.default)(payment_validation_1.PaymentValidations.createPaymentValidation), payment_controller_1.PaymentControllers.makePayment);
exports.PaymentRoutes = router;
