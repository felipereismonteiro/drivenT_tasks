import { Payment } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(ticketId: number) {
  const payment = paymentsRepository.getPaymentByTicketId(ticketId);

  return payment;
}

async function insertPayment(payment: Payment) {
  const paymentSuccessfull = await paymentsRepository.insertPayment(payment);
  await paymentsRepository.setTicketAsPaid(payment.ticketId);

  return paymentSuccessfull;
}

const paymentsServices = {
  getPaymentByTicketId,
  insertPayment
};

export default paymentsServices;
