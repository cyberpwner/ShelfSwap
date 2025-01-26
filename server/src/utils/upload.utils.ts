import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.config';
import { ALLOWED_FILE_FORMATS } from '../config/multer.config';
import { BasePublicId, Folder } from '../constants/upload.constants';

export async function uploadBookCover(path: string): Promise<UploadApiResponse> {
  const timestamp = Date.now();

  try {
    return await cloudinary.uploader.upload(path, {
      allowed_formats: ALLOWED_FILE_FORMATS,
      folder: `bookstore/${Folder.BOOK}`,
      public_id: `${BasePublicId.BOOK}_${timestamp}`, // timestamp to ensure uniqueness
    });
  } catch {
    throw new Error('Failed to upload file');
  }
}
export async function uploadAvatar(path: string): Promise<UploadApiResponse> {
  const timestamp = Date.now();

  try {
    return await cloudinary.uploader.upload(path, {
      allowed_formats: ALLOWED_FILE_FORMATS,
      folder: `bookstore/${Folder.AVATAR}`,
      public_id: `${BasePublicId.AVATAR}_${timestamp}`, // timestamp to ensure uniqueness
    });
  } catch {
    throw new Error('Failed to upload file');
  }
}

export async function deleteImageFromCloud(publicId: string) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch {
    throw new Error('Failed to delete file');
  }
}
