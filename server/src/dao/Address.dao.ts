import { Address } from '../entities/Address';
import { BaseDao } from './Base.dao';

export class AddressDao implements BaseDao<Address> {
  async findAll(page = 1, pageSize = 10): Promise<{ data: Address[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [addresses, total] = await Address.findAndCount({
      skip,
      take: pageSize,
    });

    return { data: addresses, total };
  }

  async findById(id: string): Promise<Address | null> {
    return Address.findOne({ where: { id } });
  }

  async create(address: Address): Promise<Address> {
    const foundAddress = Address.findOneBy({ user: address.user });

    if (foundAddress != null) {
      throw new Error('address for user already exists');
    }

    return address.save();
  }

  async update(id: string, address: Partial<Address>): Promise<Address | null> {
    const existingAddress = await Address.findOneBy({ id });

    if (!existingAddress) return null;

    Object.assign(existingAddress, address);
    return existingAddress.save();
  }

  async delete(id: string): Promise<Address | null> {
    const existingAddress = await Address.findOneBy({ id });

    if (!existingAddress) return null;

    return Address.remove(existingAddress);
  }
}
