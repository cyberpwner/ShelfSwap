/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AddressDto } from '../dto/AddressDto';
import { AuthorDto } from '../dto/AuthorDto';
import { BookDto } from '../dto/BookDto';
import { CategoryDto } from '../dto/CategoryDto';
import { OrderDto } from '../dto/OrderDto';
import { OrderItemDto } from '../dto/OrderItemDto';
import { PaymentDto } from '../dto/PaymentDto';
import { ReviewDto } from '../dto/ReviewDto';
import { UserDto } from '../dto/UserDto';
import { Address } from '../entity/Address';
import { Author } from '../entity/Author';
import { Book } from '../entity/Book';
import { Category } from '../entity/Category';
import { Order } from '../entity/Order';
import { OrderItem } from '../entity/OrderItem';
import { Payment } from '../entity/Payment';
import { Review } from '../entity/Review';
import { User } from '../entity/User';

// mapper.service.ts
export class MapperService {
  mapOrderToDto(order: Partial<Order>): OrderDto {
    return {
      status: order.status!,
      trackingNumber: order.trackingNumber,
      user: this.mapUserToDto(order.user!),
      items: order?.items?.map((item) => ({
        quantity: item.quantity!,
        priceAtPurchase: item.priceAtPurchase!,
        book: this.mapBookToDto(item.book!),
        orderId: item.order.id,
      })),
    };
  }

  mapOrderItemToDto(orderItem: Partial<OrderItem>): OrderItemDto {
    return {
      quantity: orderItem.quantity!,
      priceAtPurchase: orderItem.priceAtPurchase!,
      book: this.mapBookToDto(orderItem.book!),
      orderId: orderItem.order?.id,
    };
  }

  mapUserToDto(user: Partial<User>): UserDto {
    return {
      username: user.username!,
      email: user.email!,
      role: user.role!,
      bio: user?.bio,
      profilePicUrl: user?.profilePicUrl,
    };
  }

  mapBookToDto(book: Partial<Book>): BookDto {
    return {
      isbn: book.isbn!,
      title: book.title!,
      price: book.price!,
      authors: book?.authors?.map((author) => this.mapAuthorToDto(author)),
      categories: book?.categories?.map((category) => this.mapCategoryToDto(category)),
    };
  }

  mapAuthorToDto(author: Partial<Author>): AuthorDto {
    return {
      name: author.name!,
      books: author?.books?.map((book) => this.mapBookToDto(book)),
    };
  }

  mapReviewToDto(review: Partial<Review>): ReviewDto {
    return {
      rating: review.rating!,
      comment: review?.comment,
      book: this.mapBookToDto(review.book!),
    };
  }

  mapPaymentToDto(payment: Partial<Payment>): PaymentDto {
    return {
      method: payment.method!,
      amount: payment.amount!,
      order: this.mapOrderToDto(payment.order!),
    };
  }

  mapAddressToDto(address: Partial<Address>): AddressDto {
    return {
      city: address.city!,
      addressLine1: address.addressLine1!,
      addressLine2: address?.addressLine2,
      user: this.mapUserToDto(address.user!),
    };
  }

  mapCategoryToDto(category: Partial<Category>): CategoryDto {
    return {
      name: category.name!,
      books: category?.books?.map((book) => this.mapBookToDto(book)),
    };
  }
}
