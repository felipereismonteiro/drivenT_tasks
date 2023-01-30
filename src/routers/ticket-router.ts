import { Router } from "express";
import { getTickets, postTickets, ticketsType } from "@/controllers/tickets-controller";
import { authenticateCreatedPost, authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsType)
  .get("/", getTickets)
  .post("", validateBody(ticketSchema), authenticateCreatedPost, postTickets);

export { ticketsRouter };
