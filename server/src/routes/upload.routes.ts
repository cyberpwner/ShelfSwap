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

router.use(errorHandler.handleMulterErrors);
router.use(auth.authenticateAccessToken);
router.use(auth.authorize([UserRole.ADMIN]));

router.post('/cover', upload.single('image'), uploadController.uploadBookCoverHandler);
router.post('/avatar', upload.single('image'), uploadController.uploadAvatarHandler);

export default router;
