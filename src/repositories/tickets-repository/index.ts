import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }, 
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      TicketType: true
    }
  });
}

async function getTicketsTypeById(ticketId: number) {
  return prisma.ticketType.findUnique({ where: { id: ticketId } });
}

async function postTicket(enrollmentId: number, ticketType: TicketType) {
  return prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId: ticketType.id,
      enrollmentId
    }
  });
}

async function getEnrollment(userId: number) {
  return prisma.enrollment.findUnique({ where: { userId: userId } });
}

async function getTicketsById(ticketId: number) {
  return prisma.ticket.findUnique({ where: { id: ticketId } });
}

const ticketsRepository = {
  getTicketsType,
  getTickets,
  getTicketsTypeById,
  postTicket,
  getEnrollment,
  getTicketsById
};

export default ticketsRepository;
