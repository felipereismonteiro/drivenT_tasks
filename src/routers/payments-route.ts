import { getPaymentsController, postPaymentController } from "@/controllers/payments-controller";
import { authenticateToken, validateBody, verifyCredentials } from "@/middlewares";
import { paymentSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", verifyCredentials, getPaymentsController)
  .post("/process", validateBody(paymentSchema), postPaymentController);

export { paymentsRouter };
