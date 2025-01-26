import { CartItemDto } from "./CartItem.dto";
import { UserDto } from "./User.dto";

export class CartDto {
  id: string;
  user: UserDto;
  items?: CartItemDto[];
}
