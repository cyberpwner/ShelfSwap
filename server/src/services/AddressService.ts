import { AddressDao } from '../dao/AddressDao';
import { AddressDto } from '../dto/AddressDto';
import { Address } from '../entity/Address';
import { MapperService } from './MapperService';

export class AddressService {
  private readonly addressDao: AddressDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.addressDao = new AddressDao();
    this.mapperService = new MapperService();
  }

  async getAllAddresses(): Promise<AddressDto[]> {
    const addresses = await this.addressDao.findAll();

    if (addresses.length === 0) return [];

    return addresses.map((address) => this.mapperService.mapAddressToDto(address));
  }

  async getAddressById(id: number): Promise<AddressDto | null> {
    const address = await this.addressDao.findById(id);

    if (!address) return null;

    return this.mapperService.mapAddressToDto(address);
  }

  async createAddress(address: Address): Promise<AddressDto | null> {
    const createdAddress = await this.addressDao.create(address);

    if (!createdAddress) return null;

    return this.mapperService.mapAddressToDto(createdAddress);
  }

  async updateAddress(id: number, address: Partial<Address>): Promise<AddressDto | null> {
    const updatedAddress = await this.addressDao.update(id, address);

    if (!updatedAddress) return null;

    return this.mapperService.mapAddressToDto(updatedAddress);
  }

  async deleteAddress(id: number): Promise<AddressDto | null> {
    const deletedAddress = await this.addressDao.delete(id);

    if (!deletedAddress) return null;

    return this.mapperService.mapAddressToDto(deletedAddress);
  }
}
