# ERD - Shelf Swap

## Entities and Relationships

### **Users**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `name` - VARCHAR(100)
  - `email` - VARCHAR(100), Unique
  - `password` - VARCHAR(255)
  - `role` - ENUM('user', 'admin')
  - `bio` - TEXT
  - `profile_picture` - VARCHAR(255)
  - `created_at` - TIMESTAMP
  - `updated_at` - TIMESTAMP

---

### **Books**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `title` - VARCHAR(255)
  - `author` - VARCHAR(255)
  - `description` - TEXT
  - `category` - ENUM('Politics', 'Fiction', 'History', 'Science', 'Biography', 'Other')
  - `price` - DECIMAL(10, 2)
  - `user_id` (FK) - INT, References `users(id)`
  - `is_sold` - BOOLEAN (default: false)
  - `created_at` - TIMESTAMP
  - `updated_at` - TIMESTAMP

**Relationships**:

- **Users** (1) → **Books** (M)
  - A user can upload many books.
  - A book belongs to one user.

---

### **Favorites**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `user_id` (FK) - INT, References `users(id)`
  - `book_id` (FK) - INT, References `books(id)`
  - `created_at` - TIMESTAMP

**Relationships**:

- **Users** (M) → **Favorites** (M) → **Books** (M)
  - A user can favorite many books.
  - A book can be favorited by many users.
  - This is a many-to-many relationship.

---

### **Transactions**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `buyer_id` (FK) - INT, References `users(id)`
  - `seller_id` (FK) - INT, References `users(id)`
  - `book_id` (FK) - INT, References `books(id)`
  - `status` - ENUM('pending', 'completed', 'cancelled')
  - `created_at` - TIMESTAMP
  - `updated_at` - TIMESTAMP

**Relationships**:

- **Users** (1) → **Transactions** (M)
  - A user can be both a buyer and a seller in transactions.
  - A transaction links a buyer, seller, and a book.

---

### **Offers**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `user_id` (FK) - INT, References `users(id)`
  - `book_id` (FK) - INT, References `books(id)`
  - `offer_price` - DECIMAL(10, 2)
  - `status` - ENUM('pending', 'accepted', 'rejected')
  - `created_at` - TIMESTAMP
  - `updated_at` - TIMESTAMP

**Relationships**:

- **Users** (1) → **Offers** (M)
  - A user can make many offers.
  - A book can have many offers made by different users.

---

### **Reviews**

- **Attributes**:
  - `id` (PK) - INT, Auto Increment
  - `reviewer_id` (FK) - INT, References `users(id)`
  - `reviewee_id` (FK) - INT, References `users(id)`
  - `transaction_id` (FK) - INT, References `transactions(id)`
  - `rating` - INT (1-5)
  - `comment` - TEXT
  - `created_at` - TIMESTAMP

**Relationships**:

- **Users** (1) → **Reviews** (M)
  - A user can leave many reviews as a reviewer.
  - A user can be reviewed many times (as a reviewee).
- **Transactions** (1) → **Reviews** (M)
  - A review is associated with a completed transaction.

---

### **ERD Overview**

- **Users ↔ Books**: One-to-Many (A user can upload many books; a book belongs to one user).
- **Users ↔ Favorites ↔ Books**: Many-to-Many (A user can like many books; a book can be liked by many users).
- **Users ↔ Transactions**: Many-to-Many (A user can be both buyer and seller; each transaction has a buyer, a seller, and a book).
- **Users ↔ Offers ↔ Books**: Many-to-Many (A user can make offers on multiple books; a book can have multiple offers).
- **Users ↔ Reviews**: One-to-Many (A user can leave multiple reviews as a reviewer; a user can be reviewed many times as a reviewee).
- **Transactions ↔ Reviews**: One-to-Many (Each transaction can have one review).

---

## Diagram Structure

```text
+-----------------+        +-----------------+        +-----------------+        +-----------------+
|      Book       |        |     Author      |        |  book_author    |        |    Category     |
+-----------------+        +-----------------+        +-----------------+        +-----------------+
| id (PK)         |<-------| id (PK)         |        | book_id (FK)    |        | id (PK)         |
| isbn (Unique)   |        | name            |        | author_id (FK)  |        | name            |
| title           |        +-----------------+        +-----------------+        +-----------------+
| description?    |
| price           |
+-----------------+
       | 1
       | *
+-----------------+        +-----------------+        +-------------------+        +-----------------+
|      User       |        |     Order       |        |  Order_Item       |        |  book_category  |
+-----------------+        +-----------------+        +-------------------+        +-----------------+
| id (PK)         |        | id (PK)         |        | id (PK)           |        | category_id (FK)|
| username        |        | status          |        | order_id (FK)     |        | book_id (FK)    |
| email           |        | tracking_number?|        | book_id (FK)      |        +-----------------+
| password        |        | buyer_id (FK)   |        | quantity          |
| role            |        +-----------------+        | price_at_purchase |
| bio?            |                                    +-----------------+
| profile_pic_url?|
+-----------------+
       | 1
       | *
+-----------------+        +-----------------+        +-----------------+
|    Address      |        |    Payment      |        |     Review      |
+-----------------+        +-----------------+        +-----------------+
| id (PK)         |        | id (PK)         |        | id (PK)         |
| city            |        | method          |        | rating          |
| address_line1   |        | amount          |        | comment?        |
| address_line2?  |        | order_id (FK)   |        | order_id (FK)   |
| user_id (FK)    |        +-----------------+        +-----------------+
+-----------------+
```
