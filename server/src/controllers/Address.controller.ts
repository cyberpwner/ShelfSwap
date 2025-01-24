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
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch addresss', error: error instanceof Error ? error.message : error });
    }
  };

  getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const address = await this.addressService.getById(id);

      if (address == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(address);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch address', error: error instanceof Error ? error.message : error });
    }
  };

  createAddress: RequestHandler = async (req, res) => {
    try {
      const address = new Address();
      Object.assign(address, req.body);

      const createdAddress = await this.addressService.createAddress(address);

      if (createdAddress == null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Address could not be created' });
        return;
      }

      res.status(HttpStatusCode.OK).json(createdAddress);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create address', error: error instanceof Error ? error.message : error });
    }
  };

  updateAddress: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;
      const address = new Address();
      Object.assign(address, req.body);

      const updatedAddress = await this.addressService.updateAddress(id, address);

      if (updatedAddress == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(updatedAddress);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to update address', error: error instanceof Error ? error.message : error });
    }
  };

  deleteAddress: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id;

      const deletedAddress = await this.addressService.deleteAddress(id);

      if (deletedAddress == null) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Address not found' });
        return;
      }

      res.status(HttpStatusCode.OK).json(deletedAddress);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to delete address', error: error instanceof Error ? error.message : error });
    }
  };
}
