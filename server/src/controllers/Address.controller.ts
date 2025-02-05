import { RequestHandler } from 'express';
import { AddressService } from '../services/Address.service';
import { Address } from '../entities/Address';
import { HttpStatusCode } from '../types/http.types.d';

export class AddressController {
  private readonly addressService = new AddressService();

  getAll: RequestHandler = async (req, res) => {
    let pageNum = req.query?.page;

    if (!pageNum || String(pageNum).trim() === '') {
      pageNum = undefined;
    }

    const decodedPageNum = pageNum ? Number(decodeURIComponent(String(pageNum))) : undefined;
    const pageSize = decodedPageNum ? 10 : undefined;

    try {
      const { data, page, total, totalPages } = await this.addressService.getAll(decodedPageNum, pageSize);

      res.status(HttpStatusCode.OK).json({ data, page, total, totalPages });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch addresses' });
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
