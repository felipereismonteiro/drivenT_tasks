import { Router } from "express";
import { getTickets, ticketsType } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsType)
  .get("/", getTickets);

export { ticketsRouter };
