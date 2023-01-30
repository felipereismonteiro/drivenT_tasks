import { getPaymentsController } from "@/controllers/payments-controller";
import { authenticateToken, verifyCredentials } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("", verifyCredentials, getPaymentsController);

export { paymentsRouter };
