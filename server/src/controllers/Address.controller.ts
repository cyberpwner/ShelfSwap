import { RequestHandler } from 'express';
import { AddressService } from '../services/Address.service';
import { Address } from '../entities/Address';
import { HttpStatusCode } from '../types/http.types.d';

export class AddressController {
  private readonly addressService = new AddressService();

  getAll: RequestHandler = async (_req, res) => {
    try {
      const addresses = await this.addressService.getAll();

      res.status(HttpStatusCode.OK).json(addresses);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch addresss' });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const address = await this.addressService.getById(id);

      if (address == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(address);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch address' });
    }
  };

  createAddress: RequestHandler = async (req, res) => {
    try {
      const address = new Address();
      Object.assign(address, req.body);

      const createdAddress = await this.addressService.createAddress(address);

      if (createdAddress == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'Address could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdAddress);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create address' });
    }
  };

  updateAddress: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const address = new Address();
      Object.assign(address, req.body);

      const updatedAddress = await this.addressService.updateAddress(id, address);

      if (updatedAddress == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedAddress);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update address' });
    }
  };

  deleteAddress: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedAddress = await this.addressService.deleteAddress(id);

      if (deletedAddress == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ error: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedAddress);
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete address' });
    }
  };
}
