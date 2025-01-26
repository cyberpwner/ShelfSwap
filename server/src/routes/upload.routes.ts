import { Router } from 'express';
import { UploadController } from '../controllers/Upload.controller';
import { upload } from '../config/multer.config';
import { ErrorHandler } from '../middleware/ErrorHandler.middleware';
import { Auth } from '../middleware/Auth.middleware';
import { UserRole } from '../types/user.types.d';

const router = Router();
const uploadController = new UploadController();
const auth = new Auth();
const errorHandler = new ErrorHandler();

router.use(auth.authenticateAccessToken);

router.post(
  '/cover',
  auth.authorize([UserRole.ADMIN]),
  upload.single('image'),
  uploadController.uploadBookCoverHandler,
);

router.post(
  '/avatar',
  auth.authorize([UserRole.ADMIN, UserRole.USER]),
  upload.single('image'),
  uploadController.uploadAvatarHandler,
);

router.use(errorHandler.handleMulterErrors);

export default router;
