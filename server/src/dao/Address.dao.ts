import { Address } from '../entity/Address';
import { BaseDao } from './Base.dao';

export class AddressDao implements BaseDao<Address> {
  async findAll(): Promise<Address[]> {
    return Address.find();
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
