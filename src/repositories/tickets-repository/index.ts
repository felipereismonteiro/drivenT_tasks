import { prisma } from "@/config";

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
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  getTicketsType,
  getTickets
};

export default ticketsRepository;
