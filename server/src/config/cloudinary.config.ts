import { v2 as cloudinary } from 'cloudinary';
import { APP_CONFIG } from '../constants/config.constants';

cloudinary.config({
  cloud_name: APP_CONFIG.cloudinary.cloud_name,
  api_key: APP_CONFIG.cloudinary.api_key,
  api_secret: APP_CONFIG.cloudinary.api_secret,
});

export default cloudinary;
