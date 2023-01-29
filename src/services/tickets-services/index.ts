import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

async function getTicketsType() {
  const ticketTypes = await ticketsRepository.getTicketsType();

  return ticketTypes;
}

async function getTickets(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);

  console.log(tickets);

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsServices = {
  getTicketsType,
  getTickets
};

export default ticketsServices;
