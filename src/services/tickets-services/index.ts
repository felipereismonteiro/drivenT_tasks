import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { TicketType } from "@prisma/client";

async function getTicketsType() {
  const ticketTypes = await ticketsRepository.getTicketsType();
 
  return ticketTypes;
}

async function getTickets(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);

  if (!tickets) throw notFoundError();

  return tickets;
}

async function getTicketTypeById(ticketId: number) {
  const ticketTypeFounded = await ticketsRepository.getTicketsTypeById(ticketId);
  if (!ticketTypeFounded) throw notFoundError();

  return ticketTypeFounded;
}

async function createTicket(enrollmentId: number, ticketType: TicketType) {
  const ticketCreated = await ticketsRepository.postTicket(enrollmentId, ticketType);

  return ticketCreated;
}

async function getEnrollment(userId: number) {
  const enrollment = await ticketsRepository.getEnrollment(userId);
  if (!enrollment) throw notFoundError();

  return enrollment;
}

async function getTicketsById(ticketId: number) {
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();

  return ticket;
} 

const ticketsServices = {
  getTicketsType,
  getTickets,
  getTicketTypeById,
  createTicket,
  getEnrollment,
  getTicketsById
};

export default ticketsServices;
