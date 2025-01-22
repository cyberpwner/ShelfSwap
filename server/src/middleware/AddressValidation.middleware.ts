import { RequestHandler } from 'express';
import { TypedRequestBody } from '../types/express.types.d';
import { addressSchema, CreateAddressDto, UpdateAddressDto, updateAddressSchema } from '../schemas/address.schemas';
import { ValidationErrorHandler } from '../utils/error.utils';

export class AddressValidation {
  validateCreateAddress: RequestHandler = (req: TypedRequestBody<CreateAddressDto>, res, next) => {
    try {
      req.body = addressSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };

  validateUpdateAddress: RequestHandler = (req: TypedRequestBody<UpdateAddressDto>, res, next) => {
    try {
      req.body = updateAddressSchema.parse(req.body);

      next();
    } catch (error) {
      ValidationErrorHandler.handleZodError(error, res);
    }
  };
}
