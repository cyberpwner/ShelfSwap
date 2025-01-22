import { RequestHandler, Response } from 'express';
import { ResponseError } from '../utils/error.utils';
import { TypedRequestBody } from '../types/express.types';
import { addressSchema, CreateAddressDto, UpdateAddressDto, updateAddressSchema } from '../schemas/address.schemas';
import { z } from 'zod';

export class AddressValidation implements ResponseError {
  validateCreateAddress: RequestHandler = (req: TypedRequestBody<CreateAddressDto>, res, next) => {
    try {
      req.body = addressSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  validateUpdateAddress: RequestHandler = (req: TypedRequestBody<UpdateAddressDto>, res, next) => {
    try {
      req.body = updateAddressSchema.parse(req.body);

      next();
    } catch (error) {
      this.handleErrorResponse(error, res);
    }
  };

  handleErrorResponse(error: unknown, res: Response): void {
    if (error instanceof z.ZodError) {
      res.status(400).json({ issues: error.issues.map((issue) => issue.message) });
      return;
    }

    res.status(500).json({ message: 'Internal server error.' });
  }
}
