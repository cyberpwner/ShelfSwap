import { AddressDao } from '../dao/Address.dao';
import { AddressDto } from '../dto/Address.dto';
import { PaginatedDto } from '../dto/Paginated.dto';
import { Address } from '../entities/Address';
import { MapperService } from './Mapper.service';

export class AddressService {
  private readonly addressDao: AddressDao;
  private readonly mapperService: MapperService;

  constructor() {
    this.addressDao = new AddressDao();
    this.mapperService = new MapperService();
  }

  async getAll(page = 1, pageSize = 10): Promise<PaginatedDto<AddressDto>> {
    const { data: addresses, total } = await this.addressDao.findAll(page, pageSize);

    if (addresses.length === 0) {
      return {
        data: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }

    let totalPages = undefined;

    if (total >= pageSize) {
      totalPages = Math.ceil(total / pageSize);
    } else {
      totalPages = 1;
    }

    return {
      data: addresses.map((address) => this.mapperService.mapAddressToDto(address)),
      total,
      page,
      totalPages,
    };
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
