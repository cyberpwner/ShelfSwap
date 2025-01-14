import express from 'express';
import { AddressController } from '../controller/AddressController';

const router = express.Router();
const addressController = new AddressController();

router.get('/', addressController.getAllAddresses);

router.get('/:id', addressController.getAddressById);

router.post('/', addressController.createAddress);

router.put('/:id', addressController.updateAddress);

router.delete('/:id', addressController.deleteAddress);

export default router;
