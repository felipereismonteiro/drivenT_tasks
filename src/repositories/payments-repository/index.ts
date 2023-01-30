import { prisma } from "@/config";
import { Payment } from "@/protocols";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId: ticketId }, orderBy: { createdAt: "desc" } });
}

async function insertPayment(payment: Payment) {
  return prisma.payment.create({ data: payment });
}

async function setTicketAsPaid(ticketId: number) {
  return prisma.ticket.update({ where: { id: ticketId }, data: {
    status: "PAID"
  } });
}

const paymentsRepository = {
  getPaymentByTicketId,
  insertPayment,
  setTicketAsPaid
};

export default paymentsRepository;
