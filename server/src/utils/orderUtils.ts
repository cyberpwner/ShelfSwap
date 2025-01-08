import { Order } from '../entity/Order';

export async function isDuplicateOrder(order: Order): Promise<boolean> {
  const ordersFound = await Order.createQueryBuilder('Order')
    .where('`Order`.book_id = :bookId', { bookId: order.book.id })
    .orWhere('`Order`.buyer_id = :buyerId', { buyerId: order.buyer.id })
    .getMany();

  return ordersFound.length > 0;
}
