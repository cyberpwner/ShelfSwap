import { UserDto } from './UserDto';

export class AddressDto {
  city: string;
  addressLine1: string;
  addressLine2?: string;
  user: UserDto;
}
