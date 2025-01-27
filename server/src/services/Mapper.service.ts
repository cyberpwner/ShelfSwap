/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AddressDto } from '../dto/Address.dto';
import { AuthorDto } from '../dto/Author.dto';
import { BookDto } from '../dto/Book.dto';
import { CartDto } from '../dto/Cart.dto';
import { CartItemDto } from '../dto/CartItem.dto';
import { CategoryDto } from '../dto/Category.dto';
import { OrderDto } from '../dto/Order.dto';
import { OrderItemDto } from '../dto/OrderItem.dto';
import { PaymentDto } from '../dto/Payment.dto';
import { ReviewDto } from '../dto/Review.dto';
import { UserDto } from '../dto/User.dto';
import { Address } from '../entities/Address';
import { Author } from '../entities/Author';
import { Book } from '../entities/Book';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Category } from '../entities/Category';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { Payment } from '../entities/Payment';
import { Review } from '../entities/Review';
import { User } from '../entities/User';

// mapper.service.ts
export class MapperService {
  mapOrderToDto(order: Partial<Order>): OrderDto {
    return {
      id: order.id!,
      status: order.status!,
      trackingNumber: order.trackingNumber,
      user: this.mapUserToDto(order.user!),
      items: order?.items?.map((item) => ({
        id: item.id,
        quantity: item.quantity!,
        priceAtPurchase: item.priceAtPurchase!,
        book: this.mapBookToDto(item.book!),
        orderId: order.id,
      })),
    };
  }

  mapOrderItemToDto(orderItem: Partial<OrderItem>): OrderItemDto {
    return {
      id: orderItem.id!,
      quantity: orderItem.quantity!,
      priceAtPurchase: orderItem.priceAtPurchase!,
      book: this.mapBookToDto(orderItem.book!),
      order: this.mapOrderToDto(orderItem.order!),
    };
  }

  mapUserToDto(user: Partial<User>): UserDto {
    return {
      id: user.id!,
      username: user.username!,
      email: user.email!,
      role: user.role!,
      bio: user?.bio,
      avatarUrl: user?.avatarUrl,
      cart: user?.cart,
    };
  }

  mapBookToDto(book: Partial<Book>): BookDto {
    return {
      id: book.id!,
      isbn: book.isbn!,
      title: book.title!,
      description: book?.description,
      price: book.price!,
      coverUrl: book.coverUrl!,
      authors: book?.authors?.map((author) => this.mapAuthorToDto(author)),
      categories: book?.categories?.map((category) => this.mapCategoryToDto(category)),
    };
  }

  mapAuthorToDto(author: Partial<Author>): AuthorDto {
    return {
      id: author.id!,
      name: author.name!,
      books: author?.books?.map((book) => this.mapBookToDto(book)),
    };
  }

  mapReviewToDto(review: Partial<Review>): ReviewDto {
    return {
      id: review.id!,
      rating: review.rating!,
      comment: review?.comment,
      book: this.mapBookToDto(review.book!),
    };
  }

  mapPaymentToDto(payment: Partial<Payment>): PaymentDto {
    return {
      id: payment.id!,
      method: payment.method!,
      amount: payment.amount!,
      order: this.mapOrderToDto(payment.order!),
    };
  }

  mapAddressToDto(address: Partial<Address>): AddressDto {
    return {
      id: address.id!,
      city: address.city!,
      addressLine1: address.addressLine1!,
      addressLine2: address?.addressLine2,
      user: this.mapUserToDto(address.user!),
    };
  }

  mapCategoryToDto(category: Partial<Category>): CategoryDto {
    return {
      id: category.id!,
      name: category.name!,
      books: category?.books?.map((book) => this.mapBookToDto(book)),
    };
  }

  mapCartToDto(cart: Partial<Cart>): CartDto {
    return {
      id: cart.id!,
      user: this.mapUserToDto(cart.user!),
      items: cart.items?.map((item) => ({
        id: item.id,
        book: this.mapBookToDto(item.book),
        quantity: item.quantity,
        cartId: cart.id!,
      })),
    };
  }

  mapCartItemToDto(item: Partial<CartItem>): CartItemDto {
    return {
      id: item.id!,
      book: this.mapBookToDto(item.book!),
      quantity: item.quantity!,
      cart: this.mapCartToDto(item.cart!),
    };
  }
}
