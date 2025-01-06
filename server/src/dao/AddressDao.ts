import { Address } from '../entity/Address';
import { BaseDao } from './BaseDao';

export class AddressDao implements BaseDao<Address> {
  async findAll(): Promise<Address[]> {
    return Address.find();
  }

  async findById(id: number): Promise<Address | null> {
    return Address.findOne({ where: { id } });
  }

  async create(address: Address): Promise<Address | null> {
    return address.save();
  }

  async update(id: number, address: Partial<Address>): Promise<Address | null> {
    const existingAddress = await Address.findOne({ where: { id } });

    if (!existingAddress) return null;

    Object.assign(existingAddress, address);
    return existingAddress.save();
  }

  async delete(id: number): Promise<boolean> {
    const existingAddress = await Address.findOneBy({ id });

    if (!existingAddress) return false;

    await Address.remove(existingAddress);
    return true;
  }
}
