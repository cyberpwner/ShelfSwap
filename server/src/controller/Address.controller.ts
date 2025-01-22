import { RequestHandler } from 'express';
import { AddressService } from '../services/Address.service';
import { Address } from '../entity/Address';

export class AddressController {
  private readonly addressService = new AddressService();

  getAllAddresses: RequestHandler = async (req, res) => {
    try {
      const addresses = await this.addressService.getAllAddresses();

      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch addresss', error: error instanceof Error ? error.message : error });
    }
  };

  getAddressById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const address = await this.addressService.getAddressById(id);

      if (address == null) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch address', error: error instanceof Error ? error.message : error });
    }
  };

  createAddress: RequestHandler = async (req, res) => {
    try {
      const address = new Address();
      Object.assign(address, req.body);

      const createdAddress = await this.addressService.createAddress(address);

      if (createdAddress == null) {
        res.status(400).json({ message: 'Address could not be created' });
        return;
      }

      res.status(200).json(createdAddress);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create address', error: error instanceof Error ? error.message : error });
    }
  };

  updateAddress: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const address = new Address();
      Object.assign(address, req.body);

      const updatedAddress = await this.addressService.updateAddress(id, address);

      if (updatedAddress == null) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update address', error: error instanceof Error ? error.message : error });
    }
  };

  deleteAddress: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      const deletedAddress = await this.addressService.deleteAddress(id);

      if (deletedAddress == null) {
        res.status(404).json({ message: 'Address not found' });
        return;
      }

      res.status(200).json(deletedAddress);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete address', error: error instanceof Error ? error.message : error });
    }
  };
}
