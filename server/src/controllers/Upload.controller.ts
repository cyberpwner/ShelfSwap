import { RequestHandler } from 'express';
import { HttpStatusCode } from '../types/http.types.d';
import { uploadAvatar, uploadBookCover } from '../utils/upload.utils';

export class UploadController {
  uploadBookCoverHandler: RequestHandler = async (req, res) => {
    try {
      const file = req?.file;

      if (!file) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'No image file provided' });
        return;
      }

      const result = await uploadBookCover(file.path);

      res.status(HttpStatusCode.OK).json({ url: result.secure_url });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload image' });
    }
  };

  uploadAvatarHandler: RequestHandler = async (req, res) => {
    try {
      const file = req?.file;

      if (!file) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'No image file provided' });
        return;
      }

      const result = await uploadAvatar(file.path);

      res.status(HttpStatusCode.OK).json({ url: result.secure_url });
    } catch {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload image' });
    }
  };
}
