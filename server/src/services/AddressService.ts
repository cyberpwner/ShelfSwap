import { AddressDao } from '../dao/AddressDao';
import { AddressDto } from '../dto/AddressDto';
import { Address } from '../entity/Address';

export class AddressService {
  private readonly addressDao: AddressDao;

  constructor() {
    this.addressDao = new AddressDao();
  }

  async getAllAddresses(): Promise<AddressDto[]> {
    const addresses = await this.addressDao.findAll();

    if (addresses.length === 0) return [];

    return addresses.map((address) => new AddressDto(address));
  }

  async getAddressById(id: number): Promise<AddressDto | null> {
    const address = await this.addressDao.findById(id);

    if (!address) return null;

    return new AddressDto(address);
  }

  async createAddress(address: Address): Promise<AddressDto | null> {
    const createdAddress = await this.addressDao.create(address);

    if (!createdAddress) return null;

    return new AddressDto(createdAddress);
  }

  async updateAddress(id: number, address: Partial<Address>): Promise<AddressDto | null> {
    const updatedAddress = await this.addressDao.update(id, address);

    if (!updatedAddress) return null;

    return new AddressDto(updatedAddress);
  }

  async deleteAddress(id: number): Promise<AddressDto | null> {
    const deletedAddress = await this.addressDao.delete(id);

    if (!deletedAddress) return null;

    return new AddressDto(deletedAddress);
  }
}
