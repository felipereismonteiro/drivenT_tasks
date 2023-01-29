import { AuthenticatedRequest } from "@/middlewares";
import ticketsServices from "@/services/tickets-services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function ticketsType(_req: Request, res: Response) {
  try {
    const types = await ticketsServices.getTicketsType();

    return res.status(httpStatus.OK).send(types);
  } catch(err) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const tickets = await ticketsServices.getTickets(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}
