import { AddressDao } from '../dao/AddressDaoImpl';
import { Address } from '../entity/Address';

export class AddressService {
  private addressDao: AddressDao;

  constructor() {
    this.addressDao = new AddressDao();
  }

  async getAllAddresss(): Promise<Address[]> {
    return this.addressDao.findAll();
  }

  async getAddressById(id: number): Promise<Address | null> {
    return this.addressDao.findById(id);
  }

  async createAddress(address: Address): Promise<Address | null> {
    return this.addressDao.create(address);
  }

  async updateAddress(id: number, address: Partial<Address>) {
    return this.addressDao.update(id, address);
  }

  async deleteAddress(id: number): Promise<boolean> {
    return this.addressDao.delete(id);
  }
}
