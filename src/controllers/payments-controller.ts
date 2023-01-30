import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices from "@/services/payments-services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsController(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId } = res.locals;

    const payment = await paymentsServices.getPaymentByTicketId(ticketId);

    res.status(httpStatus.OK).send(payment);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send(err.message);
  }
}
