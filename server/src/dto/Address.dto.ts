import { UserDto } from './User.dto';

export class AddressDto {
  id: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  user: UserDto;
}
