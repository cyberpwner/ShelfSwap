import { Request } from 'express';
import multer from 'multer';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const ALLOWED_FILE_FORMATS = ['jpeg', 'jpg', 'png'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed'));
    return;
  }

  // accept the file
  cb(null, true);
}

export const upload = multer({
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});
