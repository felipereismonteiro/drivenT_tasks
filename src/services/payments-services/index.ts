import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(ticketId: number) {
  const payment = paymentsRepository.getPaymentByTicketId(ticketId);

  return payment;
}

const paymentsServices = {
  getPaymentByTicketId
};

export default paymentsServices;
