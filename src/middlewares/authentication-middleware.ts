import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { unauthorizedError } from "@/errors";
import { prisma } from "@/config";

import ticketsServices from "@/services/tickets-services";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });
    if (!session) return generateUnauthorizedResponse(res);

    req.userId = userId;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

export async function authenticateCreatedPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    
    const { id } = await ticketsServices.getEnrollment(userId);
    const ticketTypeFounded = await ticketsServices.getTicketTypeById(ticketTypeId);

    res.locals.credentials = { userId, id, ticketTypeFounded };
    
    next();
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).send(err.message);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export async function verifyCredentials(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { ticketId } = req.query;
    const { userId } = req;

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
    
    const ticketFounded = await ticketsServices.getTicketsById(Number(ticketId));

    const enrollment = await ticketsServices.getEnrollment(userId);

    if (ticketFounded.enrollmentId !== enrollment.id) return res.sendStatus(httpStatus.UNAUTHORIZED);

    res.locals.ticketId = ticketFounded.id;
    
    return next();
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).send(err.message);
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
