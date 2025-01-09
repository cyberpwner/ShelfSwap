/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Address } from '../entity/Address';
import { UserDto } from './UserDto';

export class AddressDto {
  city: string;
  addressLine1: string;
  addressLine2?: string;
  user: UserDto;

  constructor(address: Partial<Address>) {
    this.city = address.city!;
    this.addressLine1 = address.addressLine1!;
    this.addressLine2 = address?.addressLine2;
    this.user = new UserDto(address.user!);
  }
}
