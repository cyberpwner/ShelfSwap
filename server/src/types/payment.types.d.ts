export enum PaymentMethod {
  DEBIT_CARD = 'debit_card',
  BIZUM = 'bizum',
}

export interface IPayment {
  method: PaymentMethod;
  amount: number;
  orderId: string;
}
