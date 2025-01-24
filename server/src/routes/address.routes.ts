import express from 'express';
import { AddressController } from '../controllers/Address.controller';
import { CommonValidation } from '../middleware/CommonValidation.middleware';
import { AddressValidation } from '../middleware/AddressValidation.middleware';
import { UserRole } from '../types/user.types.d';
import { Auth } from '../middleware/Auth.middleware';

const router = express.Router();
const addressController = new AddressController();
const addressValidation = new AddressValidation();
const auth = new Auth();

router.get('/', auth.authenticateAccessToken, auth.authorize([UserRole.ADMIN]), addressController.getAll);

router.get(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  addressController.getById,
);

router.post(
  '/',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  addressValidation.validateCreateAddress,
  addressController.createAddress,
);

router.put(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  addressValidation.validateUpdateAddress,
  addressController.updateAddress,
);

router.delete(
  '/:id',
  auth.authenticateAccessToken,
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  CommonValidation.validateId,
  addressController.deleteAddress,
);

export default router;
