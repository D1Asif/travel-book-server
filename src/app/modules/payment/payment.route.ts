import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentValidations } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/", auth('user'), validateRequest(PaymentValidations.createPaymentValidation), PaymentControllers.makePayment)

export const PaymentRoutes = router;