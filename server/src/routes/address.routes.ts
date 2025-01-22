import express from 'express';
import { AddressController } from '../controller/Address.controller';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { AddressValidation } from '../middleware/AddressValidation.middleware';

const router = express.Router();
const addressController = new AddressController();
const addressValidation = new AddressValidation();

router.get('/', addressController.getAllAddresses);

router.get('/:id', CommonValidation.validateId, addressController.getAddressById);

router.post('/', addressValidation.validateCreateAddress, addressController.createAddress);

router.put(
  '/:id',
  CommonValidation.validateId,
  addressValidation.validateUpdateAddress,
  addressController.updateAddress,
);

router.delete('/:id', CommonValidation.validateId, addressController.deleteAddress);

export default router;
