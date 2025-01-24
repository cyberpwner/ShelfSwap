import { AddressDao } from '../dao/Address.dao';
import { AddressDto } from '../dto/Address.dto';
import { Address } from '../entities/Address';
import { MapperService } from './Mapper.service';

export class AddressService {
  private readonly addressDao: AddressDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.addressDao = new AddressDao();
    this.mapperService = new MapperService();
  }

  async getAll(): Promise<AddressDto[]> {
    const addresses = await this.addressDao.findAll();

    if (addresses.length === 0) return [];

    return addresses.map((address) => this.mapperService.mapAddressToDto(address));
  }

  async getById(id: string): Promise<AddressDto | null> {
    const address = await this.addressDao.findById(id);

    if (!address) return null;

    return this.mapperService.mapAddressToDto(address);
  }

  async createAddress(address: Address): Promise<AddressDto | null> {
    const createdAddress = await this.addressDao.create(address);

    if (!createdAddress) return null;

    return this.mapperService.mapAddressToDto(createdAddress);
  }

  async updateAddress(id: string, address: Partial<Address>): Promise<AddressDto | null> {
    const updatedAddress = await this.addressDao.update(id, address);

    if (!updatedAddress) return null;

    return this.mapperService.mapAddressToDto(updatedAddress);
  }

  async deleteAddress(id: string): Promise<AddressDto | null> {
    const deletedAddress = await this.addressDao.delete(id);

    if (!deletedAddress) return null;

    return this.mapperService.mapAddressToDto(deletedAddress);
  }
}
