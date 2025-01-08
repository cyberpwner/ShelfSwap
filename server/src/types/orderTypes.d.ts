export enum OrderStatus {
  TO_BE_SENT = 'to be sent',
  SENT = 'sent',
  IN_TRANSIT = 'in transit',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  RETURN_REQUESTED = 'return requested',
  RETURNED = 'returned',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export interface IOrder {
  status: OrderStatus;
  trackingNumber?: string;
  bookId: number;
  sellerId: number;
  buyerId: number;
}
