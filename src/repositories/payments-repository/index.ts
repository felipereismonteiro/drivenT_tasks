import { prisma } from "@/config";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId: ticketId }, orderBy: { createdAt: "desc" } });
}

const paymentsRepository = {
  getPaymentByTicketId
};

export default paymentsRepository;
