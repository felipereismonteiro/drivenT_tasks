import { AuthenticatedRequest } from "@/middlewares";
import { Payment } from "@/protocols";
import paymentsServices from "@/services/payments-services";
import ticketsServices from "@/services/tickets-services";
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

export async function postPaymentController(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { cardData, ticketId } = req.body;

    await ticketsServices.getTicketsById(ticketId);
    const ticketForPayment = await ticketsServices.getTicketForPayment(userId);

    const paymentBody: Payment = {
      ticketId,
      value: ticketForPayment.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.slice(-4)
    };

    const payment = await paymentsServices.insertPayment(paymentBody);

    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === "ConflictError") {
      return res.status(httpStatus.UNAUTHORIZED).send(err);
    }
    return res.status(httpStatus.NOT_FOUND).send(err);
  }
}
